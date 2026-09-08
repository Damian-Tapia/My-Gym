const { NavBar, TabBar, Button, IconButton, Card, Badge, Tag, Icon, StatTile, ProgressBar, ExerciseCard, ListRow, AICallout, EmptyState, SegmentedControl } = window.MyGymDesignSystem_8243f3;

const TODAY = [
  { name: 'Press de banca', machine: 'Banca plana', sets: 4, reps: 8, ai: true, note: 'Sube 2.5 kg si completas las 4 series.' },
  { name: 'Prensa de piernas', machine: 'Prensa 45°', sets: 4, reps: 10, ai: true },
  { name: 'Jalón al pecho', machine: 'Polea alta', sets: 3, reps: 12 },
  { name: 'Remo sentado', machine: 'Polea baja', sets: 3, reps: 12 },
  { name: 'Elevaciones laterales', machine: 'Mancuernas', sets: 3, reps: 15 },
  { name: 'Plancha', machine: 'Peso corporal', sets: 3, reps: '45 s' },
];

function Section({ title, action, children }) {
  return (
    <section style={{ marginTop: 'var(--gap-section)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ margin: 0, font: 'var(--text-h2)', fontSize: 19, letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>{title}</h2>
        {action ? <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'var(--text-body-strong)', fontSize: 'var(--fs-caption)', color: 'var(--text-accent)' }}>{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

function HomeScreen({ tab, setTab, onStart, onOpenExercise }) {
  const [tip, setTip] = React.useState(true);
  return (
    <React.Fragment>
      <NavBar large title="Hoy" subtitle="Miércoles · Empuje y pierna · 45 min"
        action={<IconButton icon="bell" label="Avisos" />} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 24px' }}>
        <Card variant="raised" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <Badge tone="accent" icon="sparkles">Rutina IA</Badge>
              <div style={{ margin: '10px 0 2px', font: 'var(--text-h2)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>Empuje A</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--text-muted)' }}>6 ejercicios · 18 series · ~45 min</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ font: 'var(--text-metric)', fontSize: 34, color: 'var(--text-accent)', fontVariantNumeric: 'tabular-nums' }}>0<span style={{ fontSize: 16, color: 'var(--text-muted)' }}>/6</span></div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}><ProgressBar value={0} max={6} height={6} /></div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Button size="lg" icon="play" fullWidth onClick={onStart}>Empezar entrenamiento</Button>
            <IconButton icon="repeat" label="Regenerar" variant="solid" size="lg" />
          </div>
        </Card>

        {tip ? <div style={{ marginTop: 14 }}>
          <AICallout action="Cambiar ejercicio" onDismiss={() => setTip(false)}>
            La banca está ocupada casi siempre a esta hora. Puedes hacer press con mancuernas y mantener el mismo estímulo.
          </AICallout>
        </div> : null}

        <Section title="Esta semana">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap-stack)' }}>
            <StatTile icon="flame" label="Racha" value={12} unit="días" delta="+3 vs. semana pasada" />
            <StatTile icon="dumbbell" label="Volumen" value="4.2" unit="t" delta="+8%" />
            <StatTile icon="timer" label="Tiempo" value="2h 15m" />
            <StatTile icon="trophy" label="Récords" value={3} unit="nuevos" />
          </div>
        </Section>

        <Section title="Ejercicios de hoy" action="Editar">
          <div style={{ display: 'grid', gap: 'var(--gap-stack)' }}>
            {TODAY.map((e, i) => (
              <ExerciseCard key={e.name} name={e.name} machine={e.machine} sets={e.sets} reps={e.reps}
                aiSuggested={e.ai} note={e.note} onClick={() => onOpenExercise(i)} />
            ))}
          </div>
        </Section>

        <Section title="Tu gimnasio" action="Ver todo">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag icon="dumbbell">Prensa 45°</Tag><Tag icon="dumbbell">Polea alta</Tag><Tag icon="dumbbell">Banca plana</Tag>
            <Tag icon="dumbbell">Mancuernas</Tag><Tag icon="plus">Añadir máquina</Tag>
          </div>
        </Section>
      </div>
      <TabBar value={tab} onChange={setTab} />
    </React.Fragment>
  );
}

function RoutinesScreen({ tab, setTab }) {
  const [scope, setScope] = React.useState('Activas');
  return (
    <React.Fragment>
      <NavBar large title="Rutinas" subtitle="3 activas · generadas para tu gimnasio"
        action={<IconButton icon="plus" label="Nueva" variant="accent" />} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 24px' }}>
        <SegmentedControl options={['Activas', 'Guardadas', 'Historial']} value={scope} onChange={setScope} />
        {scope === 'Historial' ? (
          <EmptyState icon="calendar" title="Aún no hay historial" description="Cuando termines tu primer entrenamiento aparecerá aquí." />
        ) : (
          <div style={{ marginTop: 16, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {[['Empuje A', 'Pecho, hombro, tríceps · 6 ejercicios'], ['Tirón B', 'Espalda y bíceps · 5 ejercicios'], ['Pierna C', 'Cuádriceps y glúteo · 6 ejercicios']].map(([t, s], i, arr) => (
              <ListRow key={t} title={t} subtitle={s} chevron onClick={() => {}}
                leading={<span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--ink-800)' }}><Icon name="list-checks" size="sm" color="var(--text-accent)" /></span>}
                style={i === arr.length - 1 ? { borderBottom: 'none' } : undefined} />
            ))}
          </div>
        )}
      </div>
      <TabBar value={tab} onChange={setTab} />
    </React.Fragment>
  );
}

function ProgressScreen({ tab, setTab }) {
  const [range, setRange] = React.useState('Mes');
  const bars = [42, 55, 38, 61, 70, 58, 76, 64, 82, 71, 88, 94];
  return (
    <React.Fragment>
      <NavBar large title="Progreso" subtitle="Volumen total levantado" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 24px' }}>
        <SegmentedControl options={['Semana', 'Mes', 'Año']} value={range} onChange={setRange} />
        <Card style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ font: 'var(--text-metric)', fontSize: 'var(--fs-metric-xl)', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>18.4</span>
            <span style={{ font: 'var(--text-body)', color: 'var(--text-muted)' }}>toneladas</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, marginTop: 18 }}>
            {bars.map((b, i) => <span key={i} style={{ flex: 1, height: b + '%', borderRadius: 3, background: i === bars.length - 1 ? 'var(--amber-500)' : 'var(--ink-700)' }} />)}
          </div>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap-stack)', marginTop: 14 }}>
          <StatTile icon="trending-up" label="Press de banca" value="42.5" unit="kg" delta="+5 kg en 4 semanas" />
          <StatTile icon="trending-up" label="Prensa" value="120" unit="kg" delta="+15 kg" />
        </div>
        <div style={{ marginTop: 14 }}>
          <AICallout title="Observación">
            Tu volumen de tirón va 30% por debajo del de empuje. Añadir una serie de remo equilibraría la semana.
          </AICallout>
        </div>
      </div>
      <TabBar value={tab} onChange={setTab} />
    </React.Fragment>
  );
}

Object.assign(window, { HomeScreen, RoutinesScreen, ProgressScreen });
