import React from 'react';
import { Icon } from './Icon';

export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'success' | 'danger' | 'info';
  icon?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export function Badge({
  children,
  tone = 'neutral',
  icon,
  size = 'md',
  style,
  ...rest
}: BadgeProps & Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BadgeProps>) {
  const tones = {
    neutral: { background: 'var(--surface-raised)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' },
    accent:  { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
    success: { background: 'var(--status-success-bg)', color: 'var(--status-success-fg)', border: '1px solid transparent' },
    danger:  { background: 'var(--status-danger-bg)', color: 'var(--status-danger-fg)', border: '1px solid transparent' },
    info:    { background: 'var(--status-info-bg)', color: 'var(--status-info-fg)', border: '1px solid transparent' },
  };
  const h = size === 'sm' ? 20 : 24;
  return (
    <span
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, height: h, padding: '0 8px',
        borderRadius: 'var(--radius-xs)', font: 'var(--text-label)', fontSize: size === 'sm' ? 10 : 'var(--fs-micro)',
        letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', ...tones[tone], ...style,
      }}
    >
      {icon ? <Icon name={icon} size={size === 'sm' ? 10 : 12} /> : null}{children}
    </span>
  );
}
