import {
  equivalentCanonicalIds,
  fractionTiles,
  type FractionTile,
} from '../data/lessonLoomData';

const HALF_TOLERANCE = 0.01;

export function getSelectedTiles(selectedTileIds: string[]): FractionTile[] {
  return fractionTiles.filter((t) => selectedTileIds.includes(t.id));
}

/** True when 3+ tiles all represent the same half-value, or the demo canonical trio is selected. */
export function isEquivalentTileSelection(selectedTileIds: string[]): boolean {
  if (selectedTileIds.length < 3) return false;

  const hasCanonicalTrio = equivalentCanonicalIds.every((id) =>
    selectedTileIds.includes(id),
  );
  if (hasCanonicalTrio) return true;

  const selected = getSelectedTiles(selectedTileIds);
  return (
    selected.length >= 3 &&
    selected.every((t) => Math.abs(t.value - 0.5) < HALF_TOLERANCE)
  );
}
