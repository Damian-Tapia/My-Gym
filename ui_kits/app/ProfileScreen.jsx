const { NavBar, TabBar, ListRow, Switch, Icon, Button, Card, Badge } = window.MyGymDesignSystem_8243f3;

function ProfileScreen({ tab, setTab, onRestart }) {
  const [notif, setNotif] = React.useState(true);
  const [rest, setRest] = React.useState(true);
  return (
    <React.Fragment>
      <NavBar large title="Perfil" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 24px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%',
            background: 'var(--ink-800)', border: '1px solid var(--border-default)' }}><Icon name="user" size="lg" color="var(--text-secondary)" /></span>
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', font: 'var(--text-h3)', color: 'var(--text-primary)' }}>Damián T.</span>
            <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)' }}>72 kg · 3 días/semana · Ganar músculo</span>
          </span>
          <Badge tone="success">Gratis</Badge>
        </Card>

        <div style={{ marginTop: 20, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
          <ListRow title="Mi gimnasio" subtitle="6 máquinas registradas" chevron onClick={() => {}} />
          <ListRow title="Unidades" subtitle="Kilogramos" chevron onClick={() => {}} />
          <ListRow title="Idioma" subtitle="Español" chevron onClick={() => {}} style={{ borderBottom: 'none' }} />
        </div>

        <div style={{ marginTop: 20, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
          <ListRow title="Recordatorios" subtitle="Días de entrenamiento" trailing={<Switch checked={notif} onChange={setNotif} />} />
          <ListRow title="Aviso de descanso" subtitle="Sonido al terminar la serie" trailing={<Switch checked={rest} onChange={setRest} />} style={{ borderBottom: 'none' }} />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button variant="ghost" fullWidth onClick={onRestart}>Ver el onboarding otra vez</Button>
        </div>
      </div>
      <TabBar value={tab} onChange={setTab} />
    </React.Fragment>
  );
}

Object.assign(window, { ProfileScreen });
