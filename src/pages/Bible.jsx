import { BookOpen } from 'lucide-react'

export default function Bible() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <BookOpen size={32} className="text-accent" />
          </div>
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Bible
          </h1>
          <p className="mt-3 text-slate">
            The Bible reader is coming soon. Dive into Scripture with our
            chapter-by-chapter reader.
          </p>
          <span className="mt-6 inline-block rounded-sm bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            Phase 2
          </span>
        </div>
      </div>
    </section>
  )
}
