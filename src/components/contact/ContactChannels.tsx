import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { KAKAO_CHANNEL_URL } from '@/lib/contact'

interface Channel {
  key: string
  href: string
  icon: string
  external: boolean
}

const channels: Channel[] = [
  {
    key: 'kakao',
    href: KAKAO_CHANNEL_URL,
    icon: '💬',
    external: true,
  },
  {
    key: 'instagram',
    href: 'https://ig.me/m/piou_fleur',
    icon: '📷',
    external: true,
  },
  {
    key: 'phone',
    href: 'tel:+8250713713460',
    icon: '📞',
    external: false,
  },
  {
    key: 'naver',
    href: 'https://talk.naver.com/ct/w45qx8?frm=mnmb&frm=nmb_detail#nafullscreen',
    icon: '✉️',
    external: true,
  },
]

export function ContactChannels() {
  const t = useTranslations('contact')

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {channels.map(({ key, href, icon, external }, idx) => (
        <FadeIn key={key} delay={idx * 0.1}>
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group flex flex-col items-center gap-3 p-6 border border-border
            hover:border-accent hover:bg-accent-light/20
            transition-all duration-300 text-center"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-medium text-text group-hover:text-accent transition-colors duration-300">
              {t(key as 'kakao' | 'instagram' | 'phone' | 'naver')}
            </span>
          </a>
        </FadeIn>
      ))}
    </div>
  )
}
