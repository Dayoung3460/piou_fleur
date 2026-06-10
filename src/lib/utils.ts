import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalized<T>(value: { ko: T; en: T }, locale: string): T
export function getLocalized<T>(value: { ko: T; en: T } | undefined, locale: string): T | undefined
export function getLocalized<T>(value: { ko: T; en: T } | undefined, locale: string): T | undefined {
  if (!value) return undefined
  return value[locale as 'ko' | 'en'] ?? value.ko
}
