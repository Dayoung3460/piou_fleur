import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      description: '랜딩 페이지 상단 슬라이드 사진 (3장 이상 권장)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
