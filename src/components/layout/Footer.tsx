import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from './LocaleSwitcher'

export function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-cormorant text-2xl font-light tracking-widest uppercase mb-3">
              Piou Fleur
            </p>
            <p className="text-sm text-text-muted leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <p className="label-text mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {['about', 'portfolio', 'services', 'journal', 'contact'].map((key) => (
                <Link
                  key={key}
                  href={`/${key}` as '/about' | '/portfolio' | '/services' | '/journal' | '/contact'}
                  className="text-sm text-text-muted hover:text-text transition-colors duration-300 link-hover w-fit"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label-text mb-4">Contact</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/pioufleur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-text transition-colors duration-300 link-hover w-fit"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@pioufleur.com"
                className="text-sm text-text-muted hover:text-text transition-colors duration-300 link-hover w-fit"
              >
                hello@pioufleur.com
              </a>
            </div>
          </div>
        </div>

        <div className="divider pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {year} Piou Fleur. {t('footer.rights')}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  )
}
