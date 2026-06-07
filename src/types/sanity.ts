export interface LocalizedString {
  ko: string
  en: string
}

export interface LocalizedText {
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

export type PortfolioCategory = 'wedding' | 'event' | 'styling' | 'editorial' | 'classes'

export interface PortfolioItem {
  _id: string
  title: LocalizedString
  slug: { current: string }
  category: PortfolioCategory
  client?: string
  location?: string
  year?: number
  description?: LocalizedText
  coverImage: SanityImageObject
  gallery?: SanityImageObject[]
  featured: boolean
  publishedAt: string
}

export interface Service {
  _id: string
  title: LocalizedString
  slug: { current: string }
  type: 'wedding' | 'event' | 'styling' | 'class'
  description?: LocalizedBlockContent
  images?: SanityImageObject[]
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
