import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "globals.css"), "utf-8");

describe("globals.css — reveal animation guards", () => {
  it("defines .reveal only inside prefers-reduced-motion: no-preference + @supports (animation-timeline: view())", () => {
    const guardedBlock =
      /@media \(prefers-reduced-motion: no-preference\) \{\s*@supports \(animation-timeline: view\(\)\) \{\s*\.reveal \{[^}]*\}\s*\}\s*\}/;

    expect(css).toMatch(guardedBlock);

    // Pragmatic regression guard: there is exactly one `.reveal {` rule in
    // the whole file, and it's the one inside the guard above — so a future
    // edit can't accidentally add an unguarded `.reveal` rule that would
    // ignore the user's reduced-motion preference or unsupported browsers.
    const revealRuleCount = (css.match(/\.reveal\s*\{/g) ?? []).length;
    expect(revealRuleCount).toBe(1);
  });

  it("defines the reveal-in keyframes", () => {
    expect(css).toMatch(/@keyframes reveal-in\s*\{/);
  });
});
