import { useMemo, useState } from 'react';
import {
  differentiation,
  equivalentCanonicalIds,
  fractionTiles,
  studentActivity,
  type FractionTile,
  type SupportLane,
} from '../../data/lessonLoomData';
import { FractionTileVisual } from '../FractionTileVisual';
import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type StudentFractionGardenProps = {
  studentAppActive: boolean;
  activeSupport: SupportLane;
  classMode?: 'whole' | 'groups';
  selectedTileIds: string[];
  onToggleTile: (id: string) => void;
  onReset: () => void;
  onCheck: () => void;
  checkSuccess: boolean;
  showSuccessPulse: boolean;
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
  studentAppActive,
  activeSupport,
  classMode = 'whole',
  selectedTileIds,
  onToggleTile,
  onReset,
  onCheck,
  checkSuccess,
  showSuccessPulse,
}: StudentFractionGardenProps) {
  const studentLocked = !studentAppActive;
  const lane = differentiation[activeSupport];
  const [hintVisible, setHintVisible] = useState(false);

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
      <div
        className="student-lane-callout"
        data-testid="student-lane-mission"
        style={{ fontSize: '0.88rem', marginBottom: '1rem', color: 'var(--ll-graphite)' }}
      >
        <p style={{ margin: '0 0 0.35rem' }}>
          <strong>{lane.label} lane:</strong> {lane.taskVariation}
        </p>
        <p
          className="text-mono"
          style={{ margin: 0, fontSize: '0.75rem', color: 'var(--ll-muted)' }}
          data-testid="student-lane-scaffolds"
        >
          Scaffolds: {lane.scaffolds}
        </p>
        {classMode === 'groups' && (
          <p
            className="text-mono"
            style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--ll-muted)' }}
            data-testid="student-groups-hint"
          >
            Talk with your partner about equal parts, not just matching numbers.
          </p>
        )}
      </div>
      {studentLocked && (
        <p className="student-lock-notice" role="note" data-testid="student-lock-notice">
          Weave lesson to unlock the student app. You can preview this section anytime; tiles
          activate after weaving.
        </p>
      )}
      <div
        className={['garden-layout', studentLocked ? 'garden-layout--locked' : '']
          .filter(Boolean)
          .join(' ')}
      >
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
              data-testid="fraction-equivalent-status"
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
                  aria-disabled={studentLocked}
                  disabled={studentLocked}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              disabled={studentLocked}
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              aria-expanded={hintVisible}
              aria-controls="garden-hint-callout"
              data-testid="garden-hint-btn"
              disabled={studentLocked}
              onClick={() => setHintVisible((v) => !v)}
            >
              {hintVisible ? 'Hide hint' : 'Hint'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onCheck}
              disabled={studentLocked}
              data-testid="fraction-check"
            >
              Check
            </Button>
          </div>

          {checkSuccess && (
            <div
              className={`garden-success ${showSuccessPulse ? 'garden-success--pulse' : ''}`}
              role="status"
              aria-live="polite"
              data-testid="fraction-check-success"
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
