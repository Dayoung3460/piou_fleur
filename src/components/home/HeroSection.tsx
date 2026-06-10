'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { SanityImage } from '@/components/ui/SanityImage'
import type { SanityImageObject } from '@/types/sanity'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface HeroSectionProps {
  heroImage: SanityImageObject | null
}

export function HeroSection({ heroImage }: HeroSectionProps) {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-[2fr_3fr] overflow-hidden bg-background">

      {/* Text column — bottom on mobile, left on desktop */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-32 md:py-0 order-2 md:order-1">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden">
          <p className="font-cormorant text-[20vw] font-light tracking-widest text-accent uppercase whitespace-nowrap">
            Piou Fleur
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="label-text mb-8"
        >
          Floral Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="heading-display mb-6"
        >
          {t('tagline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="body-text max-w-sm mb-12"
        >
          {t('subtagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/portfolio" className="btn-primary">
            {t('cta_portfolio')}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t('cta_contact')}
          </Link>
        </motion.div>
      </div>

      {/* Image column — top on mobile, right on desktop */}
      <div className="relative h-[60vh] md:min-h-screen overflow-hidden order-1 md:order-2">
        {heroImage ? (
          <SanityImage
            image={heroImage}
            alt="Piou Fleur"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0 bg-accent-light" />
        )}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: EASE }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border origin-left"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-accent-light"
        />
      </motion.div>
    </section>
  )
}
