import { act } from "react";
import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Reveal", () => {
  it("renders children immediately visible when reduced motion is preferred", () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <Reveal>
        <p>Contenido revelado</p>
      </Reveal>
    );

    expect(screen.getByText("Contenido revelado")).toBeVisible();
  });

  it("still renders children when motion is enabled", () => {
    mockedUseReducedMotion.mockReturnValue(false);

    render(
      <Reveal>
        <p>Contenido animado</p>
      </Reveal>
    );

    expect(screen.getByText("Contenido animado")).toBeInTheDocument();
  });

  it("hydrates onto server-rendered markup without a React hydration mismatch, even when the server and client disagree on reduced motion", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onRecoverableError = vi.fn();

    // Server render "guesses" motion is enabled (no matchMedia available yet).
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(
      <Reveal>
        <p>Contenido SSR</p>
      </Reveal>
    );

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    // Client hydration discovers the real preference: reduced motion is on.
    mockedUseReducedMotion.mockReturnValueOnce(true);
    await act(async () => {
      hydrateRoot(
        container,
        <Reveal>
          <p>Contenido SSR</p>
        </Reveal>,
        // React 19 reports an unrecoverable hydration mismatch through this
        // callback (and/or a console.error that isn't reliably capitalized
        // "Hydration"), so both signals are checked rather than relying on
        // a case-sensitive string match alone.
        { onRecoverableError }
      );
    });

    expect(onRecoverableError).not.toHaveBeenCalled();

    const hydrationMismatchLogged = errorSpy.mock.calls.some((call) =>
      call.some((arg) => typeof arg === "string" && /hydrat/i.test(arg))
    );
    expect(hydrationMismatchLogged).toBe(false);

    errorSpy.mockRestore();
    document.body.removeChild(container);
  });

  it("is visible in the DOM before any JavaScript has run (server-rendered markup)", () => {
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(
      <Reveal>
        <p>Contenido sin JS</p>
      </Reveal>
    );

    const container = document.createElement("div");
    container.innerHTML = html;

    const paragraph = container.querySelector("p");
    const wrapper = paragraph?.parentElement;
    expect(wrapper).not.toHaveStyle({ opacity: "0" });
  });
});
