import React from 'react';
import { Icon } from '../core/Icon';

export interface OptionRowProps {
  title: string;
  subtitle?: string;
  icon?: string;
  selected?: boolean;
  multi?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function OptionRow({
  title,
  subtitle,
  icon,
  selected = false,
  multi = false,
  disabled = false,
  onClick,
  style,
  ...rest
}: OptionRowProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof OptionRowProps>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      {...rest}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: '14px 16px',
        borderRadius: 'var(--radius-card)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        background: selected ? 'var(--surface-accent-soft)' : 'var(--surface-card)',
        border: '1px solid ' + (selected ? 'var(--border-accent)' : 'var(--border-subtle)'),
        transition: 'var(--transition-control)', WebkitTapHighlightColor: 'transparent', ...style,
      }}
    >
      {icon ? <Icon name={icon} size="md" color={selected ? 'var(--text-accent)' : 'var(--text-secondary)'} /> : null}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-body-strong)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-primary)' }}>{title}</span>
        {subtitle ? <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</span> : null}
      </span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, flex: '0 0 auto',
        borderRadius: multi ? 'var(--radius-xs)' : '50%',
        background: selected ? 'var(--surface-accent)' : 'transparent',
        border: '1px solid ' + (selected ? 'transparent' : 'var(--border-strong)'),
      }}>
        {selected ? <Icon name="check" size={14} color="var(--text-on-accent)" /> : null}
      </span>
    </button>
  );
}
