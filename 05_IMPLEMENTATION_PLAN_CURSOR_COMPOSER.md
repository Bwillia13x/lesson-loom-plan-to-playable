# Implementation Plan — Cursor + Composer 2.5

## Goal

Build a polished single-page React prototype for **Lesson Loom — Plan to Playable**.

## Recommended technical stack

- React + TypeScript
- Vite
- CSS variables in `styles.css`
- Componentized sections
- Static data from `src/data/lessonLoomData.ts`
- No backend
- No auth
- No external APIs

## If starting from scratch

Use:

```bash
npm create vite@latest lesson-loom -- --template react-ts
cd lesson-loom
npm install
npm run dev
```

Optional:

```bash
npm install framer-motion lucide-react
```

Only install Framer Motion or icon libraries if they improve speed and do not create friction.

## File architecture

```txt
lesson-loom/
  README.md
  package.json
  index.html
  src/
    main.tsx
    App.tsx
    styles.css
    data/
      lessonLoomData.ts
    components/
      Hero.tsx
      LessonIntake.tsx
      LessonWeave.tsx
      TeachingSignalBoard.tsx
      StudentTeacherWorkspace.tsx
      StudentAppPreview.tsx
      TeacherConsole.tsx
      DifferentiationPanel.tsx
      ReviewSafetyPanel.tsx
      ExportPack.tsx
      MadeWithStitch.tsx
      UI.tsx
```

If working inside an existing repo, adapt structure without fighting it.

## Component responsibilities

### `App.tsx`

Owns app-level state:

```ts
type Mode = 'student' | 'teacher';
type SupportLane = 'support' | 'core' | 'extend';

const [hasWoven, setHasWoven] = useState(false);
const [mode, setMode] = useState<Mode>('student');
const [supportLane, setSupportLane] = useState<SupportLane>('core');
const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
const [copiedExportId, setCopiedExportId] = useState<string | null>(null);
```

### `Hero.tsx`

- Product title.
- CTA buttons.
- Hero visual.
- Calls `onWeave()`.

### `LessonIntake.tsx`

- Shows sample lesson plan.
- Looks like teacher-owned document.
- Includes metadata pills.

### `LessonWeave.tsx`

- Shows transformation path.
- Active states after user clicks Weave.
- Uses SVG or CSS line.

### `TeachingSignalBoard.tsx`

- Maps over `teachingSignals` from data file.
- Shows source phrase chips.
- Cards should animate/reveal if `hasWoven`.

### `StudentTeacherWorkspace.tsx`

- Wraps mode toggle.
- Renders `StudentAppPreview` or `TeacherConsole`.

### `StudentAppPreview.tsx`

- Implements Fraction Garden.
- Shows fraction tile board.
- Lets user select tiles.
- Shows hint/success state.

Minimum interaction:

- Click fraction tiles.
- If user selects equivalent set, show success.
- Otherwise show “Try comparing the total shaded space.”

### `TeacherConsole.tsx`

- Renders lesson timeline.
- Renders teacher prompts.
- Renders misconceptions and exit ticket.

### `DifferentiationPanel.tsx`

- Tabs/lane buttons: Support / Core / Extend.
- Shows UDL checks.

### `ReviewSafetyPanel.tsx`

- Shows safe-use checklist.
- Emphasizes no student data and teacher review.

### `ExportPack.tsx`

- Cards for Stitch prompt, DESIGN.md, teacher guide, printable worksheet, implementation notes.
- Copy simulation should update state and show “Copied”.

### `MadeWithStitch.tsx`

- Visual process story.
- Show original plan → Stitch prompt → screens → final prototype → review/export.

### `UI.tsx`

Optional shared UI components:

- `Button`
- `Card`
- `Badge`
- `SectionHeader`

## Data file shape

Create `src/data/lessonLoomData.ts`:

```ts
export const lesson = {
  title: 'Fraction Garden',
  grade: 'Grade 5',
  subject: 'Mathematics',
  duration: '45 minutes',
  topic: 'Equivalent fractions',
  learningGoal: 'Students will understand that different fractions can represent the same amount.',
  plainPlan: `...`,
};

export const teachingSignals = [
  {
    label: 'Learning goal',
    value: 'Represent equivalent fractions visually and explain why they are equal.',
    source: 'different fractions can represent the same amount',
  },
];
```

See `07_CONTENT_MODEL_AND_SAMPLE_DATA.md` for full content. See `15_COMPONENT_ARCHITECTURE.md` for exact prop/state boundaries and `16_INTERACTION_AND_MOTION_SPEC.md` for interaction behavior.

## Implementation sequence

### Pass 0 — read the control docs

- Read `14_BUILD_EXECUTION_BRIEF.md`.
- Read `15_COMPONENT_ARCHITECTURE.md`.
- Read `16_INTERACTION_AND_MOTION_SPEC.md`.
- Read `17_COPY_DECK.md`.
- Confirm whether this is a fresh Vite app or existing repo.

### Pass 1 — scaffold

- Create components.
- Add data file.
- Add global CSS variables.
- Render all sections statically.

### Pass 2 — state and interactions

- Wire **Weave lesson** button.
- Add active states to weave path and signal cards.
- Add mode toggle.
- Add support lane toggle.
- Add fraction tile selection.
- Add export copy feedback.

### Pass 3 — visual polish

- Improve hero composition.
- Add soft paper card styling.
- Add woven line motion.
- Add fraction garden visual detail.
- Improve spacing and mobile layout.

### Pass 4 — accessibility and QA

- Buttons, labels, focus states.
- Keyboard navigation.
- Reduced motion.
- Contrast.
- Mobile overflow.
- Build/test commands.

### Pass 5 — submission readiness

- Add meta title/description.
- Add README.
- Add screenshot-friendly top section.
- Add final submission copy in README or `submission.md`.

## Acceptance criteria

### Functional

- User can click **Weave lesson**.
- Teaching signal cards reveal or activate.
- User can toggle Teacher/Student mode.
- User can select fraction tiles.
- User can switch Support/Core/Extend.
- User can click export cards and see copied state.

### Visual

- Hero screenshot is strong.
- Student App Preview is the visual centerpiece.
- Teacher Console feels useful.
- Overall aesthetic is calm, premium, and not generic.

### Responsive

- Works at 1440px, 1024px, 768px, 390px.
- No horizontal scroll on mobile.
- Buttons remain usable.
- Fraction tiles wrap gracefully.

### Accessibility

- Semantic headings.
- Visible focus.
- Color contrast good.
- Interactive controls keyboard accessible.
- Reduced motion respected.

### Claim safety

- No official curriculum claim.
- No teacher replacement claim.
- No student data collection.
- Review & Safety layer visible.

## Commands to run

Run available commands:

```bash
npm install
npm run build
npm run lint
npm run typecheck
```

If scripts do not exist, report that.

## Composer 2.5 operating guidance

Composer 2.5 should work in passes. Do not attempt to complete all polish in one edit.

Recommended prompt sequence:

1. Scaffold app and components.
2. Add state and interactions.
3. Apply design system and visual polish.
4. Add accessibility/reduced motion.
5. Add submission/case-study section.
6. Final QA and cleanup.

Each pass should end with build/test results.
