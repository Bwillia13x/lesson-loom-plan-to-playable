import { useEffect } from 'react';
import { navSections } from '../data/lessonLoomData';
import { scrollToSection } from '../utils/scroll';

const SECTION_IDS = new Set<string>(navSections.map((section) => section.id));

const HASH_SCROLL_DELAY_MS = 120;

/** Scroll to `#section` on load after a short delay (shareable deep links). */
export function useHashNavigationOnLoad(reducedMotion: boolean): void {
  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, '');
    if (!raw || !SECTION_IDS.has(raw)) return;

    const timer = window.setTimeout(() => {
      scrollToSection(raw, { reducedMotion, updateHash: false });
    }, HASH_SCROLL_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);
}
