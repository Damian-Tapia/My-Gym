const { Button, OptionRow, Input, StepDots, Icon, Tag, AICallout } = window.MyGymDesignSystem_8243f3;

const EQUIPMENT = [
  { id: 'press', name: 'Prensa de piernas', sub: 'Prensa 45°', icon: 'dumbbell' },
  { id: 'polea', name: 'Polea alta', sub: 'Jalón / tríceps', icon: 'dumbbell' },
  { id: 'banca', name: 'Banca plana', sub: 'Con barra olímpica', icon: 'dumbbell' },
  { id: 'mancuernas', name: 'Mancuernas', sub: '2 – 40 kg', icon: 'dumbbell' },
  { id: 'smith', name: 'Máquina Smith', sub: 'Barra guiada', icon: 'dumbbell' },
  { id: 'remo', name: 'Remo sentado', sub: 'Polea baja', icon: 'dumbbell' },
];

function Scroll({ children, style }) {
  return <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 16px', ...style }}>{children}</div>;
}

function Footer({ children }) {
  return <div style={{ flex: '0 0 auto', padding: '12px var(--gutter-screen) 30px', borderTop: '1px solid var(--border-subtle)',
    background: 'rgba(11,11,12,0.9)', backdropFilter: 'var(--blur-scrim)' }}>{children}</div>;
}

function WelcomeStep({ onNext }) {
  return (
    <React.Fragment>
      <Scroll style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          My<span style={{ color: 'var(--amber-500)' }}>Gym</span>
        </div>
        <h1 style={{ margin: '20px 0 0', font: 'var(--text-display)', fontSize: 38, letterSpacing: 'var(--ls-display)', color: 'var(--text-primary)', textWrap: 'balance' }}>
          Tu rutina, con las máquinas que ya tienes.
        </h1>
        <p style={{ margin: '14px 0 0', font: 'var(--text-body)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
          Dinos qué hay en tu gimnasio y armamos un plan. Gratis, sin entrenador.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
          <Tag icon="scan-line">Escanea tu gym</Tag><Tag icon="sparkles">Rutina con IA</Tag><Tag icon="chart-no-axes-column">Progreso</Tag>
        </div>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth icon="dumbbell" onClick={onNext}>Empezar</Button>
        <button style={{ display: 'block', width: '100%', marginTop: 10, background: 'none', border: 'none', font: 'var(--text-body)', color: 'var(--text-muted)', cursor: 'pointer' }}>Ya tengo cuenta</button>
      </Footer>
    </React.Fragment>
  );
}

function GoalStep({ goal, setGoal, onNext }) {
  const goals = [
    { id: 'fuerza', title: 'Ganar fuerza', sub: 'Menos reps, más peso' },
    { id: 'musculo', title: 'Ganar músculo', sub: 'Volumen e hipertrofia' },
    { id: 'peso', title: 'Bajar de peso', sub: 'Circuitos y cardio' },
    { id: 'salud', title: 'Mantenerme activo', sub: '2–3 días por semana' },
  ];
  return (
    <React.Fragment>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Cuál es tu objetivo?</h1>
        <p style={{ margin: '0 0 18px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Puedes cambiarlo cuando quieras.</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {goals.map(g => <OptionRow key={g.id} title={g.title} subtitle={g.sub} selected={goal === g.id} onClick={() => setGoal(g.id)} />)}
        </div>
      </Scroll>
      <Footer><Button size="lg" fullWidth disabled={!goal} onClick={onNext}>Continuar</Button></Footer>
    </React.Fragment>
  );
}

function GymStep({ picked, toggle, onNext }) {
  return (
    <React.Fragment>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Qué hay en tu gimnasio?</h1>
        <p style={{ margin: '0 0 16px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Marca las máquinas que puedes usar.</p>
        <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', marginBottom: 14,
          background: 'transparent', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-card)', cursor: 'pointer', textAlign: 'left' }}>
          <Icon name="camera" size="md" color="var(--text-accent)" />
          <span style={{ flex: 1 }}>
            <span style={{ display: 'block', font: 'var(--text-body-strong)', color: 'var(--text-primary)' }}>Escanear con la cámara</span>
            <span style={{ display: 'block', font: 'var(--text-caption)', color: 'var(--text-muted)' }}>Detectamos las máquinas por ti</span>
          </span>
          <Icon name="chevron-right" size="sm" color="var(--text-muted)" />
        </button>
        <div style={{ display: 'grid', gap: 10 }}>
          {EQUIPMENT.map(e => <OptionRow key={e.id} multi icon={e.icon} title={e.name} subtitle={e.sub} selected={picked.includes(e.id)} onClick={() => toggle(e.id)} />)}
        </div>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth icon="sparkles" disabled={picked.length === 0} onClick={onNext}>
          Generar rutina{picked.length ? ` · ${picked.length}` : ''}
        </Button>
      </Footer>
    </React.Fragment>
  );
}

function PlanStep({ days, setDays, onDone }) {
  return (
    <React.Fragment>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Cuántos días por semana?</h1>
        <p style={{ margin: '0 0 18px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Sé realista; es más fácil subir después.</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[2, 3, 4, 5, 6].map(d => (
            <button key={d} onClick={() => setDays(d)} style={{ flex: 1, height: 64, borderRadius: 'var(--radius-control)', cursor: 'pointer',
              background: days === d ? 'var(--surface-accent)' : 'var(--surface-card)',
              border: '1px solid ' + (days === d ? 'transparent' : 'var(--border-subtle)'),
              color: days === d ? 'var(--text-on-accent)' : 'var(--text-primary)',
              fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 22 }}>{d}</button>
          ))}
        </div>
        <Input label="Peso corporal" value="72" suffix="kg" hint="Opcional. Se usa para estimar la carga inicial." />
        <div style={{ height: 16 }} />
        <AICallout title="Lo que haremos">
          Con {days} días y tus máquinas, armamos una rutina de empuje, tirón y pierna. Puedes cambiar cualquier ejercicio.
        </AICallout>
      </Scroll>
      <Footer><Button size="lg" fullWidth icon="check" onClick={onDone}>Crear mi rutina</Button></Footer>
    </React.Fragment>
  );
}

function OnboardingFlow({ onFinish }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('musculo');
  const [picked, setPicked] = useState(['press', 'polea', 'mancuernas']);
  const [days, setDays] = useState(3);
  const toggle = (id) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const steps = [
    <WelcomeStep onNext={() => setStep(1)} />,
    <GoalStep goal={goal} setGoal={setGoal} onNext={() => setStep(2)} />,
    <GymStep picked={picked} toggle={toggle} onNext={() => setStep(3)} />,
    <PlanStep days={days} setDays={setDays} onDone={onFinish} />,
  ];
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px var(--gutter-screen) 14px', flex: '0 0 auto' }}>
        {step > 0 ? (
          <button aria-label="Atrás" onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
            <Icon name="chevron-left" size="md" color="var(--text-secondary)" />
          </button>
        ) : <span style={{ width: 20 }} />}
        <StepDots count={4} index={step} style={{ flex: 1 }} />
        {step > 0 && step < 3 ? (
          <button onClick={onFinish} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'var(--text-caption)', color: 'var(--text-muted)' }}>Saltar</button>
        ) : <span style={{ width: 28 }} />}
      </div>
      {steps[step]}
    </React.Fragment>
  );
}

Object.assign(window, { OnboardingFlow });
