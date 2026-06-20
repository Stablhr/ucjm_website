import { ArrowLeft, Plus, Check } from 'lucide-react'
import { useState, useMemo } from 'react'
import useSongsStore from './songsStore'
import { transposeLyrics, renderChordLine } from './chordParser'
import ChordTransposer from './ChordTransposer'
import AddToPlaylistModal from './AddToPlaylistModal'

const CHORD_REGEX = /\[([A-G][#b]?(?:m|dim|aug|sus[24]|add[0-9]|[0-9])?)\]/g

export default function SongDetail({ song, onBack }) {
  const transposeOffset = useSongsStore((s) => s.transposeOffset)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  const transposedLyrics = useMemo(
    () => transposeLyrics(song.lyrics_with_chords, transposeOffset),
    [song.lyrics_with_chords, transposeOffset]
  )

  const renderedLines = useMemo(() => {
    return transposedLyrics.split('\n').map((line) => {
      const chords = []
      let match
      while ((match = CHORD_REGEX.exec(line)) !== null) {
        chords.push({ chord: match[1], index: match.index })
      }
      return { text: line.replace(CHORD_REGEX, ''), chords }
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
        {renderedLines.map((line, i) => (
          <div key={i} className="relative leading-7">
            {line.chords.length > 0 && (
              <div
                className="pointer-events-none font-mono text-accent"
                style={{ height: 0, overflow: 'visible' }}
              >
                {(() => {
                  const result = []
                  let lastIdx = 0
                  const sorted = [...line.chords].sort(
                    (a, b) => a.index - b.index
                  )
                  sorted.forEach((c) => {
                    const spaces = c.index - lastIdx
                    if (spaces > 0) result.push(' '.repeat(spaces))
                    result.push(c.chord)
                    lastIdx = c.index + c.chord.length
                  })
                  return result.join('')
                })()}
              </div>
            )}
            <span>{line.text}</span>
          </div>
        ))}
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
