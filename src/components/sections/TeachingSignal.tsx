import { teachingSignals } from '../../data/lessonLoomData';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type TeachingSignalProps = {
  hasWoven: boolean;
  activeWeaveStep: number;
  onWeave: () => void;
};

export function TeachingSignal({ hasWoven, activeWeaveStep, onWeave }: TeachingSignalProps) {
  return (
    <Section
      id="signals"
      eyebrow="Teaching signal"
      title="Teaching signal extracted from the plan."
      lead="Each card traces back to a phrase in the original lesson. The output stays grounded in the teacher’s intent."
    >
      {!hasWoven ? (
        <Panel inset className="signal-placeholder mt-1">
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.75rem' }}>
            Extract the teaching signal from your lesson plan to reveal grounded cards.
          </p>
          <Button variant="primary" onClick={onWeave}>
            Weave lesson to unlock
          </Button>
        </Panel>
      ) : (
      <div className="signal-grid">
        {teachingSignals.map((card, index) => {
          const isDimmed = index > activeWeaveStep;
          return (
          <article
            key={card.id}
            className={[
              'signal-card',
              'signal-card--revealed',
              isDimmed ? 'signal-card--dim' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className="flex-between">
              <span className="signal-card__label">{card.label}</span>
              {!isDimmed && (
                <StatusPip
                  label="Live"
                  tone={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'amber' : 'green'}
                />
              )}
            </div>
            <p className="signal-card__value">{card.value}</p>
            <span className="badge badge--source">
              <span className="signal-card__source-label">Source phrase</span>
              <span className="signal-card__source-value">{card.source}</span>
            </span>
          </article>
        );
        })}
      </div>
      )}
    </Section>
  );
}
