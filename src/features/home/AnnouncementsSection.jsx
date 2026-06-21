import { Megaphone } from 'lucide-react'
import useHomeStore from './homeStore'

export default function AnnouncementsSection() {
  const announcements = useHomeStore((s) => s.announcements)
  const loading = useHomeStore((s) => s.loading)

  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-accent">
          <Megaphone size={24} />
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Announcements
          </h2>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-sm border border-divider p-6">
                <div className="mb-3 h-40 animate-pulse rounded-sm bg-divider" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded-sm bg-divider" />
                <div className="h-4 w-full animate-pulse rounded-sm bg-divider" />
              </div>
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className="mt-8 rounded-sm border border-divider py-16 text-center">
            <p className="text-sm text-slate">No announcements yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="group rounded-sm border border-divider p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-sm"
              >
                {a.image_url && (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="mb-3 h-40 w-full rounded-sm object-cover transition group-hover:brightness-95"
                  />
                )}
                {!a.image_url && (
                  <div className="mb-3 h-40 rounded-sm bg-divider transition group-hover:brightness-95" />
                )}
                <h3 className="font-display text-xl font-bold text-charcoal">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-slate">
                  {a.description}
                </p>
                <p className="mt-3 text-xs text-slate/60">
                  {new Date(a.posted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
