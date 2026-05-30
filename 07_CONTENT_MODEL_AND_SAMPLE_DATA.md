# Content Model and Sample Data — Lesson Loom

## Demo lesson

```ts
export const lesson = {
  title: 'Fraction Garden',
  grade: 'Grade 5',
  subject: 'Mathematics',
  duration: '45 minutes',
  topic: 'Equivalent fractions',
  learningGoal: 'Students will understand that different fractions can represent the same amount.',
  materials: ['Fraction strips or tiles', 'Grid paper', 'Pencils', 'Projector or classroom display'],
  classContext: 'Mixed readiness. Some students can compare simple fractions, but many still rely on numerator/denominator shortcuts.',
};
```

## Plain lesson plan text

```text
Grade 5 math lesson: equivalent fractions.

Students will learn that different fractions can represent the same amount. Begin with a quick warm-up comparing 1/2, 2/4, and 4/8 using visual models. Then model how fraction tiles can show the same whole divided in different ways.

Students will work with a partner to build three examples of equivalent fractions and explain how they know the amounts are equal. Include support for students who need visual scaffolds and an extension challenge for students who are ready to create their own example.

End with an exit ticket: “Two fractions can look different but be equal because…”
```

## Teaching signal cards

```ts
export const teachingSignals = [
  {
    id: 'goal',
    label: 'Learning goal',
    value: 'Represent equivalent fractions visually and explain why the values are equal.',
    source: 'different fractions can represent the same amount',
  },
  {
    id: 'prior',
    label: 'Prior knowledge',
    value: 'Students have seen basic fractions and can identify halves, quarters, and eighths.',
    source: 'comparing 1/2, 2/4, and 4/8',
  },
  {
    id: 'vocab',
    label: 'Vocabulary',
    value: 'Equivalent, whole, numerator, denominator, fraction tile, equal value.',
    source: 'fraction tiles can show the same whole',
  },
  {
    id: 'misconception',
    label: 'Common misconception',
    value: 'Students may think a larger denominator always means a larger amount.',
    source: 'different ways',
  },
  {
    id: 'metaphor',
    label: 'Visual metaphor',
    value: 'Garden beds divided into different numbers of equal plots.',
    source: 'visual models',
  },
  {
    id: 'interaction',
    label: 'Interaction model',
    value: 'Students select and compare tiles that cover the same amount of garden space.',
    source: 'work with a partner to build three examples',
  },
  {
    id: 'assessment',
    label: 'Assessment checkpoints',
    value: 'Warm-up comparison, partner explanation, and exit-ticket sentence stem.',
    source: 'End with an exit ticket',
  },
  {
    id: 'differentiation',
    label: 'Differentiation needs',
    value: 'Visual scaffolds for support; create-your-own challenge for extension.',
    source: 'support ... and an extension challenge',
  },
];
```

## Weave steps

```ts
export const weaveSteps = [
  'Objective',
  'Visual model',
  'Interaction',
  'Checkpoint',
  'Differentiation',
  'Teacher guide',
  'Student app',
];
```

## Student activity content

```ts
export const studentActivity = {
  title: 'Fraction Garden',
  mission: 'Build three garden beds that look different but use the same amount of space.',
  prompt: 'Choose fraction tiles that cover the same amount of garden space.',
  hint: 'Compare how much of the whole bed is shaded, not just the numbers.',
  success: 'Nice match. 1/2, 2/4, and 4/8 cover the same amount of the garden.',
  reflection: 'Two fractions can look different but be equal because…',
};
```

## Fraction tiles

```ts
export const fractionTiles = [
  { id: 'one-half', label: '1/2', value: 0.5, parts: 2, filled: 1 },
  { id: 'two-fourths', label: '2/4', value: 0.5, parts: 4, filled: 2 },
  { id: 'four-eighths', label: '4/8', value: 0.5, parts: 8, filled: 4 },
  { id: 'one-third', label: '1/3', value: 0.333, parts: 3, filled: 1 },
  { id: 'three-sixths', label: '3/6', value: 0.5, parts: 6, filled: 3 },
  { id: 'two-thirds', label: '2/3', value: 0.667, parts: 3, filled: 2 },
];
```

Equivalent success group:

```ts
const equivalentCanonicalIds = ['one-half', 'two-fourths', 'three-sixths'];
```

Alternative acceptable success if selected values all equal 0.5:

```ts
const selectedValues = selectedTiles.map(tile => tile.value);
const isEquivalent = selectedValues.length >= 3 && selectedValues.every(v => Math.abs(v - 0.5) < 0.01);
```

## Teacher console content

```ts
export const teacherTimeline = [
  {
    time: '0–5 min',
    label: 'Warm-up',
    detail: 'Ask students to compare 1/2, 2/4, and 4/8 using quick sketches.',
  },
  {
    time: '5–15 min',
    label: 'Guided model',
    detail: 'Model how different partitions can cover the same amount of one whole.',
  },
  {
    time: '15–30 min',
    label: 'Partner challenge',
    detail: 'Students build three equivalent garden beds and explain their reasoning.',
  },
  {
    time: '30–38 min',
    label: 'Share-out',
    detail: 'Invite pairs to compare different visual models and describe what stayed equal.',
  },
  {
    time: '38–45 min',
    label: 'Exit ticket',
    detail: 'Students complete: “Two fractions can look different but be equal because…”',
  },
];
```

## Teacher prompts

```ts
export const teacherPrompts = [
  'What stayed the same when the number of pieces changed?',
  'How can two fractions look different but cover the same amount?',
  'What would you say to someone who thinks 4/8 is bigger than 1/2 because 8 is bigger than 2?',
];
```

## Misconception notes

```ts
export const misconceptionNotes = [
  {
    misconception: 'Bigger denominator means bigger amount.',
    response: 'Return to the whole. Ask students to compare shaded area rather than denominator size.',
  },
  {
    misconception: 'Equivalent means the numbers look the same.',
    response: 'Use different partitions of the same garden bed to show equal value with different notation.',
  },
];
```

## Differentiation lanes

```ts
export const differentiation = {
  support: {
    label: 'Support',
    description: 'Use pre-divided garden beds and limit choices to halves, fourths, and eighths.',
    moves: [
      'Start with physical or visual fraction strips.',
      'Use color-coded equivalent sets.',
      'Prompt: “How much of the whole is shaded?”',
    ],
  },
  core: {
    label: 'Core',
    description: 'Students compare multiple equivalent fraction models and explain why they match.',
    moves: [
      'Build three matching garden beds.',
      'Write one sentence explaining the equivalence.',
      'Compare with a partner’s model.',
    ],
  },
  extend: {
    label: 'Extend',
    description: 'Students create their own equivalent set and design a rule for testing it.',
    moves: [
      'Create a new equivalent fraction trio.',
      'Explain how multiplying numerator and denominator preserves value.',
      'Challenge a partner to verify the model.',
    ],
  },
};
```

## UDL checks

```ts
export const udlChecks = [
  {
    label: 'Engagement',
    value: 'Choice, partner work, garden challenge, playful mission.',
  },
  {
    label: 'Representation',
    value: 'Visual tiles, fraction notation, teacher modeling, printable version.',
  },
  {
    label: 'Action & Expression',
    value: 'Students can show understanding by building, explaining, writing, and discussing.',
  },
];
```

## Review & Safety checks

```ts
export const safetyChecks = [
  'Teacher review required before classroom use',
  'Curriculum alignment is a draft for educator verification',
  'No student names, accounts, or personal data required',
  'Printable fallback included for low-tech classrooms',
  'Accessibility and reduced-motion checks included',
  'No automated grading or student profiling',
];
```

## Export pack

```ts
export const exportPack = [
  {
    id: 'stitch-prompt',
    title: 'Stitch Prompt',
    filename: 'lesson-loom-stitch-prompt.md',
    description: 'Screen-by-screen prompt pack for regenerating the lesson interface in Stitch.',
  },
  {
    id: 'design-md',
    title: 'DESIGN.md',
    filename: 'DESIGN.md',
    description: 'Portable design rules: palette, typography, components, motion, accessibility.',
  },
  {
    id: 'teacher-guide',
    title: 'Teacher Guide',
    filename: 'teacher-guide.md',
    description: 'Timing, prompts, misconceptions, differentiation, and exit ticket.',
  },
  {
    id: 'printable',
    title: 'Printable Worksheet',
    filename: 'fraction-garden-printable.md',
    description: 'No-tech backup version for paper or projected use.',
  },
  {
    id: 'student-spec',
    title: 'Student Activity Spec',
    filename: 'student-activity-spec.md',
    description: 'Interaction states, tile rules, feedback, and reflection prompt.',
  },
  {
    id: 'implementation',
    title: 'Implementation Notes',
    filename: 'implementation-notes.md',
    description: 'Developer handoff notes for building the interface in React.',
  },
];
```

## Hero copy

```text
AI-native lesson interface studio

Turn lesson plans into interactive classroom apps.

Paste a trusted lesson plan. Lesson Loom creates a student activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack.
```

## CTA labels

- Weave lesson
- View student app
- Open teacher console
- Copy export
- Review safety layer
- See Stitch process

## Submission copy

```text
Lesson Loom starts with a lesson a teacher already trusts. It uses Stitch to turn that plan into a visual, interactive classroom interface while keeping teacher review, accessibility, privacy, and printable backup at the center.
```
