import React from 'react';
import { Icon } from '../core/Icon';

export interface TabBarProps {
  tabs?: Array<{ id: string; icon: string; label: string }>;
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

const DEFAULT_TABS = [
  { id: 'home', icon: 'house', label: 'Hoy' },
  { id: 'routines', icon: 'list-checks', label: 'Rutinas' },
  { id: 'progress', icon: 'chart-no-axes-column', label: 'Progreso' },
  { id: 'profile', icon: 'user', label: 'Perfil' },
];

export function TabBar({
  tabs = DEFAULT_TABS,
  value = 'home',
  onChange,
  style,
  ...rest
}: TabBarProps & Omit<React.HTMLAttributes<HTMLElement>, keyof TabBarProps>) {
  return (
    <nav
      {...rest}
      style={{
        display: 'flex', alignItems: 'stretch', height: 'var(--tabbar-height)', paddingBottom: 4,
        background: 'rgba(11,11,12,0.86)', backdropFilter: 'var(--blur-scrim)', WebkitBackdropFilter: 'var(--blur-scrim)',
        borderTop: '1px solid var(--border-subtle)', ...style,
      }}
    >
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange && onChange(t.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              background: 'transparent', border: 'none', cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
              color: on ? 'var(--text-accent)' : 'var(--text-muted)',
            }}
          >
            <Icon name={t.icon} size="md" />
            <span style={{ font: 'var(--text-caption)', fontSize: 10, fontWeight: on ? 600 : 400 }}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
