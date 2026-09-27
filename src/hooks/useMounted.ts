import { useSyncExternalStore } from "react";

// No external store to subscribe to — this only exists to get a stable
// "has this component committed on the client" flag without calling
// setState inside an effect (which would trigger a visible post-paint
// flash instead of resolving synchronously around the hydration commit).
// `useSyncExternalStore`'s server snapshot always returns `false` and its
// client snapshot always returns `true`, so:
// - The server-rendered markup and the very first client render (the one
//   React reconciles against that markup during hydration) both see
//   `false`, keeping SSR/client output identical and avoiding a hydration
//   mismatch.
// - Immediately after that commit, React re-checks the snapshot and,
//   because the real client value differs, synchronously re-renders with
//   `true` before the browser paints — so callers see one flip from
//   `false` to `true` right after mount, with no visible flash.
const subscribeToNothing = () => () => {};

/**
 * Whether this component has committed on the client (as opposed to being
 * server-rendered or mid-hydration). See the module comment above for why
 * this is safe to use for SSR/client-consistent branching without causing a
 * hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
}
