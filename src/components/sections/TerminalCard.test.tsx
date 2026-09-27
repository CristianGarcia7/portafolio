import { act } from "react";
import { render, screen } from "@testing-library/react";
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

describe("TerminalCard", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("has an accessible group label", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<TerminalCard lines={lines} />);

    expect(
      screen.getByRole("group", {
        name: "Terminal de ejemplo mostrando una consulta al agente de IA",
      })
    ).toBeInTheDocument();
  });

  it("shows every line immediately, with no typing cursor, when reduced motion is preferred", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<TerminalCard lines={lines} />);

    for (const line of lines) {
      expect(screen.getByText(line, { exact: false })).toBeInTheDocument();
    }
    expect(screen.queryByText("▊")).not.toBeInTheDocument();
  });

  it("types lines one at a time on an interval, stops advancing once every line is shown, and removes the cursor when typing completes", () => {
    vi.useFakeTimers();
    mockedUseReducedMotion.mockReturnValue(false);

    const { container } = render(<TerminalCard lines={lines} />);
    const pre = container.querySelector("pre") as HTMLElement;

    // Nothing typed yet: the client's first committed render already treats
    // itself as "mounted" (no SSR markup to reconcile against here), so
    // typing starts immediately from an empty log.
    expect(pre.textContent).toBe("▊");

    act(() => {
      vi.advanceTimersByTime(550);
    });
    expect(pre.textContent).toBe(`${lines[0]}▊`);

    // The second (and last) line's tick both reveals it AND completes
    // typing in the same render, so the cursor is already gone here.
    act(() => {
      vi.advanceTimersByTime(550);
    });
    expect(pre.textContent).toBe(lines.join("\n"));
    expect(screen.queryByText("▊")).not.toBeInTheDocument();

    // The interval must stop advancing — not overshoot lines.length — once
    // every line has been typed.
    act(() => {
      vi.advanceTimersByTime(550 * 5);
    });
    expect(pre.textContent).toBe(lines.join("\n"));
    expect(screen.queryByText("▊")).not.toBeInTheDocument();
  });

  it("clears the typing interval on unmount so it never sets state after the component is gone", () => {
    vi.useFakeTimers();
    mockedUseReducedMotion.mockReturnValue(false);
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    const { unmount } = render(<TerminalCard lines={lines} />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    // Advancing timers after unmount must not throw (React would warn/throw
    // on a state update to an unmounted component if cleanup failed).
    expect(() => {
      act(() => {
        vi.advanceTimersByTime(550 * lines.length);
      });
    }).not.toThrow();

    clearIntervalSpy.mockRestore();
  });
});
