import { Minus, Plus } from 'lucide-react'
import useSongsStore from './songsStore'

export default function ChordTransposer() {
  const transposeOffset = useSongsStore((s) => s.transposeOffset)
  const setTransposeOffset = useSongsStore((s) => s.setTransposeOffset)

  const keyLabels = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]

  const displayKey = keyLabels[(transposeOffset + 12) % 12]

  return (
    <div className="inline-flex items-center gap-3 rounded-sm border border-divider bg-white px-3 py-2">
      <span className="font-mono text-xs text-slate">Key</span>

      <button
        onClick={() => setTransposeOffset(transposeOffset - 1)}
        disabled={transposeOffset <= -5}
        className="flex h-6 w-6 items-center justify-center rounded-sm text-slate transition-colors hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate"
        aria-label="Transpose down"
      >
        <Minus size={14} />
      </button>

      <span className="flex h-7 min-w-[2rem] items-center justify-center rounded-sm bg-accent/10 px-2 font-mono text-sm font-bold text-accent">
        {displayKey}
      </span>

      <button
        onClick={() => setTransposeOffset(transposeOffset + 1)}
        disabled={transposeOffset >= 6}
        className="flex h-6 w-6 items-center justify-center rounded-sm text-slate transition-colors hover:bg-accent/10 hover:text-accent disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate"
        aria-label="Transpose up"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
