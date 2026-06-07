import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/client'
import { portfolioSlugsQuery, journalSlugsQuery } from '@/sanity/queries'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pioufleur.com'

export default async function sitemap({
  params,
}: {
  params: { locale: string }
}): Promise<MetadataRoute.Sitemap> {
  const locale = params.locale
  const base = `${siteUrl}/${locale}`

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/portfolio`, priority: 0.9 },
    { url: `${base}/services`, priority: 0.8 },
    { url: `${base}/journal`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.8 },
  ]

  let portfolioPages: MetadataRoute.Sitemap = []
  let journalPages: MetadataRoute.Sitemap = []

  try {
    const portfolioSlugs = await sanityFetch<Array<{ slug: string; category: string }}>({
      query: portfolioSlugsQuery,
      tags: ['portfolio'],
    })
    portfolioPages = portfolioSlugs.map(({ slug, category }) => ({
      url: `${base}/portfolio/${category}/${slug}`,
      priority: 0.7,
    }))

    const journalSlugs = await sanityFetch<Array<{ slug: string }}>({
      query: journalSlugsQuery,
      tags: ['journal'],
    })
    journalPages = journalSlugs.map(({ slug }) => ({
      url: `${base}/journal/${slug}`,
      priority: 0.6,
    }))
  } catch {
    // Sanity not configured
  }

  return [...staticPages, ...portfolioPages, ...journalPages]
}
