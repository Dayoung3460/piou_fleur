import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/ui/FadeIn'

export function ContactCTA() {
  const t = useTranslations('home')

  return (
    <section className="section-padding bg-text text-background">
      <div className="container-content text-center">
        <FadeIn>
          <p className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-3xl mx-auto">
            {t('cta_title')}
          </p>
          <p className="text-background/60 text-base mb-10 max-w-md mx-auto">
            {t('cta_subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-background text-background px-10 py-4
            text-sm tracking-[0.1em] uppercase font-medium
            hover:bg-background hover:text-text
            transition-all duration-300"
          >
            {t('cta_button')}
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
