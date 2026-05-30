import { lesson, lessonPlanText } from '../../data/lessonLoomData';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';
import { WeaveSignalLine } from '../WeaveSignalLine';

type HeroLandingProps = {
  hasWoven: boolean;
  reducedMotion?: boolean;
  onWeave: () => void;
  onViewDemo: () => void;
};

export function HeroLanding({
  hasWoven,
  reducedMotion = false,
  onWeave,
  onViewDemo,
}: HeroLandingProps) {
  return (
    <Section
      id="hero"
      deferRender={false}
      eyebrow="AI-native lesson interface studio"
      title="Turn lesson plans into interactive classroom apps."
      titleAs="h1"
      titleClassName="hero-headline"
      lead="Paste a trusted lesson plan. Lesson Loom creates a student activity, teacher console, differentiation supports, assessment checkpoints, printable fallback, and Stitch-ready export pack."
    >
      <div className="hero-cta-row flex-between gap-1" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" size="lg" onClick={onWeave} data-testid="weave-lesson-hero">
            Weave lesson
          </Button>
          <Button variant="secondary" size="lg" onClick={onViewDemo}>
            View student app
          </Button>
        </div>
      </div>
      <p className="hero-trust-line" style={{ marginTop: '-1.25rem', marginBottom: '2rem' }}>
        Teacher-reviewed draft. No student accounts or personal data required.
      </p>

      <div className={`hero-visual scanline ${hasWoven ? 'scanline--active' : ''}`}>
        <WeaveSignalLine active={hasWoven} reducedMotion={reducedMotion} />
        <Panel
          className="hero-plan"
          bracket
          screws
          title="Teacher Lesson Plan"
          headerRight={<StatusPip label="Source" tone="lavender" />}
        >
          <div className="meta-grid" style={{ marginBottom: '0.75rem' }}>
            <div className="meta-item">
              <div className="meta-item__label">Grade</div>
              <div className="meta-item__value">{lesson.grade}</div>
            </div>
            <div className="meta-item">
              <div className="meta-item__label">Subject</div>
              <div className="meta-item__value">{lesson.subject}</div>
            </div>
            <div className="meta-item">
              <div className="meta-item__label">Topic</div>
              <div className="meta-item__value">{lesson.topic}</div>
            </div>
          </div>
          <div className="lesson-plan-doc">{lessonPlanText.slice(0, 280)}…</div>
        </Panel>

        <Panel
          className="hero-preview"
          bracket
          screws
          title="Fraction Garden Preview"
          headerRight={
            <StatusPip
              label={hasWoven ? 'Woven' : 'Preview'}
              tone="sage"
              pulse={hasWoven}
            />
          }
        >
          <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {lesson.title} — build three garden beds with equivalent fractions.
          </p>
          <div className="garden-beds" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {['1/2', '2/4', '3/6'].map((label) => (
              <div key={label} className="garden-bed garden-bed--active">
                <div className="garden-bed__label">{label}</div>
                <div className="garden-bed__plots">
                  {Array.from({ length: label === '1/2' ? 2 : label === '2/4' ? 4 : 6 }).map(
                    (_, i, arr) => (
                      <div
                        key={i}
                        className={`garden-bed__plot ${
                          i < Math.ceil(arr.length / 2) ? 'garden-bed__plot--filled' : ''
                        }`}
                      />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-mono mt-1" style={{ fontSize: '0.7rem', color: 'var(--ll-muted)' }}>
            1/2 = 2/4 = 3/6 equivalent space
          </p>
        </Panel>
      </div>
    </Section>
  );
}
