const { useState } = React;

function StatusBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, padding: '0 24px 0 30px', flex: '0 0 auto' }}>
      <span style={{ font: 'var(--text-body-strong)', fontSize: 14, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          {[5, 7, 9, 11].map((h, i) => <span key={i} style={{ width: 3, height: h, borderRadius: 1, background: 'var(--text-primary)' }} />)}
        </span>
        <span style={{ width: 22, height: 11, border: '1px solid var(--ink-400)', borderRadius: 3, padding: 1.5, marginLeft: 3 }}>
          <span style={{ display: 'block', width: '72%', height: '100%', borderRadius: 1, background: 'var(--text-primary)' }} />
        </span>
      </span>
    </div>
  );
}

function PhoneFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: 390, height: 844, borderRadius: 46, background: 'var(--surface-app)',
        border: '1px solid var(--ink-700)', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.9)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column' }}>
        <StatusBar />
        {children}
        <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5,
          borderRadius: 3, background: 'var(--ink-500)' }} />
      </div>
      {label ? <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span> : null}
    </div>
  );
}

Object.assign(window, { PhoneFrame, StatusBar });
