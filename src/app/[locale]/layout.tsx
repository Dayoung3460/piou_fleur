import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { cormorant, inter } from '@/lib/fonts'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

interface Props {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pioufleur.com'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: locale === 'ko' ? 'Piou Fleur | 럭셔리 플로럴 스튜디오' : 'Piou Fleur | Luxury Floral Studio',
      template: '%s | Piou Fleur',
    },
    description: locale === 'ko'
      ? '피우 플레르. 꽃이 기억의 일부가 되는 럭셔리 플로럴 스튜디오. 웨딩, 기업 행사, 공간 스타일링, 플라워 클래스.'
      : 'Piou Fleur. A luxury floral studio where flowers become part of your memories. Weddings, events, styling, classes.',
    openGraph: {
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      alternateLocale: locale === 'ko' ? 'en_US' : 'ko_KR',
      siteName: 'Piou Fleur',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Piou Fleur' }],
    },
  }
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': process.env.NEXT_PUBLIC_SITE_URL || 'https://pioufleur.com',
  name: 'Piou Fleur',
  description: '럭셔리 플로럴 스튜디오',
  image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pioufleur.com'}/og-image.jpg`,
  priceRange: '₩₩₩',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressLocality: '서울',
  },
  sameAs: ['https://www.instagram.com/pioufleur'],
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-background text-text antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
