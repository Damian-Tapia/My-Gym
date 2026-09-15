import React from 'react';

export interface SegmentedControlProps {
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export function SegmentedControl({
  options = [],
  value,
  onChange,
  fullWidth = true,
  style,
  ...rest
}: SegmentedControlProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof SegmentedControlProps>) {
  return (
    <div
      role="tablist"
      {...rest}
      style={{
        display: 'inline-flex', width: fullWidth ? '100%' : undefined, gap: 2, padding: 3,
        background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-control)', ...style,
      }}
    >
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        const on = v === value;
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(v)}
            style={{
              flex: 1, height: 36, padding: '0 14px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              background: on ? 'var(--surface-raised)' : 'transparent', color: on ? 'var(--text-primary)' : 'var(--text-muted)',
              font: on ? 'var(--text-body-strong)' : 'var(--text-body)', fontSize: 'var(--fs-caption)',
              transition: 'var(--transition-control)', WebkitTapHighlightColor: 'transparent',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
