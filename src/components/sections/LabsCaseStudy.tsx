import { Button } from '../ui/Button';
import { Panel } from '../ui/Panel';
import { Section } from '../ui/Section';

const INQUIRY_MAILTO =
  'mailto:hello@prairiesignal.example?subject=Lesson%20Loom%20Labs%20inquiry';

export function LabsCaseStudy() {
  return (
    <Section
      id="labs"
      eyebrow="PrairieSignal Labs"
      title="From contest prototype to workshop wedge"
      lead="Lesson Loom is an internal prototype and public demo — not a district product. It shows how PrairieSignal Labs turns trusted lesson plans into interactive classroom interfaces teachers can review before use."
    >
      <div className="grid-2">
        <Panel inset title="Labs placement">
          <ul className="labs-case-study__list">
            <li>
              <strong>Labs</strong> — high-fidelity prototype and public demo asset.
            </li>
            <li>
              <strong>Research</strong> — process evidence for AI-era learning workflow design.
            </li>
            <li>
              <strong>Edge (next)</strong> — workshop: &ldquo;From Static Lesson to Interactive
              Learning Interface.&rdquo;
            </li>
          </ul>
          <p className="text-mono mt-1" style={{ fontSize: '0.72rem', color: 'var(--ll-muted)' }}>
            Label: Internal prototype / public demo · Labs pilot candidate
          </p>
        </Panel>

        <Panel inset title="Workshop wedge">
          <p>
            The export pack includes a teacher review checklist for facilitators running a
            short lab session — prompt pack, sample interface, and human approval gate kept
            visible.
          </p>
          <p className="mt-1" style={{ fontSize: '0.9rem', color: 'var(--ll-muted)' }}>
            Audience: teachers, teaching centres, instructional designers exploring
            curriculum-aligned drafts without student data collection.
          </p>
          <div className="mt-2">
            <Button
              variant="secondary"
              size="md"
              type="button"
              data-testid="labs-contact-cta"
              onClick={() => {
                window.location.href = INQUIRY_MAILTO;
              }}
            >
              Contact PrairieSignal
            </Button>
          </div>
        </Panel>
      </div>
    </Section>
  );
}
