import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/client'
import { portfolioSlugsQuery, journalSlugsQuery } from '@/sanity/queries'
import { siteUrl } from '@/lib/seo'

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
    const [portfolioSlugs, journalSlugs] = await Promise.all([
      sanityFetch<Array<{ slug: string; category: string }>>({
        query: portfolioSlugsQuery,
        tags: ['portfolio'],
      }),
      sanityFetch<Array<{ slug: string }>>({
        query: journalSlugsQuery,
        tags: ['journal'],
      }),
    ])
    portfolioPages = portfolioSlugs.map(({ slug, category }) => ({
      url: `${base}/portfolio/${category}/${slug}`,
      priority: 0.7,
    }))
    journalPages = journalSlugs.map(({ slug }) => ({
      url: `${base}/journal/${slug}`,
      priority: 0.6,
    }))
  } catch {
    // Sanity not configured
  }

  return [...staticPages, ...portfolioPages, ...journalPages]
}