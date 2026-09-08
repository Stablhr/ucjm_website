import { create } from 'zustand'
import { supabase } from '../../services/supabase'

const useFavoritesStore = create((set, get) => ({
  favoriteIds: new Set(),
  loaded: false,

  loadFavorites: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      set({ favoriteIds: new Set(), loaded: true })
      return
    }
    const { data, error } = await supabase
      .from('song_favorites')
      .select('song_id')
      .eq('user_id', user.id)
    if (error) {
      console.error('loadFavorites error:', error)
    }
    set({
      favoriteIds: new Set((data || []).map((f) => f.song_id)),
      loaded: true,
    })
  },

  isFavorite: (songId) => get().favoriteIds.has(songId),

  toggleFavorite: async (songId) => {
    const { favoriteIds } = get()
    const isFav = favoriteIds.has(songId)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (isFav) {
      await supabase
        .from('song_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)
      const next = new Set(favoriteIds)
      next.delete(songId)
      set({ favoriteIds: next })
    } else {
      await supabase
        .from('song_favorites')
        .insert({ user_id: user.id, song_id: songId })
      const next = new Set(favoriteIds)
      next.add(songId)
      set({ favoriteIds: next })
    }
  },

  reset: () => set({ favoriteIds: new Set(), loaded: false }),
}))

export default useFavoritesStore
