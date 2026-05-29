import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useMotion } from '../../motion/motionContext';
import { runGsapScoped } from '../../motion/runGsapScoped';
import {
  differentiation,
  equivalentCanonicalIds,
  fractionTiles,
  studentActivity,
  type FractionTile,
  type SupportLane,
} from '../../data/lessonLoomData';
import { FractionTileVisual } from '../FractionTileVisual';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { studentMissionSteps } from '../../data/lessonLoomData';
import { ProgressRail } from '../ui/ProgressRail';
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
  studentAppActive?: boolean;
  reflectionText: string;
  reflectionSaved: boolean;
  reflectionTouched: boolean;
  onReflectionChange: (value: string) => void;
  onReflectionTouch: () => void;
  onSaveReflection: () => void;
  activeSupport: SupportLane;
};

function studentProgressIndex(
  selectedCount: number,
  checkAttempted: boolean,
  checkSuccess: boolean,
  reflectionSaved: boolean,
  reflectionTouched: boolean,
): number {
  if (reflectionSaved) return studentMissionSteps.length;
  if (checkSuccess && (reflectionSaved || reflectionTouched)) {
    return 2;
  }
  if (selectedCount >= 3 || checkAttempted) return 1;
  return 0;
}

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
  studentAppActive = false,
  reflectionText,
  reflectionSaved,
  reflectionTouched,
  onReflectionChange,
  onReflectionTouch,
  onSaveReflection,
  activeSupport,
}: StudentFractionGardenProps) {
  const lane = differentiation[activeSupport];
  const { reduced } = useMotion();
  const [hintVisible, setHintVisible] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = successRef.current;
    if (!showSuccessPulse || !checkSuccess || !el) return;

    return runGsapScoped(
      successRef,
      reduced,
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
  }, [showSuccessPulse, checkSuccess, reduced]);

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

  const progressIndex = studentProgressIndex(
    selectedTileIds.length,
    checkAttempted,
    checkSuccess,
    reflectionSaved,
    reflectionTouched,
  );

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
      </div>
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

          <ProgressRail
            activeIndex={progressIndex}
            steps={studentMissionSteps}
            ariaLabel="Student mission progress"
            data-testid="student-progress-rail"
          />

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

          {checkSuccess && (
            <div className="garden-reflection mt-1" data-testid="student-reflection-panel">
              <label
                htmlFor="student-reflection"
                className="garden-reflection__label"
                style={{ fontSize: '0.88rem', fontWeight: 600 }}
              >
                Reflection
              </label>
              <textarea
                id="student-reflection"
                className="garden-reflection__input"
                rows={3}
                value={reflectionText}
                placeholder={studentActivity.reflection}
                aria-describedby="student-reflection-hint"
                data-testid="student-reflection"
                style={{
                  width: '100%',
                  border: '1px solid var(--ll-line)',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  fontFamily: 'var(--ll-font-ui)',
                  fontSize: '0.88rem',
                  resize: 'vertical',
                  background: 'var(--ll-paper)',
                  marginTop: '0.35rem',
                }}
                onChange={(e) => {
                  onReflectionChange(e.target.value);
                  onReflectionTouch();
                }}
                onBlur={onReflectionTouch}
              />
              <p
                id="student-reflection-hint"
                className="garden-reflection__hint"
                style={{ fontSize: '0.8rem', color: 'var(--ll-muted)' }}
              >
                Draft for your exit ticket. Saved only in this demo — no student data leaves
                your device.
              </p>
              <div className="flex-between mt-1">
                <IndustrialButton
                  variant="primary"
                  size="sm"
                  type="button"
                  data-testid="student-reflection-save"
                  onClick={onSaveReflection}
                >
                  Save reflection
                </IndustrialButton>
                {reflectionSaved && (
                  <span
                    role="status"
                    aria-live="polite"
                    data-testid="student-reflection-saved"
                    style={{ fontSize: '0.8rem', color: 'var(--ll-green)' }}
                  >
                    Reflection saved
                  </span>
                )}
              </div>
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
            Exit stem: {studentActivity.reflection}
          </p>
        </Panel>
      </div>
    </Section>
  );
}
