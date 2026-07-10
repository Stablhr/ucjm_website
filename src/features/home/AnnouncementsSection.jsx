import { Megaphone, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SkeletonCard } from '../../components/ui/Skeleton'
import useHomeStore from './homeStore'
import { requestNotificationPermission, checkAndNotifyAnnouncements } from '../../lib/notify.jsx'

export default function AnnouncementsSection() {
  const announcements = useHomeStore((s) => s.announcements)
  const loading = useHomeStore((s) => s.loading)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (loading || announcements.length === 0) return
    requestNotificationPermission().then(() => {
      checkAndNotifyAnnouncements(announcements)
    })
  }, [loading, announcements])

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-accent">
          <Megaphone size={24} />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Announcements
          </h2>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div className="mt-8 rounded-lg border border-divider py-16 text-center">
            <p className="text-sm text-slate">No announcements yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                onClick={() => setSelected(a)}
                className="cursor-pointer rounded-lg border border-divider p-6 transition-all hover:border-accent/30"
              >
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="mb-3 h-40 w-full rounded-lg object-cover transition group-hover:brightness-95"
                  />
                ) : (
                  <div className="mb-3 h-40 rounded-lg bg-divider transition group-hover:brightness-95" />
                )}
                <h3 className="font-display text-xl font-bold text-charcoal">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-slate line-clamp-3">{a.description}</p>
                <p className="mt-3 text-xs text-slate/60">
                  {new Date(a.posted_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-10 pb-10">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-2xl animate-fade-up rounded-xl border border-divider bg-surface">
            <div className="flex items-center justify-between border-b border-divider px-6 py-4">
              <h2 className="font-display text-xl font-bold text-charcoal">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="rounded-lg p-1.5 text-slate transition-colors hover:bg-accent/5 hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {selected.image_url && (
                <img
                  src={selected.image_url}
                  alt={selected.title}
                  className="w-full max-h-80 rounded-lg object-cover"
                />
              )}
              <p className="text-xs text-slate/60">
                {new Date(selected.posted_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
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
