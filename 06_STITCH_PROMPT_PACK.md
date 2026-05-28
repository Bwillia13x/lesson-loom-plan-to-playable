# Stitch Prompt Pack — Lesson Loom

## Purpose

Use these prompts inside Google Stitch to generate visual directions and screen references for the Lesson Loom prototype.

Recommended workflow:

1. Start broad with the master prompt.
2. Refine one screen at a time.
3. Export useful UI/code/design patterns.
4. Bring the best visual decisions into Cursor.

## Master Stitch prompt

```text
Create a premium web app interface called “Lesson Loom — Plan to Playable.”

Concept:
Lesson Loom turns a teacher-approved K–12 lesson plan into a beautiful interactive classroom lesson interface. The output includes a student-facing activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack.

Demo lesson:
Fraction Garden — Grade 5 equivalent fractions. Students learn that different fractions can represent the same amount. The student activity asks them to build three garden beds that look different but use the same amount of space.

Visual direction:
Warm ivory paper background, deep navy typography, graphite secondary text, soft sage/garden green, restrained lavender-blue accents, pale gold success accents, thin technical linework, quiet grid marks, woven signal-line motif, refined editorial spacing, tactile cards, premium but teacher-friendly.

Avoid:
Neon, robots, generic AI brains, childish primary colors, cluttered dashboards, cartoon overload, stock teacher/student imagery.

Hero:
Eyebrow: AI-native lesson interface studio
Headline: Turn lesson plans into interactive classroom apps.
Subcopy: Paste a trusted lesson plan. Lesson Loom creates a student activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack.
Primary button: Weave lesson
Secondary button: View student app

Main layout:
Create a one-page web prototype with these sections:
1. Hero with lesson plan card transforming into interactive Fraction Garden preview.
2. Lesson Intake panel showing the plain lesson plan.
3. Teaching Signal board with cards for learning goal, prior knowledge, vocabulary, misconception, visual metaphor, interaction model, assessment checkpoints, differentiation needs.
4. Student App Preview for Fraction Garden with fraction tiles and garden beds.
5. Teacher Console with timeline, prompts, misconceptions, and exit ticket.
6. Differentiation / UDL panel with Support, Core, Extend lanes.
7. Review & Safety panel emphasizing teacher review, no student data, accessibility, and printable fallback.
8. Export Pack with cards for Stitch prompt, DESIGN.md, teacher guide, printable worksheet, student activity spec, and implementation notes.

Make the interface feel like a serious creative classroom studio, not a chatbot.
```

## Screen prompt — Hero

```text
Refine only the hero section for Lesson Loom.

Make it cinematic and premium. Show a plain lesson plan card on the left transforming through a soft woven signal line into a rich Fraction Garden student activity preview on the right. The activity preview should show garden beds, fraction tiles, progress pips, and a reflection card.

Use warm ivory, deep navy, sage green, lavender-blue, and pale gold. Keep the design calm, premium, and educational. Avoid childish colors or generic SaaS gradients.
```

## Screen prompt — Lesson Intake

```text
Create a polished Lesson Intake screen for Lesson Loom.

It should feel like a teacher-owned planning document, not a chatbot. Include fields for Grade, Subject, Time, Learning Goal, Materials, Class Context, and the plain lesson plan text. Add a button labeled “Weave lesson.” Use paper-like cards, thin borders, soft shadows, and refined spacing.
```

## Screen prompt — Teaching Signal Board

```text
Create the Teaching Signal screen.

Show how Lesson Loom extracts instructional structure from the lesson plan. Use cards for Learning Goal, Prior Knowledge, Vocabulary, Common Misconception, Visual Metaphor, Interaction Model, Assessment Checkpoints, and Differentiation Needs.

Each card should include a small “source phrase” chip from the original plan. The screen should look like a calm instructional design board with a woven path connecting the cards.
```

## Screen prompt — Student App Preview

```text
Create the Student App Preview for Fraction Garden.

This is the visual centerpiece. Students are asked to build three garden beds that look different but use the same amount of space. Show tactile fraction tiles, garden-bed containers, clear fraction labels, a hint button, progress pips, and a short reflection prompt.

Make it playful but premium, suitable for Grade 5 without looking childish.
```

## Screen prompt — Teacher Console

```text
Create the Teacher Console for Fraction Garden.

Include a lesson timeline with warm-up, guided model, partner challenge, share-out, and exit ticket. Include teacher prompts, misconception notes, materials, and a no-tech fallback. The design should feel practical and trustworthy.
```

## Screen prompt — Differentiation / UDL

```text
Create the Differentiation and UDL panel.

Show three lanes: Support, Core, Extend. Add a UDL checklist with Engagement, Representation, and Action & Expression. The design should feel inclusive, non-stigmatizing, and easy for a teacher to scan.
```

## Screen prompt — Review & Safety

```text
Create a Review & Safety panel for Lesson Loom.

Show trustworthy checks: Teacher review required, curriculum alignment draft only, no student data required, printable fallback included, accessibility pass, human approval before classroom use.

The tone should be calm and responsible, not scary.
```

## Screen prompt — Export Pack

```text
Create an Export Pack screen for Lesson Loom.

Show beautiful artifact cards labeled: Stitch Prompt, DESIGN.md, Teacher Guide, Printable Worksheet, Student Activity Spec, Implementation Notes.

Make the export pack feel like a build passport for the lesson interface: a compact set of files that can travel from Stitch into an IDE and back to classroom review.
```

## Screen prompt — Mobile

```text
Create a mobile version of Lesson Loom.

Stack the flow vertically: Hero, Lesson Intake, Teaching Signal, Student App, Teacher Console, Differentiation, Review & Safety, Export Pack. Keep the visual system intact but make controls thumb-friendly and cards easy to scan.
```

## Iteration prompts

### More premium

```text
Make the interface feel more premium and editorial. Increase whitespace, refine typography, simplify decorative elements, and make the cards feel more like warm paper than generic SaaS panels.
```

### More classroom-useful

```text
Make the interface feel more useful to a real teacher. Increase clarity of timing, prompts, assessment checkpoints, and printable fallback. Keep the design beautiful but practical.
```

### More Stitch-native

```text
Make the design better demonstrate the Stitch workflow. Add a subtle process trace showing plain plan → prompt → screen generation → interactive prototype → export pack.
```

### Less childish

```text
Make the design less childish and more premium. Keep the garden/fraction metaphor, but use restrained colors, refined geometry, and mature typography.
```

### More interactive

```text
Add visual affordances for interactivity: selectable fraction tiles, hoverable garden beds, progress pips, hint button, and teacher/student mode switch. Keep it clean.
```
