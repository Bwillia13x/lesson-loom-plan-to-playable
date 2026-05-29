import {
  differentiation,
  udlChecks,
  type SupportLane,
  type WorkspaceMode,
} from '../../data/lessonLoomData';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type DifferentiationUDLProps = {
  activeLane: SupportLane;
  onLaneChange: (lane: SupportLane) => void;
  workspaceMode?: WorkspaceMode;
  surfaceHighlighted?: boolean;
};

const laneConfig: Record<
  SupportLane,
  { className: string; tone: 'cyan' | 'orange' | 'green' }
> = {
  support: { className: 'lane-tab--support', tone: 'cyan' },
  core: { className: 'lane-tab--core', tone: 'orange' },
  extend: { className: 'lane-tab--extend', tone: 'green' },
};

export function DifferentiationUDL({
  activeLane,
  onLaneChange,
  workspaceMode = 'teacher',
  surfaceHighlighted = false,
}: DifferentiationUDLProps) {
  const lane = differentiation[activeLane];

  return (
    <Section
      id="udl"
      workspace="teacher"
      className={surfaceHighlighted ? 'll-surface-highlight' : ''}
      eyebrow="Differentiation"
      title="Differentiation / UDL layer"
      lead="Three lanes keep the same learning goal while adjusting scaffolds and challenge."
    >
      {workspaceMode === 'student' && (
        <div style={{ marginBottom: '1rem' }} data-testid="udl-student-lane-preview">
          <StatusPip
            label={`Student app previewing ${lane.label} lane`}
            tone="cyan"
          />
        </div>
      )}
      <div className="lane-tabs" role="tablist" aria-label="Support lanes">
        {(Object.keys(differentiation) as SupportLane[]).map((key) => {
          const data = differentiation[key];
          const cfg = laneConfig[key];
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeLane === key}
              data-testid={`lane-${key}`}
              className={`lane-tab ${cfg.className} ${activeLane === key ? 'lane-tab--active' : ''}`}
              onClick={() => onLaneChange(key)}
            >
              <div style={{ fontWeight: 600 }}>{data.label}</div>
              <div className="lane-tab__count">{data.students}</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--ll-muted)' }}>
                students
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid-2">
        <Panel bracket screws>
          <div className="meta-grid">
            <div className="meta-item">
              <div className="meta-item__label">Task variation</div>
              <div className="meta-item__value">{lane.taskVariation}</div>
            </div>
            <div className="meta-item">
              <div className="meta-item__label">Scaffolds</div>
              <div className="meta-item__value">{lane.scaffolds}</div>
            </div>
          </div>
          <h3 style={{ fontSize: '0.95rem', marginTop: '1rem' }}>Teacher moves</h3>
          <ul style={{ fontSize: '0.85rem', paddingLeft: '1.1rem' }}>
            {lane.moves.map((move) => (
              <li key={move}>{move}</li>
            ))}
          </ul>
        </Panel>

        <Panel title="UDL checklist">
          {udlChecks.map((check) => (
            <div
              key={check.id}
              style={{
                marginBottom: '0.85rem',
                paddingBottom: '0.85rem',
                borderBottom: '1px solid var(--ll-line)',
              }}
            >
              <div className="flex-between">
                <strong style={{ fontSize: '0.88rem' }}>{check.label}</strong>
                <StatusPip
                  label={check.status === 'ready' ? 'Ready' : 'Review'}
                  tone={check.status === 'ready' ? 'green' : 'amber'}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ll-muted)', margin: '0.35rem 0 0' }}>
                {check.value}
              </p>
            </div>
          ))}
        </Panel>
      </div>
    </Section>
  );
}
