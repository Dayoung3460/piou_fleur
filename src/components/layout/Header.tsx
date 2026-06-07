'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { LocaleSwitcher } from './LocaleSwitcher'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border/50 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="container-content flex items-center justify-between">
        <Link
          href="/"
          className="font-cormorant text-xl font-light tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
        >
          Piou Fleur
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Navigation />
          <LocaleSwitcher />
        </div>

        <MobileMenu />
      </div>
    </header>
  )
}
