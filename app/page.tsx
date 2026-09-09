'use client'
import { useState } from 'react'
import { useSession } from '@/hooks/useSession'
import { login } from '@/lib/auth'
import { Button } from '@/components/core/Button'
import { Input } from '@/components/forms/Input'

export default function Page() {
  const { session, loading } = useSession()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [busy, setBusy]         = useState(false)

  if (loading) return null

  if (session) {
    return (
      <div style={{ padding: 32, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
        <p>Logged in as {session.user.email}</p>
      </div>
    )
  }

  async function handleLogin() {
    setError(null)
    setBusy(true)
    const result = await login(email, password)
    setBusy(false)
    if ('error' in result) setError(result.error ?? 'Error desconocido')
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      minHeight: '100dvh', padding: '0 var(--gutter-screen, 20px)',
    }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36,
          letterSpacing: '-0.04em', color: 'var(--text-primary)',
        }}>
          My<span style={{ color: 'var(--amber-500)' }}>Gym</span>
        </div>
        <h1 style={{
          margin: '12px 0 4px', font: 'var(--text-h1)',
          letterSpacing: 'var(--ls-heading)', color: 'var(--text-primary)',
        }}>
          Bienvenido
        </h1>
        <p style={{ margin: 0, font: 'var(--text-body)', color: 'var(--text-secondary)' }}>
          Inicia sesión para continuar.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input
          label="Correo"
          type="email"
          placeholder="tu@correo.com"
          icon="user"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          error={error ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <div style={{ height: 4 }} />
        <Button
          size="lg"
          fullWidth
          icon="dumbbell"
          disabled={busy || !email || !password}
          onClick={handleLogin}
        >
          {busy ? 'Entrando…' : 'Entrar'}
        </Button>
      </div>
    </div>
  )
}
