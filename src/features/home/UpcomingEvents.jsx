import { Calendar } from 'lucide-react'
import useHomeStore from './homeStore'

export default function UpcomingEvents() {
  const events = useHomeStore((s) => s.events)
  const loading = useHomeStore((s) => s.loading)

  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-accent-warm">
          <Calendar size={24} />
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Upcoming Events
          </h2>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-sm border border-divider p-6">
                <div className="mb-3 h-16 w-16 animate-pulse rounded-sm bg-divider" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded-sm bg-divider" />
                <div className="h-4 w-full animate-pulse rounded-sm bg-divider" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="mt-8 rounded-sm border border-divider py-16 text-center">
            <Calendar size={32} className="mx-auto mb-3 text-slate/30" />
            <p className="text-sm text-slate">No upcoming events. Stay tuned!</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {events.map((e) => {
              const eventDate = new Date(e.date)
              return (
                <div
                  key={e.id}
                  className="group flex gap-5 rounded-sm border border-divider p-6 transition-all hover:-translate-y-1 hover:border-accent-warm/30 hover:shadow-sm"
                >
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-sm bg-accent-warm/10 px-4 py-3 text-center">
                    <span className="font-display text-2xl font-bold text-accent-warm">
                      {eventDate.getDate()}
                    </span>
                    <span className="text-xs font-medium text-accent-warm/70 uppercase">
                      {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-charcoal">
                      {e.title}
                    </h3>
                    {e.time && (
                      <p className="mt-1 text-xs text-slate">{e.time}</p>
                    )}
                    {e.location && (
                      <p className="mt-0.5 text-xs text-slate/60">{e.location}</p>
                    )}
                    {e.description && (
                      <p className="mt-2 text-sm text-slate line-clamp-2">
                        {e.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
