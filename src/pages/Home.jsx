import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'
import useHomeStore from '../features/home/homeStore'
import AnnouncementsSection from '../features/home/AnnouncementsSection'
import UpcomingEvents from '../features/home/UpcomingEvents'
import DailyVerse from '../features/home/DailyVerse'
import FeatureTeaser from '../features/home/FeatureTeaser'
import ServiceTimes from '../features/home/ServiceTimes'
import PhotoGallery from '../features/home/PhotoGallery'

function HeroText({ children, delay = 0, as: Tag = 'span' }) {
  return (
    <span
      className="inline-block animate-blur-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <Tag>{children}</Tag>
    </span>
  )
}

export default function Home() {
  const fetchAll = useHomeStore((s) => s.fetchAll)
  const heroRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  const onScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    fetchAll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const heroOffset = Math.min(scrollY * 0.35, 120)

  return (
    <>
      <SEO title="Home" />
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden -mt-20">
        <div
          className="absolute inset-0 h-[120%] w-full -top-[10%] will-change-transform"
          style={{ transform: `translateY(${heroOffset}px)` }}
        >
          <img
            src="/images/hero-bg.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight md:text-7xl">
            {'Welcome to UCJM Church'.split(' ').map((word, i, arr) => (
              <span key={i}>
                <HeroText delay={200 + i * 100}>
                  {word}
                </HeroText>
                {i < arr.length - 1 && '\u00A0'}
              </span>
            ))}
          </h1>
          <AnimatedSection animation="blur-in" delay={800} className="mt-6">
            <p className="mx-auto max-w-xl text-lg text-white/80">
              A community of faith, hope, and love.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scale-in" delay={1100} className="mt-8 inline-block">
            <Link to="/signup">
              <Button>
                Join Us <ArrowRight size={16} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Daily Verse — powered by YouVersion */}
      <AnimatedSection animation="fade-up" className="border-t border-divider">
        <DailyVerse />
      </AnimatedSection>

      {/* Announcements — live from Supabase */}
      <AnimatedSection animation="fade-up" delay={100}>
        <AnnouncementsSection />
      </AnimatedSection>

      {/* Service Times */}
      <AnimatedSection animation="scale-in" delay={100}>
        <ServiceTimes />
      </AnimatedSection>

      {/* Feature Teaser */}
      <AnimatedSection animation="fade-up" delay={100}>
        <FeatureTeaser />
      </AnimatedSection>

      {/* Upcoming Events — live from Supabase */}
      <AnimatedSection animation="fade-up" delay={100}>
        <UpcomingEvents />
      </AnimatedSection>

      {/* Photo Gallery — live from Supabase */}
      <AnimatedSection animation="slide-left" delay={100}>
        <PhotoGallery />
      </AnimatedSection>

      {/* CTA Banner */}
      <section className="bg-accent py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection animation="scale-in">
            <div className="mb-4 flex items-center justify-center gap-2 text-accent-warm">
              <Heart size={28} fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/80">
              Become part of our church family.
            </p>
            <Link to="/signup" className="mt-8 inline-block">
              <Button variant="outline" className="border-white text-white hover:bg-surface hover:text-black">
                Sign Up Today <ArrowRight size={16} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
