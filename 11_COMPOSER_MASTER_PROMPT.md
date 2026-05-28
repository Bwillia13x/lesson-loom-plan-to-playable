# Cursor Composer 2.5 Master Prompt — Lesson Loom Build

Paste this into Cursor Composer 2.5 after placing this context pack in the project root.

```text
You are working in Cursor as the primary implementation agent for Lesson Loom — Plan to Playable.

Read the full context pack before editing. Start with the control docs:
- 14_BUILD_EXECUTION_BRIEF.md
- 00_README.md
- 01_PRODUCT_SPECSHEET.md
- 02_AGENTS.md or root AGENTS.md
- 03_DESIGN.md or root DESIGN.md
- 15_COMPONENT_ARCHITECTURE.md
- 16_INTERACTION_AND_MOTION_SPEC.md
- 17_COPY_DECK.md
- 05_IMPLEMENTATION_PLAN_CURSOR_COMPOSER.md
- 07_CONTENT_MODEL_AND_SAMPLE_DATA.md
- 08_QA_ACCEPTANCE_CHECKLIST.md
- 09_PRIVACY_CLAIM_SAFETY.md
- 10_SUBMISSION_AND_DEMO_PACKAGE.md
- 18_RED_TEAM_REVIEW.md
- 12_PROJECT_MANIFEST.json
- 13_REFERENCES_AND_SOURCE_NOTES.md

Mission:
Build a polished, responsive, single-page interactive prototype for “Lesson Loom — Plan to Playable,” a Google Stitch Challenge submission.

Core product:
Lesson Loom turns a teacher-approved lesson plan into an interactive classroom app. The demo lesson is “Fraction Garden,” a Grade 5 equivalent fractions activity.

Build requirements:
1. Use React + TypeScript + Vite if starting fresh, or adapt to the current stack if one already exists.
2. No backend, no auth, no database, no real AI calls.
3. Use deterministic static data from the context pack.
4. Follow `15_COMPONENT_ARCHITECTURE.md` for component boundaries and app state.
5. Follow `16_INTERACTION_AND_MOTION_SPEC.md` for interaction details.
6. Use `17_COPY_DECK.md` for final UI copy.
7. Build these sections:
   - Hero
   - Lesson Intake
   - Lesson Weave transformation
   - Teaching Signal Board
   - Student App Preview / Fraction Garden
   - Teacher Console
   - Differentiation / UDL Panel
   - Review & Safety Panel
   - Export Pack
   - Made with Stitch / process section
8. Implement interactions:
   - Weave lesson button activates flow
   - Student/Teacher mode toggle
   - Fraction tile selection and success state
   - Support/Core/Extend lane toggle
   - Export copy feedback
   - Reduced-motion fallback
9. Follow DESIGN.md exactly for visual style: warm ivory, deep navy, sage, lavender-blue, pale gold, paper cards, woven path, premium classroom studio feel.
10. Follow the claim-safety guardrails: do not imply official curriculum generation, teacher replacement, student profiling, automated grading, or full compliance.
11. Keep code simple, componentized, accessible, and easy to review.

Work plan:
- First inspect the current project files.
- Then provide a concise implementation plan.
- Then implement in passes:
  1. Scaffold and data model.
  2. Core sections and layout.
  3. Interactions.
  4. Visual polish.
  5. Accessibility and reduced motion.
  6. Final QA and README/submission notes.

After implementation:
- Run available checks: npm install if needed, npm run build, lint/typecheck if available.
- Report files changed, commands run, remaining risks, and submission readiness.

Do not deploy or submit anything. Do not contact anyone. Do not add external services.
```

## Follow-up prompt: visual polish pass

```text
Perform a visual polish pass on Lesson Loom.

Focus only on UI/UX, responsive layout, motion, spacing, typography, card design, hover/focus states, and Fraction Garden visual quality.

Use the DESIGN.md system. Make the experience feel premium, warm, teacher-friendly, and competition-ready. Do not add backend scope or change the product thesis.

Run build after changes and summarize what improved.
```

## Follow-up prompt: interaction polish pass

```text
Perform an interaction polish pass on Lesson Loom.

Improve:
- Lesson Weave activation
- fraction tile selection feedback
- Student/Teacher mode transition
- Support/Core/Extend tabs
- Export Pack copy feedback
- reduced-motion behavior
- keyboard accessibility

Do not add new features. Keep the demo focused on Fraction Garden.

Run build and summarize findings.
```

## Follow-up prompt: claim-safety and submission pass

```text
Perform a final claim-safety and submission-readiness pass.

Review all copy against 09_PRIVACY_CLAIM_SAFETY.md.

Remove or qualify any claims that imply official curriculum generation, teacher replacement, full compliance, automated grading, student profiling, or proven outcomes.

Ensure the app includes a clear “Made with Stitch” process section and final submission-friendly copy.

Run build and provide the final checklist.
```
