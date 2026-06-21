import { ArrowLeft, CheckCircle, Flame, BookOpen, Heart, Target } from 'lucide-react'
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
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          Back to {plan.title}
        </button>

        {streak > 0 && (
          <div className="flex items-center gap-1.5 font-mono text-sm text-accent-warm">
            <Flame
              size={16}
              className="animate-fire"
            />
            <span>{streak} day streak</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <span className="font-mono text-xs text-slate">
          Day {day.day} of {plan.days.length}
        </span>
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {day.title}
        </h2>
      </div>

      <div className="mb-6 flex items-center gap-6 border-b border-divider pb-4 text-xs font-medium text-slate">
        <span className="flex items-center gap-1.5 text-accent">
          <BookOpen size={14} /> Read
        </span>
        <span className="text-slate/30">&rarr;</span>
        <span className="flex items-center gap-1.5">
          <Heart size={14} /> Reflect
        </span>
        <span className="text-slate/30">&rarr;</span>
        <span className="flex items-center gap-1.5">
          <Target size={14} /> Pray
        </span>
      </div>

      <div className="mb-8 rounded-sm border border-divider bg-white p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <BookOpen size={14} />
          Scripture
        </div>
        <BibleTextView
          versionId={3034}
          references={[day.verseRef]}
          className="[&_p]:leading-relaxed [&_p]:text-charcoal [&_sup]:text-accent"
        />
        <p className="mt-4 text-right font-mono text-xs text-slate">
          {day.verseRef.replace(/\./g, ' ')}
        </p>
      </div>

      <div className="mb-8 rounded-sm border border-divider bg-white p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <Heart size={14} />
          Reflection
        </div>
        <p className="font-display text-lg leading-relaxed text-charcoal/85">
          {day.reflection}
        </p>
      </div>

      <div className="mb-8 rounded-sm border border-divider bg-white p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
          <Target size={14} />
          Prayer
        </div>
        <p className="italic leading-relaxed text-charcoal/70">
          Lord, thank You for Your Word. Help me to live out what I've learned today.
          Let this truth take root in my heart and transform the way I think, speak, and act. Amen.
        </p>
      </div>

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

          {completed && nextDay && (
            <p className="text-sm text-slate">
              Great job!
            </p>
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
