export interface LocalizedString {
  ko: string
  en: string
}

export interface LocalizedBlockContent {
  ko: PortableTextBlock[]
  en: PortableTextBlock[]
}

export interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}

export interface SanityImageObject {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export const PORTFOLIO_CATEGORIES = ['bouquet', 'flowers', 'proposal', 'basket', 'event', 'class'] as const
export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[number]

export interface PortfolioItem {
  _id: string
  title: LocalizedString
  slug: { current: string }
  category: PortfolioCategory
  client?: string
  location?: string
  year?: number
  description?: LocalizedString
  coverImage: SanityImageObject
  gallery?: SanityImageObject[]
  featured: boolean
  publishedAt: string
}

export interface Service {
  _id: string
  title: LocalizedString
  slug: { current: string }
  type: PortfolioCategory
  description?: LocalizedBlockContent
  images?: SanityImageObject
  order: number
}

export interface JournalPost {
  _id: string
  title: LocalizedString
  slug: { current: string }
  content?: LocalizedBlockContent
  thumbnail?: SanityImageObject
  publishedAt: string
}

export type Locale = 'ko' | 'en'
