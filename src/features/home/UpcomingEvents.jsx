import { Calendar, X, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import useHomeStore from './homeStore'

export default function UpcomingEvents() {
  const events = useHomeStore((s) => s.events)
  const loading = useHomeStore((s) => s.loading)
  const [selected, setSelected] = useState(null)

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
              <div key={i} className="rounded-lg border border-divider p-6">
                <div className="mb-3 h-16 w-16 animate-pulse rounded-lg bg-divider" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded-lg bg-divider" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-divider" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="mt-8 rounded-lg border border-divider py-16 text-center">
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
                  onClick={() => setSelected(e)}
                  className="group flex cursor-pointer gap-5 rounded-lg border border-divider p-6 transition-all hover:-translate-y-1 hover:border-accent-warm/30 hover:shadow-sm"
                >
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-accent-warm/10 px-4 py-3 text-center">
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
                    {e.time && <p className="mt-1 text-xs text-slate">{e.time}</p>}
                    {e.location && <p className="mt-0.5 text-xs text-slate/60">{e.location}</p>}
                    {e.description && (
                      <p className="mt-2 text-sm text-slate line-clamp-2">{e.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-lg animate-fade-up rounded-xl border border-divider bg-surface shadow-xl">
            <div className="flex items-center justify-between border-b border-divider px-6 py-4">
              <h2 className="font-display text-xl font-bold text-charcoal">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {(() => {
                const d = new Date(selected.date)
                return (
                  <div className="flex items-center gap-3 rounded-lg bg-accent-warm/5 px-4 py-3">
                    <div className="flex flex-col items-center">
                      <span className="font-display text-2xl font-bold text-accent-warm">{d.getDate()}</span>
                      <span className="text-xs font-medium text-accent-warm/70 uppercase">
                        {d.toLocaleDateString('en-US', { month: 'long' })}
                      </span>
                    </div>
                    <div className="h-10 w-px bg-accent-warm/20" />
                    <div className="space-y-1">
                      {selected.time && (
                        <p className="flex items-center gap-1.5 text-xs text-slate">
                          <Clock size={12} /> {selected.time}
                        </p>
                      )}
                      {selected.location && (
                        <p className="flex items-center gap-1.5 text-xs text-slate">
                          <MapPin size={12} /> {selected.location}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })()}
              <p className="text-sm text-slate leading-relaxed whitespace-pre-wrap">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
