"use client"
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('_test_connection_').select().limit(1).then(({ error }) => {
      if (error?.code === '42P01' || error?.message?.includes('does not exist')) {
        setStatus('connected')
        setDetail('DB reachable (table not found — expected)')
      } else if (error) {
        setStatus('error')
        setDetail(error.message)
      } else {
        setStatus('connected')
        setDetail('DB reachable')
      }
    })
  }, [])

  return (
    <div style={{ padding: 32, fontFamily: 'monospace' }}>
      <p>Supabase: <strong>{status}</strong></p>
      <p>{detail}</p>
    </div>
  )
}
