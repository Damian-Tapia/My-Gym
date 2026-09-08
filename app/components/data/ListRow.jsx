import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function ListRow({ title, subtitle, leading, trailing, chevron = false, onClick, style, ...rest }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag onClick={onClick} {...rest} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
      minHeight: 'var(--tap-min)', padding: '12px 16px', background: 'transparent', border: 'none',
      borderBottom: '1px solid var(--border-subtle)', cursor: onClick ? 'pointer' : undefined,
      WebkitTapHighlightColor: 'transparent', ...style }}>
      {leading}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-body-strong)', color: 'var(--text-primary)' }}>{title}</span>
        {subtitle ? <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</span> : null}
      </span>
      {trailing}
      {chevron ? <Icon name="chevron-right" size="sm" color="var(--text-muted)" /> : null}
    </Tag>
  );
}
