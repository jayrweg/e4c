import { defineType, defineField } from 'sanity'

export const pageBanner = defineType({
  name: 'pageBanner',
  title: 'Page Banners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      description: 'Internal identifier for this banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page is this banner for?',
      options: {
        list: [
          { title: 'About Us', value: 'about' },
          { title: 'Projects', value: 'projects' },
          { title: 'Services', value: 'services' },
          { title: 'Contact', value: 'contact' },
          { title: 'Donate', value: 'donate' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Events', value: 'events' },
          { title: 'Resources', value: 'resources' },
          { title: 'Gallery', value: 'gallery' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading displayed on the banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'Subtitle or description below the heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Use this banner on the page',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'page',
      subtitle: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${title.toUpperCase()} Page Banner`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
