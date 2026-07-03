import { Image } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import useHomeStore from './homeStore'

export default function PhotoGallery() {
  const photos = useHomeStore((s) => s.photos)
  const loading = useHomeStore((s) => s.loading)

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
            {photos.map((photo) => (
              <div key={photo.id} className="group aspect-square overflow-hidden rounded-lg">
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
    </section>
  )
}
