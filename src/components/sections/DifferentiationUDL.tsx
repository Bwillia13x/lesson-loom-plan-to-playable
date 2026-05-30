import { differentiation, udlChecks, type SupportLane } from '../../data/lessonLoomData';
import { handleTabRovingKeyDown } from '../../utils/tabRoving';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type DifferentiationUDLProps = {
  activeLane: SupportLane;
  onLaneChange: (lane: SupportLane) => void;
};

const laneConfig: Record<
  SupportLane,
  { className: string; tone: 'cyan' | 'orange' | 'green' }
> = {
  support: { className: 'lane-tab--support', tone: 'cyan' },
  core: { className: 'lane-tab--core', tone: 'orange' },
  extend: { className: 'lane-tab--extend', tone: 'green' },
};

const UDL_LANE_PANEL_ID = 'udl-lane-panel';
const LANE_IDS = Object.keys(differentiation) as SupportLane[];

export function DifferentiationUDL({ activeLane, onLaneChange }: DifferentiationUDLProps) {
  const lane = differentiation[activeLane];

  return (
    <Section
      id="udl"
      workspace="teacher"
      eyebrow="Differentiation"
      title="Support every learner without rebuilding the lesson."
      lead="Switch between support, core, and extension moves while keeping the same learning goal."
    >
      <div
        className="lane-tabs"
        role="tablist"
        aria-label="Support lanes"
        onKeyDown={(event) =>
          handleTabRovingKeyDown(event, LANE_IDS, activeLane, onLaneChange)
        }
      >
        {LANE_IDS.map((key) => {
          const data = differentiation[key];
          const cfg = laneConfig[key];
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`udl-tab-${key}`}
              aria-selected={activeLane === key}
              aria-controls={UDL_LANE_PANEL_ID}
              tabIndex={activeLane === key ? 0 : -1}
              data-testid={`lane-${key}`}
              className={`lane-tab ${cfg.className} ${activeLane === key ? 'lane-tab--active' : ''}`}
              onClick={() => onLaneChange(key)}
            >
              <StatusPip label={data.label} tone={cfg.tone} />
              <div className="lane-tab__count">{data.students}</div>
              <div className="text-mono" style={{ fontSize: '0.62rem', color: 'var(--ll-muted)' }}>
                students
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="grid-2"
        role="tabpanel"
        id={UDL_LANE_PANEL_ID}
        aria-labelledby={`udl-tab-${activeLane}`}
      >
        <Panel bracket screws>
          <div className="meta-grid">
            <div className="meta-item">
              <div className="meta-item__label">Task variation</div>
              <div
                className="meta-item__value"
                data-testid={`udl-task-variation-${activeLane}`}
              >
                {lane.taskVariation}
              </div>
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
          <p style={{ fontSize: '0.88rem', color: 'var(--ll-graphite)', margin: '0 0 1rem' }}>
            UDL-informed checks help the lesson offer multiple ways to engage, understand, and respond.
          </p>
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
