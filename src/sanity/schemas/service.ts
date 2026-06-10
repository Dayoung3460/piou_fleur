import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'ko', type: 'string', title: '한국어' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en' },
    }),
    defineField({
      name: 'type',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bouquet', value: 'bouquet' },
          { title: 'Flowers', value: 'flowers' },
          { title: 'Proposal', value: 'proposal' },
          { title: 'Basket', value: 'basket' },
          { title: 'Event', value: 'event' },
          { title: 'Class', value: 'class' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'ko',
          type: 'array',
          title: '한국어 내용',
          of: [{ type: 'block' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English Content',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.ko',
      subtitle: 'type',
      media: 'images',
    },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Untitled', subtitle, media }
    },
  },
})
