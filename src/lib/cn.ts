/**
 * Minimal class name joiner. Filters out falsy values so components can
 * conditionally compose Tailwind class strings without a dependency.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
