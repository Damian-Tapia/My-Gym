import React from 'react';

export function StepDots({ count = 3, index = 0, style, ...rest }) {
  return (
    <div {...rest} style={{ display: 'flex', gap: 6, alignItems: 'center', ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ height: 4, width: i === index ? 22 : 8, borderRadius: 'var(--radius-pill)',
          background: i <= index ? 'var(--surface-accent)' : 'var(--ink-700)',
          transition: 'width var(--dur-base) var(--ease-out), background-color var(--dur-base) var(--ease-standard)' }} />
      ))}
    </div>
  );
}
