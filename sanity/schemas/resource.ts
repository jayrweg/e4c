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
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main content of the resource',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Author or creator of the resource',
      initialValue: 'E4C Admin',
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
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail image for preview',
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Report', value: 'report' },
          { title: 'Guide', value: 'guide' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Research', value: 'research' },
          { title: 'Publication', value: 'publication' },
        ],
      },
      description: 'Type of resource',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Language code (e.g., en, sw)',
      initialValue: 'en',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      description: 'Link to download or view the resource',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'External link to the resource',
    }),
    defineField({
      name: 'fileUpload',
      title: 'File Upload',
      type: 'file',
      description: 'Upload a file (PDF, DOCX, etc.)',
    }),
    defineField({
      name: 'downloadable',
      title: 'Downloadable',
      type: 'boolean',
      description: 'Is this resource downloadable?',
      initialValue: false,
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Date and time when the resource was published',
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
