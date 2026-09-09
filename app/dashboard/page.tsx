'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/hooks/useSession'
import { logout } from '@/lib/auth'
import { Button } from '@/components/core/Button'

export default function DashboardPage() {
  const router = useRouter()
  const { session, loading } = useSession()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/')
    }
  }, [session, loading, router])

  if (loading || !session) return null

  async function handleLogout() {
    await logout()
    router.replace('/')
  }

  return (
    <div style={{ padding: '40px var(--gutter-screen, 20px)', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.04em', marginBottom: 4 }}>
        My<span style={{ color: 'var(--amber-500)' }}>Gym</span>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, font: 'var(--text-caption)' }}>{session.user.email}</p>
      <Button variant="danger" onClick={handleLogout}>Cerrar sesión</Button>
    </div>
  )
}
