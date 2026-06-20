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
  transposeOffset: 0,
  currentSongId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveCategory: (category) => set({ activeCategory: category }),

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

      set({ songs: [...builtIn, ...userSongs], userSongs })
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
      })
      .select()
      .single()

    if (error) throw error

    const newSong = { ...data, _source: 'user' }
    set((state) => ({ songs: [newSong, ...state.songs], userSongs: [newSong, ...state.userSongs] }))
    return newSong
  },

  getFilteredSongs: () => {
    const { songs, searchQuery, activeCategory } = get()
    let filtered = songs

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q)
      )
    }

    if (activeCategory !== 'All') {
      filtered = filtered.filter((s) => s.category === activeCategory)
    }

    return filtered
  },

  getCategories: () => {
    const { songs } = get()
    const cats = new Set(songs.map((s) => s.category))
    return ['All', ...cats]
  },

  reset: () =>
    set({
      songs: [],
      userSongs: [],
      searchQuery: '',
      activeCategory: 'All',
      transposeOffset: 0,
      currentSongId: null,
    }),
}))

export default useSongsStore
