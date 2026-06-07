import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  external,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(variantClasses[variant], className)

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}
    >
      {children}
    </button>
  )
}
