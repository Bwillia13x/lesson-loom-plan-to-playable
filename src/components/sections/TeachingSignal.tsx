import { useLayoutEffect, useRef } from 'react';
import { teachingSignals } from '../../data/lessonLoomData';
import { runGsapScoped } from '../../motion/runGsapScoped';
import { WEAVE_SIGNAL_REVEAL_DELAY_S } from '../../motion/weaveTiming';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type TeachingSignalProps = {
  hasWoven: boolean;
  onWeave: () => void;
  reducedMotion?: boolean;
};

export function TeachingSignal({
  hasWoven,
  onWeave,
  reducedMotion = false,
}: TeachingSignalProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!hasWoven || !grid) return;

    return runGsapScoped(
      grid,
      reducedMotion,
      (gsapApi) => {
        const cards = gsapApi.utils.toArray<HTMLElement>('.signal-card', grid);
        gsapApi.set(cards, { autoAlpha: 0, y: 12 });
        gsapApi.from(cards, {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          delay: WEAVE_SIGNAL_REVEAL_DELAY_S,
        });
      },
      (gsapApi) => {
        const cards = gsapApi.utils.toArray<HTMLElement>('.signal-card', grid);
        gsapApi.set(cards, { y: 0, autoAlpha: 1 });
      },
    );
  }, [hasWoven, reducedMotion]);

  return (
    <Section
      id="signals"
      eyebrow="Teaching signal"
      title="Teaching signal extracted from the plan"
      lead="Each card traces back to a phrase in the original lesson. The output stays grounded in the teacher's intent."
    >
      {!hasWoven && (
        <Panel inset className="mt-1" style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.75rem' }}>
            Extract the teaching signal from your lesson plan to reveal grounded cards.
          </p>
          <IndustrialButton variant="primary" onClick={onWeave}>
            Weave lesson to unlock
          </IndustrialButton>
        </Panel>
      )}

      <div ref={gridRef} className="signal-grid">
        {teachingSignals.map((card, index) => (
          <article
            key={card.id}
            className="signal-card"
            style={!hasWoven ? { opacity: 0.55 } : undefined}
          >
            <div className="flex-between">
              <span className="signal-card__label">{card.label}</span>
              {hasWoven && (
                <StatusPip
                  label="Live"
                  tone={index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'amber' : 'green'}
                />
              )}
            </div>
            <p className="signal-card__value">{card.value}</p>
            <span className="badge badge--source">
              Source: {card.source}
            </span>
          </article>
        ))}
      </div>
    </Section>
  );
}
