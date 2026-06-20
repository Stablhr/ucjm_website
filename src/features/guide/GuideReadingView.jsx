import { ArrowLeft, CheckCircle, Flame } from 'lucide-react'
import { BibleTextView } from '@youversion/platform-react-ui'
import useGuideStore from './guideStore'
import plans from './plans'

export default function GuideReadingView({ planId, dayNumber, onBack, onComplete }) {
  const setCurrentDay = useGuideStore((s) => s.setCurrentDay)
  const markDayComplete = useGuideStore((s) => s.markDayComplete)
  const isDayComplete = useGuideStore((s) => s.isDayComplete)
  const streak = useGuideStore((s) => s.streak)

  const plan = plans.find((p) => p.id === planId)
  const day = plan?.days?.find((d) => d.day === dayNumber)
  const completed = isDayComplete(planId, dayNumber)

  if (!plan || !day) return null

  const prevDay = plan.days.find((d) => d.day === dayNumber - 1)
  const nextDay = plan.days.find((d) => d.day === dayNumber + 1)

  const handleComplete = async () => {
    await markDayComplete(planId, dayNumber)
    if (onComplete) onComplete()
  }

  return (
    <div className="animate-fade-up">
      {/* Back button & streak */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back to {plan.title}
        </button>

        <div className="flex items-center gap-1.5 font-mono text-sm text-accent-warm">
          <Flame size={16} />
          <span>{streak} day streak</span>
        </div>
      </div>

      {/* Day header */}
      <div className="mb-8">
        <span className="font-mono text-xs text-slate">
          Day {day.day} of {plan.days.length}
        </span>
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {day.title}
        </h2>
      </div>

      {/* Verse */}
      <div className="mb-8 rounded-sm border border-divider bg-white p-6">
        <BibleTextView
          versionId={3034}
          references={[day.verseRef]}
          className="[&_p]:leading-relaxed [&_p]:text-charcoal [&_sup]:text-accent"
        />
        <p className="mt-4 text-right font-mono text-xs text-slate">
          {day.verseRef.replace(/\./g, ' ')}
        </p>
      </div>

      {/* Reflection */}
      <div className="mb-8">
        <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-slate">
          Reflection
        </h3>
        <p className="leading-relaxed text-charcoal/80">{day.reflection}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-divider pt-6">
        <div>
          {prevDay && (
            <button
              onClick={() => setCurrentDay(prevDay.day)}
              className="inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-charcoal"
            >
              <ArrowLeft size={14} />
              Day {prevDay.day}: {prevDay.title}
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!completed && (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 active:scale-[0.98]"
            >
              <CheckCircle size={16} />
              Mark Complete
            </button>
          )}

          {nextDay && (
            <button
              onClick={() => setCurrentDay(nextDay.day)}
              className="inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-charcoal"
            >
              Day {nextDay.day}: {nextDay.title}
              <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
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
          )}
        </div>
      </div>
    </div>
  )
}
