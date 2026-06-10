import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { cormorant, inter } from '@/lib/fonts'
import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/seo'
import './globals.css'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': siteUrl,
  name: 'Piou Fleur',
  description: '럭셔리 플로럴 스튜디오',
  image: `${siteUrl}/og-image.jpg`,
  priceRange: '₩₩₩',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '알천북로 153 3층',
    addressLocality: '경주시',
    addressRegion: '경상북도',
    addressCountry: 'KR',
  },
  sameAs: ['https://www.instagram.com/piou_fleur/'],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = headers().get('x-next-intl-locale') ?? routing.defaultLocale

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-background text-text antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
