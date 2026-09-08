import React from 'react';
import { Icon } from './Icon.jsx';

const VARIANTS = {
  primary:   { background: 'var(--surface-accent)', color: 'var(--text-on-accent)', border: '1px solid transparent', boxShadow: 'var(--shadow-accent-glow)' },
  secondary: { background: 'var(--surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
  ghost:     { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  outline:   { background: 'transparent', color: 'var(--text-accent)', border: '1px solid var(--border-accent)' },
  danger:    { background: 'var(--status-danger-bg)', color: 'var(--text-danger)', border: '1px solid rgba(255,77,77,0.4)' },
};

const SIZES = {
  sm: { height: 36, padding: '0 14px', fontSize: 'var(--fs-caption)', gap: 6, radius: 'var(--radius-sm)' },
  md: { height: 44, padding: '0 18px', fontSize: 'var(--fs-body)', gap: 8, radius: 'var(--radius-control)' },
  lg: { height: 54, padding: '0 24px', fontSize: 'var(--fs-body-lg)', gap: 10, radius: 'var(--radius-lg)' },
};

export function Button({ children, variant = 'primary', size = 'md', icon, iconRight, fullWidth = false, disabled = false, pill = false, style, onClick, ...rest }) {
  const [pressed, setPressed] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      {...rest}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding,
        width: fullWidth ? '100%' : undefined,
        borderRadius: pill ? 'var(--radius-pill)' : s.radius,
        font: 'var(--text-body-strong)', fontSize: s.fontSize,
        letterSpacing: '-0.01em', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
        transition: 'var(--transition-control)',
        WebkitTapHighlightColor: 'transparent',
        ...v,
        boxShadow: pressed ? 'none' : v.boxShadow,
        ...style,
      }}
    >
      {icon ? <Icon name={icon} size={size === 'lg' ? 'lg' : 'sm'} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={size === 'lg' ? 'lg' : 'sm'} /> : null}
    </button>
  );
}
