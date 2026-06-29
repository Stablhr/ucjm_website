import { useState } from 'react'
import { Music, Youtube } from 'lucide-react'

const CATEGORY_COLORS = {
  Praise: 'from-amber-400 to-orange-500',
  Worship: 'from-emerald-500 to-teal-600',
  Hymn: 'from-violet-500 to-purple-700',
}

const LANG_LABELS = {
  Filipino: 'FIL',
  English: 'ENG',
  Both: 'MIX',
}

function getGradient(song) {
  if (song.image_color) return song.image_color
  return CATEGORY_COLORS[song.category] || 'from-gray-400 to-gray-600'
}

function Monogram({ song, className }) {
  const gradient = getGradient(song)
  const [imgError, setImgError] = useState(false)
  const showImg = song.image_url && !imgError

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
    >
      {showImg ? (
        <img
          src={song.image_url}
          alt={song.title}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <Music size={24} className="text-white/40" />
      )}
    </div>
  )
}

export default function SongCard({ song, onClick, viewMode }) {
  const catColor = CATEGORY_COLORS[song.category] || 'from-gray-400 to-gray-600'

  if (viewMode === 'list') {
    return (
      <button
        onClick={() => onClick?.(song)}
        className="group flex w-full items-center gap-4 rounded-lg border border-divider bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm"
      >
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Monogram song={song} className="h-full w-full" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-charcoal">
            {song.title}
          </h3>
          <p className="truncate text-xs text-slate">{song.artist}</p>
          {song.album && (
            <p className="truncate text-xs text-slate/50">{song.album}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {song.youtube_url && (
            <span className="text-red-500">
              <Youtube size={14} />
            </span>
          )}
          <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
            {song.key}
          </span>
          <span
            className={`hidden rounded-lg bg-gradient-to-br ${catColor} px-2 py-0.5 font-mono text-xs text-white sm:inline-block`}
          >
            {song.category}
          </span>
          <span className="font-mono text-xs text-slate/60">
            {LANG_LABELS[song.language] || song.language}
          </span>
        </div>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="shrink-0 text-slate/20 transition-colors group-hover:text-accent/50"
        >
          <path
            d="M6 3l5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={() => onClick?.(song)}
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-divider bg-white text-left transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
    >
      {/* Art area */}
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <Monogram song={song} className="h-full w-full" />
        <div className="absolute bottom-2 left-2">
          <span className="inline-block rounded-lg bg-white/90 px-2 py-0.5 font-mono text-xs font-bold text-accent shadow-sm">
            {song.key}
          </span>
        </div>
        <div className="absolute right-2 top-2 flex gap-1">
          {song.youtube_url && (
            <span className="inline-flex items-center gap-0.5 rounded-lg bg-red-500/80 px-1.5 py-0.5 font-mono text-[10px] text-white shadow-sm">
              <Youtube size={10} />
            </span>
          )}
          <span className="inline-block rounded-lg bg-white/80 px-1.5 py-0.5 font-mono text-[10px] uppercase text-slate shadow-sm">
            {LANG_LABELS[song.language] || song.language}
          </span>
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="line-clamp-1 font-display text-base font-bold text-charcoal group-hover:text-accent">
            {song.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-slate">{song.artist}</p>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`rounded-lg bg-gradient-to-br ${catColor} px-2 py-0.5 font-mono text-[10px] text-white`}
          >
            {song.category}
          </span>
          {song.album && (
            <span className="truncate font-mono text-[10px] text-slate/50">
              {song.album}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}