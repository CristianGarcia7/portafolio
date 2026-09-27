"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// No external store to subscribe to — this only exists to get a stable
// "has this component committed on the client" flag without calling
// setState inside an effect (which would trigger cascading renders).
// `useSyncExternalStore`'s server snapshot always returns `false`, and its
// client snapshot returns `true`, so the very first client render matches
// the server-rendered markup and only later renders see `true`.
const subscribeToNothing = () => () => {};

function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}

/**
 * Fades and slides children in as they scroll into view. Always renders the
 * same `motion.div` element (no conditional element-type swap), which keeps
 * server-rendered markup and the client's first render identical and avoids
 * a React hydration mismatch.
 *
 * The hidden `initial` state is only armed after the component has mounted
 * on the client (`useMounted` flips via `useSyncExternalStore`, whose
 * server snapshot is always `false` and never runs when JavaScript is
 * unavailable). That means:
 * - Server-rendered / no-JS markup always renders with `initial={false}`,
 *   so content is visible immediately and never ships hidden.
 * - The very first client render matches that same `initial={false}` state,
 *   so hydration has nothing to reconcile.
 * - Once mounted, if the user doesn't prefer reduced motion, the component
 *   arms the hidden `initial` + `whileInView` animation for its normal
 *   scroll-reveal behavior.
 * When the user prefers reduced motion, the animation stays disabled
 * (`initial={false}`) permanently instead of swapping to a different
 * element.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const mounted = useMounted();

  const animationEnabled = mounted && !shouldReduceMotion;

  return (
    <motion.div
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
