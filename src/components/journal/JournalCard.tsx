import { Link } from '@/i18n/routing'
import { SanityImage } from '@/components/ui/SanityImage'
import type { JournalPost, Locale } from '@/types/sanity'
import { useTranslations } from 'next-intl'

interface JournalCardProps {
  post: JournalPost
  locale: Locale
}

function formatDate(dateString: string, locale: Locale) {
  return new Date(dateString).toLocaleDateString(
    locale === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export function JournalCard({ post, locale }: JournalCardProps) {
  const t = useTranslations('journal')

  return (
    <Link href={`/journal/${post.slug.current}` as `/journal/${string}`} className="group block">
      <div className="aspect-[3/2] relative overflow-hidden mb-4">
        {post.thumbnail ? (
          <SanityImage
            image={post.thumbnail}
            alt={post.title[locale] || post.title.ko}
            fill
            className="transition-transform duration-700 ease-luxury group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-accent-light" />
        )}
      </div>
      <time className="label-text block mb-2">{formatDate(post.publishedAt, locale)}</time>
      <h3 className="text-base font-medium text-text group-hover:text-accent transition-colors duration-300 mb-2">
        {post.title[locale] || post.title.ko}
      </h3>
      <span className="btn-ghost text-xs">
        {t('read_more')} →
      </span>
    </Link>
  )
}
