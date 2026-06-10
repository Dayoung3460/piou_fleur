import { Link } from '@/i18n/routing'
import { SanityImage } from '@/components/ui/SanityImage'
import type { PortfolioItem, Locale } from '@/types/sanity'
import { getLocalized } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface PortfolioCardProps {
  item: PortfolioItem
  locale: Locale
}

export function PortfolioCard({ item, locale }: PortfolioCardProps) {
  const t = useTranslations('portfolio')

  return (
    <Link
      href={`/portfolio/${item.category}/${item.slug.current}` as `/portfolio/${string}/${string}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-4">
        {item.coverImage ? (
          <SanityImage
            image={item.coverImage}
            alt={getLocalized(item.title, locale)}
            fill
            className="transition-transform duration-700 ease-luxury group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-accent-light" />
        )}
        {item.year && (
          <div className="absolute bottom-3 right-3 bg-background/90 px-2 py-1">
            <span className="text-xs text-text-muted">{item.year}</span>
          </div>
        )}
      </div>
      <div>
        <p className="label-text mb-1">{t(`categories.${item.category}`)}</p>
        <h3 className="text-base font-medium text-text group-hover:text-accent transition-colors duration-300">
          {getLocalized(item.title, locale)}
        </h3>
        {item.client && (
          <p className="text-sm text-text-muted mt-1">{item.client}</p>
        )}
      </div>
    </Link>
  )
}
