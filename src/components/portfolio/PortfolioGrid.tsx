'use client'

import { useState } from 'react'
import { CategoryFilter } from './CategoryFilter'
import { PortfolioCard } from './PortfolioCard'
import { StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import type { PortfolioItem, PortfolioCategory, Locale } from '@/types/sanity'

interface PortfolioGridProps {
  items: PortfolioItem[]
  locale: Locale
}

export function PortfolioGrid({ items, locale }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'all'>('all')

  const filtered = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <div>
      <div className="mb-10">
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-text-muted">
          <p>No items found.</p>
        </div>
      ) : (
        <StaggerContainer
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((item) => (
            <StaggerItem key={item._id}>
              <PortfolioCard item={item} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  )
}
