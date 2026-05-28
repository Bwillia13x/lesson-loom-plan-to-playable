export function runWithMotion(
  reducedMotion: boolean,
  animate: () => void,
  instant?: () => void,
): void {
  if (reducedMotion) {
    instant?.();
    return;
  }
  animate();
}
