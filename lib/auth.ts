import { supabase } from '@/lib/supabase/client'

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  return { user: data.user, session: data.session }
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  return error ? { error: error.message } : { ok: true }
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export async function getMyProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .eq('id', user.id)
    .single()
  if (error) return null
  return data as Profile
}

export async function signUp(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email, password, options: { data: { full_name: fullName ?? null } },
  })
  if (error) return { error: error.message }
  return { user: data.user, session: data.session }
}
