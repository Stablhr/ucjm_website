import { Search, Music } from 'lucide-react'
import { useEffect } from 'react'
import useSongsStore from './songsStore'
import SongCard from './SongCard'

export default function SongList({ onSelectSong }) {
  const searchQuery = useSongsStore((s) => s.searchQuery)
  const setSearchQuery = useSongsStore((s) => s.setSearchQuery)
  const activeCategory = useSongsStore((s) => s.activeCategory)
  const setActiveCategory = useSongsStore((s) => s.setActiveCategory)
  const fetchSongs = useSongsStore((s) => s.fetchSongs)
  const loading = useSongsStore((s) => s.loading)
  const filteredSongs = useSongsStore((s) => s.getFilteredSongs())
  const categories = useSongsStore((s) => s.getCategories())

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-sm bg-slate/5"
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
          placeholder="Search songs..."
          className="w-full rounded-sm border border-divider py-3 pl-10 pr-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>

      {/* Category filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-all ${
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-accent/5 text-slate hover:bg-accent/10 hover:text-charcoal'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filteredSongs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/5">
            <Music size={22} className="text-slate/40" />
          </div>
          <p className="text-sm text-slate">No songs found</p>
          <p className="mt-1 text-xs text-slate/60">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="font-mono text-xs text-slate/50">
            {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
          </p>
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onClick={onSelectSong}
            />
          ))}
        </div>
      )}
    </div>
  )
}
