# Privacy, Claims, and Safety Guardrails — Lesson Loom

## Purpose

Lesson Loom is a K–12 education prototype. The concept must be ambitious but careful.

This document defines what the product can and cannot claim.

## Core safety principle

> Lesson Loom creates classroom-ready drafts for teacher review. It does not replace teacher judgment, official curriculum processes, privacy review, or school authority approval.

## Allowed claims

Use:

- teacher-reviewed draft;
- curriculum-aligned draft;
- interactive lesson interface;
- student-facing activity;
- teacher console;
- differentiation supports;
- assessment checkpoints;
- printable fallback;
- no student data required for this demo;
- human approval before classroom use;
- designed with accessibility and UDL considerations.

## Avoided claims

Do not use:

- official curriculum generator;
- district-approved;
- fully compliant;
- automatically personalized to each student;
- replaces lesson planning;
- replaces the teacher;
- grades students automatically;
- improves learning outcomes;
- proven effective;
- production-ready school platform.

## Student data rule

The contest demo should require **zero student personal information**.

Do not include fields for:

- student name;
- student ID;
- age;
- diagnosis;
- disability;
- grades;
- behaviour;
- parent contact;
- school account;
- login credentials.

Use generic classroom context only:

```text
Mixed readiness. Some students need visual scaffolds; others are ready for extension.
```

## Privacy posture

Show these in the UI:

- No student accounts required.
- No student names required.
- Printable fallback included.
- Teacher review required.
- Draft alignment only.

## UDL posture

Use UDL as design inspiration, not as a compliance claim.

Phrase:

> Includes UDL-informed options for engagement, representation, and action/expression.

Do not claim:

> UDL certified.

## Curriculum posture

For contest demo:

- Use a generic Grade 5 equivalent fractions objective.
- Do not claim exact official Alberta outcome alignment unless manually verified.
- If referencing curriculum, say “teacher-verifiable alignment draft.”

## Review & Safety panel copy

Recommended UI copy:

```text
Review & Safety

Lesson Loom creates a classroom-ready draft, not an official curriculum decision. Teachers review the lesson, verify alignment, and choose what to use.

Checks included:
- Teacher review required
- Curriculum alignment draft only
- No student data required
- Printable fallback included
- Accessibility pass included
- No automated grading or student profiling
```

## Risk table

| Risk | Mitigation in prototype |
|---|---|
| Overclaiming curriculum alignment | Use “draft” and “teacher review required.” |
| Student data privacy concern | No student accounts or personal information. |
| Teacher replacement perception | Position as interface builder for trusted lesson plans. |
| Accessibility weakness | Add UDL-informed supports and reduced-motion fallback. |
| Tech dependency | Include printable/no-tech fallback. |
| Generic AI lesson-plan perception | Focus on lesson plan → interactive interface, not plan generation. |

## Final copy check

Before submission, search the codebase for these words and remove or qualify them:

- official
- certified
- compliant
- proven
- automatic grading
- replaces
- guaranteed
- personalized to every student
- district-ready
- production-ready

Use safe alternatives:

- draft
- review
- supports
- prototype
- teacher-approved
- classroom-ready draft
- no student data required
