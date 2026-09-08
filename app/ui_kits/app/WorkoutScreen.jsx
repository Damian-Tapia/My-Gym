const { NavBar, Button, IconButton, Badge, Icon, Stepper, SetRow, ProgressBar, RestTimer, Sheet, AICallout } = window.MyGymDesignSystem_8243f3;

function WorkoutScreen({ exercise, index, total, onBack, onFinish }) {
  const [sets, setSets] = React.useState([
    { w: 35, r: 12, done: true }, { w: 40, r: 10, done: false }, { w: 40, r: 10, done: false }, { w: 40, r: 8, done: false },
  ]);
  const [active, setActive] = React.useState(1);
  const [resting, setResting] = React.useState(false);
  const [remaining, setRemaining] = React.useState(90);
  const [sheet, setSheet] = React.useState(false);
  const [weight, setWeight] = React.useState(40);

  React.useEffect(() => {
    if (!resting) return;
    const t = setInterval(() => setRemaining(r => (r <= 1 ? (setResting(false), 90) : r - 1)), 1000);
    return () => clearInterval(t);
  }, [resting]);

  const complete = (i) => {
    setSets(s => s.map((x, j) => j === i ? { ...x, done: !x.done } : x));
    if (!sets[i].done) { setActive(i + 1); setResting(true); setRemaining(90); }
  };
  const doneCount = sets.filter(s => s.done).length;

  return (
    <React.Fragment>
      <NavBar title={`Ejercicio ${index + 1} de ${total}`} onBack={onBack}
        action={<IconButton icon="info" label="Cómo se hace" onClick={() => setSheet(true)} />} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <h1 style={{ margin: 0, font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>{exercise.name}</h1>
          <Badge tone="accent" icon="sparkles">IA</Badge>
        </div>
        <p style={{ margin: '4px 0 16px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>{exercise.machine} · descanso 90 s</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '20px 0 24px',
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)' }}>
          <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Serie {active + 1} · peso</span>
          <Stepper value={weight} step={2.5} unit="kg" size="lg" onChange={setWeight} />
        </div>

        <div style={{ margin: '18px 0 10px' }}><ProgressBar label="Series" value={doneCount} max={sets.length} showValue tone={doneCount === sets.length ? 'success' : 'accent'} /></div>

        <div style={{ display: 'grid', gap: 6 }}>
          {sets.map((s, i) => <SetRow key={i} index={i + 1} weight={i === active ? weight : s.w} reps={s.r} done={s.done} active={i === active && !s.done} onToggle={() => complete(i)} />)}
        </div>

        <div style={{ marginTop: 16 }}>
          <AICallout action="Aplicar en la próxima serie">
            La última vez hiciste 4 × 10 con 40 kg sin fallar. Prueba 42.5 kg.
          </AICallout>
        </div>
      </div>

      <div style={{ flex: '0 0 auto', padding: '10px var(--gutter-screen) 30px', display: 'grid', gap: 10,
        borderTop: '1px solid var(--border-subtle)', background: 'rgba(11,11,12,0.9)', backdropFilter: 'var(--blur-scrim)' }}>
        {resting ? <RestTimer seconds={90} remaining={remaining} running onToggle={() => setResting(false)} onSkip={() => { setResting(false); setRemaining(90); }} /> : null}
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" size="lg" onClick={onFinish}>Terminar</Button>
          <Button size="lg" fullWidth icon="chevron-right" onClick={() => complete(active)}>
            {doneCount === sets.length ? 'Siguiente ejercicio' : 'Serie completada'}
          </Button>
        </div>
      </div>

      <Sheet open={sheet} title="Press de banca" onClose={() => setSheet(false)}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ height: 140, borderRadius: 'var(--radius-card)', background: 'var(--ink-850)', border: '1px dashed var(--border-default)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', font: 'var(--text-caption)' }}>
            <Icon name="camera" size="md" /> Espacio para la demostración en vídeo
          </div>
          <p style={{ margin: 0, font: 'var(--text-body)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
            Baja la barra hasta el pecho controlando dos segundos, apoya bien los pies y sube sin bloquear los codos del todo.
          </p>
          <Button variant="secondary" fullWidth onClick={() => setSheet(false)}>Cerrar</Button>
        </div>
      </Sheet>
    </React.Fragment>
  );
}

Object.assign(window, { WorkoutScreen });
