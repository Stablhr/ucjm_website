import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, CheckCircle, Flame, BookOpen, Heart, Target, LogIn, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import useAuthStore from '../../store/authStore'
import useGuideStore from './guideStore'
import plans, { formatVerseRef } from './plans'
import { fireConfetti, firePlanComplete } from './Confetti'
import GuideNotes from './GuideNotes'
import GuideAudioButton from './GuideAudioButton'

function useVerseText(verseRef) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!verseRef) { setLoading(false); return }
    let cancelled = false
    setLoading(true)

    const refForApi = verseRef.replace(/\./g, ' ')
    fetch(`https://bible-api.com/${encodeURIComponent(refForApi)}?translation=kjv`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        if (!cancelled && data.text) setText(data.text.trim())
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [verseRef])

  return { text, loading }
}

export default function GuideReadingView({ planId, dayNumber, onBack, onComplete }) {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const markDayComplete = useGuideStore((s) => s.markDayComplete)
  const isDayComplete = useGuideStore((s) => s.isDayComplete)
  const streak = useGuideStore((s) => s.streak)
  const progress = useGuideStore((s) => s.progress)

  const [completing, setCompleting] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)

  const plan = plans.find((p) => p.id === planId)
  const day = plan?.days?.find((d) => d.day === dayNumber)
  const completed = isDayComplete(planId, dayNumber)

  const prevDay = plan?.days?.find((d) => d.day === dayNumber - 1)
  const nextDay = plan?.days?.find((d) => d.day === dayNumber + 1)

  const completedDaysCount = plan
    ? plan.days.filter((d) => progress[`${plan.id}-${d.day}`]?.completed).length
    : 0

  const allComplete =
    completed &&
    plan &&
    plan.days.every((d) => progress[`${plan.id}-${d.day}`]?.completed)

  const handleComplete = useCallback(async () => {
    if (!plan) return
    setCompleting(true)

    const wasAlreadyComplete = completed
    const wasAllCompleteBefore = allComplete

    await markDayComplete(planId, dayNumber)
    setCompleting(false)
    setJustCompleted(true)
    setTimeout(() => setJustCompleted(false), 2000)

    if (!wasAlreadyComplete) {
      fireConfetti()
    }

    if (!wasAllCompleteBefore) {
      const currentProgress = useGuideStore.getState().progress
      const nowAllComplete = plan.days.every(
        (d) => currentProgress[`${plan.id}-${d.day}`]?.completed
      )
      if (nowAllComplete) {
        setTimeout(() => firePlanComplete(), 300)
      }
    }

    if (onComplete) onComplete()
  }, [plan, completed, allComplete, markDayComplete, planId, dayNumber, onComplete])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft' && prevDay) {
        e.preventDefault()
        navigate(`/guide/${planId}/${prevDay.day}`)
      }
      if (e.key === 'ArrowRight' && nextDay) {
        e.preventDefault()
        navigate(`/guide/${planId}/${nextDay.day}`)
      }
      if (e.key === 'm' && isLoggedIn && !completed && plan) {
        e.preventDefault()
        handleComplete()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prevDay, nextDay, planId, isLoggedIn, completed, plan, navigate, handleComplete])

  if (!plan || !day) return null

  const { text: verseText, loading: verseLoading } = useVerseText(day.verseRef)

  return (
    <div className="animate-fade-up">
      {/* Completion toast */}
      {justCompleted && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 animate-slide-down">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 shadow-lg">
            <CheckCircle size={20} className="text-emerald-500" />
            <div>
              <p className="text-sm font-medium text-emerald-800">Day {dayNumber} Complete!</p>
              <p className="text-xs text-emerald-600">Streak: {streak} day{streak !== 1 ? 's' : ''}</p>
            </div>
            <Sparkles size={16} className="text-emerald-400" />
          </div>
        </div>
      )}

      {/* Sticky progress header */}
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-6 rounded-t-none border-b border-divider bg-ivory/90 px-4 pb-3 pt-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
          >
            <ArrowLeft size={16} />
            {plan.title}
          </button>

          <div className="flex items-center gap-3">
            <GuideAudioButton
              planTitle={plan.title}
              dayTitle={day.title}
              verseRef={formatVerseRef(day.verseRef)}
              reflection={day.reflection}
              prayer={day.prayer}
            />
            <span className="font-mono text-xs text-slate/60">
              Day {day.day} of {plan.days.length}
            </span>
            {streak > 0 && (
              <div className="flex items-center gap-1 font-mono text-xs text-accent-warm">
                <Flame size={14} className="animate-fire" />
                <span>{streak}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate/10">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${(completedDaysCount / plan.days.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Day header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {day.title}
        </h2>
      </div>

      {/* Flow steps */}
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

      {/* Scripture */}
      <div className="mb-8 overflow-hidden rounded-lg border border-divider bg-gradient-to-br from-surface to-accent/5">
        <div className="border-b border-divider px-6 py-3">
          <div className="flex items-center gap-2 font-display text-base font-bold text-accent">
            <BookOpen size={16} />
            Scripture
          </div>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-10">
          <div className="font-display text-lg leading-relaxed text-charcoal sm:text-xl sm:leading-loose">
            {verseLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 w-3/4 rounded bg-slate/10" />
                <div className="h-4 w-full rounded bg-slate/10" />
                <div className="h-4 w-2/3 rounded bg-slate/10" />
              </div>
            ) : verseText ? (
              <p>{verseText}</p>
            ) : (
              <p className="text-slate/60 italic">Verse text unavailable</p>
            )}
          </div>
          <p className="mt-8 text-right font-mono text-sm text-slate">
            - {formatVerseRef(day.verseRef)}
          </p>
        </div>
      </div>

      {/* Reflection */}
      <div className="mb-8 overflow-hidden rounded-lg border border-divider bg-surface">
        <div className="border-b border-divider bg-gradient-to-r from-amber-50 to-transparent px-6 py-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-700">
            <Heart size={14} />
            Reflection
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="font-display text-lg leading-relaxed text-charcoal/85">
            {day.reflection}
          </p>
        </div>
      </div>

      {/* Prayer */}
      <div className="mb-8 overflow-hidden rounded-lg border border-divider bg-surface">
        <div className="border-b border-divider bg-gradient-to-r from-sky-50 to-transparent px-6 py-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-sky-700">
            <Target size={14} />
            Prayer
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="italic leading-relaxed text-charcoal/70">
            {day.prayer}
          </p>
        </div>
      </div>

      {/* My Notes */}
      {isLoggedIn && (
        <GuideNotes planId={planId} dayNumber={dayNumber} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 border-t border-divider pt-6">
        <div>
          {prevDay && (
            <button
              onClick={() => navigate(`/guide/${planId}/${prevDay.day}`)}
              className="inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-charcoal"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Day {prevDay.day}: {prevDay.title}</span>
              <span className="sm:hidden">Previous</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn && !completed && (
            <Link to="/login">
              <Button variant="outline">
                <LogIn size={16} />
                Sign in to track
              </Button>
            </Link>
          )}

          {isLoggedIn && !completed && (
            <Button onClick={handleComplete} loading={completing}>
              <CheckCircle size={16} />
              Mark Complete
            </Button>
          )}

          {completed && nextDay && (
            <p className="text-sm text-slate">
              Great job!
            </p>
          )}
        </div>

        <div>
          {nextDay && (
            <button
              onClick={() => navigate(`/guide/${planId}/${nextDay.day}`)}
              className="inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-charcoal"
            >
              <span className="hidden sm:inline">Day {nextDay.day}: {nextDay.title}</span>
              <span className="sm:hidden">Next</span>
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

      {/* Plan completion celebration */}
      {allComplete && (
        <div className="mt-8 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 text-center">
          <CheckCircle size={32} className="mx-auto text-emerald-500" />
          <h3 className="mt-3 font-display text-xl font-bold text-emerald-800">
            {plan.title} Complete!
          </h3>
          <p className="mt-1 text-sm text-emerald-600">
            You've completed all {plan.days.length} days. Well done!
          </p>
          <button
            onClick={() => { onBack() }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Back to {plan.title}
          </button>
        </div>
      )}
    </div>
  )
}
