import { ArrowLeft, Plus, Youtube, Pencil } from 'lucide-react'
import { useState, useMemo } from 'react'
import useSongsStore from './songsStore'
import useAuthStore from '../../store/authStore'
import { transposeLyrics } from './chordParser'
import ChordTransposer from './ChordTransposer'
import AddToPlaylistModal from './AddToPlaylistModal'
import EditSongModal from './EditSongModal'

const CHORD_REGEX = /\[([A-G][#b]?(?:m|dim|aug|sus[24]|add[0-9]|[0-9])?(?:\/[A-G][#b]?)?)\]/g

const SECTION_REGEX = /^\[(VERSE|PRE-CHORUS|CHORUS|BRIDGE|INTRO|OUTRO|TAG|INSTRUMENTAL|INTERLUDE)( [0-9])?\]$/i

function isSectionLine(text) {
  return SECTION_REGEX.test(text.trim())
}

function parseSegments(line) {
  const segments = []
  const regex = new RegExp(CHORD_REGEX.source, 'g')
  let lastIndex = 0
  let match

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ chord: null, text: line.slice(lastIndex, match.index) })
    }
    segments.push({ chord: match[1], text: '' })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < line.length) {
    segments.push({ chord: null, text: line.slice(lastIndex) })
  }

  const merged = []
  for (let i = 0; i < segments.length; i++) {
    if (
      segments[i].chord &&
      !segments[i].text &&
      i + 1 < segments.length &&
      !segments[i + 1].chord
    ) {
      merged.push({ chord: segments[i].chord, text: segments[i + 1].text })
      i++
    } else {
      merged.push(segments[i])
    }
  }

  return merged
}

function extractYoutubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : ''
}

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

const CATEGORY_GRADIENTS = {
  Praise: 'from-amber-400 to-orange-500',
  Worship: 'from-emerald-500 to-teal-600',
  Hymn: 'from-violet-500 to-purple-700',
}

export default function SongDetail({ song, onBack }) {
  const transposeOffset = useSongsStore((s) => s.transposeOffset)
  const user = useAuthStore((s) => s.user)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [imgError, setImgError] = useState(false)

  const transposedLyrics = useMemo(
    () => transposeLyrics(song.lyrics_with_chords, transposeOffset),
    [song.lyrics_with_chords, transposeOffset]
  )

  const renderedLines = useMemo(() => {
    return transposedLyrics.split('\n').map((line) => {
      const trimmed = line.trim()
      if (!trimmed) return { type: 'empty' }
      if (isSectionLine(trimmed)) {
        return { type: 'section', label: trimmed.replace(/^\[|\]$/g, '') }
      }
      const segments = parseSegments(line)
      return { type: 'line', segments }
    })
  }, [transposedLyrics])

  const gradient = song.image_color || CATEGORY_GRADIENTS[song.category] || pickFallbackGradient(song.id)

  if (!song) return null

  return (
    <div>
      {/* Back button row */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back to songs
        </button>

        <ChordTransposer songKey={song.key} />
      </div>

      {/* Hero banner */}
      <div className={`relative mb-8 overflow-hidden rounded-lg bg-gradient-to-br ${gradient}`}>
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:p-8">
          {/* Art thumbnail */}
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg shadow-lg sm:h-36 sm:w-36">
            {song.image_url && !imgError ? (
              <img
                src={song.image_url}
                alt={song.title}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/10">
                <span className="font-display text-5xl font-bold text-white/60">
                  {song.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Song info overlay */}
          <div className="min-w-0 flex-1 text-white">
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {song.title}
            </h1>
            <p className="mt-1 text-sm text-white/80">{song.artist}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-white/20 px-2.5 py-0.5 font-mono text-xs font-bold">
                {song.key}
              </span>
              <span className="rounded-lg bg-white/15 px-2.5 py-0.5 font-mono text-xs">
                {song.category}
              </span>
              <span className="rounded-lg bg-white/15 px-2.5 py-0.5 font-mono text-xs uppercase">
                {song.language}
              </span>
              {song.album && (
                <span className="text-xs text-white/60">
                  {song.album}{song.album_year ? ` (${song.album_year})` : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lyrics with chords */}
      <div className="mb-8 rounded-lg border border-divider bg-white p-6 sm:p-8">
        {renderedLines.map((line, i) => {
          if (line.type === 'empty') {
            return <div key={i} className="h-4" />
          }

          if (line.type === 'section') {
            return (
              <div key={i} className="mb-3 mt-6 first:mt-0">
                <span className="inline-block rounded-md bg-accent/10 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-accent">
                  {line.label}
                </span>
              </div>
            )
          }

          return (
            <div key={i} className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1.5 py-1.5 min-h-[3rem]">
              {line.segments.map((seg, j) => {
                if (seg.chord) {
                  return (
                    <span
                      key={j}
                      className="inline-flex flex-col items-center gap-1"
                    >
                      <span className="font-mono text-sm font-bold text-accent leading-none">
                        {seg.chord}
                      </span>
                      <span className="leading-tight">{seg.text || '\u00A0'}</span>
                    </span>
                  )
                }
                return <span key={j}>{seg.text}</span>
              })}
            </div>
          )
        })}
      </div>

      {/* YouTube Video */}
      {song.youtube_url && extractYoutubeId(song.youtube_url) && (
        <div className="mb-8 overflow-hidden rounded-lg border border-divider">
          <div className="flex items-center gap-2 border-b border-divider bg-ivory px-4 py-2.5">
            <Youtube size={16} className="text-red-500" />
            <span className="text-sm font-medium text-charcoal">Original Song</span>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${extractYoutubeId(song.youtube_url)}`}
              title={song.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowPlaylistModal(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-divider px-4 py-2.5 text-sm text-slate transition-all hover:border-accent/30 hover:text-accent active:scale-[0.98]"
        >
          <Plus size={16} />
          Add to Playlist
        </button>

        {user && (
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-divider px-4 py-2.5 text-sm text-slate transition-all hover:border-accent/30 hover:text-accent active:scale-[0.98]"
          >
            <Pencil size={16} />
            Edit Song
          </button>
        )}
      </div>

      {showPlaylistModal && (
        <AddToPlaylistModal
          song={song}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}

      {showEditModal && (
        <EditSongModal
          song={song}
          onClose={() => setShowEditModal(false)}
          onSaved={() => {}}
        />
      )}
    </div>
  )
}
