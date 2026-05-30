import { teacherTimeline } from '../../data/lessonLoomData';
import { Section } from '../ui/Section';

export function ResponsivePreview() {
  return (
    <Section
      id="devices"
      eyebrow="Responsive"
      title="Mobile & tablet preview"
      lead="Teacher console on tablet; student activity on mobile — same lesson, adapted layout."
    >
      <div className="device-row">
        <div>
          <p className="text-mono" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            Tablet · Teacher console
          </p>
          <div className="device-frame device-frame--tablet">
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
                    style={
                      s.id === 'partner'
                        ? { background: 'var(--ll-gold-soft)', borderColor: 'var(--ll-gold)' }
                        : undefined
                    }
                  >
                    {s.label}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '0.75rem', color: 'var(--ll-muted)' }}>
                Partner challenge active · Printable backup ready
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-mono" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            Mobile · Student activity
          </p>
          <div className="device-frame device-frame--phone">
            <div className="device-frame__bar" aria-hidden="true">
              <span className="device-frame__dot" />
            </div>
            <div className="device-frame__content">
              <strong>Fraction Garden</strong>
              <p style={{ fontSize: '0.75rem', margin: '0.35rem 0' }}>
                Build three garden beds…
              </p>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
                {['1/2', '2/4', '3/6'].map((l) => (
                  <div
                    key={l}
                    style={{
                      flex: 1,
                      padding: '0.35rem',
                      background: 'var(--ll-sage-soft)',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--ll-font-mono)',
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {['1/2', '2/4', '3/6', '1/3'].map((t) => (
                  <span key={t} className="badge badge--orange">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
