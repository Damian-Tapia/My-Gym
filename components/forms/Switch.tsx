import React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

export function Switch({
  checked = false,
  disabled = false,
  onChange,
  style,
  ...rest
}: SwitchProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SwitchProps>) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      {...rest}
      style={{
        width: 52, height: 32, flex: '0 0 auto', borderRadius: 'var(--radius-pill)',
        border: '1px solid ' + (checked ? 'transparent' : 'var(--border-default)'),
        background: checked ? 'var(--surface-accent)' : 'var(--surface-raised)', padding: 3,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transition: 'background-color var(--dur-base) var(--ease-standard)', ...style,
      }}
    >
      <span style={{
        display: 'block', width: 24, height: 24, borderRadius: '50%',
        background: checked ? 'var(--ink-1000)' : 'var(--ink-300)',
        transform: `translateX(${checked ? 20 : 0}px)`, transition: 'transform var(--dur-base) var(--ease-out)',
      }} />
    </button>
  );
}
