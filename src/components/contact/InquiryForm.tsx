'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const schema = z.object({
  type: z.string().min(1),
  date: z.string().optional(),
  venue: z.string().optional(),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

const inquiryTypes = ['wedding', 'event', 'styling', 'class', 'other'] as const

export function InquiryForm() {
  const t = useTranslations('contact')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const subject = `[Piou Fleur] ${t(`inquiry_types.${data.type as typeof inquiryTypes[number]}`)}`
    const body = [
      `문의 유형: ${t(`inquiry_types.${data.type as typeof inquiryTypes[number]}`)}`,
      data.date ? `희망 날짜: ${data.date}` : '',
      data.venue ? `장소: ${data.venue}` : '',
      `\n내용:\n${data.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:hello@pioufleur.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const inputClass = cn(
    'w-full border border-border bg-background px-4 py-3 text-sm text-text',
    'focus:outline-none focus:border-accent',
    'transition-colors duration-300 placeholder:text-text-muted/50',
  )

  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="label-text block mb-3">{t('inquiry_type')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {inquiryTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                {...register('type')}
                type="radio"
                value={type}
                className="sr-only peer"
              />
              <span className={cn(
                'block text-center text-xs tracking-[0.1em] uppercase px-3 py-2 border border-border',
                'peer-checked:border-text peer-checked:bg-text peer-checked:text-background',
                'hover:border-accent hover:text-accent transition-all duration-200',
              )}>
                {t(`inquiry_types.${type}`)}
              </span>
            </label>
          ))}
        </div>
        {errors.type && <p className={errorClass}>필수 항목입니다.</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label-text block mb-2">{t('inquiry_date')}</label>
          <input
            {...register('date')}
            type="date"
            className={inputClass}
          />
        </div>
        <div>
          <label className="label-text block mb-2">{t('inquiry_venue')}</label>
          <input
            {...register('venue')}
            type="text"
            placeholder="Grand Hyatt Seoul..."
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="label-text block mb-2">{t('inquiry_message')}</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="문의 내용을 자유롭게 작성해 주세요."
          className={cn(inputClass, 'resize-none')}
        />
        {errors.message && <p className={errorClass}>최소 10자 이상 입력해 주세요.</p>}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        {t('inquiry_submit')}
      </button>
    </form>
  )
}
