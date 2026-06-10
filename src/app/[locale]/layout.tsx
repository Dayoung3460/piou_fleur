import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/seo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { KakaoFloatingButton } from '@/components/ui/KakaoFloatingButton'

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
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: locale === 'ko' ? 'Piou Fleur | 럭셔리 플로럴 스튜디오' : 'Piou Fleur | Luxury Floral Studio',
      template: '%s | Piou Fleur',
    },
    description: locale === 'ko'
      ? '피오유 플레르. 꽃이 기억의 일부가 되는 럭셔리 플로럴 스튜디오. 웨딩, 기업 행사, 공간 스타일링, 플라워 클래스.'
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

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <KakaoFloatingButton />
    </NextIntlClientProvider>
  )
}
