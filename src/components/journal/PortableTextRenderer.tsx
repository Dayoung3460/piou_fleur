import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@/types/sanity'
import { SanityImage } from '@/components/ui/SanityImage'

interface PortableTextRendererProps {
  content: PortableTextBlock[]
}

const components = {
  types: {
    image: ({ value }: { value: { _type: 'image'; asset: { _ref: string; _type: 'reference' }; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <div className="aspect-[16/9] relative overflow-hidden">
          <SanityImage
            image={value}
            alt={value.alt || ''}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
        {value.caption && (
          <figcaption className="text-sm text-text-muted text-center mt-3">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="heading-2 mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="heading-3 mt-8 mb-4">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-accent pl-6 my-8 italic text-text-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="body-text leading-loose mb-6">{children}</p>
    ),
  },
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="prose-custom">
      <PortableText value={content} components={components as never} />
    </div>
  )
}
