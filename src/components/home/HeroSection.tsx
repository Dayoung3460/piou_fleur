'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { HeroCarousel } from './HeroCarousel'
import type { SanityImageObject } from '@/types/sanity'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface HeroSectionProps {
  images: SanityImageObject[]
}

export function HeroSection({ images }: HeroSectionProps) {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">

      {/* Carousel / placeholder layer */}
      <div className="absolute inset-0">
        {images.length > 0 ? (
          <HeroCarousel images={images} />
        ) : (
          <div className="absolute inset-0 bg-accent-light" />
        )}
      </div>

      {/* Scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25 pointer-events-none" />

      {/* Text overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="label-text mb-8 text-white/70"
        >
          Floral Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="heading-display mb-6 text-white max-w-2xl"
        >
          {t('tagline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="body-text max-w-sm mb-12 text-white/80"
        >
          {t('subtagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <Link href="/portfolio" className="btn-primary">
            {t('cta_portfolio')}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t('cta_contact')}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/20 origin-left"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-white/40"
        />
      </motion.div>
    </section>
  )
}
