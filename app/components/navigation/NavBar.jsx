import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function NavBar({ title, subtitle, onBack, action, large = false, style, ...rest }) {
  return (
    <header {...rest} style={{ display: 'flex', flexDirection: large ? 'column' : 'row', alignItems: large ? 'flex-start' : 'center',
      gap: large ? 10 : 12, minHeight: 'var(--nav-height)', padding: large ? '8px 20px 12px' : '0 12px 0 8px',
      background: 'rgba(11,11,12,0.86)', backdropFilter: 'var(--blur-scrim)', WebkitBackdropFilter: 'var(--blur-scrim)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        {onBack ? <IconButton icon="chevron-left" label="Atrás" onClick={onBack} /> : null}
        {!large ? <span style={{ flex: 1, minWidth: 0, font: 'var(--text-h3)', color: 'var(--text-primary)' }}>{title}</span> : <span style={{ flex: 1 }} />}
        {action}
      </div>
      {large ? (
        <div>
          <h1 style={{ margin: 0, font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>{title}</h1>
          {subtitle ? <p style={{ margin: '4px 0 0', font: 'var(--text-body)', color: 'var(--text-muted)' }}>{subtitle}</p> : null}
        </div>
      ) : null}
    </header>
  );
}
