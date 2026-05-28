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
  styles.css
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

## Cursor Cloud specific instructions

This is a pure client-side Vite + React + TypeScript SPA with no backend, database, or external services.

### Services

| Service | Command | URL |
|---|---|---|
| Vite dev server | `npm run dev` | `http://127.0.0.1:5173` |

### Key commands

See `package.json` scripts. Quick reference:

- **Dev server:** `npm run dev`
- **Build (tsc + vite):** `npm run build`
- **Lint:** `npm run lint`
- **Smoke tests:** `npm run test:smoke` (requires Playwright Chromium; fast subset)
- **Full verify:** `npm run verify` (build + lint + full Playwright e2e suite)
- **Submission verify:** `npm run verify:submission` (verify + screenshot capture)
- **Capture screenshots:** `npm run capture:screenshots`

### Gotchas

- Playwright browsers must be installed separately: `npx playwright install --with-deps chromium`.
- No `.env` file, API keys, or secrets are needed; all data is hardcoded.
- The "Run judge demo" button in the top bar auto-plays the full prototype flow — useful for quick verification.
