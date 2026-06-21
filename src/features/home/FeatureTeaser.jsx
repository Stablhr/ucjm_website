import { Link } from 'react-router-dom'
import { BookOpen, Music, Compass, ArrowRight } from 'lucide-react'
import useScrollReveal from '../../hooks/useScrollReveal'

const features = [
  {
    title: 'Read the Bible',
    description:
      'Explore Scripture with our built-in Bible reader. Navigate books and chapters, choose your preferred version, and let the Word speak to your heart.',
    link: '/bible',
    linkLabel: 'Open Bible',
    icon: BookOpen,
    image: '/images/teaser-bible.jpg',
    alt: 'Open Bible on a wooden table',
  },
  {
    title: 'Worship Through Song',
    description:
      'Browse our song library with chords and lyrics. Search by title, filter by category, and transpose chords to match your key.',
    link: '/songs',
    linkLabel: 'View Songs',
    icon: Music,
    image: '/images/teaser-worship.jpg',
    alt: 'Worship band performing on stage',
  },
  {
    title: 'Daily Reading Guide',
    description:
      'Follow structured reading plans, track your daily progress, and build a consistent habit of spending time in God\'s Word.',
    link: '/guide',
    linkLabel: 'Start Reading',
    icon: Compass,
    image: '/images/teaser-guide.jpg',
    alt: 'Journal and coffee morning setup',
  },
]

function TeaserRow({ feature, index }) {
  const [ref, isVisible] = useScrollReveal()
  const isReversed = index % 2 === 1
  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-12 lg:flex-row ${
        isReversed ? 'lg:flex-row-reverse' : ''
      } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <div className="w-full lg:w-1/2">
        <div className="overflow-hidden rounded-lg">
          <img
            src={feature.image}
            alt={feature.alt}
            className="h-72 w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 lg:px-8">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-2.5 text-accent">
          <Icon size={22} />
        </div>
        <h3 className="font-display text-3xl font-bold text-charcoal">
          {feature.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-slate">
          {feature.description}
        </p>
        <Link
          to={feature.link}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/70"
        >
          {feature.linkLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function FeatureTeaser() {
  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Explore Our Spiritual Tools
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-slate">
            Everything you need to grow in faith — all in one place.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, i) => (
            <TeaserRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
