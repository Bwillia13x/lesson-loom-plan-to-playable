import { weaveSteps } from '../../data/lessonLoomData';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type LessonWeaveProps = {
  hasWoven: boolean;
  activeWeaveStep: number;
  onWeave: () => void;
};

export function LessonWeave({ hasWoven, activeWeaveStep, onWeave }: LessonWeaveProps) {
  return (
    <Section
      id="weave"
      eyebrow="Lesson weave"
      title="The lesson becomes a learning interface"
      lead="Lesson Loom extracts the teaching signal, chooses a visual model, adds interaction, builds checkpoints, and prepares teacher-facing supports."
    >
      <Panel bracket screws className="weave-panel" title="Lesson Weave">
        <nav aria-label="Lesson weave progress">
          <ol className="weave-stepper">
            {weaveSteps.map((step, index) => {
              const isActive = hasWoven && index === activeWeaveStep;
              const isDone = hasWoven && index < activeWeaveStep;
              const isComplete = hasWoven && activeWeaveStep >= weaveSteps.length - 1;
              const stepComplete =
                isDone || (isComplete && index <= activeWeaveStep);
              const connectorLive =
                isDone || isActive || isComplete;

              const stepLabel = `Step ${index + 1} of ${weaveSteps.length}: ${step}${
                stepComplete ? ', complete' : isActive ? ', current' : ''
              }`;

              return (
                <li
                  key={step}
                  className="weave-stepper__item"
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={stepLabel}
                >
                  {index > 0 && (
                    <div
                      className={[
                        'weave-stepper__connector',
                        connectorLive ? 'weave-stepper__connector--live' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className={[
                      'weave-stepper__node',
                      isActive ? 'weave-stepper__node--active' : '',
                      stepComplete ? 'weave-stepper__node--done' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden="true"
                  >
                    {stepComplete ? (
                      <span className="weave-stepper__check" aria-hidden="true">
                        ✓
                      </span>
                    ) : (
                      <span className="weave-stepper__index">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={[
                      'weave-stepper__label',
                      isActive ? 'weave-stepper__label--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
          <div
            className="sr-only"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={weaveSteps.length}
            aria-valuenow={
              hasWoven
                ? Math.max(0, Math.min(activeWeaveStep + 1, weaveSteps.length))
                : 0
            }
            aria-valuetext={
              !hasWoven
                ? 'Weave not started'
                : activeWeaveStep >= weaveSteps.length - 1
                  ? 'Weave complete'
                  : activeWeaveStep < 0
                    ? 'Weaving in progress'
                    : `Step ${activeWeaveStep + 1} of ${weaveSteps.length}: ${weaveSteps[activeWeaveStep]}`
            }
          />
        </nav>

        <div className="flex-between mt-2">
          <StatusPip
            label={
              hasWoven
                ? activeWeaveStep >= weaveSteps.length - 1
                  ? 'Weave complete'
                  : 'Weaving…'
                : 'Ready to weave'
            }
            tone={hasWoven ? 'orange' : 'amber'}
            pulse={hasWoven && activeWeaveStep < weaveSteps.length - 1}
          />
          {!hasWoven && (
            <Button
              variant="primary"
              onClick={onWeave}
              data-testid="weave-lesson-panel"
            >
              Weave lesson
            </Button>
          )}
        </div>
      </Panel>
    </Section>
  );
}
