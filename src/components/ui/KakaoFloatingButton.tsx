import { KAKAO_CHANNEL_URL } from '@/lib/contact'

export function KakaoFloatingButton() {
  return (
    <a
      href={KAKAO_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 상담"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5
        bg-[#FEE500] text-[#391B1B]
        rounded-full shadow-md
        pl-3.5 pr-4 py-3
        hover:shadow-lg hover:scale-105
        transition-all duration-300"
    >
      <KakaoIcon />
      <span className="text-xs font-semibold tracking-wide">카카오 상담</span>
    </a>
  )
}

function KakaoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 5.93 2 10.8c0 3.07 1.87 5.78 4.7 7.4l-.94 3.47a.4.4 0 0 0 .58.46l4.15-2.36c.5.07 1 .1 1.51.1 5.52 0 10-3.93 10-8.8S17.52 2 12 2z" />
    </svg>
  )
}
