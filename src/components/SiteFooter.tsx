import { navSections } from '../data/lessonLoomData';
import { scrollToSection } from '../utils/scroll';

type SiteFooterProps = {
  reducedMotion: boolean;
};

export function SiteFooter({ reducedMotion }: SiteFooterProps) {
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
            onClick={() =>
              scrollToSection(item.id, { reducedMotion })
            }
          >
            {item.label}
          </button>
        ))}
      </nav>
    </footer>
  );
}
