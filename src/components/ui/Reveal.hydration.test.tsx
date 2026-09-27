import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

/**
 * Exercises the REAL SSR -> hydrate path (renderToString + hydrateRoot)
 * rather than a client-only render(), because a client-only render's first
 * commit already has `useMounted()` return `true` (there is no server
 * snapshot to reconcile against) — a path production's actual hydration
 * flow never starts from.
 *
 * The animated/IntersectionObserver-driven "does the reveal actually arm"
 * assertion lives in its own file, `Reveal.hydration.viewport.test.tsx`,
 * for the same reason `Reveal.viewport.test.tsx` is separate from
 * `Reveal.test.tsx`: Framer Motion caches one IntersectionObserver per
 * (document, threshold/margin) combination at module scope, and this file's
 * hydration mismatch test below always passes `viewport={...}` (even in its
 * non-animated branch), so it would win that cache slot first and starve
 * the animated test of the locally stubbed, controllable observer.
 */
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Reveal — real SSR to hydrate path", () => {
  it("hydrates without a React hydration/recoverable error, checked case-insensitively (React 19 does not always capitalize 'Hydration')", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onRecoverableError = vi.fn();

    // Server "guesses" motion is enabled (no matchMedia available yet);
    // client discovers the real preference is reduced motion. Reveal must
    // reconcile this without React ever seeing mismatched server/client
    // markup.
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(
      <Reveal>
        <p>Contenido SSR</p>
      </Reveal>
    );

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    mockedUseReducedMotion.mockReturnValueOnce(true);
    await act(async () => {
      hydrateRoot(
        container,
        <Reveal>
          <p>Contenido SSR</p>
        </Reveal>,
        { onRecoverableError }
      );
    });

    expect(onRecoverableError).not.toHaveBeenCalled();

    const mismatchLogged = errorSpy.mock.calls.some((call) =>
      call.some((arg) => typeof arg === "string" && /hydrat/i.test(arg))
    );
    expect(mismatchLogged).toBe(false);

    errorSpy.mockRestore();
    document.body.removeChild(container);
  });

  it("is visible in the server-rendered HTML before any JavaScript has run", () => {
    mockedUseReducedMotion.mockReturnValueOnce(false);
    const html = renderToString(
      <Reveal>
        <p>Contenido SSR sin JS</p>
      </Reveal>
    );

    const container = document.createElement("div");
    container.innerHTML = html;

    const wrapper = container.querySelector("p")?.parentElement;
    expect(wrapper).not.toHaveStyle({ opacity: "0" });
  });
});
