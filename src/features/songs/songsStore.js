import { create } from 'zustand'
import { supabase } from '../../services/supabase'

const useSongsStore = create((set, get) => ({
  songs: [],
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
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('title')

    if (!error && data) {
      set({ songs: data })
    }
    set({ loading: false })
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
      searchQuery: '',
      activeCategory: 'All',
      transposeOffset: 0,
      currentSongId: null,
    }),
}))

export default useSongsStore
