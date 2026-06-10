import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/ui/FadeIn'
import { SanityImage } from '@/components/ui/SanityImage'
import { sanityFetch } from '@/sanity/client'
import { portfolioBySlugQuery, portfolioSlugsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import type { PortfolioItem, Locale } from '@/types/sanity'
import type { Metadata } from 'next'
import { getLocalized } from '@/lib/utils'

interface Props {
  params: { locale: string; category: string; slug: string }
}

export async function generateStaticParams() {
  try {
    const items = await sanityFetch<{ slug: string; category: string }[]>({
      query: portfolioSlugsQuery,
      tags: ['portfolio'],
    })
    return items.map(({ slug, category }) => ({ category, slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  try {
    const item = await sanityFetch<PortfolioItem>({
      query: portfolioBySlugQuery,
      params: { slug },
      tags: ['portfolio'],
    })
    if (!item) return {}
    const title = getLocalized(item.title, locale)
    const description = getLocalized(item.description, locale)
    return {
      title,
      description,
      openGraph: {
        images: item.coverImage
          ? [urlFor(item.coverImage).width(1200).height(630).url()]
          : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function PortfolioDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  let item: PortfolioItem | null = null
  try {
    item = await sanityFetch<PortfolioItem>({
      query: portfolioBySlugQuery,
      params: { slug },
      tags: ['portfolio'],
    })
  } catch {
    // Sanity not configured
  }

  if (!item) notFound()

  const title = getLocalized(item.title, locale)
  const description = getLocalized(item.description, locale)

  return (
    <div className="pt-24">
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        {item.coverImage ? (
          <SanityImage
            image={item.coverImage}
            alt={title}
            fill
            priority
            className=""
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-accent-light" />
        )}
        <div className="absolute inset-0 bg-text/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-content">
            <p className="label-text text-background/70 mb-3">
              {t(`categories.${item.category}`)}
            </p>
            <h1 className="heading-1 text-background">{title}</h1>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <FadeIn className="lg:col-span-1">
              <h2 className="label-text mb-6">{t('project_info')}</h2>
              <dl className="space-y-4">
                {item.client && (
                  <div>
                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">{t('client')}</dt>
                    <dd className="text-sm font-medium">{item.client}</dd>
                  </div>
                )}
                {item.location && (
                  <div>
                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">{t('location')}</dt>
                    <dd className="text-sm font-medium">{item.location}</dd>
                  </div>
                )}
                {item.year && (
                  <div>
                    <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">{t('year')}</dt>
                    <dd className="text-sm font-medium">{item.year}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-text-muted uppercase tracking-wider mb-1">{t('category')}</dt>
                  <dd className="text-sm font-medium">{t(`categories.${item.category}`)}</dd>
                </div>
              </dl>
            </FadeIn>

            {description && (
              <FadeIn delay={0.2} className="lg:col-span-2">
                <p className="body-text text-base leading-loose">{description}</p>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {item.gallery && item.gallery.length > 0 && (
        <section className="pb-section lg:pb-section-lg">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.gallery.map((img, idx) => (
                <FadeIn key={idx} delay={idx * 0.05} className="aspect-[4/3] relative overflow-hidden">
                  <SanityImage
                    image={img}
                    alt={`${title} ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container-content pb-section">
        <Link href="/portfolio" className="btn-ghost">
          ← {t('back')}
        </Link>
      </div>
    </div>
  )
}
