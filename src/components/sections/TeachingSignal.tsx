import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { teachingSignals } from '../../data/lessonLoomData';
import { runWithMotion } from '../../motion/gsapReducedMotion';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type TeachingSignalProps = {
  hasWoven: boolean;
  activeWeaveStep: number;
  onWeave: () => void;
  reducedMotion?: boolean;
};

export function TeachingSignal({
  hasWoven,
  activeWeaveStep,
  onWeave,
  reducedMotion = false,
}: TeachingSignalProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!hasWoven || !grid) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.signal-card', grid);

      runWithMotion(
        reducedMotion,
        () => {
          gsap.from(cards, {
            y: 12,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: 'power2.out',
          });
        },
        () => {
          gsap.set(cards, { y: 0, autoAlpha: 1 });
        },
      );
    }, grid);

    return () => ctx.revert();
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
            className={[
              'signal-card',
              hasWoven ? 'signal-card--revealed' : '',
              hasWoven && index > activeWeaveStep ? 'signal-card--dim' : '',
            ]
              .filter(Boolean)
              .join(' ')}
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
