import { Search, Music, Grid3X3, List, ChevronDown, SlidersHorizontal, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Skeleton } from '../../components/ui/Skeleton'
import useSongsStore from './songsStore'
import SongCard from './SongCard'
import AddToPlaylistModal from './AddToPlaylistModal'

const ITEMS_PER_PAGE = 12

const CATEGORY_STYLES = {
  All: { dot: 'bg-accent', gradient: 'from-accent to-blue-700' },
  Praise: { dot: 'bg-amber-400', gradient: 'from-amber-400 to-orange-500' },
  Worship: { dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-600' },
  Hymn: { dot: 'bg-violet-500', gradient: 'from-violet-500 to-purple-700' },
}

const CATEGORY_COLORS = {
  Praise: 'from-amber-400 to-orange-500',
  Worship: 'from-emerald-500 to-teal-600',
  Hymn: 'from-violet-500 to-purple-700',
}

function extractYoutubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ''
}

export default function SongList({ onSelectSong }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [playlistSong, setPlaylistSong] = useState(null)

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
  const recentlyViewed = useSongsStore((s) => s.recentlyViewed)
  const addRecentlyViewed = useSongsStore((s) => s.addRecentlyViewed)
  const filteredSongs = useSongsStore((s) => s.getFilteredSongs())
  const categories = useSongsStore((s) => s.getCategories())
  const artists = useSongsStore((s) => s.getArtists())
  const albums = useSongsStore((s) => s.getAlbums())
  const languages = useSongsStore((s) => s.getLanguages())

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [searchQuery, activeCategory, activeArtist, activeAlbum, activeLanguage])

  const handleSelectSong = (song) => {
    addRecentlyViewed(song)
    onSelectSong(song)
  }

  const visibleSongs = filteredSongs.slice(0, visibleCount)
  const hasMore = visibleCount < filteredSongs.length

  const FilterContent = ({ mobile }) => (
    <div className={`${mobile ? 'space-y-4' : 'flex flex-wrap items-center gap-2'}`}>
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
    </div>
  )

  if (loading) {
    return (
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        : 'space-y-3'
      }>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className={viewMode === 'grid' ? 'aspect-[2/1.4] rounded-xl' : 'h-16 rounded-lg'}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative -mx-4 -mt-4 mb-8 overflow-hidden bg-gradient-to-br from-accent via-blue-800 to-indigo-900 px-4 pb-10 pt-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute -bottom-6 left-1/2 h-32 w-[120%] -translate-x-1/2 rounded-[50%] bg-white/[0.02] blur-2xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-white/60 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {filteredSongs.length > 0 ? `${filteredSongs.length} songs` : 'Loading...'}
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Song Library
              </h1>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-white/65">
                Browse worship songs and manage Sunday service playlists.
              </p>
            </div>

            <div className="hidden shrink-0 sm:block">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10">
                <Music size={32} className="text-white/25" />
              </div>
            </div>
          </div>

          <div className="group relative mt-7">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 transition-colors group-focus-within:text-white/80"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs, artists, albums..."
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-11 pr-3 text-sm text-white outline-none backdrop-blur-sm placeholder:text-white/40 transition-all focus:border-white/40 focus:bg-white/[0.15] focus:ring-2 focus:ring-white/10"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Category chips + View toggle */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const style = CATEGORY_STYLES[cat] || { dot: 'bg-accent', gradient: 'from-accent to-blue-700' }
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                    activeCategory === cat
                      ? `bg-gradient-to-br ${style.gradient} text-white shadow-sm`
                      : 'bg-accent/5 text-slate hover:bg-accent/10 hover:text-charcoal'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot} ${activeCategory === cat ? 'bg-white/70' : ''}`} />
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-1.5 rounded-lg border border-divider px-3 py-1.5 text-xs text-slate transition-colors hover:border-accent/30 hover:text-accent sm:hidden"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* View toggle - hidden on very small screens */}
            <div className="hidden items-center gap-1 rounded-lg border border-divider bg-white p-0.5 xs:flex">
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
        </div>

        {/* Filter dropdowns row - hidden on mobile */}
        <div className="mb-4 hidden sm:block">
          <FilterContent mobile={false} />
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && filteredSongs.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-slate/50">
              Recently Viewed
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {recentlyViewed.map((song) => (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-divider bg-white px-3 py-2 text-left text-xs transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <div className={`h-8 w-8 shrink-0 overflow-hidden rounded-md bg-gradient-to-br ${CATEGORY_COLORS[song.category] || 'from-accent to-blue-700'}`}>
                    {song.image_url ? (
                      <img src={song.image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Music size={12} className="text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-charcoal">{song.title}</p>
                    <p className="truncate text-slate/60">{song.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {filteredSongs.length > 0 && (
          <p className="mb-3 font-mono text-xs text-slate/50">
            {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Results */}
        {filteredSongs.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent/10 to-accent/5">
              <Search size={24} className="text-accent/30" />
            </div>
            <p className="text-base font-medium text-charcoal">No songs found</p>
            <p className="mt-1 text-sm text-slate/60">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : 'Try adjusting your search or filters'}
            </p>
            {(searchQuery || activeCategory !== 'All' || activeArtist !== 'All' || activeAlbum !== 'All' || activeLanguage !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('All')
                  setActiveArtist('All')
                  setActiveAlbum('All')
                  setActiveLanguage('All')
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-divider px-4 py-2 text-sm text-slate transition-colors hover:border-accent/30 hover:text-accent"
              >
                <X size={14} />
                Clear all filters
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSongs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                onClick={handleSelectSong}
                viewMode={viewMode}
                index={i}
                onAddToPlaylist={setPlaylistSong}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {visibleSongs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                onClick={handleSelectSong}
                viewMode={viewMode}
                index={i}
                onAddToPlaylist={setPlaylistSong}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="inline-flex items-center gap-2 rounded-lg border border-divider px-6 py-3 text-sm text-slate transition-colors hover:border-accent/30 hover:text-accent active:scale-[0.98]"
            >
              <ChevronDown size={16} />
              Show More ({filteredSongs.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div className="absolute inset-0 bg-charcoal/30" onClick={() => setShowMobileFilters(false)} />
          <div className="relative w-full animate-fade-up rounded-t-2xl border-t border-divider bg-ivory p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-charcoal">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-slate transition-colors hover:text-charcoal"
              >
                <X size={18} />
              </button>
            </div>
            <FilterContent mobile />
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-6 w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Add to Playlist Modal */}
      {playlistSong && (
        <AddToPlaylistModal
          song={playlistSong}
          onClose={() => setPlaylistSong(null)}
        />
      )}
    </div>
  )
}
