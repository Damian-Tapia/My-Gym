import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Input({ label, value, placeholder, hint, error, icon, suffix, type = 'text', disabled = false, onChange, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const line = error ? 'var(--status-danger-fg)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', ...style }}>
      {label ? <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span> : null}
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 14px',
        background: 'var(--surface-input)', border: `1px solid ${line}`, borderRadius: 'var(--radius-control)',
        boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: 'var(--transition-control)', opacity: disabled ? 0.4 : 1 }}>
        {icon ? <Icon name={icon} size="sm" color="var(--text-muted)" /> : null}
        <input type={type} value={value} placeholder={placeholder} disabled={disabled}
          onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest}
          style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', font: 'var(--text-body)', fontSize: 'var(--fs-body-lg)' }} />
        {suffix ? <span style={{ font: 'var(--text-caption)', color: 'var(--text-muted)' }}>{suffix}</span> : null}
      </span>
      {error || hint ? <span style={{ font: 'var(--text-caption)', color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)' }}>{error || hint}</span> : null}
    </label>
  );
}
