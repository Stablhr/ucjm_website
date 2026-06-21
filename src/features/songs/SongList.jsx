import { Search, Music, Grid3X3, List } from 'lucide-react'
import { useEffect } from 'react'
import useSongsStore from './songsStore'
import SongCard from './SongCard'

export default function SongList({ onSelectSong }) {
  const searchQuery = useSongsStore((s) => s.searchQuery)
  const setSearchQuery = useSongsStore((s) => s.setSearchQuery)
  const activeCategory = useSongsStore((s) => s.activeCategory)
  const setActiveCategory = useSongsStore((s) => s.setActiveCategory)
  const activeArtist = useSongsStore((s) => s.activeArtist)
  const setActiveArtist = useSongsStore((s) => s.setActiveArtist)
  const activeAlbum = useSongsStore((s) => s.activeAlbum)
  const setActiveAlbum = useSongsStore((s) => s.setActiveAlbum)
  const activeLanguage = useSongsStore((s) => s.activeLanguage)
  const setActiveLanguage = useSongsStore((s) => s.setActiveLanguage)
  const viewMode = useSongsStore((s) => s.viewMode)
  const setViewMode = useSongsStore((s) => s.setViewMode)
  const fetchSongs = useSongsStore((s) => s.fetchSongs)
  const loading = useSongsStore((s) => s.loading)
  const filteredSongs = useSongsStore((s) => s.getFilteredSongs())
  const categories = useSongsStore((s) => s.getCategories())
  const artists = useSongsStore((s) => s.getArtists())
  const albums = useSongsStore((s) => s.getAlbums())
  const languages = useSongsStore((s) => s.getLanguages())

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  if (loading) {
    return (
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        : 'space-y-3'
      }>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-lg bg-slate/5 ${
              viewMode === 'grid' ? 'aspect-[2/1.4]' : 'h-16'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Search */}
      <div className="group relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate transition-colors group-focus-within:text-accent"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs, artists, albums..."
          className="w-full rounded-lg border border-divider py-3 pl-10 pr-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>

      {/* Filter dropdowns row */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          value={activeArtist}
          onChange={(e) => setActiveArtist(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-1.5 font-mono text-xs text-slate outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        >
          {artists.map((a) => (
            <option key={a} value={a}>
              {a === 'All' ? 'All Artists' : a}
            </option>
          ))}
        </select>

        <select
          value={activeAlbum}
          onChange={(e) => setActiveAlbum(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-1.5 font-mono text-xs text-slate outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        >
          {albums.map((a) => (
            <option key={a} value={a}>
              {a === 'All' ? 'All Albums' : a}
            </option>
          ))}
        </select>

        <select
          value={activeLanguage}
          onChange={(e) => setActiveLanguage(e.target.value)}
          className="rounded-lg border border-divider bg-white px-3 py-1.5 font-mono text-xs text-slate outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {l === 'All' ? 'All Languages' : l}
            </option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1 rounded-lg border border-divider bg-white p-0.5">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-accent text-white'
                : 'text-slate hover:text-charcoal'
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 size={14} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-1.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-accent text-white'
                : 'text-slate hover:text-charcoal'
            }`}
            aria-label="List view"
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-accent/5 text-slate hover:bg-accent/10 hover:text-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {filteredSongs.length > 0 && (
        <p className="mb-3 font-mono text-xs text-slate/50">
          {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Results */}
      {filteredSongs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/5">
            <Music size={22} className="text-slate/40" />
          </div>
          <p className="text-sm text-slate">No songs found</p>
          <p className="mt-1 text-xs text-slate/60">
            Try adjusting your search or filters
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={onSelectSong}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={onSelectSong}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}