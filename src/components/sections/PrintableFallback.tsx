import { Panel } from '../ui/Panel';
import { StatusPip } from '../ui/StatusPip';

export function PrintableFallback() {
  return (
    <Panel inset bracket title="Printable fallback preview">
      <div className="printable-preview">
        <div className="printable-preview__header">
          <strong>Fraction Garden — Worksheet</strong>
          <StatusPip label="No-tech backup" tone="cyan" />
        </div>
        <p className="printable-preview__instructions">
          Shade garden beds to show equivalent fractions. Compare how much of each whole
          is filled, not just the numbers.
        </p>
        <div className="printable-preview__beds">
          {['1/2', '2/4', '3/6'].map((label) => (
            <div key={label} className="printable-preview__bed">
              <span className="text-mono">{label}</span>
              <div className="printable-preview__grid" aria-hidden="true">
                {Array.from({ length: label === '1/2' ? 2 : label === '2/4' ? 4 : 6 }).map(
                  (_, i, arr) => (
                    <span
                      key={i}
                      className={
                        i < Math.ceil(arr.length / 2)
                          ? 'printable-preview__cell printable-preview__cell--filled'
                          : 'printable-preview__cell'
                      }
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="printable-preview__exit text-mono">
          Exit ticket: Two fractions can look different but be equal because…
        </p>
      </div>
    </Panel>
  );
}
