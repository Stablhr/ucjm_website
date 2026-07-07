import { useParams } from 'react-router-dom'
import { Clock, Tag, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react'
import SEO from '../components/ui/SEO'
import GuideBreadcrumb from '../features/guide/GuideBreadcrumb'
import GuideDayCard from '../features/guide/GuideDayCard'
import useGuideStore from '../features/guide/guideStore'
import plans from '../features/guide/plans'

export default function GuidePlanDetailPage() {
  const { planId } = useParams()
  const progress = useGuideStore((s) => s.progress)
  const plan = plans.find((p) => p.id === planId)
  const allComplete = plan
    ? plan.days.every((d) => progress[`${plan.id}-${d.day}`]?.completed)
    : false

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

            {plan.tags && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {plan.category && (
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 font-mono text-[11px] font-medium text-accent">
                    {plan.category}
                  </span>
                )}
                {plan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-slate/10 px-2.5 py-0.5 font-mono text-[10px] text-slate/60"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
                {plan.readingTime && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate/10 px-2.5 py-0.5 font-mono text-[10px] text-slate/60">
                    <Clock size={10} />
                    ~{plan.readingTime * plan.days.length} min total ({plan.readingTime} min/day)
                  </span>
                )}
              </div>
            )}

            {plan.intro && (
              <div className="mt-5 rounded-lg border border-divider bg-gradient-to-r from-accent/3 to-transparent p-4">
                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {plan.intro}
                  </p>
                </div>
              </div>
            )}
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

          {allComplete && plan.outro && (
            <div className="mt-8 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                <div>
                  <h3 className="font-display text-lg font-bold text-emerald-800">
                    Plan Complete!
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-700/80">
                    {plan.outro}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
