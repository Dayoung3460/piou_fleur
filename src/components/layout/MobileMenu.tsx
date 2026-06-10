'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { LocaleSwitcher } from './LocaleSwitcher'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { key: 'about', href: '/about' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'services', href: '/services' },
  { key: 'journal', href: '/journal' },
  { key: 'contact', href: '/contact' },
] as const

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 md:hidden"
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-text transition-transform"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-px bg-text"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-text transition-transform"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <Link href="/" className="font-cormorant text-xl font-light tracking-widest uppercase">
                Piou Fleur
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-text-muted hover:text-text transition-colors"
                aria-label="메뉴 닫기"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navItems.map(({ key, href }, idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className={cn(
                      'font-cormorant text-3xl font-light tracking-wide',
                      'hover:text-accent transition-colors duration-300',
                      pathname === href ? 'text-accent' : 'text-text',
                    )}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-10 pb-10 flex items-center justify-between">
              <LocaleSwitcher />
              <p className="text-xs text-text-muted tracking-widest uppercase">Piou Fleur</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
