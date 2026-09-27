import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * Optional extra delay (in seconds) before the reveal starts. Mapped to
   * the `--reveal-delay` CSS custom property rather than applied directly:
   * the reveal itself is a scroll-driven `animation-timeline: view()`
   * animation (see `.reveal` in `globals.css`), not a time-driven one, so a
   * plain `animation-delay` would mean "percent of scroll range" rather than
   * "seconds" and could produce a confusing result. No current caller passes
   * this — it's kept for API compatibility and reserved for a future
   * time-based effect (e.g. a CSS transition layered on top of the reveal).
   */
  delay?: number;
};

/**
 * Plain server element — no "use client", no hooks, no JS animation
 * library. Content is always present and visible in the HTML; the reveal
 * effect itself is entirely CSS (`.reveal` in `globals.css`), gated behind
 * `@media (prefers-reduced-motion: no-preference)` and
 * `@supports (animation-timeline: view())`. Browsers that don't support
 * scroll-driven animations, or users who prefer reduced motion, simply see
 * the content statically — there is no JS fallback path to keep in sync.
 */
export function Reveal({ children, className, delay }: RevealProps) {
  const style: CSSProperties | undefined = delay
    ? ({ "--reveal-delay": `${delay}s` } as CSSProperties)
    : undefined;

  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
