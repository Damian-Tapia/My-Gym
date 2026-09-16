// app/api/exercises/sync/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST() {
  const res = await fetch('https://exercisedb-api.example/exercises', {
    headers: { 'X-RapidAPI-Key': process.env.EXERCISE_API_KEY! }
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'external fetch failed' }, { status: 502 })
  }

  const exercises = await res.json()

  const rows = exercises.map((e: any) => ({
    external_id: e.id,
    name: e.name,
    body_part: e.bodyPart,
    target: e.target,
    equipment: e.equipment,
    gif_url: e.gifUrl,
    instructions: e.instructions
  }))

  const { error } = await supabaseAdmin
    .from('exercises')
    .upsert(rows, { onConflict: 'external_id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ synced: rows.length })
}