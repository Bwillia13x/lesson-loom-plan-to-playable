# AGENTS.md — Lesson Loom Build Instructions

_Last updated: 2026-05-27_  
_Primary agent: Cursor Composer 2.5_  
_Project: Lesson Loom — Plan to Playable_

## 1. Mission

You are building **Lesson Loom**, a high-fidelity interactive prototype for the Google Stitch Challenge.

The goal is to create a premium, emotionally clear demo that shows a teacher-approved lesson plan becoming an interactive classroom app.

Do not build a full SaaS. Build a focused, polished, responsive, one-lesson prototype.

## 2. Source hierarchy

When instructions conflict, follow this order:

1. Drew’s latest direct instruction.
2. `14_BUILD_EXECUTION_BRIEF.md`.
3. `00_README.md` in this pack.
4. `01_PRODUCT_SPECSHEET.md`.
5. `03_DESIGN.md` or root `DESIGN.md`.
6. `15_COMPONENT_ARCHITECTURE.md`.
7. `16_INTERACTION_AND_MOTION_SPEC.md`.
8. `17_COPY_DECK.md`.
9. `05_IMPLEMENTATION_PLAN_CURSOR_COMPOSER.md`.
10. Other files in this context pack.
11. Existing codebase conventions.

## 3. Operating mode

Work like a careful senior product engineer and visual systems designer.

Prioritize:

1. clarity of concept;
2. interaction polish;
3. visual hierarchy;
4. responsive behavior;
5. accessibility basics;
6. contest submission usefulness;
7. maintainable code.

Do not chase broad product scope.

## 4. Primary build objective

Build a single-page prototype with the following flow:

`Hero → Lesson Intake → Teaching Signal → Student App → Teacher Console → Differentiation → Review & Safety → Export Pack → Made with Stitch`

The core experience should be clickable and visually rich.


## 4.1 Build-control rule

Composer should not reinterpret the product concept. If a design or implementation choice is ambiguous, choose the option that best supports the core transformation:

`trusted lesson plan → interactive classroom app → teacher-reviewed export pack`

Do not add major new product categories, extra lessons, accounts, dashboards, admin features, or external integrations unless Drew explicitly asks.

## 4.2 Required files to inspect before implementation

Before editing code, inspect at minimum:

- `14_BUILD_EXECUTION_BRIEF.md`
- `15_COMPONENT_ARCHITECTURE.md`
- `16_INTERACTION_AND_MOTION_SPEC.md`
- `17_COPY_DECK.md`
- `03_DESIGN.md` or root `DESIGN.md`
- `07_CONTENT_MODEL_AND_SAMPLE_DATA.md`
- `09_PRIVACY_CLAIM_SAFETY.md`


## 5. Non-negotiable boundaries

Do not implement:

- real AI calls;
- real student data;
- authentication;
- backend;
- database;
- payment;
- LMS integration;
- official curriculum lookup;
- automated grading;
- analytics that collect personal data.

Do not write claims that imply:

- Lesson Loom replaces teachers;
- Lesson Loom generates official curriculum;
- Lesson Loom is district-approved;
- Lesson Loom is fully privacy compliant;
- Lesson Loom automatically personalizes based on student profiles.

Use safe language:

- “teacher-reviewed draft”;
- “curriculum-aligned draft”;
- “interactive lesson interface”;
- “no student data required”;
- “printable fallback”;
- “human approval before classroom use.”

## 6. Agent roles

### Product Director

Keeps the concept focused and prevents scope creep.

Questions to ask before adding anything:

- Does this improve the demo story?
- Will the judge understand it quickly?
- Does this create visual or interaction value?
- Can it be finished in one week?

### Visual Design Lead

Implements the design system in `03_DESIGN.md`.

Focus:

- calm, premium education-tech aesthetic;
- refined typography;
- soft paper/glass cards;
- woven linework;
- tactile garden/fraction visuals;
- elegant motion;
- high readability.

### Interaction Engineer

Builds the Lesson Weave, tabs, toggles, fraction interaction, export cards, and responsive behavior.

Focus:

- deterministic state;
- no backend;
- smooth but restrained motion;
- keyboard accessibility;
- reduced-motion support.

### Accessibility / Trust Reviewer

Checks:

- color contrast;
- focus states;
- semantic headings;
- button labels;
- no fake claims;
- no student personal data;
- no manipulative UI;
- clear teacher review layer.

### Submission Producer

Ensures the app includes enough process/story material for the Contra submission:

- clear title;
- hero screenshot potential;
- “Made with Stitch” section;
- export pack;
- demo-ready copy;
- short walkthrough script support.

## 7. Coding standards

Use simple, readable code.

Recommended structure:

```txt
src/
  App.tsx
  main.tsx
  styles/
    index.css
    tokens.css
    base.css
    layout.css
    motion.css
    components-shared.css
    components-sections.css
  data/
    lessonLoomData.ts
  components/
    Hero.tsx
    LessonIntake.tsx
    LessonWeave.tsx
    TeachingSignalBoard.tsx
    StudentAppPreview.tsx
    TeacherConsole.tsx
    DifferentiationPanel.tsx
    ReviewSafetyPanel.tsx
    ExportPack.tsx
    MadeWithStitch.tsx
    Section.tsx
    Badge.tsx
    Button.tsx
    Card.tsx
```

If the existing project structure differs, adapt gracefully.

## 8. State model

Keep state simple:

- `hasWoven: boolean`
- `activeMode: 'teacher' | 'student'`
- `activeSupport: 'support' | 'core' | 'extend'`
- `selectedTiles: string[]`
- `copiedExportId: string | null`
- `activeWeaveStep: number`

## 9. Visual behavior

The app should feel alive but not noisy.

Use:

- soft activation glows;
- animated woven line;
- card reveal on weave;
- hover lift on cards;
- gentle progress pips;
- small success state on fraction match.

Respect `prefers-reduced-motion`.

## 10. Accessibility requirements

- Buttons must be real `<button>` elements.
- Interactive cards must have keyboard focus if clickable.
- Preserve semantic heading order.
- Add `aria-live` only where helpful for copy/success feedback.
- Do not rely on color alone.
- Ensure text remains readable on mobile.
- Provide reduced-motion fallback.

## 11. QA before completion

Run:

- install if needed;
- build;
- lint if available;
- typecheck if available;
- visual inspection at desktop and mobile widths;
- keyboard tab pass.

If a command fails because the repo lacks a script, note that clearly and continue with available checks.

## 12. Output expected from the agent

At the end, provide:

1. summary of what was built;
2. files changed;
3. commands run and results;
4. screenshots or preview instructions if available;
5. remaining risks or polish items;
6. final submission checklist status.

## Learned User Preferences

- Prioritize the runnable application over Contra/README/video and other external submission artifacts until the app is considered 100% complete.
- Use subagent-driven development for major completion work: one implementer subagent per task, then spec compliance review, then code quality review (in that order).
- Prefer dispatching subagents to execute implementation plans instead of a single long agent run.
- For final quality assessment, audit the Lesson Loom app against `AGENTS.md` and the context pack; do not run `tls-final-excellence-orchestrator` (TLS-only).
- Only create commits or push to remote when the user explicitly asks; do not commit proactively.
- Run `/thermos` re-audits only after `npm run verify` is green on the current commit.
- Prefer parallel remediation when resolving multi-item Thermo or audit finding lists.
- When doc-vs-code drift is identified, fix it in the repo (docs and/or code) rather than only reporting it.
- Near handoff, review and complete remaining items before commit/push; run final Thermo in a fresh session with a scoped prompt.
- Scope Thermo and ship-readiness audits to application code (`src/`, `e2e/`, `package.json`, CI workflows), not planning-pack archives or external submission media unless UI copy is affected.

## Learned Workspace Facts

- This workspace is the Lesson Loom Google Stitch / Contra prototype, not a TLS repository.
- Application completion is tracked in `docs/APPLICATION_COMPLETE.md`; Thermos audit remediation is tracked in `docs/THERMO_AUDIT_RESOLUTION.md`.
- Styles load via `src/styles/index.css` (tokens, base, layout, motion, components-shared, components-sections); orphan `sections.css` was removed; use `03_DESIGN.md` palette, not industrial orange/cyan.
- `npm run verify` is the release gate (build, lint, typecheck, smoke 3/3, e2e 53/53 excluding capture); CI runs the same script after Playwright browser install.
- Application state, GSAP weave, demo URL hydration, and `runJudgeDemo` live in `src/App.tsx` (~720 lines); `useLessonLoomFlow` was removed; `IndustrialButton` re-exports `Button`—preserve full judge-path UI (presenter mode, scenes menu, session spine, export zip) when merging or refactoring.
- Thermo ship-readiness re-audit: 2026-05-29 @ `476d80d` — verdict Ship with notes, 0 Must-fix, verify 53/53; recorded in `docs/THERMO_AUDIT_RESOLUTION.md`. Monolithic `App.tsx` remains an accepted Q2 deferral unless explicitly requested.
- Weave CTAs use `weave-lesson-hero`, `weave-lesson-panel`, and `weave-lesson-intake` (not a shared `weave-lesson` on one element).
- Export copy is `hasWoven`-gated; `handleExportCopy` shows Copied only on clipboard success. Demo zip via `fflate` stays download-enabled even pre-weave by design (`e2e/export-zip.spec.ts`).
- `e2e/helpers.ts` provides `weaveFromHero()` for specs that need hero weave before downstream steps; prefer it over duplicating hero-weave waits (Q11).
