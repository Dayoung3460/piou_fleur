import { groq } from 'next-sanity'

export const portfolioListQuery = groq`
  *[_type == "portfolio" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, slug, category, coverImage, featured, publishedAt, year, client, location
  }
`

export const featuredPortfolioQuery = groq`
  *[_type == "portfolio" && featured == true] | order(publishedAt desc)[0...4] {
    _id, title, slug, category, coverImage, year
  }
`

export const portfolioBySlugQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id, title, slug, category, client, location, year, description, coverImage, gallery, publishedAt
  }
`

export const portfolioByCategoryQuery = groq`
  *[_type == "portfolio" && category == $category] | order(publishedAt desc) {
    _id, title, slug, category, coverImage, year, client
  }
`

export const portfolioSlugsQuery = groq`
  *[_type == "portfolio" && defined(slug.current)] {
    "slug": slug.current,
    category
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, type, description, images, order
  }
`

export const journalListQuery = groq`
  *[_type == "journal" && defined(slug.current)] | order(publishedAt desc) {
    _id, title, slug, thumbnail, publishedAt
  }
`

export const journalBySlugQuery = groq`
  *[_type == "journal" && slug.current == $slug][0] {
    _id, title, slug, content, thumbnail, publishedAt
  }
`

export const journalSlugsQuery = groq`
  *[_type == "journal" && defined(slug.current)] {
    "slug": slug.current
  }
`
