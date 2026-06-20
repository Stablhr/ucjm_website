import { create } from 'zustand'
import { supabase } from '../../services/supabase'

const usePlaylistStore = create((set, get) => ({
  playlists: [],
  activePlaylist: null,
  loading: false,

  fetchPlaylists: async () => {
    set({ loading: true })
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('service_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (!error && data) {
      set({ playlists: data })
    }
    set({ loading: false })
  },

  setActivePlaylist: (playlist) => set({ activePlaylist: playlist }),

  clearActivePlaylist: () => set({ activePlaylist: null }),

  createPlaylist: async ({ title, serviceDate, notes, creatorName }) => {
    const { data, error } = await supabase
      .from('playlists')
      .insert({
        title,
        service_date: serviceDate || null,
        notes: notes || '',
        creator_name: creatorName || 'Anonymous',
      })
      .select()
      .single()

    if (error) throw error

    set((state) => ({ playlists: [data, ...state.playlists] }))
    return data
  },

  updatePlaylist: async (id, updates) => {
    const { error } = await supabase
      .from('playlists')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error

    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }))
  },

  deletePlaylist: async (id) => {
    const { error } = await supabase.from('playlists').delete().eq('id', id)
    if (error) throw error

    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== id),
      activePlaylist:
        state.activePlaylist?.id === id ? null : state.activePlaylist,
    }))
  },

  addSongToPlaylist: async (playlistId, songId, position, keyOverride) => {
    const { error } = await supabase.from('playlist_songs').insert({
      playlist_id: playlistId,
      song_id: songId,
      position,
      key_override: keyOverride || '',
    })

    if (error) throw error
  },

  removeSongFromPlaylist: async (playlistId, songId) => {
    const { error } = await supabase
      .from('playlist_songs')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('song_id', songId)

    if (error) throw error
  },

  getPlaylistSongs: async (playlistId) => {
    const { data, error } = await supabase
      .from('playlist_songs')
      .select('*, songs(*)')
      .eq('playlist_id', playlistId)
      .order('position')

    if (error) throw error
    return data || []
  },

  reset: () =>
    set({
      playlists: [],
      activePlaylist: null,
    }),
}))

export default usePlaylistStore
