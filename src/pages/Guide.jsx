import { useEffect, useMemo } from 'react'
import { Compass, ArrowLeft, LogIn, BookOpen, Flame, CheckCircle, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { Skeleton } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import useAuthStore from '../store/authStore'
import useGuideStore from '../features/guide/guideStore'
import GuidePlanCard from '../features/guide/GuidePlanCard'
import GuideDayCard from '../features/guide/GuideDayCard'
import GuideReadingView from '../features/guide/GuideReadingView'
import plans from '../features/guide/plans'

export default function Guide() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const activePlanId = useGuideStore((s) => s.activePlanId)
  const currentDay = useGuideStore((s) => s.currentDay)
  const loading = useGuideStore((s) => s.loading)
  const progress = useGuideStore((s) => s.progress)
  const streak = useGuideStore((s) => s.streak)
  const setActivePlan = useGuideStore((s) => s.setActivePlan)
  const setCurrentDay = useGuideStore((s) => s.setCurrentDay)
  const loadProgress = useGuideStore((s) => s.loadProgress)

  const activePlan = plans.find((p) => p.id === activePlanId)

  useEffect(() => {
    if (isLoggedIn) loadProgress()
  }, [isLoggedIn, loadProgress])

  const stats = useMemo(() => {
    if (!isLoggedIn) return null
    let totalCompleted = 0
    let totalDays = 0
    let plansCompleted = 0

    plans.forEach((plan) => {
      totalDays += plan.days.length
      const planCompleted = plan.days.filter((d) =>
        progress[`${plan.id}-${d.day}`]?.completed
      ).length
      totalCompleted += planCompleted
      if (planCompleted === plan.days.length) plansCompleted++
    })

    return {
      totalCompleted,
      totalDays,
      plansCompleted,
      totalPlans: plans.length,
      pct: Math.round((totalCompleted / totalDays) * 100),
    }
  }, [isLoggedIn, progress])

  if (activePlanId && currentDay) {
    return (
      <>
        <SEO title={activePlan?.title ? `${activePlan.title} - Day ${currentDay}` : 'Reading Guide'} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-ivory px-4 py-2 text-xs text-slate shadow-sm">
              <button onClick={() => { setActivePlan(null); setCurrentDay(null) }} className="transition-colors hover:text-charcoal">
                All Plans
              </button>
              <span className="text-slate/30">/</span>
              <button onClick={() => setCurrentDay(null)} className="transition-colors hover:text-charcoal">
                {activePlan?.title}
              </button>
              <span className="text-slate/30">/</span>
              <span className="font-medium text-accent">Day {currentDay}</span>
            </div>

            <GuideReadingView
              planId={activePlanId}
              dayNumber={currentDay}
              onBack={() => setCurrentDay(null)}
            />
          </div>
        </section>
      </>
    )
  }

  if (activePlanId && activePlan) {
    return (
      <>
        <SEO title={activePlan.title} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-ivory px-4 py-2 text-xs text-slate shadow-sm">
              <button onClick={() => setActivePlan(null)} className="transition-colors hover:text-charcoal">
                All Plans
              </button>
              <span className="text-slate/30">/</span>
              <span className="font-medium text-accent">{activePlan.title}</span>
            </div>

            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-charcoal">
                {activePlan.title}
              </h1>
              <p className="mt-2 text-slate">{activePlan.description}</p>
            </div>

            <div className="space-y-4">
              {activePlan.days.map((day) => (
                <GuideDayCard
                  key={day.day}
                  planId={activePlan.id}
                  day={day}
                  dayNumber={day.day}
                />
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title="Reading Guide" />
      <section>
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-divider bg-gradient-to-br from-ivory via-white to-ivory">
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230a1db0' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
                <BookOpen size={14} />
                Daily Scripture Reading
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
                Reading Guide
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-slate">
                Choose a plan and start your daily Scripture reading journey.
              </p>
              <div className="mx-auto mt-7 h-px max-w-xs bg-gradient-to-r from-transparent via-divider to-transparent" />
              <p className="mt-7 font-display text-base text-accent-warm">
                "Your word is a lamp to my feet and a light to my path." <span className="text-slate/60">— Psalm 119:105</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        {isLoggedIn && stats && (
          <div className="border-b border-divider bg-ivory">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-divider bg-surface p-4 text-center">
                  <Flame size={18} className="mx-auto mb-1.5 text-accent-warm" />
                  <p className="font-display text-2xl font-bold text-charcoal">{streak}</p>
                  <p className="font-mono text-[11px] text-slate/60">Day Streak</p>
                </div>
                <div className="rounded-lg border border-divider bg-surface p-4 text-center">
                  <CheckCircle size={18} className="mx-auto mb-1.5 text-emerald-500" />
                  <p className="font-display text-2xl font-bold text-charcoal">{stats.totalCompleted}</p>
                  <p className="font-mono text-[11px] text-slate/60">Days Read</p>
                </div>
                <div className="rounded-lg border border-divider bg-surface p-4 text-center">
                  <TrendingUp size={18} className="mx-auto mb-1.5 text-accent" />
                  <p className="font-display text-2xl font-bold text-charcoal">{stats.plansCompleted}/{stats.totalPlans}</p>
                  <p className="font-mono text-[11px] text-slate/60">Plans Done</p>
                </div>
                <div className="rounded-lg border border-divider bg-surface p-4 text-center">
                  <BookOpen size={18} className="mx-auto mb-1.5 text-slate" />
                  <p className="font-display text-2xl font-bold text-charcoal">{stats.pct}%</p>
                  <p className="font-mono text-[11px] text-slate/60">Overall</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan Grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-divider p-6">
                  <Skeleton className="mb-3 h-10 w-10 rounded-full" />
                  <Skeleton className="mb-2 h-5 w-3/4" />
                  <Skeleton className="mb-1 h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              plans.map((plan) => (
                <GuidePlanCard key={plan.id} plan={plan} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
