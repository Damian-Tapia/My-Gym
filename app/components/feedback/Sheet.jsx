import React from 'react';

export function Sheet({ children, title, open = true, onClose, style, ...rest }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', zIndex: 40 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--surface-scrim)', backdropFilter: 'blur(2px)' }} />
      <div {...rest} style={{ position: 'relative', width: '100%', maxHeight: '82%', overflowY: 'auto',
        background: 'var(--surface-sheet)', borderTopLeftRadius: 'var(--radius-sheet)', borderTopRightRadius: 'var(--radius-sheet)',
        borderTop: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sheet)', padding: 'var(--sheet-padding)',
        animation: 'mygym-sheet-in var(--dur-sheet) var(--ease-out)', ...style }}>
        <div style={{ width: 36, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--ink-700)', margin: '0 auto 14px' }} />
        {title ? <h2 style={{ margin: '0 0 12px', font: 'var(--text-h2)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>{title}</h2> : null}
        {children}
      </div>
      <style>{'@keyframes mygym-sheet-in{from{transform:translateY(100%)}to{transform:translateY(0)}}'}</style>
    </div>
  );
}
