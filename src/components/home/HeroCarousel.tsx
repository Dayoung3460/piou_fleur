'use client'

import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { SanityImage } from '@/components/ui/SanityImage'
import type { SanityImageObject } from '@/types/sanity'

interface HeroCarouselProps {
  images: SanityImageObject[]
}

export function HeroCarousel({ images }: HeroCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start' },
    [AutoScroll({ speed: 1, direction: 'forward', stopOnInteraction: false, stopOnMouseEnter: false })],
  )

  return (
    <div ref={emblaRef} className="overflow-hidden w-full h-full cursor-grab active:cursor-grabbing">
      <div className="flex h-full">
        {images.map((img, i) => (
          <div
            key={img.asset._ref}
            className="relative flex-[0_0_auto] h-full w-[85vw] md:w-[50vw] overflow-hidden"
          >
            <SanityImage
              image={img}
              alt={img.alt ?? 'Piou Fleur'}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 85vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
