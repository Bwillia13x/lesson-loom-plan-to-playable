export function scrollToSection(
  id: string,
  options: { reducedMotion: boolean },
) {
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
