# Feature: portfolio-v2

## Objective
Replace the outdated WordPress portfolio (cpro7.wordpress.com, ~2025) with a modern, eye-catching Next.js portfolio that tells the owner's current story: Backend Developer (NestJS, Laravel, Python) building AI agents and RAG systems in production.

## Problem / Why
The old site presents a "Full Stack in training" profile with toy projects (dice game, drag & drop) and broken GitHub links (`github.com/Cril727` does not exist; real user is `CristianGarcia7`). The CV now shows production backend + AI work that the site does not reflect.

## Scope (authorized)
- Greenfield app in `/home/cristian/Dev/portafolio-next` (Next 16.3 App Router, React 19.2, TS, Tailwind 4, `motion`, `lucide-react`).
- Sections: Navbar, Hero (terminal card), About + stats, Experience timeline, Projects, Skills, Education + certifications, Contact, Footer.
- All copy in `src/content/profile.ts` (neutral professional Spanish); code/comments in English.
- Out of scope: push, PR, deploy, touching the old `portafolio` repo.

## Constraints
- No invented claims: content only from CV + public repo READMEs.
- Do not publish the reference person's phone number.
- Dark theme, responsive from 360px, `prefers-reduced-motion` respected, accessible.
- Email confirmed by owner (2026-09-27): `criatiangarcia637@gmail.com` (CV spelling). Kept in one constant (`contactEmail`).

## TDD
- Mode: enabled — source: `~/.claude/CLAUDE.md` (Strict TDD Mode: enabled).
- Runner: none in scaffold → established in T1 as Vitest + Testing Library (`pnpm test`).

## Delivery
- Forecast: ~1800 authored changed lines (> 400) → strategy `ask-on-risk`; chain strategy: `stacked-to-main` (user choice, 2026-09-27).
- RDD: on (decided by default). Assess each work-unit commit.

## Tasks
- [x] T1 Test harness: Vitest + jsdom + Testing Library, `pnpm test` script, smoke test. Route: inline (mechanical config).
- [x] T2 Content model: finish `src/content/profile.ts` (reuse partial writer output) + data invariant tests. Route: inline (1 file + test).
- [x] T3 Theme + layout + UI primitives (globals.css tokens, layout metadata/fonts, Reveal, SectionHeading, Badge, Card) with tests. Route: delegated (2+ non-trivial files).
- [x] T3a Fix Reveal: single element tree (no hydration mismatch), content visible without JS; test the animated path and CardSpotlight pointer vars + cleanup. Origin: T2+T3 review advisory R3-reveal-render-branch-divergence (WARNING), R3-reveal-animated-path-unproved, R3-spotlight-tracking-untested. Route: delegated with T4 (same writer, separate commit).
- [x] T4 Navbar + Hero (typing terminal) + About/stats with tests. Route: delegated.
- [x] T4a Fix hydration-path bugs from T3a+T4 review: (1) Reveal animation never plays after SSR hydration (initial read only at mount) — WARNING R3-reveal-animation-dead-after-hydration; (2) hydration guard test is case-sensitive and misses React 19 mismatch reporting — WARNING R3-hydration-guard-case-sensitive (use hydrateRoot + onRecoverableError); (3) TerminalCard SSR/client divergence + no-JS empty terminal + untested typing path — WARNING R3-terminal-ssr-divergence-and-typing-untested; plus SUGGESTIONs: IO stub cleanup in afterEach, spotlight cleanup asserts same handler. Tests must exercise the real SSR→hydrate path (renderToString + hydrateRoot). Route: delegated with T5 (separate commit).
- [x] T4b Replace JS-driven reveal/typing with CSS-only animation. Why: third review round on Reveal still found hydration-path defects (T4a review: WARNING R3-reveal-key-remount-children — key remount discards hydrated children state; WARNING R3-hydration-tests-leak-roots; SUGGESTIONs: reduced-motion hydration unproved, terminal log flash after hydration, weak clearInterval assertion). Decision (parent, 2026-09-27): Reveal = plain server element + CSS scroll-driven animation (`animation-timeline: view()`) inside `@supports` and `prefers-reduced-motion: no-preference`; unsupported browsers show content statically. TerminalCard = server-rendered full log with CSS staggered per-line reveal; no JS state. Remove now-unneeded useMounted hook, IntersectionObserver/matchMedia-dependent hydration tests that no longer apply, and the `motion` dependency if unused. Route: delegated with T5.
- [x] T5 Experience timeline + Projects + Skills with tests. Route: delegated.
- [ ] T6 Education + Contact (copy email) + Footer + page assembly with tests. Also add LinkedIn `https://www.linkedin.com/in/cristian-garcia-developer/` to `contactLinks` (owner-provided 2026-09-27; icon `linkedin`) with an invariant test. Plus T4b+T5 review advisories: remove no-op `Reveal` `delay` prop (WARNING R3-reveal-delay-noop), add `.terminal-line` reduced-motion CSS guard test, tighten/rename weak Reveal assertion. Route: delegated.
- [ ] T7 Full checks: `pnpm lint`, `pnpm test`, `pnpm build`; run dev server on :3000. Route: inline.

## Acceptance criteria
- All tasks' tests green; lint and build pass.
- Site renders at http://localhost:3000 with every section, no horizontal scroll at 360px.

## Progress / Evidence
- 2026-09-27: scaffold commit `440395c` on main; branch `feat/portfolio-v2` created. Earlier monolithic writer stopped to switch to ODD; its partial `profile.ts`, `next.config.ts` image config and deps are reused.

- T1 done: RED `pnpm test` exit 1 (no script) → GREEN 1/1 passed; `pnpm lint` exit 0; `tsc --noEmit` clean. Commit `a72f5d6`. RDD assess: medium, review_due=slice_budget_reached (1297 lines, mostly pnpm-lock.yaml). START returned candidate consent (lineage review-b8e50d004b700043) — user granted; reliability lens APPROVED, acknowledged (boundary → `a72f5d6`). Advisory: R3-stale-task-state (fixed here), R3-unexercised-runtime-deps (motion/lucide get exercised in T3/T4). T2 WIP was stashed during review and restored.
- T2 done: RED 1/9 failed (certifications carried an invented issuer "Sofka / Platzi" not in the CV) → GREEN 9/9; `issuer` made optional; lint 0; tsc clean. Commit: see git log `feat(content)`.
- T2 RDD assess: medium, under_budget (341 lines) → pending in slice.
- T3 done (delegated writer; trigger: 2+ non-trivial files): RED 4 suites failed (modules missing) → GREEN 6 suites / 24 tests; lint 0; tsc 0; build OK. Commit `ca48380` (+521/-79, over the advisory 400 heuristic: 4 primitives + tests + token rewrite in one unit). Parent re-verified 24/24. RDD assess base `a72f5d6`: medium, slice_budget_reached (941 lines, T2+T3) → START lineage review-e82e8e2bc5478730 returned consent — user granted; reliability lens APPROVED, acknowledged (boundary → `ca48380`). Advisory → T3a; R3-stale-task-state-t3 fixed in this document.
- T3a done (delegated): RED 2 Reveal assertions failed on old code (opacity:0 shipped without JS) → GREEN; mounted flag via useSyncExternalStore; animated-path test isolated (framer-motion caches IntersectionObserver per module); CardSpotlight test passed first run (behavior already correct, coverage-only). Commit `134f158`.
- T4 done (delegated): Navbar RED→4/4, Hero RED→5/5, About RED→1/1; suite 11 files / 39 tests; lint/tsc clean; build OK. Commit `daf0e10` (516 lines, over advisory heuristic: 5 interlocking pieces). Added `terminalLog` export in profile.ts built from existing facts. lucide has no brand icons → GitHub CTA uses ExternalLink + text. Parent re-verified 39/39. RDD assess base `ca48380`: medium, slice_budget_reached (779) → START lineage review-1a7c0f05ed46c446 user granted; reliability APPROVED with 3 WARNING + 2 SUGGESTION advisories → T4a; acknowledged (boundary → `daf0e10`).
- T4a done (delegated; writer stopped by session usage limit after commit): commit `5671087`; parent-verified 15 files / 49 tests, lint 0, tsc 0. RDD assess base `daf0e10`: medium, slice_budget_reached (592) → user granted; reliability APPROVED with 2 WARNING + 3 SUGGESTION → T4b; acknowledged (boundary → `5671087`). Leftover untracked `Experience.test.tsx` (T5 RED WIP) handed to next writer.
- T4b done (delegated): commit `97429bc` (+172/-735; `motion` removed; useMounted + JS hydration tests deleted); RED 6 → GREEN 44/44.
- T5 done (delegated): commit `509df93` (+317/-1); RED 3 suites → GREEN 53/53; fixed ambiguous query in leftover Experience test. Parent re-verified 15 files / 53 tests, lint 0, no `motion/react` imports. RDD assess base `5671087`: medium, slice_budget_reached (1225) → user granted; reliability APPROVED (1 WARNING, 2 SUGGESTION → T6); acknowledged (boundary → `509df93`).
- Engram mirror `odd/portfolio-v2/tasks`: PENDING — `mem_save` returned `ambiguous_project` (offered: back-kairos, docs; neither matches this repo).

## Next step
T6 (delegated), then T7 (inline: full checks + dev server on :3000).
