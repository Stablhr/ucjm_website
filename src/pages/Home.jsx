import { useEffect } from 'react'
import { VerseOfTheDay } from '@youversion/platform-react-ui'
import { Heart, ArrowRight } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import useHomeStore from '../features/home/homeStore'
import AnnouncementsSection from '../features/home/AnnouncementsSection'
import UpcomingEvents from '../features/home/UpcomingEvents'
import FeatureTeaser from '../features/home/FeatureTeaser'
import ServiceTimes from '../features/home/ServiceTimes'
import PhotoGallery from '../features/home/PhotoGallery'

function FadeSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-fade-up' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const fetchAll = useHomeStore((s) => s.fetchAll)

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 text-center text-white animate-fade-up">
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Welcome to UCJM Church
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            A community of faith, hope, and love.
          </p>
          <a
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 bg-accent px-8 py-3 text-sm font-medium text-white transition hover:bg-accent/90 hover:gap-3"
          >
            Join Us <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Daily Verse — powered by YouVersion */}
      <FadeSection>
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl font-bold text-charcoal">
                Verse of the Day
              </h2>
              <div className="mt-8">
                <VerseOfTheDay />
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Announcements — live from Supabase */}
      <FadeSection>
        <AnnouncementsSection />
      </FadeSection>

      {/* Service Times */}
      <ServiceTimes />

      {/* Feature Teaser */}
      <FeatureTeaser />

      {/* Upcoming Events — live from Supabase */}
      <FadeSection>
        <UpcomingEvents />
      </FadeSection>

      {/* Photo Gallery — live from Supabase */}
      <FadeSection>
        <PhotoGallery />
      </FadeSection>

      {/* CTA Banner */}
      <section className="bg-accent py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <FadeSection>
            <div className="mb-4 flex items-center justify-center gap-2 text-accent-warm">
              <Heart size={28} fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Become part of our church family.
            </p>
            <a
              href="/signup"
              className="mt-8 inline-flex items-center gap-2 border border-white px-8 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-accent hover:gap-3"
            >
              Sign Up Today <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>
    </>
  )
}
