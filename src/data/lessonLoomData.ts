export const lesson = {
  title: 'Fraction Garden',
  grade: 'Grade 5',
  subject: 'Mathematics',
  duration: '45 minutes',
  topic: 'Equivalent Fractions',
  learningGoal:
    'Students will understand that different fractions can represent the same amount.',
  materials: [
    'Fraction strips or tiles',
    'Grid paper',
    'Pencils',
    'Projector or classroom display',
  ],
  classContext:
    'Mixed readiness. Some students can compare simple fractions, but many still rely on numerator/denominator shortcuts.',
};

export const lessonPlanText = `Grade 5 math lesson: equivalent fractions.

Students will learn that different fractions can represent the same amount. Begin with a quick warm-up comparing 1/2, 2/4, and 4/8 using visual models. Then model how fraction tiles can show the same whole divided in different ways.

Students will work with a partner to build three examples of equivalent fractions and explain how they know the amounts are equal. Include support for students who need visual scaffolds and an extension challenge for students who are ready to create their own example.

End with an exit ticket: "Two fractions can look different but be equal because…"`;

export const teachingSignals = [
  {
    id: 'goal',
    label: 'Learning Goal',
    value:
      'Represent equivalent fractions visually and explain why the values are equal.',
    source: 'different fractions can represent the same amount',
  },
  {
    id: 'vocab',
    label: 'Vocabulary',
    value:
      'Equivalent, whole, numerator, denominator, fraction tile, equal value.',
    source: 'fraction tiles can show the same whole',
  },
  {
    id: 'prior',
    label: 'Prior Knowledge',
    value:
      'Students have seen basic fractions and can identify halves, quarters, and eighths.',
    source: 'comparing 1/2, 2/4, and 4/8',
  },
  {
    id: 'misconception',
    label: 'Common Misconceptions',
    value:
      'Students may think a larger denominator always means a larger amount.',
    source: 'different ways',
  },
  {
    id: 'metaphor',
    label: 'Visual Metaphor',
    value: 'Garden beds divided into different numbers of equal plots.',
    source: 'visual models',
  },
  {
    id: 'interaction',
    label: 'Interaction Type',
    value:
      'Students select and compare tiles that cover the same amount of garden space.',
    source: 'work with a partner to build three examples',
  },
  {
    id: 'assessment',
    label: 'Assessment Moments',
    value:
      'Warm-up comparison, partner explanation, and exit-ticket sentence stem.',
    source: 'End with an exit ticket',
  },
  {
    id: 'differentiation',
    label: 'Differentiation Needs',
    value:
      'Visual scaffolds for support; create-your-own challenge for extension.',
    source: 'support … and an extension challenge',
  },
] as const;

export const weaveSteps = [
  'Objective',
  'Visual Model',
  'Activity',
  'Checkpoint',
  'Differentiation',
  'Teacher Guide',
  'Student App',
] as const;

export const studentMissionSteps = [
  'Select tiles',
  'Check match',
  'Reflect',
] as const;

export const studentActivity = {
  title: 'Fraction Garden',
  mission:
    'Build three garden beds that look different but use the same amount of space.',
  prompt: 'Choose fraction tiles that cover the same amount of garden space.',
  hint: 'Compare how much of the whole bed is shaded, not just the numbers.',
  success:
    'Nice match. 1/2, 2/4, and 3/6 cover the same amount of the garden.',
  equation: '1/2 = 2/4 = 3/6',
  reflection: 'Two fractions can look different but be equal because…',
};

export type FractionTile = {
  id: string;
  label: string;
  value: number;
  parts: number;
  filled: number;
};

export const fractionTiles: FractionTile[] = [
  { id: 'one-half', label: '1/2', value: 0.5, parts: 2, filled: 1 },
  { id: 'two-fourths', label: '2/4', value: 0.5, parts: 4, filled: 2 },
  { id: 'four-eighths', label: '4/8', value: 0.5, parts: 8, filled: 4 },
  { id: 'one-third', label: '1/3', value: 0.333, parts: 3, filled: 1 },
  { id: 'three-sixths', label: '3/6', value: 0.5, parts: 6, filled: 3 },
  { id: 'two-thirds', label: '2/3', value: 0.667, parts: 3, filled: 2 },
];

/** Demo canonical trio shown in hero and success feedback */
export const equivalentCanonicalIds = ['one-half', 'two-fourths', 'three-sixths'];

/** @deprecated Use equivalentCanonicalIds */
export const equivalentHalfIds = equivalentCanonicalIds;

export const teacherTimeline = [
  {
    id: 'warmup',
    time: '5 min',
    label: 'Warm-up',
    detail:
      'Ask students to compare 1/2, 2/4, and 4/8 using quick sketches.',
  },
  {
    id: 'guided',
    time: '10 min',
    label: 'Guided Demo',
    detail:
      'Model how different partitions can cover the same amount of one whole.',
  },
  {
    id: 'partner',
    time: '15 min',
    label: 'Partner Challenge',
    detail:
      'Students build three equivalent garden beds and explain their reasoning.',
  },
  {
    id: 'share',
    time: '5 min',
    label: 'Share-out',
    detail:
      'Invite pairs to compare different visual models and describe what stayed equal.',
  },
  {
    id: 'exit',
    time: '5 min',
    label: 'Exit Ticket',
    detail:
      'Students complete: "Two fractions can look different but be equal because…"',
  },
] as const;

export type TimelineId = (typeof teacherTimeline)[number]['id'];

export type TeacherSegmentBody = {
  title: string;
  prompts: string[];
  watch: string;
};

export const teacherSegmentBodies: Record<TimelineId, TeacherSegmentBody> = {
  warmup: {
    title: 'Warm-up comparisons',
    prompts: [
      'Show 1/2, 2/4, and 4/8 side by side without solving yet.',
      'Ask: “What looks the same? What looks different?”',
    ],
    watch: 'Students who only compare numerators or denominators, not the whole.',
  },
  guided: {
    title: 'Guided modeling',
    prompts: [
      'Partition one whole in two ways on the board.',
      'Name the shaded amount, not just the fraction notation.',
    ],
    watch: 'Rushing to symbols before the whole is clear.',
  },
  partner: {
    title: 'Partner garden challenge',
    prompts: [
      'Pairs build three equivalent garden beds in the app.',
      'Coach language: “same space, different partitions.”',
    ],
    watch: 'Groups that select tiles without checking the whole.',
  },
  share: {
    title: 'Share-out',
    prompts: [
      'Invite two models that look different but cover equal space.',
      'Press for evidence in the garden beds, not labels alone.',
    ],
    watch: 'Students who describe steps but not why amounts match.',
  },
  exit: {
    title: 'Exit ticket',
    prompts: [
      'Stem: “Two fractions can look different but be equal because…”',
      'Collect sentence stems; review for precise language tomorrow.',
    ],
    watch: 'Incomplete explanations — note for re-teach, not auto-grade.',
  },
};

export type ClassMode = 'whole' | 'groups';

export const exportGateCopy = {
  pending:
    'Complete teacher review before classroom handoff. Exports remain preview drafts.',
  approved: 'Teacher reviewed this draft. Artifacts are ready for your workflow.',
} as const;

export const teacherSegmentClassOverrides: Partial<
  Record<ClassMode, Partial<Record<TimelineId, { watch?: string; prompts?: string[] }>>>
> = {
  groups: {
    partner: {
      watch:
        'Circulate pairs; listen for equal parts language, not just matching numbers.',
      prompts: [
        'Partner A models one bed; Partner B builds an equivalent with different denominators.',
        'Switch roles and justify why the beds show the same amount.',
      ],
    },
  },
};

export function getTeacherSegmentBody(
  segmentId: TimelineId,
  classMode: ClassMode = 'whole',
): TeacherSegmentBody {
  const base = teacherSegmentBodies[segmentId] ?? teacherSegmentBodies.partner;
  const override = teacherSegmentClassOverrides[classMode]?.[segmentId];
  if (!override) return base;
  return {
    ...base,
    watch: override.watch ?? base.watch,
    prompts: override.prompts ?? base.prompts,
  };
}

export const teacherPrompts = [
  'What stayed the same when the number of pieces changed?',
  'How can two fractions look different but cover the same amount?',
  'What would you say to someone who thinks 4/8 is bigger than 1/2 because 8 is bigger than 2?',
];

export const misconceptionNotes = [
  {
    misconception: 'Bigger denominator means bigger amount.',
    response:
      'Return to the whole. Ask students to compare shaded area rather than denominator size.',
  },
  {
    misconception: 'Equivalent means the numbers look the same.',
    response:
      'Use different partitions of the same garden bed to show equal value with different notation.',
  },
];

export type SupportLane = 'support' | 'core' | 'extend';

export const differentiation = {
  support: {
    label: 'Support',
    taskVariation: 'Pre-divided garden beds; halves, fourths, and eighths only.',
    scaffolds: 'Color-coded strips, guided shading prompts, partner check-ins.',
    students: 8,
    moves: [
      'Start with physical or visual fraction strips.',
      'Use color-coded equivalent sets.',
      'Prompt: "How much of the whole is shaded?"',
    ],
  },
  core: {
    label: 'Core',
    taskVariation: 'Compare multiple equivalent models and explain the match.',
    scaffolds: 'Mission card, hint button, fraction tile bank.',
    students: 12,
    moves: [
      'Build three matching garden beds.',
      'Write one sentence explaining the equivalence.',
      'Compare with a partner\'s model.',
    ],
  },
  extend: {
    label: 'Extend',
    taskVariation: 'Create a new equivalent set and design a verification rule.',
    scaffolds: 'Open tile bank, extension journal, peer challenge.',
    students: 4,
    moves: [
      'Create a new equivalent fraction trio.',
      'Explain how multiplying numerator and denominator preserves value.',
      'Challenge a partner to verify the model.',
    ],
  },
} as const;

export const udlChecks = [
  {
    id: 'engagement',
    label: 'Engagement',
    status: 'ready' as const,
    value: 'Choice, partner work, garden challenge, playful mission.',
  },
  {
    id: 'representation',
    label: 'Representation',
    status: 'review' as const,
    value: 'Visual tiles, fraction notation, teacher modeling, printable version.',
  },
  {
    id: 'action',
    label: 'Action / Expression',
    status: 'ready' as const,
    value:
      'Students can show understanding by building, explaining, writing, and discussing.',
  },
];

export const safetyCards = [
  {
    id: 'review',
    title: 'Teacher Review Required',
    status: 'required' as const,
    detail: 'Human approval before classroom use.',
  },
  {
    id: 'curriculum',
    title: 'Curriculum Alignment',
    status: 'review' as const,
    detail: 'Curriculum-aligned draft for educator verification — not official curriculum.',
  },
  {
    id: 'privacy',
    title: 'No Student Names',
    status: 'pass' as const,
    detail: 'No student accounts, names, or personal data required.',
  },
  {
    id: 'grading',
    title: 'No Automated Grading',
    status: 'pass' as const,
    detail: 'Teacher-reviewed draft only. No automated scoring or profiling.',
  },
  {
    id: 'a11y',
    title: 'Accessibility Pass',
    status: 'pass' as const,
    detail: 'Keyboard focus, contrast, and reduced-motion support included.',
  },
  {
    id: 'printable',
    title: 'Printable Fallback',
    status: 'ready' as const,
    detail: 'No-tech backup ready for paper or projected use.',
  },
];

export type ExportPackItem = {
  id: string;
  title: string;
  filename: string;
  ext: string;
  preview: string;
  body: string;
};

export const exportPack: ExportPackItem[] = [
  {
    id: 'stitch-prompt',
    title: 'Stitch Prompt',
    filename: 'lesson-loom-stitch-prompt.md',
    ext: '.md',
    preview:
      'Create a Grade 5 equivalent fractions student app called Fraction Garden with garden beds, fraction tiles, and teacher console…',
    body: `# Stitch Prompt — Fraction Garden

Create a Grade 5 equivalent-fractions **student app** called **Fraction Garden** with a calm, premium classroom aesthetic.

## Screens

1. **Garden mission** — Students select fraction tiles (1/2, 2/4, 3/6) on garden beds and tap **Check match** for equivalent-set feedback.
2. **Reflection** — Short text area: "Two fractions can look different but be equal because…"
3. **Teacher console** (toggle) — Timeline, misconception watch, approval gate, printable fallback note.

## Interaction rules

- Tiles are selectable buttons with clear focus states.
- Success when 1/2, 2/4, and 3/6 are selected together.
- No student accounts, names, or personal data.
- Include reduced-motion-friendly transitions.

## Copy tone

Teacher-reviewed draft. Curriculum-aligned draft. Human approval before classroom use.

## Export context

This prompt regenerates the interactive lesson interface from the trusted lesson plan — not official curriculum lookup.
`,
  },
  {
    id: 'design-md',
    title: 'DESIGN.md',
    filename: 'DESIGN.md',
    ext: '.md',
    preview:
      ':root { --ll-bg: #faf8f4; --ll-orange: #e85d04; --ll-ink: #1c1c1c; } /* warm industrial classroom studio */',
    body: `# DESIGN.md — Fraction Garden

Portable design rules for the Lesson Loom Fraction Garden prototype.

## Palette

\`\`\`css
:root {
  --ll-bg: #faf8f4;
  --ll-paper: #fffdf8;
  --ll-orange: #e85d04;
  --ll-ink: #1c1c1c;
  --ll-muted: #5c5c5c;
  --ll-line: rgba(28, 28, 28, 0.12);
}
\`\`\`

## Typography

- Display: refined serif for section titles
- UI: humanist sans for controls and lesson copy
- Mono: filenames, tokens, export previews

## Components

- Soft paper/glass cards with woven linework accents
- Industrial primary buttons; secondary ghost actions
- Status pips: amber preview, green when woven/approved

## Motion

- Soft activation glows on weave completion
- Card reveal on weave; hover lift restrained
- Respect \`prefers-reduced-motion\` — shorten timelines, skip decorative loops

## Accessibility

- Real \`<button>\` elements; visible focus rings
- Do not rely on color alone for fraction feedback
- Semantic heading order preserved across sections
`,
  },
  {
    id: 'teacher-guide',
    title: 'Teacher Guide',
    filename: 'teacher-guide.md',
    ext: '.md',
    preview:
      '45-minute run of show: warm-up, guided demo, partner challenge, share-out, exit ticket. Misconception watch included.',
    body: `# Teacher Guide — Equivalent Fractions (45 min)

**Grade 5 · Mathematics · Fraction Garden**

## Learning goal

Students represent equivalent fractions visually and explain why different-looking fractions can name the same amount.

## Run of show

| Segment | Time | Teacher move |
|--------|------|----------------|
| Warm-up | 8 min | Compare 1/2, 2/4, 4/8 with quick sketches |
| Guided demo | 10 min | Model fraction tiles on one garden bed |
| Partner work | 15 min | Build three equivalent examples; circulate |
| Share-out | 7 min | Two student explanations; press on "same whole" |
| Exit ticket | 5 min | Sentence stem below |

## Misconception watch

Students may think a **larger denominator always means a larger amount**. Ask: "Did the whole garden stay the same size?"

## Differentiation

- **Support:** Pre-divided beds, sentence stems, partner pairing
- **Core:** Standard tile challenge (1/2, 2/4, 3/6)
- **Extend:** Create a new equivalent set and justify

## Exit ticket stem

> Two fractions can look different but be equal because _________________________.

## Safety note

Teacher-reviewed draft for classroom use. Verify alignment with your district materials before teaching.
`,
  },
  {
    id: 'student-activity',
    title: 'Student Activity',
    filename: 'student-activity-spec.md',
    ext: '.md',
    preview:
      'Tile selection rules, garden bed states, success feedback, reflection prompt.',
    body: `# Student Activity Spec — Fraction Garden

## Mission flow

1. **Select tiles** — Tap fraction tiles on garden beds (1/2, 2/4, 3/6).
2. **Check match** — Submit selection; show equivalent-set success or retry hint.
3. **Reflect** — Optional short response; saved locally in prototype only (no upload).

## Tile rules

- Tiles toggle on/off; keyboard operable
- Canonical success set: \`one-half\`, \`two-fourths\`, \`three-sixths\`
- Success copy: "Equivalent? Yes!" with explicit fraction list

## Feedback

- Hint button reveals garden-bed coaching callout
- Do not auto-grade beyond the equivalence check — teacher reviews in console

## States (prototype)

\`\`\`txt
selectedTileIds: string[]
checkAttempted: boolean
checkSuccess: boolean
reflectionText: string (local UI only)
\`\`\`

## Privacy

No student names, accounts, or personal data required.
`,
  },
  {
    id: 'printable',
    title: 'Printable Worksheet',
    filename: 'fraction-garden-printable.md',
    ext: '.md',
    preview:
      'Printable worksheet spec: paper garden beds, shading prompts, exit ticket stem (no binary PDF in pack).',
    body: `# Printable Worksheet Spec — Fraction Garden

> **Note:** This export is a printable worksheet **spec** (Markdown). No PDF is bundled in the prototype zip. Use this outline to print or project a no-tech backup.

## Page 1 — Garden beds

Draw three garden beds. Shade:

1. **1/2** of Bed A
2. **2/4** of Bed B
3. **3/6** of Bed C

Label each with the fraction. Circle beds that show the **same amount**.

## Page 2 — Partner explain

With a partner, complete:

"We know the fractions are equivalent because the wholes are the same and _______________."

## Exit ticket

Two fractions can look different but be equal because _________________________.

## Materials

Fraction strips optional. Pencils. No devices required.

## Classroom use

Human approval before classroom use. Teacher verifies alignment with local curriculum.
`,
  },
  {
    id: 'implementation',
    title: 'Implementation Notes',
    filename: 'implementation-notes.md',
    ext: '.md',
    preview:
      'React prototype handoff: state model, component map, motion tokens, safe copy rules.',
    body: `# Implementation Notes — Lesson Loom Prototype

## Stack

- Vite + React + TypeScript (client-only SPA)
- GSAP for weave timeline (reduced-motion aware)
- \`fflate\` for client-side export zip

## State model

\`\`\`txt
hasWoven: boolean
activeMode: 'teacher' | 'student'
activeSupport: 'support' | 'core' | 'extend'
selectedTiles: string[]
copiedExportId: string | null
activeWeaveStep: number
\`\`\`

## Section map

Hero → Intake → Weave → Signals → Student App → Teacher Console → UDL → Review → Export → Devices → Made with Stitch

## Boundaries (do not implement in demo)

- No real AI calls, auth, backend, LMS, or student profiles
- No automated grading claims; teacher approval gate stays visible

## Safe language

Use: teacher-reviewed draft, curriculum-aligned draft, printable fallback, no student data required.

Avoid: district-approved, fully compliant, replaces teachers, official curriculum generator.

## Export pack

Download builds \`lesson-loom-fraction-garden.zip\` from \`exportPack\` bodies in \`lessonLoomData.ts\`.
`,
  },
  {
    id: 'workshop-checklist',
    title: 'Workshop Checklist',
    filename: 'workshop-checklist.md',
    ext: '.md',
    preview:
      'Facilitator checklist: review learning goal, misconception watch, UDL lanes, approval gate, printable fallback.',
    body: `# Workshop Checklist — From Static Lesson to Interactive Interface

Use this checklist when facilitating a PrairieSignal Edge–style lab session with Lesson Loom.

## Before the session

- [ ] Confirm the lesson plan is **teacher-provided** and curriculum-aligned for your context.
- [ ] Read the learning goal aloud; agree it matches your unit outcomes.
- [ ] Note materials and class context (readiness, time, devices).

## During the weave demo

- [ ] Run **Extract Teaching Signal** and verify source phrases trace back to the plan.
- [ ] Toggle **Student** vs **Teacher** modes; confirm the console shows timeline and misconception watch.
- [ ] Try **Support / Core / Extend** lanes; discuss which students each lane serves.

## Review gate (required)

- [ ] Complete the **Review & Safety** panel — human approval before classroom use.
- [ ] Confirm copy says **teacher-reviewed draft**, not district-approved or automated grading.
- [ ] Verify **no student data** is required in the prototype flow.

## Classroom readiness

- [ ] Download or copy the **export pack** (Stitch prompt, teacher guide, printable spec).
- [ ] Identify a **printable fallback** if devices are unavailable.
- [ ] Plan how students will explain equivalence (exit ticket stem).

## After the workshop

- [ ] Capture one takeaway for your team (workflow, UX, or policy question).
- [ ] Optional: contact PrairieSignal Labs with inquiry about pilot or custom lesson interface work.

> Internal prototype / public demo — not a production LMS or official curriculum tool.
`,
  },
];

export type WorkspaceMode = 'student' | 'teacher';

export type DevicesSnapshot = {
  woven: boolean;
  workspaceMode: WorkspaceMode;
  activeSupport: SupportLane;
  activeSegment: TimelineId;
  selectedTileLabels: string[];
  approved: boolean;
  classMode: ClassMode;
};

export const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'intake', label: 'Intake' },
  { id: 'weave', label: 'Weave' },
  { id: 'signals', label: 'Signals' },
  { id: 'student', label: 'Student App' },
  { id: 'teacher', label: 'Console' },
  { id: 'udl', label: 'UDL' },
  { id: 'review', label: 'Review' },
  { id: 'export', label: 'Export' },
  { id: 'devices', label: 'Devices' },
  { id: 'stitch', label: 'Stitch' },
  { id: 'labs', label: 'Labs' },
] as const;
