import { setRequestLocale, getTranslations } from 'next-intl/server'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/FadeIn'
import { JournalCard } from '@/components/journal/JournalCard'
import { sanityFetch } from '@/sanity/client'
import { journalListQuery } from '@/sanity/queries'
import type { JournalPost, Locale } from '@/types/sanity'
import type { Metadata } from 'next'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'journal' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function JournalPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'journal' })

  let posts: JournalPost[] = []
  try {
    posts = await sanityFetch<JournalPost[]>({
      query: journalListQuery,
      tags: ['journal'],
    })
  } catch {
    // Sanity not configured
  }

  return (
    <div className="pt-24 section-padding">
      <div className="container-content">
        <FadeIn className="mb-14">
          <p className="label-text mb-4">{t('title')}</p>
          <h1 className="heading-display">{t('subtitle')}</h1>
        </FadeIn>

        {posts.length === 0 ? (
          <div className="py-20 text-center text-text-muted">
            <p>Coming soon.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <StaggerItem key={post._id}>
                <JournalCard post={post} locale={locale as Locale} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}
