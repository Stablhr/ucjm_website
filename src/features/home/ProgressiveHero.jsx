import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import { cn } from '../../lib/utils'
import Button from '../../components/ui/Button'

const titles = ['worship', 'faith', 'community']

export default function ProgressiveHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2500)
    return () => clearTimeout(timeoutId)
  }, [titleNumber])

  const onScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const heroOffset = Math.min(scrollY * 0.35, 120)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden -mt-20">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 h-[120%] w-full -top-[10%] will-change-transform"
        style={{ transform: `translateY(${heroOffset}px)` }}
      >
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="flex flex-col items-center gap-8 py-20 lg:py-40 w-full max-w-4xl">
          {/* Top tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link
              to="/guide"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Start your daily reading <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="font-semibold text-accent">Welcome to</span>
              <br />
              <span className="relative inline-flex h-[1.2em] w-full items-center justify-center overflow-hidden">
                <span className="invisible">UCJM Church</span>
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: '-100%' }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title === 'worship' ? 'UCJM Church' : title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mx-auto max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
            >
              A community of faith, hope, and love — united in Christ Jesus.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            <Link to="/signup">
              <Button className="gap-3 px-8 py-3 text-base shadow-lg shadow-accent/30">
                Join Our Family <Heart className="h-4 w-4" fill="currentColor" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
