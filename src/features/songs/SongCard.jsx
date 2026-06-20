import { Music } from 'lucide-react'

export default function SongCard({ song, onClick }) {
  const categoryColors = {
    Praise: 'bg-amber-50 text-amber-600 border-amber-200',
    Worship: 'bg-blue-50 text-blue-600 border-blue-200',
    Hymn: 'bg-purple-50 text-purple-600 border-purple-200',
  }

  const langLabels = {
    Filipino: 'FIL',
    English: 'ENG',
    Both: 'MIX',
  }

  const catColor = categoryColors[song.category] || categoryColors.Worship

  return (
    <button
      onClick={() => onClick?.(song)}
      className="group flex w-full items-start gap-4 rounded-sm border border-divider bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-sm"
    >
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Music size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-bold text-charcoal">
          {song.title}
        </h3>
        <p className="mt-0.5 text-sm text-slate">{song.artist}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-sm bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
            {song.key}
          </span>
          <span
            className={`rounded-sm border px-2 py-0.5 font-mono text-xs ${catColor}`}
          >
            {song.category}
          </span>
          <span className="font-mono text-xs text-slate/60">
            {langLabels[song.language] || song.language}
          </span>
        </div>
      </div>

      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="mt-2 shrink-0 text-slate/20 transition-colors group-hover:text-accent/50"
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
