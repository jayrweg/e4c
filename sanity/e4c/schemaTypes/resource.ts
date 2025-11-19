import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
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
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'PDF Document', value: 'pdf'},
          {title: 'Video', value: 'video'},
          {title: 'Article/Blog Post', value: 'article'},
          {title: 'Guide/Manual', value: 'guide'},
          {title: 'Report', value: 'report'},
          {title: 'Infographic', value: 'infographic'},
          {title: 'External Link', value: 'link'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Reproductive Health', value: 'reproductive-health'},
          {title: 'Women\'s Rights', value: 'womens-rights'},
          {title: 'Disability Inclusion', value: 'disability-inclusion'},
          {title: 'Gender Equality', value: 'gender-equality'},
          {title: 'Education', value: 'education'},
          {title: 'Research', value: 'research'},
          {title: 'Policy', value: 'policy'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      description: 'For articles and blog posts',
    }),
    defineField({
      name: 'fileUpload',
      title: 'File Upload',
      type: 'file',
      description: 'Upload PDF, document, or other file',
      options: {
        accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to external resource or video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video platform URL',
    }),
    defineField({
      name: 'author',
      title: 'Author/Creator',
      type: 'string',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Swahili', value: 'sw'},
          {title: 'Both', value: 'both'},
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords for searching',
    }),
    defineField({
      name: 'downloadable',
      title: 'Downloadable',
      type: 'boolean',
      description: 'Allow users to download this resource',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      resourceType: 'resourceType',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, resourceType, category} = selection
      return {
        title: title,
        media: media,
        subtitle: `${resourceType || 'Unknown'} - ${category || 'No category'}`,
      }
    },
  },
})
