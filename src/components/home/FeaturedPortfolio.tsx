import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { SanityImage } from '@/components/ui/SanityImage'
import { cn, getLocalized } from '@/lib/utils'
import type { PortfolioItem, Locale } from '@/types/sanity'

interface FeaturedPortfolioProps {
  items: PortfolioItem[]
  locale: Locale
}

const itemConfig = [
  { span: 'md:col-span-2', aspect: 'aspect-[3/4] md:aspect-[4/3]', sizes: '(max-width: 768px) 50vw, 66vw' },
  { span: 'md:col-span-1', aspect: 'aspect-[3/4]',                  sizes: '(max-width: 768px) 50vw, 33vw' },
  { span: 'md:col-span-1', aspect: 'aspect-[3/4]',                  sizes: '(max-width: 768px) 50vw, 33vw' },
  { span: 'md:col-span-2', aspect: 'aspect-[3/4] md:aspect-[4/3]', sizes: '(max-width: 768px) 50vw, 66vw' },
]

export function FeaturedPortfolio({ items, locale }: FeaturedPortfolioProps) {
  const t = useTranslations('home')
  const tPortfolio = useTranslations('portfolio')

  return (
    <section className="section-padding bg-background">
      <div className="container-content">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="label-text mb-3">{t('featured_title')}</p>
            <h2 className="heading-2">{t('featured_subtitle')}</h2>
          </div>
          <Link href="/portfolio" className="btn-ghost self-start md:self-auto">
            {tPortfolio('all')} →
          </Link>
        </FadeIn>

        {items.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  itemConfig[i].span,
                  itemConfig[i].aspect,
                  'bg-accent-light animate-pulse rounded-sm',
                )}
              />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, index) => {
              const config = itemConfig[index] ?? itemConfig[1]
              return (
                <StaggerItem key={item._id} className={config.span}>
                  <Link
                    href={`/portfolio/${item.category}/${item.slug.current}` as `/portfolio/${string}/${string}`}
                    className="group block"
                  >
                    <div className={cn('relative overflow-hidden mb-3', config.aspect)}>
                      {item.coverImage ? (
                        <SanityImage
                          image={item.coverImage}
                          alt={getLocalized(item.title, locale)}
                          fill
                          className="transition-transform duration-700 ease-luxury group-hover:scale-105"
                          sizes={config.sizes}
                        />
                      ) : (
                        <div className="w-full h-full bg-accent-light" />
                      )}
                    </div>
                    <p className="label-text mb-1">
                      {tPortfolio(`categories.${item.category}`)}
                    </p>
                    <p className="text-sm font-medium text-text group-hover:text-accent transition-colors duration-300">
                      {getLocalized(item.title, locale)}
                    </p>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
