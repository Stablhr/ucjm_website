import { BookOpen, Quote } from 'lucide-react'
import { VerseOfTheDay } from '@youversion/platform-react-ui'
import { Link } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function DailyVerse() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <div className="mb-4 flex items-center gap-2 text-accent">
            <BookOpen size={24} />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Daily Verse
            </h2>
          </div>
          <p className="mb-8 text-sm text-slate">
            A word of inspiration for today
          </p>

          <div className="relative overflow-hidden rounded-lg border border-divider bg-gradient-to-br from-surface to-accent-warm/5 p-8 sm:p-12">
            <Quote
              size={120}
              className="absolute -left-6 -top-6 text-accent-warm/5"
            />
            <Quote
              size={120}
              className="absolute -bottom-6 -right-6 rotate-180 text-accent-warm/5"
            />
            <div className="relative z-10 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:leading-relaxed [&_blockquote]:text-charcoal [&_blockquote]:italic [&_blockquote]:sm:text-3xl [&_blockquote]:font-medium [&_blockquote]:not-italic">
              <VerseOfTheDay />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/bible"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:gap-3"
            >
              Read the Bible
              <span className="text-lg leading-none" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
