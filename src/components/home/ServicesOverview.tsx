import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'

const serviceTypes = ['wedding', 'event', 'styling', 'class'] as const

const serviceIcons: Record<string, string> = {
  wedding: '✶',
  event: '◇',
  styling: '○',
  class: '△',
}

export function ServicesOverview() {
  const t = useTranslations('services')

  return (
    <section className="section-padding bg-accent-light/30">
      <div className="container-content">
        <FadeIn className="text-center mb-14">
          <p className="label-text mb-3">{t('title')}</p>
          <h2 className="heading-2">{t('subtitle')}</h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceTypes.map((type) => (
            <StaggerItem key={type}>
              <Link href="/services" className="group block p-8 bg-background hover:shadow-sm transition-shadow duration-300">
                <p className="text-accent text-2xl mb-6">{serviceIcons[type]}</p>
                <h3 className="heading-3 mb-3 group-hover:text-accent transition-colors duration-300">
                  {t(`${type}.title`)}
                </h3>
                <p className="body-text text-sm leading-relaxed">
                  {t(`${type}.description`)}
                </p>
                <p className="mt-6 text-xs tracking-[0.1em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t('inquiry')} →
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
