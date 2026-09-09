import React from 'react';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  base?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window { MYGYM_ICON_BASE?: string }
}

const SIZES = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 };

export function Icon({
  name,
  size = 'md',
  color = 'currentColor',
  base,
  style,
  ...rest
}: IconProps & Omit<React.HTMLAttributes<HTMLSpanElement>, keyof IconProps>) {
  const px = typeof size === 'number' ? size : (SIZES[size] || SIZES.md);
  const root = base || (typeof window !== 'undefined' && window.MYGYM_ICON_BASE) || '/icons/';
  const url = `url("${root}${name}.svg")`;
  return (
    <span
      aria-hidden="true"
      {...rest}
      style={{
        display: 'inline-block', flex: '0 0 auto', width: px, height: px,
        backgroundColor: color,
        WebkitMask: `${url} center / contain no-repeat`,
        mask: `${url} center / contain no-repeat`,
        ...style,
      }}
    />
  );
}
