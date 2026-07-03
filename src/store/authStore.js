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
        if (!profile) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              avatar_url: '',
              role: 'member',
            })
            .select()
            .single()
          if (newProfile) set({ profile: newProfile })
        }
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
          if (!profile) {
            const { data: newProfile } = await supabase
              .from('profiles')
              .upsert({
                id: u.id,
                email: u.email,
                full_name: u.user_metadata?.full_name || '',
                avatar_url: '',
                role: 'member',
              })
              .select()
              .single()
            if (newProfile) set({ profile: newProfile })
          }
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

  signInWithOAuth: async (provider, options = {}) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider, options })
    if (error) throw error
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null, isLoggedIn: false })
  },

  refreshProfile: async () => {
    const { user } = useAuthStore.getState()
    if (!user) return
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
    if (data) {
      set({ profile: data })
    } else {
      const { data: newProfile } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar_url: '',
          role: 'member',
        })
        .select()
        .single()
      if (newProfile) set({ profile: newProfile })
    }
  },

  updateProfile: async (updates) => {
    const user = useAuthStore.getState().user
    if (!user) throw new Error('Not authenticated')
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw error
    if (data) set({ profile: data })
    return data
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })
    if (error) throw error
  },
}))

export default useAuthStore
