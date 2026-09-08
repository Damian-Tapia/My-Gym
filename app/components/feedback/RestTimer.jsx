import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function RestTimer({ seconds = 90, remaining = 90, running = false, onToggle, onSkip, style, ...rest }) {
  const pct = Math.max(0, Math.min(1, remaining / (seconds || 1)));
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  return (
    <div {...rest} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-raised)', ...style }}>
      <Icon name="timer" size="md" color="var(--text-accent)" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Descanso</span>
          <span style={{ font: 'var(--text-metric)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{mm}:{ss}</span>
        </div>
        <div style={{ marginTop: 8, height: 4, background: 'var(--ink-800)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
          <div style={{ width: pct * 100 + '%', height: '100%', background: 'var(--surface-accent)', transition: 'width var(--dur-base) linear' }} />
        </div>
      </div>
      <button type="button" aria-label={running ? 'Pausar' : 'Reanudar'} onClick={onToggle}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%',
          background: 'var(--surface-accent)', border: 'none', cursor: 'pointer', color: 'var(--text-on-accent)' }}>
        <Icon name={running ? 'pause' : 'play'} size="sm" /></button>
      {onSkip ? <button type="button" onClick={onSkip} style={{ background: 'transparent', border: 'none', cursor: 'pointer',
        font: 'var(--text-caption)', color: 'var(--text-muted)' }}>Saltar</button> : null}
    </div>
  );
}
