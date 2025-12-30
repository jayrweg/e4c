import { defineType, defineField } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the image',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Optional URL-friendly identifier',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description or caption for the image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Events', value: 'events' },
          { title: 'Workshops', value: 'workshops' },
          { title: 'Community', value: 'community' },
          { title: 'Team', value: 'team' },
          { title: 'Impact', value: 'impact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capturedDate',
      title: 'Captured Date',
      type: 'date',
      description: 'When the photo was taken',
    }),
    defineField({
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
      description: 'Name of the photographer or credit',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage gallery',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
