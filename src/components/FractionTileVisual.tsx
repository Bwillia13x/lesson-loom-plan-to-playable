import type { FractionTile } from '../data/lessonLoomData';

type FractionTileVisualProps = {
  tile: FractionTile;
};

export function FractionTileVisual({ tile }: FractionTileVisualProps) {
  return (
    <span className="fraction-tile__visual" aria-hidden="true">
      {Array.from({ length: tile.parts }).map((_, i) => (
        <span
          key={i}
          className={`fraction-tile__segment ${i < tile.filled ? 'fraction-tile__segment--filled' : ''}`}
        />
      ))}
    </span>
  );
}
