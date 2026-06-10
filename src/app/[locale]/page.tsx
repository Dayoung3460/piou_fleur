import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { ContactCTA } from '@/components/home/ContactCTA'
import { sanityFetch } from '@/sanity/client'
import { siteSettingsQuery, featuredPortfolioQuery } from '@/sanity/queries'
import type { PortfolioItem, SiteSettings } from '@/types/sanity'

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale)

  let siteSettings: SiteSettings | null = null
  let featuredItems: PortfolioItem[] = []

  try {
    ;[siteSettings, featuredItems] = await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ['siteSettings'] }),
      sanityFetch<PortfolioItem[]>({ query: featuredPortfolioQuery, tags: ['portfolio'] }),
    ])
  } catch {
    // Sanity not configured yet
  }

  // Use dedicated hero images; fall back to featured portfolio covers
  const heroImages = siteSettings?.heroImages?.length
    ? siteSettings.heroImages
    : featuredItems.map((i) => i.coverImage)

  return (
    <>
      <HeroSection images={heroImages} />
      <ContactCTA />
    </>
  )
}
