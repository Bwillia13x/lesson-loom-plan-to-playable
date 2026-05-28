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

export const exportPack = [
  {
    id: 'stitch-prompt',
    title: 'Stitch Prompt',
    filename: 'lesson-loom-stitch-prompt.md',
    ext: '.md',
    preview:
      'Create a Grade 5 equivalent fractions student app called Fraction Garden with garden beds, fraction tiles, and teacher console…',
  },
  {
    id: 'design-md',
    title: 'DESIGN.md',
    filename: 'DESIGN.md',
    ext: '.md',
    preview:
      ':root { --ll-bg: #faf8f4; --ll-orange: #e85d04; --ll-ink: #1c1c1c; } /* warm industrial classroom studio */',
  },
  {
    id: 'teacher-guide',
    title: 'Teacher Guide',
    filename: 'teacher-guide.md',
    ext: '.md',
    preview:
      '45-minute run of show: warm-up, guided demo, partner challenge, share-out, exit ticket. Misconception watch included.',
  },
  {
    id: 'student-activity',
    title: 'Student Activity',
    filename: 'student-activity-spec.md',
    ext: '.md',
    preview:
      'Tile selection rules, garden bed states, success feedback, reflection prompt.',
  },
  {
    id: 'printable',
    title: 'Printable Worksheet',
    filename: 'fraction-garden-printable.pdf',
    ext: '.pdf',
    preview:
      'Paper garden beds with 1/2, 2/4, 3/6 shading prompts and exit ticket stem.',
  },
  {
    id: 'implementation',
    title: 'Implementation Notes',
    filename: 'implementation-notes.md',
    ext: '.md',
    preview:
      'React prototype handoff: state model, component map, motion tokens, safe copy rules.',
  },
];

export type WorkspaceMode = 'student' | 'teacher';

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
] as const;
