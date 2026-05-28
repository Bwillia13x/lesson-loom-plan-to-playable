# 60–90 second walkthrough script

Read this aloud while screen-recording the live demo.

```text
This is Lesson Loom — Plan to Playable.

The idea is simple: teachers often already have the lesson plan. What they do not always have is the time or design support to turn that plan into a rich interactive classroom experience.

Here, we start with a plain Grade 5 math lesson on equivalent fractions.

When I click “Weave lesson,” Lesson Loom extracts the teaching signal: the learning goal, prior knowledge, vocabulary, likely misconception, visual metaphor, interaction model, assessment checkpoints, and differentiation needs.

The lesson becomes Fraction Garden: a student-facing activity where learners build garden beds that look different but use the same amount of space. They compare 1/2, 2/4, and 4/8 visually, use hints, and finish with a reflection.

The teacher console keeps the lesson practical: warm-up, guided model, partner challenge, share-out, exit ticket, misconception notes, and prompts.

The differentiation panel gives support, core, and extension options, with UDL-informed checks for engagement, representation, and action and expression.

Finally, the review layer keeps the teacher in control. This is a classroom-ready draft, not official curriculum. No student data is required, a printable fallback is included, and the export pack gives the Stitch prompt, DESIGN.md, teacher guide, worksheet, and implementation notes.

Lesson Loom is a prototype for a simple idea: AI design tools should not just generate apps for startups. They can help teachers turn trusted plans into beautiful, usable classroom experiences.
```

## Shareable demo URL

Query params sync demo state (no PII, short keys):

| Param | Values | Meaning |
|-------|--------|---------|
| `w` | `0` / `1` | Lesson fully woven (teaching signal + student app ready) |
| `mode` | `student` / `teacher` | Workspace toggle |
| `tiles` | comma-separated tile ids | Selected fraction tiles (e.g. `one-half,two-fourths,three-sixths`) |
| `approved` | `0` / `1` | Teacher review approved |
| `support` | `support` / `core` / `extend` | Differentiation lane |

Examples:

- `/?w=1#student` — woven lesson, scroll to student app
- `/?w=1&tiles=one-half,two-fourths,three-sixths&approved=1#export` — success + approval, jump to export

Footer **Demo presets**: Reset demo, Success state, Review approved. **Run judge demo** shows presenter captions at the bottom of the screen.
