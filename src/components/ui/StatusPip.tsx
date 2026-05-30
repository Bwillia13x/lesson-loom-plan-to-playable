import type { HTMLAttributes } from 'react';

/**
 * StatusPip tone keys. Canonical tones are `sage`, `lavender`, `gold`, `amber`,
 * and `green`. The legacy keys `orange` and `cyan` are retained as deprecated
 * aliases for one release so call sites can migrate without a breaking sweep
 * (CSS maps them to sage and lavender respectively in `components-shared.css`).
 */
type StatusPipTone =
  | 'sage'
  | 'lavender'
  | 'gold'
  | 'amber'
  | 'green'
  /** @deprecated Use 'sage' or 'gold' instead. Kept for back-compat; CSS aliases to sage. */
  | 'orange'
  /** @deprecated Use 'lavender' instead. Kept for back-compat; CSS aliases to lavender. */
  | 'cyan';

type StatusPipProps = {
  label: string;
  tone?: StatusPipTone;
  pulse?: boolean;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export function StatusPip({
  label,
  tone = 'sage',
  pulse = false,
  className = '',
  ...rest
}: StatusPipProps) {
  return (
    <span
      className={`status-pip status-pip--${tone} ${pulse ? 'status-pip--pulse' : ''} ${className}`.trim()}
      {...rest}
    >
      <span className="status-pip__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
