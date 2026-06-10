import { setRequestLocale, getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('studio_description'),
  }
}

export default async function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-content max-w-content-narrow">
          <FadeIn>
            <p className="label-text mb-4">{t('title')}</p>
            <h1 className="heading-display mb-8">{t('studio_title')}</h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
              <div>
                <p className="label-text mb-6">{t('studio_title')}</p>
                <p className="body-text text-base leading-loose">
                  {t('studio_description')}
                </p>
              </div>
              <div className="aspect-[3/4] bg-accent-light" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-accent-light/20">
        <div className="container-content max-w-content-narrow">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[3/4] bg-accent-light order-2 md:order-1" />
              <div className="order-1 md:order-2">
                <p className="label-text mb-6">{t('philosophy_title')}</p>
                <h2 className="heading-2 mb-8">{t('philosophy_title')}</h2>
                <p className="body-text leading-loose">
                  {t('philosophy_description')}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-content max-w-content-narrow">
          <FadeIn>
            <p className="label-text mb-4">{t('florist_title')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">
              <div className="aspect-square bg-accent-light" />
              <div className="flex flex-col justify-center">
                <h2 className="heading-2 mb-6">Florist</h2>
                <p className="body-text leading-loose">
                  {t('florist_description')}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
