import { safetyCards } from '../../data/lessonLoomData';
import { PrintableFallback } from './PrintableFallback';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';
import { StatusPip } from '../ui/StatusPip';

type ReviewSafetyProps = {
  approved: boolean;
  onApprove: () => void;
};

const statusTone = {
  required: 'orange' as const,
  review: 'amber' as const,
  pass: 'green' as const,
  ready: 'cyan' as const,
};

const statusLabel = {
  required: 'Required',
  review: 'Review',
  pass: 'Pass',
  ready: 'Ready',
};

export function ReviewSafety({ approved, onApprove }: ReviewSafetyProps) {
  return (
    <Section
      id="review"
      eyebrow="Review & safety"
      title="Review before classroom use"
      lead="Lesson Loom creates a classroom-ready draft. The teacher reviews the lesson, checks alignment, and decides what to use."
    >
      <div className="safety-grid">
        {safetyCards.map((card) => (
          <div key={card.id} className="safety-card">
            <div className="flex-between" style={{ marginBottom: '0.35rem' }}>
              <span className="safety-card__title">{card.title}</span>
              <StatusPip
                label={statusLabel[card.status]}
                tone={statusTone[card.status]}
              />
            </div>
            <p className="safety-card__detail">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid-2 mt-2">
        <Panel inset title="Review notes">
          <label htmlFor="review-notes" className="sr-only">
            Review notes
          </label>
          <textarea
            id="review-notes"
            rows={5}
            defaultValue="Verified learning goal and timing. Printable fallback confirmed. No student data collected in this demo."
            style={{
              width: '100%',
              border: '1px solid var(--ll-line)',
              borderRadius: '10px',
              padding: '0.75rem',
              fontFamily: 'var(--ll-font-ui)',
              fontSize: '0.88rem',
              resize: 'vertical',
              background: 'var(--ll-paper)',
            }}
          />
        </Panel>
        <Panel>
          <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
            This interactive lesson interface is a <strong>teacher-reviewed draft</strong>.
            Approve only after you verify goals, timing, and classroom fit.
          </p>
          <IndustrialButton
            variant="primary"
            size="lg"
            onClick={onApprove}
            aria-pressed={approved}
            data-testid="approve-classroom"
          >
            {approved ? 'Approved for Classroom Use' : 'Approve for Classroom Use'}
          </IndustrialButton>
          {approved && (
            <p
              className="garden-success mt-1"
              role="status"
              aria-live="polite"
            >
              Teacher approval recorded. Ready for classroom draft use.
            </p>
          )}
        </Panel>
      </div>

      <div className="mt-2">
        <PrintableFallback />
      </div>
    </Section>
  );
}
