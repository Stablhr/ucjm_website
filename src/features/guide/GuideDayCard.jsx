import { useEffect, useRef } from 'react'
import { CheckCircle, Sparkles, ChevronRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { BibleTextView } from '@youversion/platform-react-ui'
import useGuideStore from './guideStore'
import plans, { formatVerseRef } from './plans'

const colorMap = {
  rose: { border: 'border-rose-400', bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-700' },
  amber: { border: 'border-amber-400', bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' },
  blue: { border: 'border-blue-400', bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
  emerald: { border: 'border-emerald-400', bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700' },
  yellow: { border: 'border-yellow-400', bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-700' },
  purple: { border: 'border-purple-400', bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700' },
  orange: { border: 'border-orange-400', bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700' },
  teal: { border: 'border-teal-400', bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-700' },
}

export default function GuideDayCard({ planId, day, dayNumber }) {
  const navigate = useNavigate()
  const { day: activeDay } = useParams()
  const isDayComplete = useGuideStore((s) => s.isDayComplete)
  const ref = useRef(null)

  const plan = plans.find((p) => p.id === planId)
  const colors = colorMap[plan?.color] || colorMap.blue

  const completed = isDayComplete(planId, dayNumber)
  const isActive = activeDay && parseInt(activeDay) === dayNumber
  const isLast = dayNumber === plan?.days?.length

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isActive])

  return (
    <div ref={ref} className="group relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div
          className={`absolute left-[17px] top-10 w-0.5 ${
            completed ? colors.bg : 'bg-slate/20'
          }`}
          style={{ height: 'calc(100% + 0.75rem)' }}
        />
      )}

      {/* Circle indicator */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-500 ${
            completed
              ? `${colors.bg} border-transparent text-white scale-in`
              : isActive
                ? `border-accent bg-accent text-white animate-pulse-ring`
                : 'border-slate/30 bg-surface text-slate'
          }`}
        >
          {completed ? (
            <CheckCircle size={18} className="animate-scale-in" />
          ) : (
            dayNumber
          )}
        </div>
      </div>

      {/* Card */}
      <button
        onClick={() => navigate(`/guide/${planId}/${dayNumber}`)}
        className={`min-w-0 flex-1 rounded-lg border px-4 py-3.5 text-left transition-all duration-300 ${
          isActive
            ? 'border-accent bg-accent/5'
            : completed
              ? `${colors.light} ${colors.border}`
              : 'border-divider bg-surface hover:border-accent/30 hover:bg-accent/[0.02]'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate/50">
                Day {dayNumber}/{plan?.days?.length}
              </span>
              {completed && (
                <Sparkles size={12} className="animate-scale-in text-emerald-500" />
              )}
            </div>
            <h4
              className={`mt-0.5 font-medium leading-tight ${
                completed ? 'text-emerald-700' : 'text-charcoal'
              }`}
            >
              {day.title}
            </h4>
            <p
              className={`mt-0.5 font-mono text-xs ${
                completed ? 'text-emerald-600' : 'text-slate'
              }`}
            >
              {formatVerseRef(day.verseRef)}
            </p>
            <div className={`mt-1.5 line-clamp-2 text-xs leading-relaxed ${
              completed ? 'text-emerald-600/70' : 'text-slate/60'
            } [&_p]:inline [&_p]:text-xs [&_sup]:text-[10px]`}>
              <BibleTextView
                versionId={3034}
                references={[day.verseRef]}
              />
            </div>
          </div>

          <ChevronRight
            size={16}
            className={`shrink-0 transition-colors ${
              isActive
                ? 'text-accent'
                : 'text-slate/20 group-hover:text-accent/50'
            }`}
          />
        </div>
      </button>
    </div>
  )
}
