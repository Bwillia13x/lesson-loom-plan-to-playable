import { weaveSteps } from '../../data/lessonLoomData';
import { IndustrialButton } from '../ui/IndustrialButton';
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
        <div className="weave-stepper" role="list" aria-label="Weave progress">
          {weaveSteps.map((step, index) => {
            const isActive = hasWoven && index === activeWeaveStep;
            const isDone = hasWoven && index < activeWeaveStep;
            const isComplete = hasWoven && activeWeaveStep >= weaveSteps.length - 1;

            return (
              <div key={step} className="weave-stepper__item" role="listitem">
                {index > 0 && (
                  <div
                    className={[
                      'weave-stepper__connector',
                      isDone || isActive || isComplete ? 'weave-stepper__connector--live' : '',
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
                    isDone || (isComplete && index <= activeWeaveStep)
                      ? 'weave-stepper__node--done'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="weave-stepper__index">{index + 1}</span>
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
              </div>
            );
          })}
        </div>

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
            <IndustrialButton
              variant="primary"
              onClick={onWeave}
              data-testid="weave-lesson"
            >
              Weave Lesson
            </IndustrialButton>
          )}
        </div>
      </Panel>
    </Section>
  );
}
