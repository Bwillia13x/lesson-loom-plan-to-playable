import {
  sessionSpineSubline,
  type SupportLane,
  type TimelineId,
  type WorkspaceMode,
} from '../data/lessonLoomData';

type SpineStepId = 'plan' | 'signals' | 'lesson' | 'review' | 'export';

const SPINE_STEPS: { id: SpineStepId; label: string }[] = [
  { id: 'plan', label: 'Plan' },
  { id: 'signals', label: 'Signals' },
  { id: 'lesson', label: 'Lesson' },
  { id: 'review', label: 'Review' },
  { id: 'export', label: 'Export' },
];

type ClassroomSessionSpineProps = {
  visible: boolean;
  activeStepIndex: number;
  activeSupport: SupportLane;
  activeSegment: TimelineId;
  approved: boolean;
  workspaceMode: WorkspaceMode;
  onNavigate: (sectionId: string) => void;
};

export function ClassroomSessionSpine({
  visible,
  activeStepIndex,
  activeSupport,
  activeSegment,
  approved,
  workspaceMode,
  onNavigate,
}: ClassroomSessionSpineProps) {
  if (!visible) return null;

  const subline = sessionSpineSubline({
    activeSupport,
    activeSegment,
    approved,
    workspaceMode,
  });

  const sectionForStep = (stepId: SpineStepId): string => {
    if (stepId === 'plan') return 'intake';
    if (stepId === 'signals') return 'signals';
    if (stepId === 'lesson') {
      return workspaceMode === 'teacher' ? 'teacher' : 'student';
    }
    if (stepId === 'review') return 'review';
    return 'export';
  };

  return (
    <div
      className="session-spine"
      data-testid="session-spine"
      role="navigation"
      aria-label="Classroom session"
    >
      <ol className="session-spine__steps">
        {SPINE_STEPS.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              className={[
                'session-spine__pip',
                index === activeStepIndex ? 'session-spine__pip--active' : '',
                index < activeStepIndex ? 'session-spine__pip--done' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onNavigate(sectionForStep(step.id))}
              aria-current={index === activeStepIndex ? 'step' : undefined}
            >
              {step.label}
            </button>
          </li>
        ))}
      </ol>
      <p className="session-spine__subline">{subline}</p>
    </div>
  );
}
