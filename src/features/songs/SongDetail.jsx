import { ArrowLeft, Plus } from 'lucide-react'
import { useState, useMemo } from 'react'
import useSongsStore from './songsStore'
import { transposeLyrics } from './chordParser'
import ChordTransposer from './ChordTransposer'
import AddToPlaylistModal from './AddToPlaylistModal'

const CHORD_REGEX = /\[([A-G][#b]?(?:m|dim|aug|sus[24]|add[0-9]|[0-9])?)\]/g

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

export default function SongDetail({ song, onBack }) {
  const transposeOffset = useSongsStore((s) => s.transposeOffset)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  const transposedLyrics = useMemo(
    () => transposeLyrics(song.lyrics_with_chords, transposeOffset),
    [song.lyrics_with_chords, transposeOffset]
  )

  const renderedLines = useMemo(() => {
    return transposedLyrics.split('\n').map((line) => {
      if (!line.trim()) return { type: 'empty' }
      const segments = parseSegments(line)
      return { type: 'line', segments }
    })
  }, [transposedLyrics])

  if (!song) return null

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back to songs
        </button>

        <ChordTransposer />
      </div>

      {/* Song info */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal">
          {song.title}
        </h1>
        <div className="mt-2 flex items-center gap-3">
          <p className="text-sm text-slate">{song.artist}</p>
          <span className="text-slate/30">|</span>
          <span className="rounded-sm bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
            {song.key}
          </span>
          <span className="rounded-sm bg-accent/5 px-2 py-0.5 font-mono text-xs text-slate">
            {song.category}
          </span>
        </div>
      </div>

      {/* Lyrics with chords */}
      <div className="mb-8 rounded-sm border border-divider bg-white p-6 sm:p-8">
        {renderedLines.map((line, i) => {
          if (line.type === 'empty') {
            return <div key={i} className="h-4" />
          }

          return (
            <div key={i} className="flex flex-wrap items-baseline leading-7">
              {line.segments.map((seg, j) => {
                if (seg.chord) {
                  return (
                    <span
                      key={j}
                      className="inline-flex flex-col items-baseline leading-tight"
                    >
                      <span className="font-mono text-xs text-accent leading-none">
                        {seg.chord}
                      </span>
                      <span>{seg.text || '\u00A0'}</span>
                    </span>
                  )
                }
                return <span key={j}>{seg.text}</span>
              })}
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <button
        onClick={() => setShowPlaylistModal(true)}
        className="inline-flex items-center gap-2 rounded-sm border border-divider px-4 py-2.5 text-sm text-slate transition-all hover:border-accent/30 hover:text-accent active:scale-[0.98]"
      >
        <Plus size={16} />
        Add to Playlist
      </button>

      {showPlaylistModal && (
        <AddToPlaylistModal
          song={song}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}
    </div>
  )
}
