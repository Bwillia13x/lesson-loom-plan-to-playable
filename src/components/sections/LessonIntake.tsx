import { useMemo, useState } from 'react';
import { lesson, teachingSignals } from '../../data/lessonLoomData';
import { parseLessonPlanStub } from '../../utils/parseLessonPlanStub';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';

const PREVIEW_CHIP_TITLE = 'Additional lessons coming in future Labs builds';

type LessonIntakeProps = {
  value: string;
  onChange: (value: string) => void;
  onExtract: () => void;
  highlightPhraseId: string | null;
};

function PlanHighlightView({
  text,
  phrase,
}: {
  text: string;
  phrase: string;
}) {
  const parts = text.split(phrase);
  if (parts.length < 2) {
    return (
      <p
        id="lesson-plan-phrase-highlight"
        className="lesson-plan-highlight-fallback"
        data-testid="lesson-plan-phrase-highlight"
      >
        Source phrase: <mark className="lesson-plan__phrase--active">{phrase}</mark>
      </p>
    );
  }
  return (
    <p
      id="lesson-plan-phrase-highlight"
      className="lesson-plan-highlight-view"
      data-testid="lesson-plan-phrase-highlight"
      aria-live="polite"
    >
      {parts.map((part, index) => (
        <span key={`${index}-${part.slice(0, 8)}`}>
          {part}
          {index < parts.length - 1 ? (
            <mark className="lesson-plan__phrase--active">{phrase}</mark>
          ) : null}
        </span>
      ))}
    </p>
  );
}

export function LessonIntake({
  value,
  onChange,
  onExtract,
  highlightPhraseId,
}: LessonIntakeProps) {
  const [parserHighlights, setParserHighlights] = useState<string[] | null>(null);

  const activeSourcePhrase = useMemo(() => {
    if (!highlightPhraseId) return null;
    return teachingSignals.find((s) => s.id === highlightPhraseId)?.source ?? null;
  }, [highlightPhraseId]);

  const runQuickScan = () => {
    const { highlights } = parseLessonPlanStub(value);
    setParserHighlights(highlights);
  };

  return (
    <Section
      id="intake"
      eyebrow="Lesson intake"
      title="Start with the plan you already trust"
      lead="Lesson Loom does not invent the curriculum for you. It starts with your approved lesson plan, then helps turn it into a richer classroom interface."
    >
      <div
        className="lesson-chip-row"
        role="list"
        aria-label="Lesson library preview"
        data-testid="lesson-chip-row"
      >
        <button
          type="button"
          className="lesson-chip lesson-chip--active"
          role="listitem"
          data-testid="lesson-chip-active"
          aria-current="true"
        >
          Fraction Garden (active)
        </button>
        <button
          type="button"
          className="lesson-chip lesson-chip--preview"
          role="listitem"
          data-testid="lesson-chip-preview"
          aria-disabled="true"
          disabled
          title={PREVIEW_CHIP_TITLE}
        >
          Water Cycle (preview)
        </button>
        <button
          type="button"
          className="lesson-chip lesson-chip--preview"
          role="listitem"
          data-testid="lesson-chip-preview"
          aria-disabled="true"
          disabled
          title={PREVIEW_CHIP_TITLE}
        >
          Poetry Circles (preview)
        </button>
      </div>

      <div className="grid-2">
        <div>
          <div className="meta-grid">
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
            <div className="meta-item">
              <div className="meta-item__label">Duration</div>
              <div className="meta-item__value">{lesson.duration}</div>
            </div>
            <div className="meta-item" style={{ gridColumn: 'span 2' }}>
              <div className="meta-item__label">Learning Goal</div>
              <div className="meta-item__value">{lesson.learningGoal}</div>
            </div>
            <div className="meta-item" style={{ gridColumn: 'span 2' }}>
              <div className="meta-item__label">Materials</div>
              <div className="meta-item__value">{lesson.materials.join(' · ')}</div>
            </div>
            <div className="meta-item" style={{ gridColumn: '1 / -1' }}>
              <div className="meta-item__label">Classroom Context</div>
              <div className="meta-item__value">{lesson.classContext}</div>
            </div>
          </div>
        </div>

        <Panel inset bracket title="Paste Lesson Plan">
          <label htmlFor="lesson-plan-draft" className="sr-only">
            Lesson plan text
          </label>
          {activeSourcePhrase && (
            <PlanHighlightView text={value} phrase={activeSourcePhrase} />
          )}
          <textarea
            id="lesson-plan-draft"
            className="lesson-plan-doc lesson-plan-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            aria-label="Pasted lesson plan"
            aria-describedby={
              activeSourcePhrase ? 'lesson-plan-phrase-highlight' : undefined
            }
            data-testid="lesson-plan-draft"
          />
          <p className="text-mono mt-1" style={{ fontSize: '0.72rem', color: 'var(--ll-muted)' }}>
            In this demo, teaching signal cards stay tied to the sample plan. A full product
            would re-extract after you edit.
          </p>

          <div className="lesson-parser-stub mt-2">
            <div className="flex-between" style={{ alignItems: 'flex-start', gap: '0.75rem' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Quick scan (demo)</strong>
                <p
                  className="text-mono"
                  style={{ fontSize: '0.68rem', color: 'var(--ll-muted)', marginTop: '0.25rem' }}
                >
                  Demo parser — not AI
                </p>
              </div>
              <IndustrialButton
                variant="secondary"
                size="sm"
                type="button"
                data-testid="lesson-parser-scan"
                onClick={runQuickScan}
              >
                Quick scan (demo)
              </IndustrialButton>
            </div>
            {parserHighlights && (
              <ul
                className="lesson-parser-stub__list mt-1"
                data-testid="lesson-parser-highlights"
                aria-label="Demo parser highlights"
              >
                {parserHighlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </Panel>
      </div>

      <div className="mt-2">
        <IndustrialButton
          variant="primary"
          size="lg"
          data-testid="weave-lesson-intake"
          onClick={onExtract}
        >
          Extract Teaching Signal
        </IndustrialButton>
        <p className="text-mono mt-1" style={{ fontSize: '0.72rem', color: 'var(--ll-muted)' }}>
          Source of truth: teacher-provided lesson plan
        </p>
      </div>
    </Section>
  );
}
