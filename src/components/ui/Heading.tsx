import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingSize = 'display' | '1' | '2' | '3' | '4'

interface HeadingProps {
  level?: HeadingLevel
  size?: HeadingSize
  children: ReactNode
  className?: string
  serif?: boolean
}

const sizeClasses: Record<HeadingSize, string> = {
  display: 'heading-display',
  '1': 'heading-1',
  '2': 'heading-2',
  '3': 'heading-3',
  '4': 'text-lg font-medium tracking-wide',
}

export function Heading({ level = 'h2', size = '2', children, className, serif = true }: HeadingProps) {
  const Tag = level
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        serif && (size === 'display' || size === '1' || size === '2') && 'font-cormorant',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
