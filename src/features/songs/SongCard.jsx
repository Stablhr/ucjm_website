import { useState } from 'react'
import { Music, Youtube, Plus, Play } from 'lucide-react'
import useSongsStore from './songsStore'

const FALLBACK_GRADIENTS = [
  'from-rose-500 to-pink-600',
  'from-sky-500 to-cyan-600',
  'from-fuchsia-500 to-purple-600',
  'from-lime-500 to-green-600',
  'from-orange-400 to-red-500',
  'from-teal-500 to-cyan-600',
  'from-indigo-500 to-violet-600',
  'from-amber-500 to-yellow-600',
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-rose-400 to-red-500',
  'from-violet-500 to-fuchsia-600',
]

function pickFallbackGradient(id) {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length]
}

const CATEGORY_COLORS = {
  Praise: 'from-amber-400 to-orange-500',
  Worship: 'from-emerald-500 to-teal-600',
  Hymn: 'from-violet-500 to-purple-700',
}

const CATEGORY_DOTS = {
  Praise: 'bg-amber-400',
  Worship: 'bg-emerald-500',
  Hymn: 'bg-violet-500',
}

const LANG_LABELS = {
  Filipino: 'FIL',
  English: 'ENG',
  Both: 'MIX',
}

function getGradient(song) {
  if (song.image_color) return song.image_color
  if (CATEGORY_COLORS[song.category]) return CATEGORY_COLORS[song.category]
  return pickFallbackGradient(song.id)
}

function extractYoutubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ''
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
        <span className="font-display text-3xl font-bold text-white/30">
          {song.title.charAt(0)}
        </span>
      )}
    </div>
  )
}

export default function SongCard({ song, onClick, viewMode, index = 0, onAddToPlaylist }) {
  const catColor = CATEGORY_COLORS[song.category] || pickFallbackGradient(song.id)
  const catDot = CATEGORY_DOTS[song.category] || 'bg-accent'
  const [showActions, setShowActions] = useState(false)

  const handleAddToPlaylist = (e) => {
    e.stopPropagation()
    onAddToPlaylist?.(song)
  }

  const handlePlayPreview = (e) => {
    e.stopPropagation()
    if (song.youtube_url) {
      window.open(song.youtube_url, '_blank', 'noopener,noreferrer')
    }
  }

  if (viewMode === 'list') {
    return (
      <button
        onClick={() => onClick?.(song)}
        style={{ animationDelay: `${index * 30}ms` }}
        className="group flex w-full items-center gap-4 rounded-lg border border-divider bg-surface p-3 text-left transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm animate-fade-up opacity-0 [animation-fill-mode:forwards]"
      >
        <div className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg`}>
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

        <div className="flex shrink-0 items-center gap-2 flex-wrap">
          <span className={`h-1.5 w-1.5 rounded-full ${catDot}`} />
          {song.youtube_url && (
            <span className="text-red-500">
              <Youtube size={14} />
            </span>
          )}
          <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
            {song.key}
          </span>
          <span className={`hidden rounded-lg bg-gradient-to-br ${catColor} px-2 py-0.5 font-mono text-xs text-white sm:inline-block`}>
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
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      style={{ animationDelay: `${index * 50}ms` }}
      className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-divider bg-surface text-left transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 animate-fade-up opacity-0 [animation-fill-mode:forwards]"
    >
      <div className="relative aspect-[2/1.2] w-full overflow-hidden">
        <Monogram song={song} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute bottom-2 left-2">
          <span className="inline-block rounded-lg bg-surface/90 px-2.5 py-1 font-mono text-xs font-bold text-accent shadow-sm">
            {song.key}
          </span>
        </div>

        <div className="absolute right-2 top-2 flex gap-1">
          {song.youtube_url && (
            <span className="inline-flex items-center gap-0.5 rounded-lg bg-red-500/80 px-1.5 py-0.5 font-mono text-[11px] text-white shadow-sm">
              <Youtube size={10} />
            </span>
          )}
          <span className="inline-block rounded-lg bg-surface/80 px-1.5 py-0.5 font-mono text-[11px] uppercase text-slate shadow-sm">
            {LANG_LABELS[song.language] || song.language}
          </span>
        </div>

        {showActions && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            {onAddToPlaylist && (
              <span
                onClick={handleAddToPlaylist}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-accent shadow-sm transition-transform hover:scale-110 hover:bg-surface"
              >
                <Plus size={16} />
              </span>
            )}
            {song.youtube_url && (
              <span
                onClick={handlePlayPreview}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-red-500 shadow-sm transition-transform hover:scale-110 hover:bg-surface"
              >
                <Play size={16} />
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <div className="flex items-start gap-2">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${catDot}`} />
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 font-display text-base font-bold text-charcoal group-hover:text-accent">
                {song.title}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-sm text-slate">{song.artist}</p>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className={`rounded-lg bg-gradient-to-br ${catColor} px-2 py-0.5 font-mono text-[11px] text-white`}>
            {song.category}
          </span>
          {song.album && (
            <span className="truncate font-mono text-[11px] text-slate/50">
              {song.album}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
