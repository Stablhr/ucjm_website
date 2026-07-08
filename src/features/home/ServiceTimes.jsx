import { Clock, MapPin, ExternalLink } from 'lucide-react'
import useScrollReveal from '../../hooks/useScrollReveal'

const services = [
  { day: 'Sunday', label: 'Morning Worship', time: '9:00 AM' },
  { day: 'Wednesday', label: 'Midweek Prayer Meeting', time: '7:00 PM' },
]

const locations = [
  { name: 'UCJM Main (Imus)', address: 'Imus, Philippines, 4103', facebook: 'https://www.facebook.com/ucjmmain' },
  { name: 'UCJM Castillon (Gen.Tri)', address: 'General Trias, Philippines, 4107', facebook: 'https://www.facebook.com/UCJMGenTrias' },
  { name: 'UCJM Ternate', address: 'Poblacion 1-A, 9012 Gov. Drive, Ternate, Cavite, Philippines, 4103', facebook: 'https://www.facebook.com/profile.php?id=100069203779606' },
]

export default function ServiceTimes() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl rounded-lg border border-divider bg-surface p-8 sm:p-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="mb-4 flex items-center gap-2 text-accent">
            <Clock size={24} />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
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

          <div className="mt-8 space-y-3">
            {locations.map((loc) => (
              <a
                key={loc.name}
                href={loc.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-lg bg-ivory p-4 transition hover:bg-accent/5"
              >
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent-warm" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-charcoal">{loc.name}</p>
                  <p className="mt-0.5 text-xs text-slate">{loc.address}</p>
                </div>
                <ExternalLink size={14} className="mt-1 shrink-0 text-slate/40 transition group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
