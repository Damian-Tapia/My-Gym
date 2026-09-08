import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function AICallout({ children, title = 'Sugerencia', action, onAction, onDismiss, style, ...rest }) {
  return (
    <div {...rest} style={{ display: 'flex', gap: 12, padding: 'var(--card-padding)', background: 'var(--surface-accent-soft)',
      border: '1px solid rgba(255,159,28,0.32)', borderRadius: 'var(--radius-card)', ...style }}>
      <Icon name="sparkles" size="md" color="var(--text-accent)" style={{ marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-accent)' }}>{title}</div>
        <p style={{ margin: '6px 0 0', font: 'var(--text-body)', color: 'var(--text-primary)', textWrap: 'pretty' }}>{children}</p>
        {action ? <button type="button" onClick={onAction} style={{ marginTop: 10, background: 'transparent', border: 'none', padding: 0,
          font: 'var(--text-body-strong)', color: 'var(--text-accent)', cursor: 'pointer' }}>{action}</button> : null}
      </div>
      {onDismiss ? <button type="button" aria-label="Descartar" onClick={onDismiss} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}>
        <Icon name="x" size="sm" /></button> : null}
    </div>
  );
}
