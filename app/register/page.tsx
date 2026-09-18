'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth'
import { Button } from '@/app/components/core/Button'
import { Input } from '@/app/components/forms/Input'
import '@/app/page.css'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [busy, setBusy]         = useState(false)

  async function handleRegister() {
    setError(null)
    setBusy(true)
    const result = await signUp(email, password, name)
    setBusy(false)
    if ('error' in result) {
      setError(result.error ?? 'Error desconocido')
      return
    }
    router.push('/onboarding')
  }

  return (
    <section className="login-root">
      <article className="login-header">
        <div className="login-wordmark">
          My<span className="login-wordmark-accent">Gym</span>
        </div>
        <h1 className="login-title">Crea tu cuenta</h1>
        <p className="login-subtitle">
          Empieza a registrar tu progreso hoy.
        </p>
      </article>

      <form className="login-fields">
        <Input
          label="Nombre"
          type="text"
          placeholder="Tu nombre"
          icon="user"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
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
          onClick={handleRegister}
        >
          {busy ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
        <Button
          size="lg"
          fullWidth
          variant="ghost"
          onClick={() => router.push('/')}
        >
          Ya tengo cuenta
        </Button>
      </form>
    </section>
  )
}
