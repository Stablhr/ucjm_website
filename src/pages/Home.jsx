import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'
import useHomeStore from '../features/home/homeStore'
import ProgressiveHero from '../features/home/ProgressiveHero'
import AnnouncementsSection from '../features/home/AnnouncementsSection'
import UpcomingEvents from '../features/home/UpcomingEvents'
import DailyVerse from '../features/home/DailyVerse'
import FeatureTeaser from '../features/home/FeatureTeaser'
import ServiceTimes from '../features/home/ServiceTimes'
import PhotoGallery from '../features/home/PhotoGallery'

export default function Home() {
  const fetchAll = useHomeStore((s) => s.fetchAll)

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <>
      <SEO title="Home" />
      <ProgressiveHero />

      {/* Daily Verse — powered by YouVersion */}
      <AnimatedSection animation="fade-up" className="border-t border-divider">
        <DailyVerse />
      </AnimatedSection>

      {/* Announcements — live from Supabase */}
      <AnimatedSection animation="fade-up" delay={100} className="bg-surface">
        <AnnouncementsSection />
      </AnimatedSection>

      {/* Service Times */}
      <AnimatedSection animation="scale-in" delay={100}>
        <ServiceTimes />
      </AnimatedSection>

      {/* Feature Teaser */}
      <AnimatedSection animation="fade-up" delay={100} className="bg-surface">
        <FeatureTeaser />
      </AnimatedSection>

      {/* Upcoming Events — live from Supabase */}
      <AnimatedSection animation="fade-up" delay={100}>
        <UpcomingEvents />
      </AnimatedSection>

      {/* Photo Gallery — live from Supabase */}
      <AnimatedSection animation="slide-left" delay={100} className="bg-surface">
        <PhotoGallery />
      </AnimatedSection>

      {/* CTA — Dark Tile */}
      <section className="bg-[#272729] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection animation="scale-in">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart size={28} fill="currentColor" className="text-white/40" />
            </div>
            <h2 className="font-display text-4xl font-semibold text-white">
              Join Our Community
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Become part of our church family.
            </p>
            <div className="mt-8 inline-block">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-charcoal">
                Sign Up Today <ArrowRight size={16} />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
