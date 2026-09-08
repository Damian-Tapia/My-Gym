import React from 'react';
import { Icon } from './Icon.jsx';

const SIZES = { sm: 32, md: 40, lg: 48 };

export function IconButton({ icon, label, variant = 'ghost', size = 'md', active = false, disabled = false, onClick, style, ...rest }) {
  const px = SIZES[size] || SIZES.md;
  const skins = {
    ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent' },
    solid: { background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
    accent: { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
  };
  const skin = active ? { background: 'var(--surface-accent-soft)', color: 'var(--text-accent)', border: '1px solid var(--border-accent)' } : (skins[variant] || skins.ghost);
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} {...rest}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: px, height: px,
        borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        transition: 'var(--transition-control)', WebkitTapHighlightColor: 'transparent', ...skin, ...style }}>
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
    </button>
  );
}
