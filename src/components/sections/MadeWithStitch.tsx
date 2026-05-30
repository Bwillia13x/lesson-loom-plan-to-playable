import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type MadeWithStitchProps = {
  systemMapStep?: number;
};

const SYSTEM_MAP_STEPS = [
  'Plan',
  'Weave',
  'Classroom',
  'Review',
  'Export',
] as const;

export function MadeWithStitch({ systemMapStep = 0 }: MadeWithStitchProps) {
  return (
    <Section
      id="stitch"
      eyebrow="Process"
      title="Made with Stitch"
      lead="Lesson Loom starts with a lesson a teacher already trusts. Stitch turns that plan into a visual, interactive classroom interface while keeping teacher review, accessibility, privacy, and printable backup at the center."
    >
      <div
        className="system-map"
        aria-hidden="true"
        data-testid="system-map"
        data-active-step={systemMapStep}
      >
        {SYSTEM_MAP_STEPS.map((label, index) => (
          <div
            key={label}
            className={`system-map__node ${index <= systemMapStep ? 'system-map__node--active' : ''}`}
          >
            <span className="system-map__dot" />
            <span className="system-map__label">{label}</span>
          </div>
        ))}
      </div>

      <Panel bracket screws>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Plan → Playable workflow
            </h3>
            <ol style={{ fontSize: '0.88rem', color: 'var(--ll-graphite)', paddingLeft: '1.2rem' }}>
              <li>Paste teacher-approved lesson plan</li>
              <li>Extract teaching signal cards with source phrases</li>
              <li>Generate Fraction Garden student interface</li>
              <li>Attach teacher console, UDL lanes, and safety review</li>
              <li>Export Stitch prompt, DESIGN.md, guides, and printable fallback</li>
            </ol>
          </div>
          <div style={{ textAlign: 'right' }}>
            <StatusPip label="Stitch-native" tone="gold" pulse />
            <p className="text-mono mt-1" style={{ fontSize: '0.72rem', maxWidth: '28ch' }}>
              High-fidelity UI from natural-language lesson plan — teacher-reviewed draft only.
            </p>
          </div>
        </div>
      </Panel>
    </Section>
  );
}
