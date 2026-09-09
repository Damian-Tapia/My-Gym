import { supabase } from '@/lib/supabase/client'

export type GoalType = 'lose_fat' | 'maintain' | 'gain_muscle'
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export interface ProfileUpdate {
  full_name?: string
  sex?: 'male' | 'female' | 'other'
  birth_date?: string
  height_cm?: number
  activity_level?: ActivityLevel
  goal?: GoalType
  calorie_target?: number
  protein_target_g?: number
  carbs_target_g?: number
  fat_target_g?: number
  equipment?: string[]
  onboarding_done?: boolean
}

export async function updateProfile(data: ProfileUpdate) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  const { error } = await supabase
    .from('profiles')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', user.id)
  return error ? { error: error.message } : { ok: true }
}

export async function getFullProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  return data
}
