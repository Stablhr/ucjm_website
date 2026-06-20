import { create } from 'zustand'
import { supabase } from '../services/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  loading: true,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  clearUser: () => set({ user: null, isLoggedIn: false }),

  initialize: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    set({ user, isLoggedIn: !!user, loading: false })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, isLoggedIn: !!session?.user })
    })
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    set({ user: data.user, isLoggedIn: true })
    return data
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, isLoggedIn: false })
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) throw error
  },
}))

export default useAuthStore
