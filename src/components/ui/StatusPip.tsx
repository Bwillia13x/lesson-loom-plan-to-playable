type StatusPipProps = {
  label: string;
  tone?: 'orange' | 'cyan' | 'amber' | 'green';
  pulse?: boolean;
};

export function StatusPip({ label, tone = 'orange', pulse = false }: StatusPipProps) {
  return (
    <span
      className={`status-pip status-pip--${tone} ${pulse ? 'status-pip--pulse' : ''}`}
    >
      <span className="status-pip__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
