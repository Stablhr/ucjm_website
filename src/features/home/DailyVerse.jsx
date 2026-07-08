import { BookOpen, Quote } from 'lucide-react'
import { VerseOfTheDay } from '@youversion/platform-react-ui'
import { Link } from 'react-router-dom'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function DailyVerse() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="mx-auto max-w-3xl">
          <div
            className={`mb-4 flex items-center gap-2 text-accent ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
          >
            <BookOpen size={24} />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Daily Verse
            </h2>
          </div>
          <p
            className={`mb-8 text-sm text-slate ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '150ms' }}
          >
            A word of inspiration for today
          </p>

          <div
            className={`relative overflow-hidden rounded-lg border border-divider bg-gradient-to-br from-surface to-accent-warm/5 p-8 sm:p-12 ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <Quote
              size={120}
              className={`absolute -left-6 -top-6 text-accent-warm/5 ${
                isVisible ? 'animate-float' : ''
              }`}
              style={{ animationDelay: '1s' }}
            />
            <Quote
              size={120}
              className={`absolute -bottom-6 -right-6 rotate-180 text-accent-warm/5 ${
                isVisible ? 'animate-float' : ''
              }`}
              style={{ animationDelay: '1.5s' }}
            />
            <div className="relative z-10 [&_blockquote]:font-display [&_blockquote]:text-2xl [&_blockquote]:leading-relaxed [&_blockquote]:text-charcoal [&_blockquote]:italic [&_blockquote]:sm:text-3xl [&_blockquote]:font-medium [&_blockquote]:not-italic">
              <VerseOfTheDay />
            </div>
          </div>

          <div
            className={`mt-8 text-center ${
              isVisible ? 'animate-fade-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '600ms' }}
          >
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
