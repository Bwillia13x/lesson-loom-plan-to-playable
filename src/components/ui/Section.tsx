import type { ReactNode } from 'react';
import type { WorkspaceMode } from '../../data/lessonLoomData';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  titleAs?: 'h1' | 'h2';
  titleClassName?: string;
  lead?: string;
  leadClassName?: string;
  children: ReactNode;
  className?: string;
  workspace?: WorkspaceMode;
  deferRender?: boolean;
};

export function Section({
  id,
  eyebrow,
  title,
  titleAs = 'h2',
  titleClassName = '',
  lead,
  leadClassName = '',
  children,
  className = '',
  workspace,
  deferRender = id !== 'hero',
}: SectionProps) {
  const TitleTag = titleAs;
  const titleClasses = ['ll-section__title', titleClassName].filter(Boolean).join(' ');

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
        <TitleTag id={`${id}-title`} className={titleClasses}>
          {title}
        </TitleTag>
        {lead && (
          <p className={['ll-section__lead', leadClassName].filter(Boolean).join(' ')}>
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
