import { useParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import GuideBreadcrumb from '../features/guide/GuideBreadcrumb'
import GuideDayCard from '../features/guide/GuideDayCard'
import plans from '../features/guide/plans'

export default function GuidePlanDetailPage() {
  const { planId } = useParams()
  const plan = plans.find((p) => p.id === planId)

  if (!plan) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-charcoal">Plan not found</h1>
          <p className="mt-2 text-slate">The reading plan you're looking for doesn't exist.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO title={plan.title} />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GuideBreadcrumb
            items={[
              { label: 'All Plans', to: '/guide' },
              { label: plan.title },
            ]}
          />

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-charcoal">
              {plan.title}
            </h1>
            <p className="mt-2 text-slate">{plan.description}</p>
          </div>

          <div className="space-y-4">
            {plan.days.map((day) => (
              <GuideDayCard
                key={day.day}
                planId={plan.id}
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
