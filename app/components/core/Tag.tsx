import React from 'react';
import { Icon } from './Icon';

export interface TagProps {
  children?: React.ReactNode;
  icon?: string;
  selected?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Tag({
  children,
  icon,
  selected = false,
  removable = false,
  onRemove,
  onClick,
  style,
  ...rest
}: TagProps & Omit<React.HTMLAttributes<HTMLSpanElement>, keyof TagProps>) {
  return (
    <span
      onClick={onClick}
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px',
        borderRadius: 'var(--radius-chip)', font: 'var(--text-body)', fontSize: 'var(--fs-caption)',
        cursor: onClick ? 'pointer' : undefined, transition: 'var(--transition-control)',
        background: selected ? 'var(--surface-accent)' : 'var(--surface-card)',
        color: selected ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        border: selected ? '1px solid transparent' : '1px solid var(--border-default)',
        fontWeight: selected ? 'var(--fw-semibold)' : 'var(--fw-regular)', ...style,
      }}
    >
      {icon ? <Icon name={icon} size="sm" /> : null}
      {children}
      {removable ? <Icon name="x" size={12} onClick={onRemove} style={{ cursor: 'pointer', opacity: 0.7 }} /> : null}
    </span>
  );
}
