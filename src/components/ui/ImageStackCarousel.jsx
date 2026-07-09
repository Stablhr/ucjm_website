import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageStackCarousel({ photos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400

  const navigate = useCallback((newDirection) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) return prev >= photos.length - 1 ? 0 : prev + 1
      return prev <= 0 ? photos.length - 1 : prev - 1
    })
  }, [photos.length])

  const handleDragEnd = (_, info) => {
    const threshold = 50
    if (info.offset.x < -threshold) navigate(1)
    else if (info.offset.x > threshold) navigate(-1)
  }

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) navigate(1)
      else navigate(-1)
    }
  }, [navigate])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [lightboxIndex, photos.length])

  const getCardStyle = (index) => {
    const total = photos.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 5, rotateY: 0 }
    if (diff === -1) return { x: -180, scale: 0.82, opacity: 0.6, zIndex: 4, rotateY: 8 }
    if (diff === -2) return { x: -320, scale: 0.7, opacity: 0.3, zIndex: 3, rotateY: 15 }
    if (diff === 1) return { x: 180, scale: 0.82, opacity: 0.6, zIndex: 4, rotateY: -8 }
    if (diff === 2) return { x: 320, scale: 0.7, opacity: 0.3, zIndex: 3, rotateY: -15 }
    return { x: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -20 : 20 }
  }

  const isVisible = (index) => {
    const total = photos.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  if (photos.length === 0) return null

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl bg-surface">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-charcoal/[0.02] blur-3xl" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[420px] w-[320px] items-center justify-center" style={{ perspective: '1200px' }}>
        {photos.map((photo, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={photo.id}
              className={`absolute ${isCurrent ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
              onClick={() => { if (isCurrent) setLightboxIndex(currentIndex) }}
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: style.zIndex,
              }}
            >
              <div
                className={`relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-ivory ${isCurrent ? 'shadow-xl' : 'shadow-md'}`}
                style={{
                  boxShadow: isCurrent
                    ? '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
                    : '0 10px 30px -10px rgba(0,0,0,0.1)',
                }}
              >
                {/* Card inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-charcoal/5 via-transparent to-transparent" />

                <img
                  src={photo.image_url}
                  alt={photo.alt_text ?? ''}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 to-transparent" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-charcoal' : 'w-2 bg-charcoal/30 hover:bg-charcoal/50'
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-light text-charcoal tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="my-1.5 h-px w-6 bg-charcoal/20" />
          <span className="text-xs text-slate tabular-nums">{String(photos.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/80 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="fixed right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <X size={22} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + photos.length) % photos.length) }}
                className="fixed left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % photos.length) }}
                className="fixed right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div
            className="mt-10 flex min-h-0 w-full max-w-4xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].image_url}
              alt={photos[lightboxIndex].alt_text ?? ''}
              className="max-h-[85vh] w-full rounded-lg object-contain"
            />
          </div>

          <div className="fixed bottom-6 rounded-full bg-white/10 px-3 py-1 text-sm text-white/70 backdrop-blur-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  )
}
