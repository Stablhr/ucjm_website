import { create } from 'zustand'
import { supabase } from '../../services/supabase'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const useSongsStore = create((set, get) => ({
  songs: [],
  userSongs: [],
  loading: false,
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

  fetchSongs: async () => {
    set({ loading: true })
    try {
      const res = await fetch('/songs.json')
      const jsonSongs = await res.json()
      const builtIn = jsonSongs.map((s, i) => ({
        ...s,
        id: `builtin-${slugify(s.title)}-${i}`,
        _source: 'builtin',
      }))

      const { data: supabaseSongs, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

      const userSongs = !error && supabaseSongs
        ? supabaseSongs.map((s) => ({ ...s, _source: 'user' }))
        : []

      const builtInKeys = new Set(builtIn.map((s) => `${s.title.toLowerCase()}|${s.artist.toLowerCase()}`))
      const uniqueUserSongs = userSongs.filter(
        (s) => !builtInKeys.has(`${s.title.toLowerCase()}|${(s.artist || '').toLowerCase()}`)
      )

      set({ songs: [...builtIn, ...uniqueUserSongs], userSongs: uniqueUserSongs })
    } catch {
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
        image_color: songData.image_color || 'from-accent/20 to-accent/5',
      })
      .select()
      .single()

    if (error) throw error

    const newSong = { ...data, _source: 'user' }
    set((state) => ({ songs: [newSong, ...state.songs], userSongs: [newSong, ...state.userSongs] }))
    return newSong
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

  reset: () =>
    set({
      songs: [],
      userSongs: [],
      searchQuery: '',
      activeCategory: 'All',
      activeArtist: 'All',
      activeAlbum: 'All',
      activeLanguage: 'All',
      viewMode: 'grid',
      transposeOffset: 0,
      currentSongId: null,
    }),
}))

export default useSongsStore
