import { Clock, MapPin } from 'lucide-react'
import useScrollReveal from '../../hooks/useScrollReveal'

const services = [
  { day: 'Sunday', label: 'Morning Worship', time: '9:00 AM' },
  { day: 'Sunday', label: 'Afternoon Service', time: '2:00 PM' },
  { day: 'Wednesday', label: 'Midweek Prayer Meeting', time: '6:30 PM' },
  { day: 'Friday', label: 'Youth Fellowship', time: '6:00 PM' },
]

export default function ServiceTimes() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl rounded-lg border border-divider bg-white p-8 sm:p-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="mb-4 flex items-center gap-2 text-accent">
            <Clock size={24} />
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Service Times
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate">
            Join us in worship and fellowship. Everyone is welcome.
          </p>

          <div className="mt-8 space-y-3">
            {services.map((s) => (
              <div
                key={`${s.day}-${s.time}`}
                className="flex items-center justify-between border-b border-divider pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <span className="text-sm font-medium text-charcoal">{s.label}</span>
                  <span className="ml-2 text-xs text-slate/60">({s.day})</span>
                </div>
                <span className="text-sm font-mono text-accent">{s.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-lg bg-ivory p-4">
            <MapPin size={18} className="mt-0.5 shrink-0 text-accent-warm" />
            <div>
              <p className="text-sm font-medium text-charcoal">UCJM Church</p>
              <p className="mt-0.5 text-xs text-slate">123 Church Street, Your City</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
