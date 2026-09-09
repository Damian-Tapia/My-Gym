'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'
import { login } from '@/lib/auth'
import { getFullProfile } from '@/lib/profile'
import { Button } from '@/components/core/Button'
import { Input } from '@/components/forms/Input'
import './page.css'

export default function Page() {
  const router = useRouter()
  const { session, loading } = useSession()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [busy, setBusy]         = useState(false)

  useEffect(() => {
    if (!loading && session) {
      getFullProfile().then(profile => {
        router.replace(profile?.onboarding_done ? '/dashboard' : '/onboarding')
      })
    }
  }, [session, loading, router])

  if (loading || session) return null

  async function handleLogin() {
    setError(null)
    setBusy(true)
    const result = await login(email, password)
    setBusy(false)
    if ('error' in result) {
      setError(result.error ?? 'Error desconocido')
      return
    }
    const profile = await getFullProfile()
    router.push(profile?.onboarding_done ? '/dashboard' : '/onboarding')
  }

  return (
    <section className="login-root">
      <article className="login-header">
        <div className="login-wordmark">
          My<span className="login-wordmark-accent">Gym</span>
        </div>
        <h1 className="login-title">Vuelve a entrar</h1>
        <p className="login-subtitle">
          Tu historial sigue aquí, aunque hayas parado dos semanas o dos años.
        </p>
      </article>

      <form className="login-fields">
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
        <div className="login-spacer" />
        <Button
          size="lg"
          fullWidth
          disabled={busy || !email || !password}
          onClick={handleLogin}
        >
          {busy ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </section>
  )
}
