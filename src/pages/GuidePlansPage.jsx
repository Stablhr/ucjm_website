import { useEffect } from 'react'
import { BookOpen, Flame, CheckCircle, TrendingUp, ArrowRight, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import { Skeleton } from '../components/ui/Skeleton'
import useAuthStore from '../store/authStore'
import useGuideStore from '../features/guide/guideStore'
import useGuideStats from '../features/guide/useGuideStats'
import AnimatedCounter from '../features/guide/AnimatedCounter'
import GuidePlanCard from '../features/guide/GuidePlanCard'
import plans from '../features/guide/plans'

export default function GuidePlansPage() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const loading = useGuideStore((s) => s.loading)
  const streak = useGuideStore((s) => s.streak)
  const loadProgress = useGuideStore((s) => s.loadProgress)

  const stats = useGuideStats()

  useEffect(() => {
    if (isLoggedIn) loadProgress()
  }, [isLoggedIn, loadProgress])

  return (
    <>
      <SEO title="Reading Guide" />
      <section>
        {/* Animated Hero Section */}
        <div className="relative overflow-hidden border-b border-divider bg-gradient-to-br from-ivory via-white to-ivory">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/3 via-transparent to-accent/5" />

          {/* Animated gradient orbs */}
          <div className="absolute -left-32 -top-32 h-96 w-96 animate-blur-in rounded-full bg-gradient-to-br from-accent/8 to-transparent opacity-60" />
          <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] animate-fade-up rounded-full bg-gradient-to-tl from-accent-warm/5 to-transparent opacity-40" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }} />

          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006bbf' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zM40 0h1v40h-1zM0 0v1h40V0zM0 40v1h40v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center animate-fade-up">
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

        {/* Continue Reading Banner */}
        {isLoggedIn && stats?.lastReadPlan && (
          <div className="border-b border-divider bg-gradient-to-r from-accent/5 to-transparent">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Continue reading
                  </p>
                  <p className="text-xs text-slate">
                    {stats.lastReadPlan.title} — Day {stats.lastReadPlan.day}
                  </p>
                </div>
              </div>
              <Link
                to={`/guide/${stats.lastReadPlan.id}/${stats.lastReadPlan.day}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-focus"
              >
                Go to Day {stats.lastReadPlan.day}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Stats Dashboard */}
        {isLoggedIn && stats && (
          <div className="border-b border-divider bg-ivory">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="animate-fade-up rounded-lg border border-divider bg-surface p-4 text-center" style={{ animationDelay: '0ms', animationFillMode: 'backwards' }}>
                  <Flame size={18} className="mx-auto mb-1.5 text-accent-warm" />
                  <p className="font-display text-2xl font-bold text-charcoal">
                    <AnimatedCounter value={streak} />
                  </p>
                  <p className="font-mono text-xs text-slate/60">Day Streak</p>
                </div>
                <div className="animate-fade-up rounded-lg border border-divider bg-surface p-4 text-center" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
                  <CheckCircle size={18} className="mx-auto mb-1.5 text-emerald-500" />
                  <p className="font-display text-2xl font-bold text-charcoal">
                    <AnimatedCounter value={stats.totalCompleted} />
                  </p>
                  <p className="font-mono text-xs text-slate/60">Days Read</p>
                </div>
                <div className="animate-fade-up rounded-lg border border-divider bg-surface p-4 text-center" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
                  <TrendingUp size={18} className="mx-auto mb-1.5 text-accent" />
                  <p className="font-display text-2xl font-bold text-charcoal">
                    <AnimatedCounter value={stats.plansCompleted} suffix={`/${stats.totalPlans}`} />
                  </p>
                  <p className="font-mono text-xs text-slate/60">Plans Done</p>
                </div>
                <div className="animate-fade-up rounded-lg border border-divider bg-surface p-4 text-center" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
                  <Award size={18} className="mx-auto mb-1.5 text-amber-500" />
                  <p className="font-display text-2xl font-bold text-charcoal">
                    <AnimatedCounter value={stats.longestStreak} />
                  </p>
                  <p className="font-mono text-xs text-slate/60">Best Streak</p>
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
              plans.map((plan, i) => (
                <div key={plan.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}>
                  <GuidePlanCard plan={plan} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
