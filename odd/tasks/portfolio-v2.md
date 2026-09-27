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
- Email is unconfirmed (`criatiangarcia637` in CV vs `cristiangarcia637` on old site): keep it in one constant.

## TDD
- Mode: enabled — source: `~/.claude/CLAUDE.md` (Strict TDD Mode: enabled).
- Runner: none in scaffold → established in T1 as Vitest + Testing Library (`pnpm test`).

## Delivery
- Forecast: ~1800 authored changed lines (> 400) → strategy `ask-on-risk`; chain strategy: `stacked-to-main` (user choice, 2026-09-27).
- RDD: on (decided by default). Assess each work-unit commit.

## Tasks
- [x] T1 Test harness: Vitest + jsdom + Testing Library, `pnpm test` script, smoke test. Route: inline (mechanical config).
- [ ] T2 Content model: finish `src/content/profile.ts` (reuse partial writer output) + data invariant tests. Route: inline (1 file + test).
- [ ] T3 Theme + layout + UI primitives (globals.css tokens, layout metadata/fonts, Reveal, SectionHeading, Badge, Card) with tests. Route: delegated (2+ non-trivial files).
- [ ] T4 Navbar + Hero (typing terminal) + About/stats with tests. Route: delegated.
- [ ] T5 Experience timeline + Projects + Skills with tests. Route: delegated.
- [ ] T6 Education + Contact (copy email) + Footer + page assembly with tests. Route: delegated.
- [ ] T7 Full checks: `pnpm lint`, `pnpm test`, `pnpm build`; run dev server on :3000. Route: inline.

## Acceptance criteria
- All tasks' tests green; lint and build pass.
- Site renders at http://localhost:3000 with every section, no horizontal scroll at 360px.

## Progress / Evidence
- 2026-09-27: scaffold commit `440395c` on main; branch `feat/portfolio-v2` created. Earlier monolithic writer stopped to switch to ODD; its partial `profile.ts`, `next.config.ts` image config and deps are reused.

- Engram mirror `odd/portfolio-v2/tasks`: PENDING — `mem_save` returned `ambiguous_project` (offered: back-kairos, docs; neither matches this repo).

## Next step
Resolve chain strategy, then T1.
