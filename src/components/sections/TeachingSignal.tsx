import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  teachingSignals,
  type SignalSurfaceLink,
  type SupportLane,
} from '../../data/lessonLoomData';
import { useMotion } from '../../motion/motionContext';
import { runGsapScoped } from '../../motion/runGsapScoped';
import { useScrollToSection } from '../../motion/useScrollToSection';
import { WEAVE_SIGNAL_REVEAL_DELAY_S } from '../../motion/weaveTiming';
import { useLessonLoomSession } from '../../context/useLessonLoomSession';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type TeachingSignalProps = {
  onWeave: () => void;
  onHighlightSource: (signalId: string, source: string) => void;
  onSurfaceLink: (target: SignalSurfaceLink, lane?: SupportLane) => void;
};

const LESSON_PLAN_TEXTAREA_ID = 'lesson-plan-draft';

export function TeachingSignal({
  onWeave,
  onHighlightSource,
  onSurfaceLink,
}: TeachingSignalProps) {
  const { hasWoven } = useLessonLoomSession();
  const { reduced } = useMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollToSection = useScrollToSection();
  const [sourceAnnouncement, setSourceAnnouncement] = useState('');

  const handleSourcePhrase = useCallback(
    (signalId: string, source: string) => {
      onHighlightSource(signalId, source);
      scrollToSection('intake');
      document
        .getElementById(LESSON_PLAN_TEXTAREA_ID)
        ?.focus({ preventScroll: true });
      setSourceAnnouncement(
        `Source phrase in lesson plan: ${source}`,
      );
    },
    [onHighlightSource, scrollToSection],
  );

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!hasWoven || !grid) return;

    return runGsapScoped(
      grid,
      reduced,
      (gsapApi) => {
        const cards = gsapApi.utils.toArray<HTMLElement>(
          '.signal-card__content',
          grid,
        );
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
        const cards = gsapApi.utils.toArray<HTMLElement>(
          '.signal-card__content',
          grid,
        );
        gsapApi.set(cards, { y: 0, autoAlpha: 1 });
      },
    );
  }, [hasWoven, reduced]);

  return (
    <Section
      id="signals"
      eyebrow="Teaching signal"
      title="Teaching signal extracted from the plan"
      lead="Each card traces back to a phrase in the original lesson. The output stays grounded in the teacher's intent."
    >
      <p
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="source-phrase-announcement"
      >
        {sourceAnnouncement}
      </p>

      {!hasWoven && (
        <Panel inset className="mt-1" style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.88rem', margin: '0 0 0.75rem' }}>
            Extract the teaching signal from your lesson plan to reveal grounded cards.
          </p>
          <Button variant="primary" onClick={onWeave}>
            Weave lesson to unlock
          </Button>
        </Panel>
      )}

      <div ref={gridRef} className="signal-grid">
        {teachingSignals.map((card, index) => (
          <article
            key={card.id}
            className="signal-card"
            style={!hasWoven ? { opacity: 0.55 } : undefined}
          >
            <div className="signal-card__content">
              <div className="flex-between">
                <span className="signal-card__label">{card.label}</span>
                {hasWoven && (
                  <StatusPip
                    label="Live"
                    tone={
                      index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'amber' : 'green'
                    }
                  />
                )}
              </div>
              <p className="signal-card__value">{card.value}</p>
            </div>
            <div className="signal-card__actions">
              <button
                type="button"
                className="badge badge--source signal-card__source"
                data-testid={`source-phrase-${card.id}`}
                onClick={() => handleSourcePhrase(card.id, card.source)}
                aria-label={`View source phrase in lesson plan: ${card.source}`}
                disabled={!hasWoven}
              >
                Source: {card.source}
              </button>
              {hasWoven && card.surfaceLinks?.[0] ? (
                <button
                  type="button"
                  className="signal-card__lesson-link"
                  data-testid={`signal-link-${card.id}`}
                  onClick={() => {
                    const target = card.surfaceLinks?.[0];
                    if (target) onSurfaceLink(target, card.surfaceLane);
                  }}
                  aria-label={
                    card.surfaceLane
                      ? `See in lesson — opens ${card.surfaceLane} lane`
                      : 'See in lesson'
                  }
                >
                  See in lesson
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
