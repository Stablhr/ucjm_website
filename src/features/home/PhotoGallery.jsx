import { Image } from 'lucide-react'
import { Skeleton } from '../../components/ui/Skeleton'
import ImageStackCarousel from '../../components/ui/ImageStackCarousel'
import useHomeStore from './homeStore'

export default function PhotoGallery() {
  const photos = useHomeStore((s) => s.photos)
  const loading = useHomeStore((s) => s.loading)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2 text-accent">
          <Image size={24} />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Photo Gallery
          </h2>
        </div>

        {loading ? (
          <Skeleton className="h-[500px] w-full rounded-xl" />
        ) : photos.length === 0 ? (
          <div className="rounded-lg border border-divider py-16 text-center">
            <Image size={32} className="mx-auto mb-3 text-slate/30" />
            <p className="text-sm text-slate">No photos yet. They will appear here.</p>
          </div>
        ) : (
          <ImageStackCarousel photos={photos} />
        )}
      </div>
    </section>
  )
}
