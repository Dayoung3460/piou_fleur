import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F4EF',
        text: {
          DEFAULT: '#222222',
          muted: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#8A7A66',
          light: '#D8CFC2',
        },
        border: '#D8CFC2',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'Apple SD Gothic Neo', ...fontFamily.sans],
        cormorant: ['var(--font-cormorant)', ...fontFamily.serif],
        inter: ['var(--font-inter)', ...fontFamily.sans],
        sans: ['Pretendard', 'var(--font-inter)', 'Apple SD Gothic Neo', ...fontFamily.sans],
      },
      spacing: {
        section: '5rem',
        'section-lg': '7.5rem',
      },
      maxWidth: {
        content: '1280px',
        'content-narrow': '900px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
