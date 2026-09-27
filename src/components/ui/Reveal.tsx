"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMounted } from "@/hooks/useMounted";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Fades and slides children in as they scroll into view. Always renders the
 * same `motion.div` element (no conditional element-type swap), which keeps
 * server-rendered markup and the client's first render identical and avoids
 * a React hydration mismatch.
 *
 * The hidden `initial` state is only armed after the component has mounted
 * on the client (`useMounted`, see `src/hooks/useMounted.ts`). That means:
 * - Server-rendered / no-JS markup always renders with `initial={false}`,
 *   so content is visible immediately and never ships hidden.
 * - The very first client render matches that same `initial={false}` state,
 *   so hydration has nothing to reconcile.
 *
 * Motion only reads the `initial` prop once, at the element's own mount —
 * it does NOT re-arm the animation just because a later render passes a
 * different `initial` value to the same element instance. So once mounted
 * (and only if the user doesn't prefer reduced motion), the element is
 * *remounted* via a `key` change: this creates a fresh Motion instance that
 * reads the real `initial={ opacity: 0, y: 24 }` + `whileInView` pair,
 * which is what actually arms the scroll-reveal for real users. Without
 * this remount, the animation would be silently dead in production even
 * though the props "looked" correct.
 * When the user prefers reduced motion, `animationEnabled` never turns
 * true, so the key never changes and the element never remounts.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const mounted = useMounted();

  const animationEnabled = mounted && !shouldReduceMotion;

  return (
    <motion.div
      key={String(animationEnabled)}
      className={className}
      initial={animationEnabled ? { opacity: 0, y: 24 } : false}
      whileInView={animationEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
