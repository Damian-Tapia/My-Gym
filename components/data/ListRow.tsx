import React from 'react';
import { Icon } from '../core/Icon';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const sharedStyle = (style?: React.CSSProperties): React.CSSProperties => ({
  display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
  minHeight: 'var(--tap-min)', padding: '12px 16px', background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--border-subtle)',
  WebkitTapHighlightColor: 'transparent', ...style,
});

export function ListRow({ title, subtitle, leading, trailing, chevron = false, onClick, style }: ListRowProps) {
  const inner = (
    <>
      {leading}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: 'var(--text-body-strong)', color: 'var(--text-primary)' }}>{title}</span>
        {subtitle ? <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</span> : null}
      </span>
      {trailing}
      {chevron ? <Icon name="chevron-right" size="sm" color="var(--text-muted)" /> : null}
    </>
  );
  if (onClick) {
    return (
      <button onClick={onClick} style={{ ...sharedStyle(style), cursor: 'pointer' }}>
        {inner}
      </button>
    );
  }
  return (
    <div style={{ ...sharedStyle(style), cursor: undefined }}>
      {inner}
    </div>
  );
}
