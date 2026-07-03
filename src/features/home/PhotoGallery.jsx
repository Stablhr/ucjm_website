import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { Skeleton } from '../../components/ui/Skeleton'
import useHomeStore from './homeStore'

export default function PhotoGallery() {
  const photos = useHomeStore((s) => s.photos)
  const loading = useHomeStore((s) => s.loading)
  const [index, setIndex] = useState(null)

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (index === null) return
    const handler = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [index, goNext, goPrev])

  return (
    <section className="border-t border-divider py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2 text-accent">
          <Image size={24} />
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Photo Gallery
          </h2>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="mt-8 rounded-lg border border-divider py-16 text-center">
            <Image size={32} className="mx-auto mb-3 text-slate/30" />
            <p className="text-sm text-slate">No photos yet. They will appear here.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setIndex(i)}
                className="group aspect-square cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={photo.image_url}
                  alt={photo.alt_text ?? ''}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-95"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-black/90">
          <button
            onClick={() => setIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            <X size={22} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center" onClick={() => setIndex(null)}>
            <img
              src={photos[index].image_url}
              alt={photos[index].alt_text ?? ''}
              className="max-h-screen max-w-full object-contain p-12"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-6 rounded-full bg-white/10 px-3 py-1 text-sm text-white/70 backdrop-blur-sm">
            {index + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  )
}
