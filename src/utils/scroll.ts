export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = 'smooth',
) {
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
