"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative pointer-following glow for `Card`. Attaches its listener to its
 * own parent element (the card surface) so `Card` itself can stay a server
 * component. Purely visual: the card and its content render and remain
 * usable without this ever mounting or without JavaScript at all — the
 * hover reveal itself is driven by the `group-hover` CSS class on the
 * gradient, only the pointer-tracked position is a JS enhancement.
 */
export function CardSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlightEl = ref.current;
    const container = spotlightEl?.parentElement;
    if (!container) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      container.style.setProperty(
        "--spotlight-x",
        `${event.clientX - rect.left}px`
      );
      container.style.setProperty(
        "--spotlight-y",
        `${event.clientY - rect.top}px`
      );
    };

    container.addEventListener("pointermove", handlePointerMove);
    return () => container.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(480px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--color-accent) 18%, transparent), color-mix(in oklab, var(--color-accent-cyan) 10%, transparent) 45%, transparent 70%)",
      }}
    />
  );
}
