import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

/**
 * This test lives in its own file (rather than alongside Reveal.test.tsx)
 * because it must be the first render in this module instance. Framer
 * Motion caches one IntersectionObserver per (document, threshold/margin)
 * combination at module scope (`framer-motion`'s viewport `observers`
 * WeakMap) — once any earlier test in the same file mounts an animated
 * Reveal, that cached observer instance "wins" and our locally stubbed
 * IntersectionObserver below would never be constructed.
 */
vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Reveal animated path", () => {
  it("reveals children once the IntersectionObserver reports they entered the viewport", async () => {
    mockedUseReducedMotion.mockReturnValue(false);

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

    render(
      <Reveal>
        <p>Contenido con scroll</p>
      </Reveal>
    );

    const paragraph = screen.getByText("Contenido con scroll");
    const wrapper = paragraph.parentElement as HTMLElement;

    // Before the observer reports an intersection, the reveal animation's
    // hidden initial state should be in effect.
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
  });
});
