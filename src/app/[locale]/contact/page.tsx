import { setRequestLocale, getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactChannels } from '@/components/contact/ContactChannels'
import { InquiryForm } from '@/components/contact/InquiryForm'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

  return (
    <div className="pt-24 section-padding">
      <div className="container-content">
        <FadeIn className="mb-16">
          <p className="label-text mb-4">{t('title')}</p>
          <h1 className="heading-display max-w-xl">{t('subtitle')}</h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactChannels />
        </FadeIn>

        <FadeIn delay={0.4} className="mt-12">
          <p className="label-text mb-2">{t('location_label')}</p>
          <p className="body-text">{t('address')}</p>
        </FadeIn>
      </div>
    </div>
  )
}
