import React from 'react';
import { Icon } from '../core/Icon';

export interface SetRowProps {
  index: number;
  weight: number | string;
  reps: number | string;
  unit?: string;
  done?: boolean;
  active?: boolean;
  onToggle?: () => void;
  style?: React.CSSProperties;
}

export function SetRow({
  index,
  weight,
  reps,
  unit = 'kg',
  done = false,
  active = false,
  onToggle,
  style,
  ...rest
}: SetRowProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof SetRowProps>) {
  return (
    <div
      onClick={onToggle}
      {...rest}
      style={{
        display: 'grid', gridTemplateColumns: '28px 1fr 1fr 32px', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: onToggle ? 'pointer' : undefined,
        background: active ? 'var(--surface-accent-soft)' : done ? 'transparent' : 'var(--surface-card)',
        border: '1px solid ' + (active ? 'var(--border-accent)' : 'transparent'),
        opacity: done ? 0.55 : 1, transition: 'var(--transition-control)', ...style,
      }}
    >
      <span style={{ font: 'var(--text-label)', color: 'var(--text-muted)' }}>{index}</span>
      <span style={{ font: 'var(--text-metric)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
        {weight}<span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 3 }}>{unit}</span>
      </span>
      <span style={{ font: 'var(--text-metric)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
        {reps}<span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 3 }}>reps</span>
      </span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%',
        background: done ? 'var(--status-success-fg)' : 'transparent', border: '1px solid ' + (done ? 'transparent' : 'var(--border-strong)'),
      }}>
        {done ? <Icon name="check" size={14} color="var(--ink-1000)" /> : null}
      </span>
    </div>
  );
}
