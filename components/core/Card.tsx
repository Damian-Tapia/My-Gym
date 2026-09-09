import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  variant?: 'default' | 'raised' | 'accent' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  onClick,
  style,
  ...rest
}: CardProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CardProps>) {
  const pads: Record<string, number | string> = { none: 0, sm: 12, md: 'var(--card-padding)', lg: 20 };
  const skins = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' },
    raised:  { background: 'var(--surface-raised)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-raised)' },
    accent:  { background: 'var(--surface-accent-soft)', border: '1px solid var(--border-accent)' },
    outline: { background: 'transparent', border: '1px dashed var(--border-default)' },
  };
  return (
    <div
      onClick={onClick}
      {...rest}
      style={{
        borderRadius: 'var(--radius-card)', padding: pads[padding] ?? pads.md,
        boxShadow: 'var(--shadow-card)', cursor: interactive ? 'pointer' : undefined,
        transition: 'var(--transition-control)', ...skins[variant], ...style,
      }}
    >
      {children}
    </div>
  );
}
