import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { TerminalCard } from "./TerminalCard";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);
const lines = ["$ curl -N https://api/agentes", "> respuesta en streaming"];

describe("TerminalCard — real SSR to hydrate path", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the full log in server-rendered HTML — SSR/no-JS never ships an empty terminal", () => {
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(<TerminalCard lines={lines} />);

    const container = document.createElement("div");
    container.innerHTML = html;

    expect(container.textContent).toContain(lines[0]);
    expect(container.textContent).toContain(lines[1]);
  });

  it("hydrates without a hydration/recoverable error even when server and client disagree on reduced motion", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onRecoverableError = vi.fn();

    // Server "guesses" motion is enabled; client discovers reduced motion
    // is actually preferred. Both must render the same full log before
    // mount so React never sees divergent markup.
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(<TerminalCard lines={lines} />);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    mockedUseReducedMotion.mockReturnValueOnce(true);
    await act(async () => {
      hydrateRoot(container, <TerminalCard lines={lines} />, {
        onRecoverableError,
      });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    const mismatchLogged = errorSpy.mock.calls.some((call) =>
      call.some((arg) => typeof arg === "string" && /hydrat/i.test(arg))
    );
    expect(mismatchLogged).toBe(false);

    errorSpy.mockRestore();
    document.body.removeChild(container);
  });

  it("starts typing only after mount, when motion is allowed", async () => {
    vi.useFakeTimers();

    mockedUseReducedMotion.mockReturnValue(false);
    const html = renderToString(<TerminalCard lines={lines} />);

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    await act(async () => {
      hydrateRoot(container, <TerminalCard lines={lines} />);
    });

    // Right after hydration (before the typing interval has ticked), the
    // log resets to empty so it can type back up — proving typing genuinely
    // starts post-mount rather than the SSR content just staying static.
    expect(container.querySelector("pre")?.textContent).toBe("▊");

    act(() => {
      vi.advanceTimersByTime(550);
    });
    expect(container.textContent).toContain(lines[0]);

    document.body.removeChild(container);
  });
});
