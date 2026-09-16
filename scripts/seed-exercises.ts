import { createClient } from '@supabase/supabase-js'

// ── Fill these in ──────────────────────────────────────────────────────────────
const SUPABASE_URL = ''
const SUPABASE_SERVICE_ROLE_KEY = ''   // Settings → API → service_role (never expose client-side)
const EXERCISES_API_URL = 'https://oss.exercisedb.dev/api/v1/exercises'           // e.g. https://oss.exercisedb.dev/api/v1/exercises
// ──────────────────────────────────────────────────────────────────────────────

type ExternalExercise = {
  exerciseId: string
  name: string
  targetMuscles?: string[]
  bodyParts?: string[]
  equipments?: string[]
  secondaryMuscles?: string[]
  instructions?: string[]
  gifUrl?: string
  [key: string]: unknown
}

function mapExercise(e: ExternalExercise) {
  return {
    source: 'exercisedb',
    external_id: e.exerciseId,
    name: e.name,
    primary_muscle: e.targetMuscles?.[0] ?? null,
    secondary_muscles: e.secondaryMuscles ?? null,
    equipment: e.equipments?.[0] ?? null,
    category: e.bodyParts?.[0] ?? null,
    difficulty: null,
    instructions: e.instructions ?? null,
    media_url: e.gifUrl ?? null,
    raw: e,
  }
}

async function seed() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !EXERCISES_API_URL) {
    console.error('Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and EXERCISES_API_URL')
    process.exit(1)
  }

  console.log('Fetching exercises from external API...')
  const res = await fetch(EXERCISES_API_URL)

  if (res.status !== 200) {
    console.error(`API returned ${res.status} — aborting`)
    process.exit(1)
  }

  const data: ExternalExercise[] = await res.json()
  console.log(`Fetched ${data.length} exercises`)

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const rows = data.map(mapExercise)

  // Upsert in batches of 500 — safe for Supabase payload limits
  const BATCH = 500
  let inserted = 0

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await supabase
      .from('exercises')
      .upsert(batch, { onConflict: 'source,external_id' })

    if (error) {
      console.error(`Batch ${i}–${i + batch.length} failed:`, error.message)
      process.exit(1)
    }

    inserted += batch.length
    console.log(`Upserted ${inserted}/${rows.length}`)
  }

  console.log('Done.')
}

seed()
