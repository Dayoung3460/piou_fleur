'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const navItems = [
  { key: 'about', href: '/about' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'services', href: '/services' },
  { key: 'journal', href: '/journal' },
  { key: 'contact', href: '/contact' },
] as const

export function Navigation({ className }: { className?: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {navItems.map(({ key, href }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              'text-sm tracking-[0.08em] uppercase font-medium link-hover',
              'transition-colors duration-300',
              isActive ? 'text-text' : 'text-text-muted hover:text-text',
            )}
          >
            {t(key)}
          </Link>
        )
      })}
    </nav>
  )
}
