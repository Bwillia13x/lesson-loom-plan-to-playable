export type ScrollToSectionOptions = {
  reducedMotion?: boolean;
  /** When true (default for hash helper), set `location.hash` for shareable section links. */
  updateHash?: boolean;
};

export function scrollToSection(
  id: string,
  behaviorOrOptions: ScrollBehavior | ScrollToSectionOptions = 'smooth',
) {
  let behavior: ScrollBehavior = 'smooth';
  let updateHash = false;

  if (typeof behaviorOrOptions === 'string') {
    behavior = behaviorOrOptions;
  } else {
    behavior = behaviorOrOptions.reducedMotion ? 'auto' : 'smooth';
    updateHash = behaviorOrOptions.updateHash !== false;
  }

  if (updateHash && typeof window !== 'undefined') {
    const base = `${window.location.pathname}${window.location.search}`;
    const next = `${base}#${id}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== next) {
      window.history.replaceState(null, '', next);
    }
  }

  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
