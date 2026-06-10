import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedPortfolio } from '@/components/home/FeaturedPortfolio'
import { ContactCTA } from '@/components/home/ContactCTA'
import { sanityFetch } from '@/sanity/client'
import { featuredPortfolioQuery } from '@/sanity/queries'
import type { PortfolioItem, Locale } from '@/types/sanity'

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale)

  let featuredItems: PortfolioItem[] = []
  try {
    featuredItems = await sanityFetch<PortfolioItem[]>({
      query: featuredPortfolioQuery,
      tags: ['portfolio'],
    })
  } catch {
    // Sanity not configured yet — show empty state
  }

  const heroImage = featuredItems[0]?.coverImage ?? null

  return (
    <>
      <HeroSection heroImage={heroImage} />
      <FeaturedPortfolio items={featuredItems} locale={locale as Locale} />
<ContactCTA />
    </>
  )
}
