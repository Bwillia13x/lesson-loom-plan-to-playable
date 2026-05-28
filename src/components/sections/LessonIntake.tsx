import { lesson } from '../../data/lessonLoomData';
import { IndustrialButton } from '../ui/IndustrialButton';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';

type LessonIntakeProps = {
  value: string;
  onChange: (value: string) => void;
  onExtract: () => void;
};

export function LessonIntake({ value, onChange, onExtract }: LessonIntakeProps) {
  return (
    <Section
      id="intake"
      eyebrow="Lesson intake"
      title="Start with the plan you already trust"
      lead="Lesson Loom does not invent the curriculum for you. It starts with your approved lesson plan, then helps turn it into a richer classroom interface."
    >
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
          <textarea
            id="lesson-plan-draft"
            className="lesson-plan-doc lesson-plan-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={12}
            aria-label="Pasted lesson plan"
            data-testid="lesson-plan-draft"
          />
          <p className="text-mono mt-1" style={{ fontSize: '0.72rem', color: 'var(--ll-muted)' }}>
            In this demo, teaching signal cards stay tied to the sample plan. A full product
            would re-extract after you edit.
          </p>
        </Panel>
      </div>

      <div className="mt-2">
        <IndustrialButton variant="primary" size="lg" onClick={onExtract}>
          Extract Teaching Signal
        </IndustrialButton>
        <p className="text-mono mt-1" style={{ fontSize: '0.72rem', color: 'var(--ll-muted)' }}>
          Source of truth: teacher-provided lesson plan
        </p>
      </div>
    </Section>
  );
}
