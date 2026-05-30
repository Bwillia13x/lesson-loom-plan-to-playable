import { Panel } from '../ui/Panel';
import { StatusPip } from '../ui/StatusPip';

export function PrintableFallback() {
  return (
    <Panel inset bracket title="Printable fallback">
      <p style={{ fontSize: '0.88rem', color: 'var(--ll-muted)', margin: '0 0 0.85rem' }}>
        Use grid paper or projected garden beds if devices are not available.
      </p>
      <div className="printable-preview">
        <div className="printable-preview__header">
          <strong>Fraction Garden — Worksheet</strong>
          <StatusPip label="Printable fallback" tone="cyan" />
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
