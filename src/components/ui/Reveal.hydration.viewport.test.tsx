import { act } from "react";
import { waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

/**
 * Lives in its own file for the same reason as Reveal.viewport.test.tsx:
 * Framer Motion caches one IntersectionObserver per (document,
 * threshold/margin) combination at module scope, so this file's first
 * animated mount must be the one that "wins" the locally stubbed,
 * controllable observer below. (The plain hydration-mismatch check lives
 * in the sibling Reveal.hydration.test.tsx, which never needs a real
 * observer to fire.)
 */
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Reveal — real SSR to hydrate path, animated", () => {
  it("shows content in the server-rendered HTML and arms the scroll-reveal animation once hydrated, driven by the IntersectionObserver", async () => {
    let observedCallback: IntersectionObserverCallback | undefined;
    class ControllableIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = "";
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(callback: IntersectionObserverCallback) {
        observedCallback = callback;
      }
      disconnect(): void {}
      observe(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      unobserve(): void {}
    }
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);

    mockedUseReducedMotion.mockReturnValue(false);

    const html = renderToString(
      <Reveal>
        <p>Contenido SSR con scroll</p>
      </Reveal>
    );

    // (b) Content is visible in the server HTML itself, before any JS runs.
    const ssrContainer = document.createElement("div");
    ssrContainer.innerHTML = html;
    const ssrWrapper = ssrContainer.querySelector("p")?.parentElement;
    expect(ssrWrapper).not.toHaveStyle({ opacity: "0" });

    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    await act(async () => {
      hydrateRoot(
        container,
        <Reveal>
          <p>Contenido SSR con scroll</p>
        </Reveal>
      );
    });

    const wrapper = container.querySelector("p")?.parentElement as HTMLElement;

    // (c) Once mounted, the reveal genuinely arms: hidden again until the
    // IntersectionObserver reports the element entered the viewport. If the
    // animation were dead after hydration (Motion ignoring a later
    // `initial` prop change on the same element instance), this would stay
    // visible instead.
    expect(wrapper).toHaveStyle({ opacity: "0" });

    act(() => {
      observedCallback?.(
        [
          {
            isIntersecting: true,
            target: wrapper,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    await waitFor(() => {
      expect(wrapper).toHaveStyle({ opacity: "1" });
    });

    vi.unstubAllGlobals();
    document.body.removeChild(container);
  });
});
