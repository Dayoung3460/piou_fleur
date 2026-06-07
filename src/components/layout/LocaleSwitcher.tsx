'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface LocaleSwitcherProps {
  className?: string
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggle = () => {
    router.replace(pathname, { locale: locale === 'ko' ? 'en' : 'ko' })
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'font-inter text-xs tracking-[0.15em] uppercase text-text-muted',
        'hover:text-text transition-colors duration-300',
        className,
      )}
      aria-label={locale === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      {locale === 'ko' ? 'EN' : 'KO'}
    </button>
  )
}
