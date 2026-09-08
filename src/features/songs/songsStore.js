import { create } from 'zustand'
import { supabase } from '../../services/supabase'

const useSongsStore = create((set, get) => ({
  songs: [],
  loading: false,
  loaded: false,
  searchQuery: '',
  activeCategory: 'All',
  activeArtist: 'All',
  activeAlbum: 'All',
  activeLanguage: 'All',
  viewMode: 'grid',
  transposeOffset: 0,
  currentSongId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setActiveArtist: (artist) => set({ activeArtist: artist }),
  setActiveAlbum: (album) => set({ activeAlbum: album }),
  setActiveLanguage: (language) => set({ activeLanguage: language }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setTransposeOffset: (offset) => set({ transposeOffset: offset }),
  setCurrentSongId: (id) => set({ currentSongId: id }),

  recentlyViewed: [],
  addRecentlyViewed: (song) =>
    set((state) => {
      const filtered = state.recentlyViewed.filter((s) => s.id !== song.id)
      return { recentlyViewed: [song, ...filtered].slice(0, 6) }
    }),

  fetchSongs: async (force = false) => {
    const { loaded } = get()
    if (loaded && !force) return
    if (!loaded) set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ songs: data || [], loaded: true })
    } catch (e) {
      console.error('fetchSongs error:', e)
      set({ songs: [] })
    } finally {
      set({ loading: false })
    }
  },

  addSong: async (songData) => {
    const { data, error } = await supabase
      .from('songs')
      .insert({
        title: songData.title,
        artist: songData.artist || '',
        key: songData.key || 'G',
        category: songData.category || 'Worship',
        language: songData.language || 'English',
        lyrics_with_chords: songData.lyrics_with_chords || '',
        youtube_url: songData.youtube_url || '',
        album: songData.album || '',
        album_year: songData.album_year || null,
        image_url: songData.image_url || '',
        image_color: songData.image_color || 'from-gray-300 to-gray-100',
      })
      .select()
      .single()

    if (error) throw error
    set((state) => ({ songs: [data, ...state.songs] }))
    return data
  },

  updateSong: async (song, fields) => {
    const { error } = await supabase
      .from('songs')
      .update({
        title: fields.title,
        artist: fields.artist || '',
        key: fields.key || 'G',
        category: fields.category || 'Worship',
        language: fields.language || 'English',
        lyrics_with_chords: fields.lyrics_with_chords || '',
        youtube_url: fields.youtube_url || '',
        album: fields.album || '',
        album_year: fields.album_year || null,
        image_url: fields.image_url || '',
        image_color: fields.image_color || 'from-gray-300 to-gray-100',
      })
      .eq('id', song.id)

    if (error) throw error

    const updated = { ...song, ...fields }
    set((state) => ({
      songs: state.songs.map((s) => (s.id === song.id ? updated : s)),
    }))
    return updated
  },

  deleteSong: async (song) => {
    const { error } = await supabase.from('songs').delete().eq('id', song.id)
    if (error) throw error

    set((state) => ({
      songs: state.songs.filter((s) => s.id !== song.id),
    }))
  },

  getFilteredSongs: () => {
    const { songs, searchQuery, activeCategory, activeArtist, activeAlbum, activeLanguage } = get()
    let filtered = songs

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          (s.album || '').toLowerCase().includes(q)
      )
    }

    if (activeCategory !== 'All') {
      filtered = filtered.filter((s) => s.category === activeCategory)
    }

    if (activeArtist !== 'All') {
      filtered = filtered.filter((s) => s.artist === activeArtist)
    }

    if (activeAlbum !== 'All') {
      filtered = filtered.filter((s) => (s.album || '') === activeAlbum)
    }

    if (activeLanguage !== 'All') {
      filtered = filtered.filter((s) => s.language === activeLanguage)
    }

    return filtered
  },

  getCategories: () => {
    const { songs } = get()
    const cats = new Set(songs.map((s) => s.category))
    return ['All', ...cats]
  },

  getArtists: () => {
    const { songs } = get()
    const artists = new Set(songs.map((s) => s.artist).filter(Boolean))
    return ['All', ...artists]
  },

  getAlbums: () => {
    const { songs } = get()
    const albums = new Set(songs.map((s) => s.album).filter(Boolean))
    return ['All', ...albums]
  },

  getLanguages: () => {
    const { songs } = get()
    const langs = new Set(songs.map((s) => s.language).filter(Boolean))
    return ['All', ...langs]
  },

  reset: () => {
    set({
      songs: [],
      searchQuery: '',
      activeCategory: 'All',
      activeArtist: 'All',
      activeAlbum: 'All',
      activeLanguage: 'All',
      viewMode: 'grid',
      transposeOffset: 0,
      currentSongId: null,
      recentlyViewed: [],
      loaded: false,
    })
  },
}))

export default useSongsStore
