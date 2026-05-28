import { lesson, lessonPlanText } from '../../data/lessonLoomData';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
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
    <section id="hero" className="ll-section" aria-labelledby="hero-title">
      <div className="ll-section__inner">
        <p className="ll-section__eyebrow">AI-native lesson interface studio</p>
        <h1 id="hero-title" className="hero-headline">
          Lesson Loom — Plan to Playable
        </h1>
        <p className="ll-section__lead" style={{ maxWidth: '58ch' }}>
          Turn lesson plans into interactive classroom apps. Paste a trusted lesson plan
          and Lesson Loom creates a student app, teacher console, differentiation supports,
          checkpoints, and printable fallback.
        </p>

        <div className="flex-between gap-1" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <IndustrialButton
              variant="primary"
              size="lg"
              onClick={onWeave}
              data-testid="weave-lesson"
            >
              Weave Lesson
            </IndustrialButton>
            <IndustrialButton variant="secondary" size="lg" onClick={onViewDemo}>
              View Demo
            </IndustrialButton>
          </div>
          <p className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--ll-muted)' }}>
            Teacher first. Always. You own the lesson.
          </p>
        </div>

        <div className={`hero-visual scanline ${hasWoven ? 'scanline--active' : ''}`}>
          <WeaveSignalLine active={hasWoven} reducedMotion={reducedMotion} />
          <Panel
            className="hero-plan"
            bracket
            screws
            title="Teacher Lesson Plan"
            headerRight={<StatusPip label="Source" tone="cyan" />}
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
                tone="orange"
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
      </div>
    </section>
  );
}
