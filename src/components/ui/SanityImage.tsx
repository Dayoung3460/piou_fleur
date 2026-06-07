import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SanityImageObject } from '@/types/sanity'
import { cn } from '@/lib/utils'

interface SanityImageProps {
  image: SanityImageObject
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 85,
  sizes,
}: SanityImageProps) {
  if (!image?.asset?._ref) {
    return (
      <div className={cn('bg-accent-light', className)} aria-label={alt} />
    )
  }

  const builder = urlFor(image).auto('format').quality(quality)
  const src = fill
    ? builder.url()
    : builder.width(width || 800).height(height || 600).url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn('object-cover', className)}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}
