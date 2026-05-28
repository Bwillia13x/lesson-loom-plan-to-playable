# Lesson Loom — Agent Context Pack

_Last updated: 2026-05-27_  
_Owner: Drew Williams / PrairieSignal_  
_Primary build environment: Cursor using Composer 2.5 as the main model_  
_Project type: high-fidelity interactive prototype for the Google Stitch Challenge on Contra_

## What this pack is

This folder is the full build context for **Lesson Loom — Plan to Playable**.

Lesson Loom is a contest prototype that shows how Google Stitch-style UI generation can turn a teacher-approved lesson plan into a visually rich, interactive classroom lesson interface.

The prototype should feel like a finished product vision, not a generic hackathon demo.


## v2 review note

This version adds stronger execution control for Composer: component architecture, exact app state, interaction/motion rules, reusable copy, and red-team guardrails. The goal is to reduce ambiguity and prevent the build from drifting into a generic landing page or oversized SaaS platform.

## Final product thesis

> Teachers do not need another blank AI prompt box. They need a way to turn trusted lesson plans into rich classroom experiences.

## One-line product description

> Lesson Loom turns a teacher-approved lesson plan into a student activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack.

## Primary demo

Use one polished demo lesson:

**Fraction Garden — Grade 5 equivalent fractions**

A teacher pastes a plain lesson plan. Lesson Loom extracts the teaching signal and creates an interactive student activity where students build garden beds using different but equivalent fractions.

## Product promise

- The teacher stays in control.
- The lesson plan is the source of truth.
- The output is a classroom-ready draft, not official curriculum.
- No student accounts, names, grades, or personal data are required.
- The experience includes a printable/no-tech fallback.
- The demo visibly uses Stitch-like design generation logic: from natural-language plan to high-fidelity UI.

## Read order for the agent

Read these files in order before editing code:

1. `14_BUILD_EXECUTION_BRIEF.md` — fast build brief and guardrails.
2. `00_README.md` — package overview.
3. `01_PRODUCT_SPECSHEET.md` — product and user journey.
4. `02_AGENTS.md` — agent behavior and non-negotiables.
5. `03_DESIGN.md` / root `DESIGN.md` — visual system.
6. `15_COMPONENT_ARCHITECTURE.md` — component boundaries, props, and state.
7. `16_INTERACTION_AND_MOTION_SPEC.md` — interaction rules and animation behavior.
8. `17_COPY_DECK.md` — ready-to-use UI copy.
9. `05_IMPLEMENTATION_PLAN_CURSOR_COMPOSER.md` — build plan.
10. `07_CONTENT_MODEL_AND_SAMPLE_DATA.md` — sample data.
11. `08_QA_ACCEPTANCE_CHECKLIST.md` — definition of done.
12. `09_PRIVACY_CLAIM_SAFETY.md` — education/privacy claim guardrails.
13. `10_SUBMISSION_AND_DEMO_PACKAGE.md` — submission assets.
14. `11_COMPOSER_MASTER_PROMPT.md` — master prompt to execute.
15. `18_RED_TEAM_REVIEW.md` — risks and cuts.
16. `12_PROJECT_MANIFEST.json` — machine-readable package manifest.
17. `13_REFERENCES_AND_SOURCE_NOTES.md` — source assumptions.
18. `19_PACKAGE_REVIEW_CHANGELOG.md` — v2 review notes.

Keep the root-level `AGENTS.md` and `DESIGN.md` in the project root if Cursor/Composer uses them as automatic context.

## Build target

Create a beautiful, responsive, single-page interactive prototype.

Recommended stack:

- React
- TypeScript
- Vite
- CSS modules or plain CSS with CSS variables
- Framer Motion only if already available or quick to add
- No backend
- No authentication
- No database
- No real AI calls
- Deterministic sample data

## Main screens / sections

1. Landing hero
2. Lesson input panel
3. Teaching signal extraction board
4. Student App Preview: Fraction Garden
5. Teacher Console
6. Differentiation / UDL supports
7. Review & Safety layer
8. Export Pack
9. Made with Stitch / process case section

## Signature interaction

**Lesson Weave**

When the user clicks **Weave lesson**, a soft woven signal line animates through these stages:

`Objective → Visual model → Interaction → Checkpoint → Differentiation → Teacher guide → Student app`

Each stage should activate corresponding UI cards.

## Non-negotiable constraints

- Do not claim Lesson Loom generates official curriculum.
- Do not claim the product replaces teachers.
- Do not collect or simulate student personal information.
- Do not create a grading automation workflow.
- Do not add auth, backend, database, or LMS integration.
- Do not make this look like generic SaaS.
- Keep the demo focused on one polished lesson.
- Make the UI/UX the hero.

## Definition of done

The project is done when:

- The user can click through the full lesson transformation flow.
- The Fraction Garden student activity feels interactive.
- Teacher Mode and Student Mode are visually distinct but coherent.
- Export Pack cards are present and believable.
- The product narrative is clear in under 30 seconds.
- Mobile layout works.
- Accessibility basics pass.
- Reduced-motion users are respected.
- Claims are safe and honest.
- The experience feels premium enough for a design challenge submission.
