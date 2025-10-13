import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
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
          { title: 'Blog', value: 'blog' },
          { title: 'Publications', value: 'publications' },
          { title: 'Toolkits', value: 'toolkits' },
          { title: 'Research', value: 'research' },
          { title: 'Videos', value: 'videos' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF Guide', value: 'pdf-guide' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Research Paper', value: 'research-paper' },
          { title: 'Blog Post', value: 'blog-post' },
          { title: 'Video Series', value: 'video-series' },
          { title: 'Handbook', value: 'handbook' },
          { title: 'Research Brief', value: 'research-brief' },
          { title: 'Guide', value: 'guide' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Link to download or view the resource',
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'string',
      description: 'e.g., "1,250", "500+"',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
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
