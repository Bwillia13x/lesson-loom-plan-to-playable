import type { HTMLAttributes } from 'react';

type StatusPipTone = 'sage' | 'lavender' | 'gold' | 'amber' | 'orange' | 'cyan' | 'green';

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
