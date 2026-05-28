import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { runGsapScoped } from '../../motion/runGsapScoped';
import {
  equivalentCanonicalIds,
  fractionTiles,
  studentActivity,
  type FractionTile,
} from '../../data/lessonLoomData';
import { FractionTileVisual } from '../FractionTileVisual';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type StudentFractionGardenProps = {
  selectedTileIds: string[];
  onToggleTile: (id: string) => void;
  onReset: () => void;
  onCheck: () => void;
  checkSuccess: boolean;
  checkAttempted: boolean;
  showSuccessPulse: boolean;
  reducedMotion?: boolean;
  studentAppActive?: boolean;
};

function GardenBedVisual({ tile }: { tile: FractionTile | undefined }) {
  const parts = tile?.parts ?? 4;
  const filled = tile?.filled ?? 0;
  return (
    <div className="garden-bed__plots" aria-hidden="true">
      {Array.from({ length: parts }).map((_, i) => (
        <div
          key={i}
          className={`garden-bed__plot ${i < filled ? 'garden-bed__plot--filled' : ''}`}
        />
      ))}
    </div>
  );
}

export function StudentFractionGarden({
  selectedTileIds,
  onToggleTile,
  onReset,
  onCheck,
  checkSuccess,
  checkAttempted,
  showSuccessPulse,
  reducedMotion = false,
  studentAppActive = false,
}: StudentFractionGardenProps) {
  const [hintVisible, setHintVisible] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = successRef.current;
    if (!showSuccessPulse || !checkSuccess || !el) return;

    return runGsapScoped(
      successRef,
      reducedMotion,
      (gsapApi) => {
        gsapApi.fromTo(
          el,
          { scale: 0.98, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        );
      },
      (gsapApi) => {
        gsapApi.set(el, { scale: 1, opacity: 1 });
      },
    );
  }, [showSuccessPulse, checkSuccess, reducedMotion]);

  const selectedTiles = useMemo(
    () => fractionTiles.filter((t) => selectedTileIds.includes(t.id)),
    [selectedTileIds],
  );

  const bedsBuilt = Math.min(selectedTiles.length, 3);
  const bedTiles = [
    selectedTiles[0],
    selectedTiles[1],
    selectedTiles[2],
  ];

  return (
    <Section
      id="student"
      workspace="student"
      className={studentAppActive ? 'll-section--woven-active' : ''}
      eyebrow="Student app"
      title={studentActivity.title}
      lead={studentActivity.mission}
    >
      <div className="garden-layout">
        <Panel bracket screws>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <StatusPip
              label={`${bedsBuilt} / 3 beds built`}
              tone="cyan"
            />
            <StatusPip
              label={checkSuccess ? 'Equivalent? Yes!' : 'Equivalent?'}
              tone={checkSuccess ? 'green' : 'amber'}
              pulse={checkSuccess}
            />
          </div>

          <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>{studentActivity.prompt}</p>

          {hintVisible && (
            <div
              className="garden-hint-callout"
              role="note"
              id="garden-hint-callout"
              data-testid="garden-hint-callout"
            >
              <strong>Hint:</strong> {studentActivity.hint}
            </div>
          )}

          <div className="garden-beds">
            {bedTiles.map((tile, i) => (
              <div
                key={i}
                className={`garden-bed ${tile ? 'garden-bed--active' : ''}`}
              >
                <div className="garden-bed__label">{tile?.label ?? '—'}</div>
                <GardenBedVisual tile={tile} />
              </div>
            ))}
          </div>

          <p className="text-mono mt-1" style={{ fontSize: '0.8rem', textAlign: 'center' }}>
            {studentActivity.equation}
          </p>

          <div className="tile-bank" role="group" aria-label="Fraction tiles">
            {fractionTiles.map((tile) => {
              const selected = selectedTileIds.includes(tile.id);
              const success =
                checkSuccess && equivalentCanonicalIds.includes(tile.id) && selected;
              const tileLabel = [
                `Fraction tile ${tile.label}`,
                `${tile.filled} of ${tile.parts} parts`,
                selected ? 'selected' : '',
                success ? 'equivalent match' : '',
              ]
                .filter(Boolean)
                .join(', ');
              return (
                <button
                  key={tile.id}
                  type="button"
                  data-testid={`tile-${tile.id}`}
                  className={[
                    'fraction-tile',
                    selected ? 'fraction-tile--selected' : '',
                    success ? 'fraction-tile--success' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  aria-label={tileLabel}
                  onClick={() => onToggleTile(tile.id)}
                >
                  <FractionTileVisual tile={tile} />
                  {success && (
                    <span className="fraction-tile__check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                  <span>{tile.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-between mt-1">
            <IndustrialButton variant="ghost" size="sm" onClick={onReset}>
              Reset
            </IndustrialButton>
            <IndustrialButton
              variant="secondary"
              size="sm"
              type="button"
              aria-expanded={hintVisible}
              aria-controls="garden-hint-callout"
              data-testid="garden-hint-btn"
              onClick={() => setHintVisible((v) => !v)}
            >
              {hintVisible ? 'Hide hint' : 'Hint'}
            </IndustrialButton>
            <IndustrialButton
              variant="primary"
              size="sm"
              onClick={onCheck}
              data-testid="fraction-check"
            >
              Check
            </IndustrialButton>
          </div>

          {checkAttempted && !checkSuccess && (
            <div
              className="garden-hint-callout garden-hint-callout--soft"
              role="status"
              data-testid="fraction-check-feedback"
              aria-live="polite"
            >
              {studentActivity.hint}
            </div>
          )}

          {checkSuccess && (
            <div
              ref={successRef}
              className="garden-success"
              role="status"
              aria-live="polite"
            >
              <span aria-hidden="true">✓ </span>
              {studentActivity.success}
            </div>
          )}
        </Panel>

        <Panel inset title="Mission">
          <p style={{ fontSize: '0.9rem' }}>{studentActivity.mission}</p>
          <p
            id="garden-hint"
            tabIndex={-1}
            className="mt-1"
            style={{ fontSize: '0.8rem', color: 'var(--ll-muted)' }}
          >
            <strong>Hint:</strong> {studentActivity.hint}
          </p>
          <p className="mt-1 text-mono" style={{ fontSize: '0.75rem' }}>
            Reflection: {studentActivity.reflection}
          </p>
        </Panel>
      </div>
    </Section>
  );
}
