import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom does not implement matchMedia. Components that read
// `prefers-reduced-motion` (directly or via `motion/react`) need it stubbed
// so tests don't crash on an undefined function.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

// jsdom does not implement IntersectionObserver, which `motion/react`'s
// `whileInView` relies on. Stub it so scroll-triggered animations can mount
// in tests without throwing.
if (typeof window.IntersectionObserver !== "function") {
  class IntersectionObserverStub implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect(): void {}
    observe(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve(): void {}
  }

  window.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}
