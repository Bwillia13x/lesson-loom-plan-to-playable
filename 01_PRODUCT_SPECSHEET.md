# Product Specsheet — Lesson Loom: Plan to Playable

## Product name

**Lesson Loom**

## Subtitle

**Plan to Playable**

## Category

AI-native lesson interface studio / high-fidelity education prototype.

## Contest framing

Lesson Loom is designed for the Google Stitch Challenge. The prototype should visibly demonstrate that Stitch-style AI design workflows can transform a plain teaching plan into rich, high-fidelity classroom interfaces.

The submission should emphasize:

- prompt-to-interface transformation;
- beautiful UI/UX;
- interaction design;
- responsible education design;
- exportable design/development artifacts.

## One-liner

> Lesson Loom turns a teacher-approved lesson plan into an interactive classroom app.

## Longer product description

Lesson Loom helps teachers and instructional designers turn static lesson plans into visually rich, interactive learning experiences. A teacher pastes a trusted lesson plan, then Lesson Loom extracts the teaching signal, proposes an interaction model, generates a student-facing activity, builds a teacher console, adds differentiation supports, and produces an export pack for review, printing, and further design work.

## Core thesis

Most education AI tools start with a blank prompt box. Teachers often already have the plan, objective, and classroom context. The missing layer is not “write a lesson for me”; it is “turn this lesson into something students can see, touch, explore, discuss, and reflect on.”

## Target user

Primary:

- K–12 classroom teachers
- Instructional designers
- Tutoring providers
- Education innovation teams

Secondary:

- Teaching and learning centres
- Curriculum support teams
- Teacher coaches
- Education workshop facilitators

## User pain

Teachers often have static lesson plans, PDFs, worksheets, and slide decks, but turning those into interactive digital learning experiences requires design time, technical confidence, and tooling fluency.

## Product wedge

Lesson Loom does **not** replace lesson planning. It upgrades trusted lesson plans into classroom-ready interfaces.

## Demo scenario

### Fraction Garden

- Subject: Math
- Grade: 5
- Topic: Equivalent fractions
- Lesson goal: Students understand that different fractions can represent the same amount.
- Student mission: Build three garden beds that look different but use the same amount of space.
- Interaction: select, compare, and arrange fraction tiles.
- Assessment: warm-up, midpoint check, exit ticket.
- Differentiation: support, core, extend.

## Main user journey

1. Teacher lands on Lesson Loom.
2. Teacher reads the promise: “Turn lesson plans into interactive classroom apps.”
3. Teacher views or edits the sample lesson plan.
4. Teacher clicks **Weave lesson**.
5. The interface extracts the teaching signal.
6. Lesson Loom shows a suggested visual metaphor: Fraction Garden.
7. Teacher toggles between Student Mode and Teacher Mode.
8. Student Mode shows an interactive fraction activity.
9. Teacher Mode shows pacing, prompts, misconceptions, and exit ticket.
10. Review & Safety panel shows teacher approval, no student data, accessibility, and printable fallback.
11. Export Pack offers Stitch prompt, DESIGN.md, teacher guide, printable worksheet, and implementation notes.

## MVP scope

Build only a high-fidelity interactive prototype. No real AI generation is required.

### Must have

- Responsive landing section.
- Lesson input card with sample lesson plan.
- Weave lesson interaction.
- Teaching signal extraction cards.
- Student app preview with interactive fraction tiles.
- Teacher console.
- Differentiation / UDL support panel.
- Review & Safety panel.
- Export Pack cards.
- Made-with-Stitch process section.

### Should have

- Smooth activation animation for Lesson Weave.
- Hover/focus states.
- Simple progress state.
- Copy-to-clipboard simulation for exports.
- Reduced-motion fallback.

### Could have

- Lesson mode switcher for additional sample subjects, disabled or preview-only.
- Confetti/success animation when equivalent fractions are selected.
- Small “source phrase” tags showing which phrase generated each signal card.

### Do not build

- Real AI backend.
- Real curriculum database.
- User accounts.
- Student profiles.
- LMS integration.
- Real grading.
- File uploads.
- Multi-lesson management.

## Primary screens and components

### 1. Hero

Purpose: explain concept immediately.

Content:

- Eyebrow: AI-native lesson interface studio
- Headline: Turn lesson plans into interactive classroom apps.
- Subcopy: Paste a trusted lesson plan. Lesson Loom creates a student activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack.
- Primary CTA: Weave lesson
- Secondary CTA: View student app

Visual:

- Left: plain lesson plan card.
- Right: rich Fraction Garden preview.
- Between: woven signal path.

### 2. Lesson Intake

Purpose: show the starting point.

Fields:

- Grade
- Subject
- Time
- Learning goal
- Materials
- Class context
- Lesson plan text

### 3. Teaching Signal Board

Purpose: show Lesson Loom understands instructional structure.

Cards:

- Learning goal
- Prior knowledge
- Key vocabulary
- Common misconception
- Visual metaphor
- Interaction model
- Assessment checkpoints
- Differentiation needs

Each card should include a small source phrase.

### 4. Student App Preview

Purpose: visual wow.

Title: Fraction Garden

Student mission:

> Build three garden beds that look different but use the same amount of space.

Features:

- Fraction tile board.
- Equivalent fraction challenge.
- Hint button.
- Progress pips.
- Reflection prompt.

### 5. Teacher Console

Purpose: show classroom usability.

Sections:

- 5-minute warm-up
- 10-minute guided model
- 15-minute partner challenge
- 5-minute share-out
- 5-minute exit ticket
- Misconception notes
- Teacher prompts

### 6. Differentiation / UDL

Purpose: show responsible instructional design.

Lanes:

- Support
- Core
- Extend

UDL checks:

- Engagement
- Representation
- Action & Expression

### 7. Review & Safety

Purpose: show trust.

Items:

- Teacher review required
- Curriculum alignment draft only
- No student PII required
- Printable fallback included
- Accessibility pass
- Human approval before classroom use

### 8. Export Pack

Purpose: integrate Build Passport concept quietly.

Cards:

- Stitch prompt
- DESIGN.md
- Teacher guide
- Printable worksheet
- Student activity spec
- Implementation notes

### 9. Made with Stitch

Purpose: contest alignment.

Show the transformation:

Plain plan → Stitch prompt → generated screens → final interactive prototype → review/export pack.

## Success criteria

The demo succeeds if a judge understands in 30 seconds:

- what Lesson Loom does;
- why Stitch is the right tool;
- what the teacher keeps control over;
- how the classroom experience changes;
- why this is not just another lesson-plan generator.

## Competition positioning

Use this in submission copy:

> Lesson Loom starts with a lesson a teacher already trusts. It uses Stitch to turn that plan into a visual, interactive classroom interface while keeping teacher review, accessibility, privacy, and printable backup at the center.
