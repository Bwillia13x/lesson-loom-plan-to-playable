import {
  teacherTimeline,
  type DevicesSnapshot,
} from '../../data/lessonLoomData';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

const PLACEHOLDER_TILES = ['1/2', '2/4', '3/6'];

type ResponsivePreviewProps = {
  snapshot: DevicesSnapshot;
};

export function ResponsivePreview({ snapshot }: ResponsivePreviewProps) {
  const tileLabels =
    snapshot.selectedTileLabels.length > 0
      ? snapshot.selectedTileLabels
      : PLACEHOLDER_TILES;

  return (
    <Section
      id="devices"
      eyebrow="Responsive"
      title="Mobile & tablet preview"
      lead="Teacher console on tablet; student activity on mobile — same lesson, adapted layout."
    >
      <div className="flex-between" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div data-testid="devices-woven-pip">
          <StatusPip
            label={snapshot.woven ? 'Lesson woven · live session' : 'Pre-weave preview'}
            tone={snapshot.woven ? 'green' : 'amber'}
          />
        </div>
        <div data-testid="devices-session-pip">
          <StatusPip
            label={`${snapshot.workspaceMode === 'teacher' ? 'Teacher' : 'Student'} workspace · ${snapshot.activeSupport} lane`}
            tone="cyan"
          />
        </div>
      </div>

      <div className="device-row">
        <div>
          <p className="text-mono" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            Tablet · Teacher console
          </p>
          <div
            className={`device-frame device-frame--tablet ${snapshot.woven ? 'device-frame--live' : ''}`}
            data-testid="device-frame-tablet"
          >
            <div className="device-frame__bar" aria-hidden="true">
              <span className="device-frame__dot" />
              <span className="device-frame__dot" />
            </div>
            <div className="device-frame__content">
              <strong>Run of show</strong>
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {teacherTimeline.map((s) => (
                  <span
                    key={s.id}
                    className="badge"
                    data-testid={snapshot.activeSegment === s.id ? 'device-active-segment' : undefined}
                    style={
                      snapshot.activeSegment === s.id
                        ? { background: 'var(--ll-orange-soft)', borderColor: 'var(--ll-orange)' }
                        : undefined
                    }
                  >
                    {s.label}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '0.75rem', color: 'var(--ll-muted)' }}>
                {snapshot.activeSegment === 'partner'
                  ? 'Partner challenge active'
                  : `${teacherTimeline.find((t) => t.id === snapshot.activeSegment)?.label ?? 'Segment'} active`}
                {' · '}
                Printable backup ready
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-mono" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            Mobile · Student activity
          </p>
          <div
            className={`device-frame device-frame--phone ${snapshot.woven ? 'device-frame--live' : ''}`}
            data-testid="device-frame-phone"
          >
            <div className="device-frame__bar" aria-hidden="true">
              <span className="device-frame__dot" />
            </div>
            <div className="device-frame__content">
              <strong>Fraction Garden</strong>
              <p
                style={{ fontSize: '0.75rem', margin: '0.35rem 0' }}
                data-testid="device-student-lane"
              >
                {snapshot.activeSupport.charAt(0).toUpperCase() + snapshot.activeSupport.slice(1)} lane
                {' · '}
                Build three garden beds…
              </p>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
                {tileLabels.map((l) => (
                  <span key={l} className="badge" style={{ fontSize: '0.65rem' }}>
                    {l}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--ll-muted)' }}>
                {snapshot.woven ? 'Interactive tiles active' : 'Weave lesson to activate'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
