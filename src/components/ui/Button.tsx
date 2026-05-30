import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sizeClass = size === 'md' ? '' : `btn--${size}`;
  return (
    <button
      type="button"
      className={`btn btn--${variant} ${sizeClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
