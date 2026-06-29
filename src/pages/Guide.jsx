import { useEffect } from 'react'
import { Compass, ArrowLeft, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
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
  const setActivePlan = useGuideStore((s) => s.setActivePlan)
  const setCurrentDay = useGuideStore((s) => s.setCurrentDay)
  const loadProgress = useGuideStore((s) => s.loadProgress)

  const activePlan = plans.find((p) => p.id === activePlanId)

  useEffect(() => {
    if (isLoggedIn) loadProgress()
  }, [isLoggedIn, loadProgress])

  if (activePlanId && currentDay) {
    return (
      <>
        <SEO title={activePlan?.title ? `${activePlan.title} - Day ${currentDay}` : 'Reading Guide'} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
            <button
              onClick={() => setActivePlan(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-charcoal"
            >
              <ArrowLeft size={16} />
              All Plans
            </button>

            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-charcoal">
                {activePlan.title}
              </h1>
              <p className="mt-2 text-slate">{activePlan.description}</p>
            </div>

            <div className="space-y-3">
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
      <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Reading Guide
          </h1>
          <p className="mt-2 text-slate">
            Choose a plan and start your daily Scripture reading journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plans.map((plan) => (
            <GuidePlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
