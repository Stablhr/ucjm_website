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

function FeatureCard({ feature, index }) {
  const [ref, isVisible] = useScrollReveal()
  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={`group flex flex-col overflow-hidden rounded-xl border border-divider bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={feature.image}
          alt={feature.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3 inline-flex items-center justify-center rounded-lg bg-white/90 p-2.5 text-accent shadow-sm backdrop-blur-sm">
          <Icon size={20} />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 py-6">
        <h3 className="font-display text-xl font-bold text-charcoal">
          {feature.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
          {feature.description}
        </p>
        <Link
          to={feature.link}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors group-hover:text-accent/70"
        >
          {feature.linkLabel}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
