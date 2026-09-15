import React from 'react';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: 'accent' | 'success';
  height?: number;
  style?: React.CSSProperties;
}

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  tone = 'accent',
  height = 8,
  style,
  ...rest
}: ProgressBarProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ProgressBarProps>) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  const fill = tone === 'success' ? 'var(--status-success-fg)' : 'var(--surface-accent)';
  return (
    <div {...rest} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label || showValue ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          {label ? <span style={{ font: 'var(--text-caption)', color: 'var(--text-secondary)' }}>{label}</span> : <span />}
          {showValue ? <span style={{ font: 'var(--text-label)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{value}/{max}</span> : null}
        </div>
      ) : null}
      <div style={{ height, background: 'var(--ink-800)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: fill, borderRadius: 'var(--radius-pill)', transition: 'width var(--dur-slow) var(--ease-out)' }} />
      </div>
    </div>
  );
}
