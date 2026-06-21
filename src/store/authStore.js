import { create } from 'zustand'
import { supabase } from '../services/supabase'

const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  isLoggedIn: false,
  loading: true,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  clearUser: () => set({ user: null, profile: null, isLoggedIn: false }),

  fetchProfile: async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (data) set({ profile: data })
  },

  initialize: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()
        set({ user, profile: profile ?? null, isLoggedIn: true })
      } catch {
        set({ user, isLoggedIn: true })
      }
    }
    set({ loading: false })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      if (u) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', u.id)
            .maybeSingle()
          set({ user: u, profile: profile ?? null, isLoggedIn: true })
        } catch {
          set({ user: u, isLoggedIn: true })
        }
      } else {
        set({ user: null, profile: null, isLoggedIn: false })
      }
    })
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle()
      set({ user: data.user, profile: profile ?? null, isLoggedIn: true })
    } catch {
      set({ user: data.user, isLoggedIn: true })
    }
    return data
  },

  signUp: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({ email, password }, { data: { full_name: name } })
    if (error) throw error
    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null, isLoggedIn: false })
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) throw error
  },
}))

export default useAuthStore
