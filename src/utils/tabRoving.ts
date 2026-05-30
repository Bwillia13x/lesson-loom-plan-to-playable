import type { KeyboardEvent } from 'react';

/** Arrow/Home/End roving for WAI-ARIA tablists (manual activation on focus change). */
export function handleTabRovingKeyDown<T extends string>(
  event: KeyboardEvent<HTMLElement>,
  ids: readonly T[],
  activeId: T,
  onChange: (id: T) => void,
): void {
  const index = ids.indexOf(activeId);
  if (index === -1) return;

  let nextIndex: number | null = null;

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (index + 1) % ids.length;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (index - 1 + ids.length) % ids.length;
      break;
    case 'Home':
      nextIndex = 0;
      break;
    case 'End':
      nextIndex = ids.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  onChange(ids[nextIndex]);
}
