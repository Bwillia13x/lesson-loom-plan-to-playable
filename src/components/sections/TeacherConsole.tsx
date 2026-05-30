import {
  misconceptionNotes,
  teacherPrompts,
  teacherTimeline,
  type TimelineId,
} from '../../data/lessonLoomData';
import { handleTabRovingKeyDown } from '../../utils/tabRoving';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type ClassMode = 'whole' | 'groups';

const TEACHER_SEGMENT_PANEL_ID = 'teacher-segment-panel';
const TIMELINE_IDS = teacherTimeline.map((segment) => segment.id);

type TeacherConsoleProps = {
  activeSegment: TimelineId;
  onSegmentChange: (id: TimelineId) => void;
  classMode: ClassMode;
  onClassModeChange: (mode: ClassMode) => void;
};

export function TeacherConsole({
  activeSegment,
  onSegmentChange,
  classMode,
  onClassModeChange,
}: TeacherConsoleProps) {
  const active = teacherTimeline.find((s) => s.id === activeSegment) ?? teacherTimeline[2];

  const timerDisplay = activeSegment === 'partner' ? '15:00' : active.time.replace(' min', ':00');

  return (
    <Section
      id="teacher"
      workspace="teacher"
      eyebrow="Teacher console"
      title="Teacher console"
      lead="Keep the flow, prompts, misconceptions, and exit ticket visible while students work."
    >
      <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
        <div className="mode-toggle" role="group" aria-label="Class mode">
          <button
            type="button"
            className={`mode-toggle__btn ${classMode === 'whole' ? 'mode-toggle__btn--active' : ''}`}
            onClick={() => onClassModeChange('whole')}
          >
            Whole Class
          </button>
          <button
            type="button"
            className={`mode-toggle__btn ${classMode === 'groups' ? 'mode-toggle__btn--active' : ''}`}
            onClick={() => onClassModeChange('groups')}
          >
            Small Groups
          </button>
        </div>
        <StatusPip label="Printable fallback" tone="green" />
      </div>

      <div className="console-grid">
        <Panel inset>
          <div className="timer-ring" aria-label={`Pacing timer ${timerDisplay}`}>
            <div style={{ textAlign: 'center' }}>
              <div className="timer-ring__value">{timerDisplay}</div>
              <div className="timer-ring__label">Pacing</div>
            </div>
          </div>
          <p className="text-mono mt-1" style={{ fontSize: '0.7rem', textAlign: 'center' }}>
            Status: On track · Total 45:00
          </p>
        </Panel>

        <div>
          <div
            className="timeline"
            role="tablist"
            aria-label="Lesson segments"
            onKeyDown={(event) =>
              handleTabRovingKeyDown(event, TIMELINE_IDS, activeSegment, onSegmentChange)
            }
          >
            {teacherTimeline.map((segment) => (
              <button
                key={segment.id}
                type="button"
                role="tab"
                id={`teacher-tab-${segment.id}`}
                aria-selected={activeSegment === segment.id}
                aria-controls={TEACHER_SEGMENT_PANEL_ID}
                tabIndex={activeSegment === segment.id ? 0 : -1}
                className={`timeline__segment ${activeSegment === segment.id ? 'timeline__segment--active' : ''}`}
                data-testid={`teacher-tab-${segment.id}`}
                onClick={() => onSegmentChange(segment.id)}
              >
                <div className="timeline__time">{segment.time}</div>
                <div className="timeline__label">{segment.label}</div>
                <div className="timeline__detail">{segment.detail}</div>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={TEACHER_SEGMENT_PANEL_ID}
            aria-labelledby={`teacher-tab-${activeSegment}`}
            className="mt-1"
          >
            <Panel title={`Active: ${active.label}`}>
              <p
                style={{ fontSize: '0.88rem' }}
                data-testid={`teacher-segment-${activeSegment}`}
              >
                {active.detail}
              </p>
            </Panel>
          </div>
        </div>
      </div>

      <div className="grid-2 mt-2">
        <Panel title="Misconception watch">
          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
            {misconceptionNotes.map((note) => (
              <li key={note.misconception} style={{ marginBottom: '0.65rem' }}>
                <strong>{note.misconception}</strong>
                <br />
                <span style={{ color: 'var(--ll-muted)' }}>{note.response}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Teacher notes">
          <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.85rem' }}>
            {teacherPrompts.map((prompt) => (
              <li key={prompt} style={{ marginBottom: '0.5rem' }}>
                {prompt}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}
