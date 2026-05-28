import type { WorkspaceMode } from '../../data/lessonLoomData';

type WorkspaceModeToggleProps = {
  mode: WorkspaceMode;
  onChange: (mode: WorkspaceMode) => void;
};

export function WorkspaceModeToggle({ mode, onChange }: WorkspaceModeToggleProps) {
  return (
    <div
      className="mode-toggle workspace-toggle"
      role="group"
      aria-label="Workspace view"
    >
      <button
        type="button"
        data-testid="workspace-student"
        className={`mode-toggle__btn ${mode === 'student' ? 'mode-toggle__btn--active' : ''}`}
        aria-pressed={mode === 'student'}
        onClick={() => onChange('student')}
      >
        Student view
      </button>
      <button
        type="button"
        data-testid="workspace-teacher"
        className={`mode-toggle__btn ${mode === 'teacher' ? 'mode-toggle__btn--active' : ''}`}
        aria-pressed={mode === 'teacher'}
        onClick={() => onChange('teacher')}
      >
        Teacher console
      </button>
    </div>
  );
}
