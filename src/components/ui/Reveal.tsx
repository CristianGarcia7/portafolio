import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
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
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
