import { navSections } from '../data/lessonLoomData';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { scrollToSection } from '../utils/scroll';

export function SiteFooter() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const jumpLinks = navSections.filter((s) =>
    ['hero', 'student', 'teacher', 'review', 'export', 'stitch'].includes(s.id),
  );

  return (
    <footer className="site-footer">
      <p className="site-footer__legal">
        Static plan in. Interactive classroom app out. Teacher still in control.
      </p>
      <nav className="site-footer__nav" aria-label="Quick section links">
        {jumpLinks.map((item) => (
          <button
            key={item.id}
            type="button"
            className="site-footer__link"
            onClick={() =>
              scrollToSection(item.id, prefersReducedMotion ? 'auto' : 'smooth')
            }
          >
            {item.label}
          </button>
        ))}
      </nav>
    </footer>
  );
}
