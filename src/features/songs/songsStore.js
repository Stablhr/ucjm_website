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
  loaded: false,
  searchQuery: '',
  activeCategory: 'All',
  activeArtist: 'All',
  activeAlbum: 'All',
  activeLanguage: 'All',
  viewMode: 'grid',
  transposeOffset: 0,
  currentSongId: null,
  hiddenSongIds: [],

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
      const filtered = state.recentlyViewed.filter(
        (s) => s.id !== song.id
      )
      return {
        recentlyViewed: [song, ...filtered].slice(0, 6),
      }
    }),

  fetchSongs: async (force = false) => {
    const { loaded, songs } = get()
    if (loaded && !force) return
    if (!loaded) set({ loading: true })
    try {
      const res = await fetch(`/songs.json?t=${Date.now()}`)
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

      if (error) {
        console.error('Failed to load songs from Supabase:', error)
      }

      const userSongs = !error && supabaseSongs
        ? supabaseSongs.map((s) => ({ ...s, _source: 'user' }))
        : []

      // Build edits map: newest user song wins per title+artist
      const editsMap = new Map()
      userSongs.forEach((s) => {
        const key = `${s.title.toLowerCase()}|${(s.artist || '').toLowerCase()}`
        if (!editsMap.has(key)) {
          editsMap.set(key, s)
        }
      })

      const mergedBuiltIn = builtIn.map((s) => {
        const key = `${s.title.toLowerCase()}|${s.artist.toLowerCase()}`
        if (editsMap.has(key)) {
          const edit = editsMap.get(key)
          return { ...edit, id: `edit-${s.id}`, _source: 'user' }
        }
        return s
      })

      const builtInKeys = new Set(builtIn.map((s) => `${s.title.toLowerCase()}|${s.artist.toLowerCase()}`))
      const uniqueUserSongs = userSongs.filter(
        (s) => !builtInKeys.has(`${s.title.toLowerCase()}|${(s.artist || '').toLowerCase()}`)
      )

      const hidden = get().hiddenSongIds || []
      set({ songs: [...mergedBuiltIn, ...uniqueUserSongs].filter((s) => !hidden.includes(s.id)), userSongs: [...uniqueUserSongs].filter((s) => !hidden.includes(s.id)), loaded: true })
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

    const newSong = { ...data, _source: 'user' }
    set((state) => ({ songs: [newSong, ...state.songs], userSongs: [newSong, ...state.userSongs] }))
    return newSong
  },

  updateSong: async (song, fields) => {
    if (song._source === 'user' && song.id && !song.id.startsWith('edit-')) {
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
        userSongs: state.userSongs.map((s) => (s.id === song.id ? updated : s)),
      }))
      return updated
    }

    // For built-in songs: upsert an edit record keyed by title+artist
    const keyTitle = fields.title || song.title
    const keyArtist = fields.artist || song.artist || ''

    const { data: existing } = await supabase
      .from('songs')
      .select('id')
      .eq('title', keyTitle)
      .eq('artist', keyArtist)
      .maybeSingle()

    const payload = {
      title: keyTitle,
      artist: keyArtist,
      key: fields.key || song.key || 'G',
      category: fields.category || song.category || 'Worship',
      language: fields.language || song.language || 'English',
      lyrics_with_chords: fields.lyrics_with_chords || song.lyrics_with_chords || '',
      youtube_url: fields.youtube_url !== undefined ? fields.youtube_url : song.youtube_url || '',
      album: fields.album !== undefined ? fields.album : song.album || '',
      album_year: fields.album_year !== undefined ? fields.album_year : song.album_year || null,
      image_url: fields.image_url !== undefined ? fields.image_url : song.image_url || '',
      image_color: fields.image_color !== undefined ? fields.image_color : song.image_color || 'from-gray-300 to-gray-100',
    }

    let data
    if (existing) {
      const { error } = await supabase
        .from('songs')
        .update(payload)
        .eq('id', existing.id)
      if (error) throw error
      data = { ...payload, id: existing.id, created_at: song.created_at }
    } else {
      const { data: inserted, error } = await supabase
        .from('songs')
        .insert(payload)
        .select()
        .single()
      if (error) throw error
      data = inserted
    }

    const newSong = { ...data, _source: 'user' }
    set((state) => ({
      songs: state.songs.map((s) =>
        s.id === song.id ? { ...newSong, id: `edit-${s.id}` } : s
      ),
      userSongs: [
        ...state.userSongs.filter(
          (s) => s.title !== keyTitle || s.artist !== keyArtist
        ),
        newSong,
      ],
    }))
    return { ...newSong, id: `edit-${song.id}` }
  },

  deleteSong: async (song) => {
    if (song._source === 'user') {
      if (song.id && !song.id.startsWith('edit-')) {
        const { error } = await supabase.from('songs').delete().eq('id', song.id)
        if (error) throw error
      } else if (song.id && song.id.startsWith('edit-')) {
        const { error } = await supabase
          .from('songs')
          .delete()
          .eq('title', song.title)
          .eq('artist', song.artist || '')
        if (error) throw error
      }
    }

    // Also mark built-in songs as hidden so they don't reappear on reload
    set((state) => ({
      songs: state.songs.filter((s) => s.id !== song.id),
      userSongs: state.userSongs.filter((s) => s.id !== song.id),
      hiddenSongIds: [...(state.hiddenSongIds || []), song.id],
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
    _loaded = false
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
      recentlyViewed: [],
      hiddenSongIds: [],
    })
  },
}))

export default useSongsStore
