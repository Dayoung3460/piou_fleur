import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { FadeIn } from '@/components/ui/FadeIn'
import { sanityFetch } from '@/sanity/client'
import { portfolioByCategoryQuery } from '@/sanity/queries'
import { PORTFOLIO_CATEGORIES } from '@/types/sanity'
import type { PortfolioItem, PortfolioCategory, Locale } from '@/types/sanity'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string; category: string }
}

export function generateStaticParams() {
  return PORTFOLIO_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params: { locale, category } }: Props): Promise<Metadata> {
  if (!PORTFOLIO_CATEGORIES.includes(category as PortfolioCategory)) return {}
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  return {
    title: `${t(`categories.${category as PortfolioCategory}`)} — ${t('title')}`,
  }
}

export default async function PortfolioCategoryPage({ params: { locale, category } }: Props) {
  if (!PORTFOLIO_CATEGORIES.includes(category as PortfolioCategory)) notFound()

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'portfolio' })

  let items: PortfolioItem[] = []
  try {
    items = await sanityFetch<PortfolioItem[]>({
      query: portfolioByCategoryQuery,
      params: { category },
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
          <h1 className="heading-display">
            {t(`categories.${category as PortfolioCategory}`)}
          </h1>
        </FadeIn>

        <PortfolioGrid items={items} locale={locale as Locale} />
      </div>
    </div>
  )
}
