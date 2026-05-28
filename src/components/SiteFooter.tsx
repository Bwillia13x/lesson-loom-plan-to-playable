import { navSections } from '../data/lessonLoomData';
import { useScrollToSection } from '../motion/useScrollToSection';
import { IndustrialButton } from './ui/IndustrialButton';

type SiteFooterProps = {
  onResetDemo: () => void;
  onSuccessState: () => void;
  onReviewApproved: () => void;
};

export function SiteFooter({
  onResetDemo,
  onSuccessState,
  onReviewApproved,
}: SiteFooterProps) {
  const scrollTo = useScrollToSection();
  const jumpLinks = navSections.filter((s) =>
    ['hero', 'student', 'teacher', 'review', 'export', 'stitch'].includes(s.id),
  );

  return (
    <footer className="site-footer">
      <p className="site-footer__legal">
        Lesson Loom — teacher-reviewed draft prototype. No student data. No automated grading.
      </p>
      <nav className="site-footer__nav" aria-label="Quick section links">
        {jumpLinks.map((item) => (
          <button
            key={item.id}
            type="button"
            className="site-footer__link"
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="site-footer__presets" aria-label="Demo presets">
        <span className="site-footer__presets-label">Demo presets</span>
        <IndustrialButton
          variant="ghost"
          size="sm"
          data-testid="demo-preset-reset"
          onClick={onResetDemo}
        >
          Reset demo
        </IndustrialButton>
        <IndustrialButton
          variant="ghost"
          size="sm"
          data-testid="demo-preset-success"
          onClick={onSuccessState}
        >
          Success state
        </IndustrialButton>
        <IndustrialButton
          variant="ghost"
          size="sm"
          data-testid="demo-preset-approved"
          onClick={onReviewApproved}
        >
          Review approved
        </IndustrialButton>
      </div>
    </footer>
  );
}
