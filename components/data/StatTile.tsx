import React from 'react';
import { Icon } from '../core/Icon';

export interface StatTileProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string;
  delta?: string;
  deltaTone?: 'success' | 'danger';
  style?: React.CSSProperties;
}

export function StatTile({
  label,
  value,
  unit,
  icon,
  delta,
  deltaTone = 'success',
  style,
  ...rest
}: StatTileProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof StatTileProps>) {
  const dc = deltaTone === 'danger' ? 'var(--status-danger-fg)' : 'var(--status-success-fg)';
  return (
    <div
      {...rest}
      style={{
        display: 'flex', flexDirection: 'column', gap: 8, padding: 'var(--card-padding)',
        background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', ...style,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon ? <Icon name={icon} size="xs" color="var(--text-muted)" /> : null}
        <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      </span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ font: 'var(--text-metric)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit ? <span style={{ font: 'var(--text-caption)', color: 'var(--text-muted)' }}>{unit}</span> : null}
      </span>
      {delta ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, font: 'var(--text-caption)', color: dc }}>
          <Icon name="trending-up" size={12} />{delta}
        </span>
      ) : null}
    </div>
  );
}
