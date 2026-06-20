import { Music } from 'lucide-react'

export default function Songs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Music size={32} className="text-accent" />
          </div>
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Songs
          </h1>
          <p className="mt-3 text-slate">
            Worship songs with chords and lyrics are on the way. Sing along with
            your favorite praise music.
          </p>
          <span className="mt-6 inline-block rounded-sm bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            Phase 2
          </span>
        </div>
      </div>
    </section>
  )
}
