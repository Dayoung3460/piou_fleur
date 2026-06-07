import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { FadeIn } from '@/components/ui/FadeIn'
import { sanityFetch } from '@/sanity/client'
import { portfolioListQuery } from '@/sanity/queries'
import type { PortfolioItem, Locale } from '@/types/sanity'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function PortfolioPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  let items: PortfolioItem[] = []
  try {
    items = await sanityFetch<PortfolioItem[]>({
      query: portfolioListQuery,
      tags: ['portfolio'],
    })
  } catch {
    // Sanity not configured yet
  }

  return (
    <div className="pt-24 section-padding">
      <div className="container-content">
        <FadeIn className="mb-14">
          <p className="label-text mb-4">{t('title')}</p>
          <h1 className="heading-display">{t('subtitle')}</h1>
        </FadeIn>

        <PortfolioGrid items={items} locale={locale as Locale} />
      </div>
    </div>
  )
}
