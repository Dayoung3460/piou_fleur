import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/ui/FadeIn'
import { SanityImage } from '@/components/ui/SanityImage'
import { sanityFetch } from '@/sanity/client'
import { servicesQuery } from '@/sanity/queries'
import type { Service, Locale } from '@/types/sanity'
import { getLocalized } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ServicesPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'services' })

  let services: Service[] = []
  try {
    services = await sanityFetch<Service[]>({
      query: servicesQuery,
      tags: ['service'],
    })
  } catch {
    // Sanity not configured
  }

  const serviceKeys = ['bouquet', 'flowers', 'proposal', 'basket', 'event', 'class'] as const
  type ServiceKey = typeof serviceKeys[number]

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-content">
          <FadeIn className="mb-16">
            <p className="label-text mb-4">{t('title')}</p>
            <h1 className="heading-display max-w-2xl">{t('subtitle')}</h1>
          </FadeIn>

          <div className="space-y-24">
            {serviceKeys.map((key, idx) => {
              const service = services.find((s) => s.type === key)
              const isReversed = idx % 2 !== 0

              return (
                <div key={key} id={key}>
                <FadeIn>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:[&>*:first-child]:order-2' : ''}`}>
                    <div className="aspect-[4/3] bg-accent-light relative overflow-hidden">
                      {service?.images && (
                        <SanityImage
                          image={service.images}
                          alt={getLocalized(service.title, locale) ?? ''}
                          fill
                          sizes="50vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="label-text mb-4">
                        {String(idx + 1).padStart(2, '0')}
                      </p>
                      <h2 className="heading-2 mb-6">
                        {service
                          ? getLocalized(service.title, locale)
                          : t(`${key as ServiceKey}.title`)}
                      </h2>
                      <p className="body-text leading-loose mb-8">
                        {t(`${key as ServiceKey}.description`)}
                      </p>
                      <Link href="/contact" className="btn-secondary self-start">
                        {t('inquiry')}
                      </Link>
                    </div>
                  </div>
                </FadeIn>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
