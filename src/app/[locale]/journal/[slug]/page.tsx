import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/ui/FadeIn'
import { SanityImage } from '@/components/ui/SanityImage'
import { PortableTextRenderer } from '@/components/journal/PortableTextRenderer'
import { sanityFetch } from '@/sanity/client'
import { journalBySlugQuery, journalSlugsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { JournalPost, Locale } from '@/types/sanity'
import type { Metadata } from 'next'
import { getLocalized } from '@/lib/utils'

interface Props {
  params: { locale: string; slug: string }
}

export async function generateStaticParams() {
  try {
    const posts = await sanityFetch<{ slug: string }[]>({
      query: journalSlugsQuery,
      tags: ['journal'],
    })
    return posts.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  try {
    const post = await sanityFetch<JournalPost>({
      query: journalBySlugQuery,
      params: { slug },
      tags: ['journal'],
    })
    if (!post) return {}
    const title = getLocalized(post.title, locale)
    return {
      title,
      openGraph: {
        images: post.thumbnail
          ? [urlFor(post.thumbnail).width(1200).height(630).url()]
          : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function JournalDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'journal' })

  let post: JournalPost | null = null
  try {
    post = await sanityFetch<JournalPost>({
      query: journalBySlugQuery,
      params: { slug },
      tags: ['journal'],
    })
  } catch {
    // Sanity not configured
  }

  if (!post) notFound()

  const title = getLocalized(post.title, locale)
  const content = getLocalized(post.content, locale)

  return (
    <div className="pt-24">
      {post.thumbnail && (
        <div className="relative h-[50vh] overflow-hidden">
          <SanityImage
            image={post.thumbnail}
            alt={title}
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-text/20" />
        </div>
      )}

      <article className="section-padding">
        <div className="container-content max-w-content-narrow">
          <FadeIn>
            <time className="label-text block mb-4">
              {new Date(post.publishedAt).toLocaleDateString(
                locale === 'ko' ? 'ko-KR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' },
              )}
            </time>
            <h1 className="heading-1 mb-12">{title}</h1>

            {content && (
              <PortableTextRenderer content={content} />
            )}
          </FadeIn>

          <div className="mt-16 pt-8 divider">
            <Link href="/journal" className="btn-ghost">
              ← {t('back')}
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
