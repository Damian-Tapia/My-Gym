'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/core/Button'
import { OptionRow } from '@/components/forms/OptionRow'
import { Input } from '@/components/forms/Input'
import { StepDots } from '@/components/navigation/StepDots'
import { AICallout } from '@/components/feedback/AICallout'
import { Icon } from '@/components/core/Icon'
import { updateProfile } from '@/lib/profile'
import { supabase } from '@/lib/supabase/client'
import './onboarding.css'

type Goal = 'fuerza' | 'musculo' | 'peso' | 'salud'

const GOAL_MAP: Record<Goal, 'gain_muscle' | 'lose_fat' | 'maintain'> = {
  fuerza:  'gain_muscle',
  musculo: 'gain_muscle',
  peso:    'lose_fat',
  salud:   'maintain',
}

const GOALS: { id: Goal; title: string; sub: string }[] = [
  { id: 'fuerza',  title: 'Ganar fuerza',       sub: 'Menos reps, más peso' },
  { id: 'musculo', title: 'Ganar músculo',       sub: 'Volumen e hipertrofia' },
  { id: 'peso',    title: 'Bajar de peso',       sub: 'Circuitos y cardio' },
  { id: 'salud',   title: 'Mantenerme activo',   sub: '2–3 días por semana' },
]

const EQUIPMENT = [
  { id: 'press',      name: 'Prensa de piernas', sub: 'Prensa 45°',          icon: 'dumbbell' },
  { id: 'polea',      name: 'Polea alta',         sub: 'Jalón / tríceps',     icon: 'dumbbell' },
  { id: 'banca',      name: 'Banca plana',        sub: 'Con barra olímpica',  icon: 'dumbbell' },
  { id: 'mancuernas', name: 'Mancuernas',         sub: '2 – 40 kg',           icon: 'dumbbell' },
  { id: 'smith',      name: 'Máquina Smith',      sub: 'Barra guiada',        icon: 'dumbbell' },
  { id: 'remo',       name: 'Remo sentado',       sub: 'Polea baja',          icon: 'dumbbell' },
]

const DAY_NAMES = ['Día A', 'Día B', 'Día C', 'Día D', 'Día E', 'Día F']

function Scroll({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--gutter-screen) 16px', ...style }}>
      {children}
    </div>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      flex: '0 0 auto', padding: '12px var(--gutter-screen) 30px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(11,11,12,0.9)', backdropFilter: 'blur(12px)',
    }}>
      {children}
    </div>
  )
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <>
      <Scroll style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
          My<span style={{ color: 'var(--amber-500)' }}>Gym</span>
        </div>
        <h1 style={{ margin: '20px 0 0', font: 'var(--text-display)', fontSize: 38, letterSpacing: 'var(--ls-display)', color: 'var(--text-primary)', textWrap: 'balance' } as React.CSSProperties}>
          Tu rutina, con las máquinas que ya tienes.
        </h1>
        <p style={{ margin: '14px 0 0', font: 'var(--text-body)', fontSize: 'var(--fs-body-lg)', color: 'var(--text-secondary)' }}>
          Dinos qué hay en tu gimnasio y armamos un plan. Gratis, sin entrenador.
        </p>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth icon="dumbbell" onClick={onNext}>Empezar</Button>
      </Footer>
    </>
  )
}

function GoalStep({ goal, setGoal, onNext }: { goal: Goal | null; setGoal: (g: Goal) => void; onNext: () => void }) {
  return (
    <>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Cuál es tu objetivo?</h1>
        <p style={{ margin: '0 0 18px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Puedes cambiarlo cuando quieras.</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {GOALS.map(g => (
            <OptionRow key={g.id} title={g.title} subtitle={g.sub} selected={goal === g.id} onClick={() => setGoal(g.id)} />
          ))}
        </div>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth disabled={!goal} onClick={onNext}>Continuar</Button>
      </Footer>
    </>
  )
}

function GymStep({ picked, toggle, onNext }: { picked: string[]; toggle: (id: string) => void; onNext: () => void }) {
  return (
    <>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Qué hay en tu gimnasio?</h1>
        <p style={{ margin: '0 0 16px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Marca las máquinas que puedes usar.</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {EQUIPMENT.map(e => (
            <OptionRow
              key={e.id}
              multi
              icon={e.icon}
              title={e.name}
              subtitle={e.sub}
              selected={picked.includes(e.id)}
              onClick={() => toggle(e.id)}
            />
          ))}
        </div>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth icon="sparkles" disabled={picked.length === 0} onClick={onNext}>
          {picked.length ? `Continuar · ${picked.length} máquinas` : 'Continuar'}
        </Button>
      </Footer>
    </>
  )
}

function PlanStep({ days, setDays, weight, setWeight, goal, onDone, busy }: {
  days: number
  setDays: (d: number) => void
  weight: string
  setWeight: (w: string) => void
  goal: Goal | null
  onDone: () => void
  busy: boolean
}) {
  const goalLabel =
    goal === 'fuerza'  ? 'ganar fuerza' :
    goal === 'musculo' ? 'ganar músculo' :
    goal === 'peso'    ? 'perder peso' :
                         'mantenerte activo'

  return (
    <>
      <Scroll>
        <h1 style={{ margin: '8px 0 6px', font: 'var(--text-h1)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)' }}>¿Cuántos días por semana?</h1>
        <p style={{ margin: '0 0 18px', font: 'var(--text-body)', color: 'var(--text-muted)' }}>Sé realista; es más fácil subir después.</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[2, 3, 4, 5, 6].map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setDays(d)}
              style={{
                flex: 1, height: 64, borderRadius: 'var(--radius-control)', cursor: 'pointer',
                background: days === d ? 'var(--surface-accent)' : 'var(--surface-card)',
                border: '1px solid ' + (days === d ? 'transparent' : 'var(--border-subtle)'),
                color: days === d ? 'var(--text-on-accent)' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 22,
              }}
            >{d}</button>
          ))}
        </div>
        <Input
          label="Peso corporal"
          type="number"
          value={weight}
          suffix="kg"
          hint="Opcional. Se usa para estimar la carga inicial."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
        />
        <div style={{ height: 16 }} />
        <AICallout title="Lo que haremos">
          Con {days} días y tu objetivo de {goalLabel}, armamos una rutina a medida. Puedes cambiar cualquier ejercicio.
        </AICallout>
      </Scroll>
      <Footer>
        <Button size="lg" fullWidth icon="check" disabled={busy} onClick={onDone}>
          {busy ? 'Creando tu rutina…' : 'Crear mi rutina'}
        </Button>
      </Footer>
    </>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep]           = useState(0)
  const [goal, setGoal]           = useState<Goal | null>(null)
  const [equipment, setEquipment] = useState<string[]>([])
  const [days, setDays]           = useState(3)
  const [weight, setWeight]       = useState('')
  const [busy, setBusy]           = useState(false)

  const toggle = (id: string) =>
    setEquipment(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  async function finish() {
    setBusy(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setBusy(false); return }

    await updateProfile({
      goal: goal ? GOAL_MAP[goal] : 'maintain',
      equipment,
      onboarding_done: true,
    })

    if (weight) {
      await supabase.from('body_logs').insert({
        user_id: user.id,
        weight_kg: parseFloat(weight),
        logged_on: new Date().toISOString().split('T')[0],
      })
    }

    const { data: routine } = await supabase
      .from('routines')
      .insert({ user_id: user.id, name: 'Mi rutina', is_active: true })
      .select('id')
      .single()

    if (routine) {
      const dayRows = Array.from({ length: days }, (_, i) => ({
        routine_id: routine.id,
        name: DAY_NAMES[i] ?? `Día ${i + 1}`,
        order_index: i,
      }))
      await supabase.from('routine_days').insert(dayRows)
    }

    router.replace('/dashboard')
  }

  const TOTAL_STEPS = 4
  const steps = [
    <WelcomeStep key="welcome" onNext={() => setStep(1)} />,
    <GoalStep    key="goal"    goal={goal} setGoal={setGoal} onNext={() => setStep(2)} />,
    <GymStep     key="gym"     picked={equipment} toggle={toggle} onNext={() => setStep(3)} />,
    <PlanStep    key="plan"    days={days} setDays={setDays} weight={weight} setWeight={setWeight} goal={goal} onDone={finish} busy={busy} />,
  ]

  return (
    <div className="onboarding-root">
      <div className="onboarding-nav">
        {step > 0 ? (
          <button type="button" aria-label="Atrás" className="onboarding-back" onClick={() => setStep(s => s - 1)}>
            <Icon name="chevron-left" size="md" color="var(--text-secondary)" />
          </button>
        ) : (
          <span style={{ width: 20 }} />
        )}
        <StepDots count={TOTAL_STEPS} index={step} style={{ flex: 1 }} />
        {step > 0 && step < TOTAL_STEPS - 1 ? (
          <button type="button" className="onboarding-skip" onClick={finish}>Saltar</button>
        ) : (
          <span style={{ width: 28 }} />
        )}
      </div>
      {steps[step]}
    </div>
  )
}
