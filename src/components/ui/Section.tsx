import type { ReactNode } from 'react';
import type { WorkspaceMode } from '../../data/lessonLoomData';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  workspace?: WorkspaceMode;
  deferRender?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  workspace,
  deferRender = id !== 'hero',
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        'll-section',
        deferRender ? 'll-section--deferred' : '',
        workspace ? 'll-section--workspace' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-workspace={workspace}
      aria-labelledby={`${id}-title`}
    >
      <div className="ll-section__inner">
        {eyebrow && <p className="ll-section__eyebrow">{eyebrow}</p>}
        <h2 id={`${id}-title`} className="ll-section__title">
          {title}
        </h2>
        {lead && <p className="ll-section__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
