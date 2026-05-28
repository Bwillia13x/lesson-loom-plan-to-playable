# Component Architecture — Lesson Loom

## Purpose

This file removes implementation ambiguity for Composer. Keep the build componentized, but do not over-engineer.

## Recommended file tree

```txt
src/
  main.tsx
  App.tsx
  styles.css
  data/
    lessonLoomData.ts
  components/
    layout/
      Section.tsx
      UI.tsx
    sections/
      Hero.tsx
      LessonIntake.tsx
      LessonWeave.tsx
      TeachingSignalBoard.tsx
      StudentTeacherWorkspace.tsx
      DifferentiationPanel.tsx
      ReviewSafetyPanel.tsx
      ExportPack.tsx
      MadeWithStitch.tsx
    lesson/
      StudentAppPreview.tsx
      TeacherConsole.tsx
      FractionTile.tsx
      GardenBed.tsx
```

A flatter `src/components/` folder is acceptable if the project is small. Prefer clarity over folder ceremony.

## App state

`App.tsx` should own only the state needed for the prototype.

```ts
type Mode = 'student' | 'teacher';
type SupportLane = 'support' | 'core' | 'extend';

type AppState = {
  hasWoven: boolean;
  mode: Mode;
  supportLane: SupportLane;
  selectedTileIds: string[];
  copiedExportId: string | null;
};
```

Recommended handlers:

```ts
const handleWeave = () => setHasWoven(true);
const handleModeChange = (mode: Mode) => setMode(mode);
const handleSupportLaneChange = (lane: SupportLane) => setSupportLane(lane);
const handleExportCopy = (id: string) => { setCopiedExportId(id); window.setTimeout(...); };
```

## Component specs

### `Hero`

Props:

```ts
type HeroProps = {
  onWeave: () => void;
  onViewStudentApp: () => void;
  hasWoven: boolean;
};
```

Responsibilities:

- show product promise;
- show lesson-plan-to-student-app visual;
- expose primary CTA;
- include a compact trust line: “Teacher-reviewed draft. No student data required.”

### `LessonIntake`

Props:

```ts
type LessonIntakeProps = {
  lesson: Lesson;
  onWeave: () => void;
  hasWoven: boolean;
};
```

Responsibilities:

- make the input feel teacher-owned, not chatbot-like;
- show metadata: Grade, Subject, Duration, Topic;
- show plain lesson plan text;
- show “source of truth” language.

### `LessonWeave`

Props:

```ts
type LessonWeaveProps = {
  steps: string[];
  active: boolean;
};
```

Responsibilities:

- show Objective → Visual model → Interaction → Checkpoint → Differentiation → Teacher guide → Student app;
- animate gently when active;
- remain readable without animation.

### `TeachingSignalBoard`

Props:

```ts
type TeachingSignalBoardProps = {
  signals: TeachingSignal[];
  active: boolean;
};
```

Responsibilities:

- render cards;
- show source phrase chips;
- communicate extraction logic;
- no fake AI loading wall.

### `StudentTeacherWorkspace`

Props:

```ts
type StudentTeacherWorkspaceProps = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  selectedTileIds: string[];
  onTileToggle: (id: string) => void;
};
```

Responsibilities:

- render mode toggle;
- show `StudentAppPreview` or `TeacherConsole`;
- make Student mode the default visual centerpiece.

### `StudentAppPreview`

Props:

```ts
type StudentAppPreviewProps = {
  activity: StudentActivity;
  tiles: FractionTileData[];
  selectedTileIds: string[];
  onTileToggle: (id: string) => void;
};
```

Responsibilities:

- show mission, hint, progress, fraction tiles, garden beds, reflection prompt;
- compute success when at least three selected tiles are equivalent to one half;
- visually reward correct selection.

Success logic:

```ts
const selected = tiles.filter(tile => selectedTileIds.includes(tile.id));
const hasEquivalentSet =
  selected.length >= 3 && selected.every(tile => Math.abs(tile.value - 0.5) < 0.01);
```

### `TeacherConsole`

Responsibilities:

- show lesson timeline;
- show teacher prompts;
- show misconception notes;
- show no-tech fallback;
- feel practical, not decorative.

### `DifferentiationPanel`

Props:

```ts
type DifferentiationPanelProps = {
  activeLane: SupportLane;
  onLaneChange: (lane: SupportLane) => void;
};
```

Responsibilities:

- Support/Core/Extend lanes;
- UDL checklist;
- inclusive, non-stigmatizing language.

### `ReviewSafetyPanel`

Responsibilities:

- visible trust layer;
- teacher review required;
- draft alignment only;
- no student data;
- printable fallback;
- no grading automation.

### `ExportPack`

Props:

```ts
type ExportPackProps = {
  items: ExportItem[];
  copiedExportId: string | null;
  onCopy: (id: string) => void;
};
```

Responsibilities:

- export cards;
- copy feedback;
- make Stitch/IDE handoff visible.

### `MadeWithStitch`

Responsibilities:

- show process trace: plan → prompt → screens → prototype → review/export;
- avoid pretending real live Stitch API integration exists;
- position Stitch as design workflow inspiration and artifact generation surface.

## Shared UI components

Keep simple:

- `Button`
- `Card`
- `Badge`
- `SectionHeader`
- `PillToggle`

Every interactive element should be a real `<button>` unless it is a link.
