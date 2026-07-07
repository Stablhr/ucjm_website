import { useParams, useNavigate } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import GuideBreadcrumb from '../features/guide/GuideBreadcrumb'
import GuideReadingView from '../features/guide/GuideReadingView'
import plans from '../features/guide/plans'

export default function GuideDayPage() {
  const { planId, day } = useParams()
  const navigate = useNavigate()
  const plan = plans.find((p) => p.id === planId)
  const dayNumber = parseInt(day, 10)

  if (!plan || !dayNumber) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-2xl font-bold text-charcoal">Not found</h1>
          <p className="mt-2 text-slate">This reading day doesn't exist.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO title={`${plan.title} - Day ${dayNumber}`} />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <GuideBreadcrumb
            items={[
              { label: 'All Plans', to: '/guide' },
              { label: plan.title, to: `/guide/${plan.id}` },
              { label: `Day ${dayNumber}` },
            ]}
          />

          <GuideReadingView
            planId={plan.id}
            dayNumber={dayNumber}
            onBack={() => navigate(`/guide/${plan.id}`)}
          />
        </div>
      </section>
    </>
  )
}
