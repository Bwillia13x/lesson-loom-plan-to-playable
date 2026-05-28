import type { CSSProperties, ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  inset?: boolean;
  bracket?: boolean;
  screws?: boolean;
  title?: string;
  headerRight?: ReactNode;
};

export function Panel({
  children,
  className = '',
  inset = false,
  bracket = false,
  screws = false,
  title,
  headerRight,
  style,
}: PanelProps) {
  const classes = [
    'panel',
    inset ? 'panel--inset' : '',
    bracket ? 'panel--bracket' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style}>
      {screws && (
        <>
          <span className="panel__screw panel__screw--tl" aria-hidden="true" />
          <span className="panel__screw panel__screw--tr" aria-hidden="true" />
          <span className="panel__screw panel__screw--bl" aria-hidden="true" />
          <span className="panel__screw panel__screw--br" aria-hidden="true" />
        </>
      )}
      {title && (
        <div className="panel__header">
          <span className="panel__title">{title}</span>
          {headerRight}
        </div>
      )}
      <div className="panel__body">{children}</div>
    </div>
  );
}
