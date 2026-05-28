export type ScrollToSectionOptions = {
  reducedMotion: boolean;
  /** When true (default), set `location.hash` for shareable section links. */
  updateHash?: boolean;
};

export function scrollToSection(id: string, options: ScrollToSectionOptions) {
  if (options.updateHash !== false && typeof window !== 'undefined') {
    const base = `${window.location.pathname}${window.location.search}`;
    const next = `${base}#${id}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
      window.history.replaceState(null, '', next);
    }
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: options.reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
