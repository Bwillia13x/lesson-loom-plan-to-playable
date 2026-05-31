import { lesson } from '../../data/lessonLoomData';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { StatusPip } from '../ui/StatusPip';
import { WeaveSignalLine } from '../WeaveSignalLine';

type HeroLandingProps = {
  hasWoven: boolean;
  lessonPlanDraft: string;
  onWeave: () => void;
  onRunJudgeDemo: () => void;
  demoRunning: boolean;
};

function heroPlanPreview(draft: string): string {
  if (draft.length <= 280) return draft;
  return `${draft.slice(0, 280)}…`;
}

export function HeroLanding({
  hasWoven,
  lessonPlanDraft,
  onWeave,
  onRunJudgeDemo,
  demoRunning,
}: HeroLandingProps) {
  return (
    <section id="hero" className="ll-section" aria-labelledby="hero-title">
      <div className="ll-section__inner">
        <p className="ll-section__eyebrow hero-eyebrow">
          Lesson Loom · Plan to Playable · teacher-reviewed drafts
        </p>
        <h1 id="hero-title" className="hero-headline">
          Turn lesson plans into interactive classroom apps.
        </h1>
        <p className="ll-section__lead">
          Paste a trusted lesson plan. Lesson Loom creates a student activity, teacher
          console, differentiation supports, assessment checkpoints, printable fallback,
          and Stitch-ready export pack.
        </p>

        <div className="hero-actions">
          <div className="hero-actions__group">
            <Button
              variant="primary"
              size="lg"
              onClick={onWeave}
              data-testid="weave-lesson-hero"
            >
              Weave lesson
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => void onRunJudgeDemo()}
              disabled={demoRunning}
              data-testid="run-judge-demo-hero"
              aria-label={demoRunning ? 'Judge demo running' : 'Run judge demo'}
            >
              {demoRunning ? 'Running demo…' : 'Run judge demo'}
            </Button>
          </div>
          <p className="text-mono hero-trust-line">
            Teacher-reviewed draft. No student accounts or personal data required.
          </p>
        </div>

        <div className="hero-visual">
          <WeaveSignalLine active={hasWoven} />
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
            <div className="lesson-plan-doc">{heroPlanPreview(lessonPlanDraft)}</div>
          </Panel>

          <Panel
            className="hero-preview"
            bracket
            screws
            title="Fraction Garden Preview"
            headerRight={
              <StatusPip
                label={hasWoven ? 'Woven' : 'Preview'}
                tone="lavender"
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
