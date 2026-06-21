import { CheckCircle, BookOpen, Sparkles } from 'lucide-react'
import useGuideStore from './guideStore'

export default function GuideDayCard({ planId, day, dayNumber }) {
  const setCurrentDay = useGuideStore((s) => s.setCurrentDay)
  const currentDay = useGuideStore((s) => s.currentDay)
  const isDayComplete = useGuideStore((s) => s.isDayComplete)

  const completed = isDayComplete(planId, dayNumber)
  const isActive = currentDay === dayNumber

  return (
    <button
      onClick={() => setCurrentDay(dayNumber)}
      className={`group flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all ${
        isActive
          ? 'border-accent bg-accent/5'
          : completed
            ? 'border-green-200 bg-green-50/50'
            : 'border-divider bg-white hover:border-accent/30 hover:bg-accent/[0.02]'
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
          completed
            ? 'bg-green-500 text-white'
            : isActive
              ? 'bg-accent text-white'
              : 'bg-slate/10 text-slate'
        }`}
      >
        {completed ? <CheckCircle size={18} /> : dayNumber}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4
            className={`font-medium ${
              completed ? 'text-green-700' : 'text-charcoal'
            }`}
          >
            {day.title}
          </h4>
          {completed && (
            <Sparkles size={14} className="text-green-500" />
          )}
        </div>
        <p
          className={`mt-0.5 font-mono text-xs ${
            completed ? 'text-green-600' : 'text-slate'
          }`}
        >
          {day.verseRef.replace(/\./g, ' ')}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate/60">
          <BookOpen size={11} />
          Read &mdash; Reflect &mdash; Pray
        </p>
      </div>

      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className={`shrink-0 transition-colors ${
          isActive ? 'text-accent' : 'text-slate/30 group-hover:text-accent/50'
        }`}
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
