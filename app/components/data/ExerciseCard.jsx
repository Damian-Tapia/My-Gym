import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

export function ExerciseCard({ name, machine, sets, reps, note, status = 'todo', aiSuggested = false, onClick, style, ...rest }) {
  const done = status === 'done';
  return (
    <div onClick={onClick} {...rest} style={{ display: 'flex', gap: 14, padding: 'var(--card-padding)',
      background: 'var(--surface-card)', border: '1px solid ' + (status === 'active' ? 'var(--border-accent)' : 'var(--border-subtle)'),
      borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', cursor: onClick ? 'pointer' : undefined,
      opacity: done ? 0.6 : 1, transition: 'var(--transition-control)', ...style }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, flex: '0 0 auto',
        borderRadius: 'var(--radius-sm)', background: 'var(--ink-800)' }}>
        <Icon name={done ? 'circle-check-big' : 'dumbbell'} size="md" color={done ? 'var(--status-success-fg)' : 'var(--text-accent)'} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ font: 'var(--text-h3)', color: 'var(--text-primary)' }}>{name}</span>
          {aiSuggested ? <Badge tone="accent" size="sm" icon="sparkles">IA</Badge> : null}
        </span>
        {machine ? <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 2 }}>{machine}</span> : null}
        <span style={{ display: 'block', font: 'var(--text-metric)', fontSize: 'var(--fs-caption)', color: 'var(--text-secondary)', marginTop: 8, letterSpacing: '0.02em' }}>
          {sets} × {reps}</span>
        {note ? <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)', marginTop: 6 }}>{note}</span> : null}
      </span>
    </div>
  );
}
