'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import type { PortfolioCategory } from '@/types/sanity'

const categories: Array<PortfolioCategory | 'all'> = [
  'all', 'bouquet', 'flowers', 'proposal', 'basket', 'event', 'class',
]

interface CategoryFilterProps {
  activeCategory: PortfolioCategory | 'all'
  onChange: (category: PortfolioCategory | 'all') => void
}

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const t = useTranslations('portfolio')

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-300',
            activeCategory === cat
              ? 'border-text bg-text text-background'
              : 'border-border text-text-muted hover:border-accent hover:text-accent',
          )}
        >
          {cat === 'all' ? t('all') : t(`categories.${cat}`)}
        </button>
      ))}
    </div>
  )
}
