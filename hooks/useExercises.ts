'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export type Exercise = {
  id: string
  name: string
  primary_muscle: string | null
  secondary_muscles: string[] | null
  equipment: string | null
  category: string | null
  difficulty: string | null
  instructions: string[] | null
  media_url: string | null
}

type Filters = {
  search?: string
  muscle?: string
  equipment?: string
  category?: string
  difficulty?: string
}

export function useExercises(filters: Filters = {}) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetch() {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('exercises')
        .select('id,name,primary_muscle,secondary_muscles,equipment,category,difficulty,instructions,media_url')
        .order('name')

      if (filters.search) query = query.ilike('name', `%${filters.search}%`)
      if (filters.muscle) query = query.eq('primary_muscle', filters.muscle)
      if (filters.equipment) query = query.eq('equipment', filters.equipment)
      if (filters.category) query = query.eq('category', filters.category)
      if (filters.difficulty) query = query.eq('difficulty', filters.difficulty)

      const { data, error: err } = await query

      if (!cancelled) {
        if (err) setError(err.message)
        else setExercises(data ?? [])
        setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [filters.search, filters.muscle, filters.equipment, filters.category, filters.difficulty])

  return { exercises, loading, error }
}
