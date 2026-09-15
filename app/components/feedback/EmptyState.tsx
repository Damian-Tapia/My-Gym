import React from 'react';
import { Icon } from '../core/Icon';
import { Button } from '../core/Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

export function EmptyState({
  icon = 'dumbbell',
  title,
  description,
  action,
  onAction,
  style,
  ...rest
}: EmptyStateProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof EmptyStateProps>) {
  return (
    <div
      {...rest}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10,
        padding: '40px 24px', ...style,
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56,
        borderRadius: '50%', background: 'var(--ink-850)', border: '1px solid var(--border-subtle)',
      }}>
        <Icon name={icon} size="lg" color="var(--text-muted)" />
      </span>
      <h3 style={{ margin: '6px 0 0', font: 'var(--text-h3)', color: 'var(--text-primary)' }}>{title}</h3>
      {description ? (
        <p style={{ margin: 0, maxWidth: 280, font: 'var(--text-body)', color: 'var(--text-muted)', textWrap: 'pretty' } as React.CSSProperties}>{description}</p>
      ) : null}
      {action ? <Button variant="secondary" onClick={onAction} style={{ marginTop: 8 }}>{action}</Button> : null}
    </div>
  );
}
