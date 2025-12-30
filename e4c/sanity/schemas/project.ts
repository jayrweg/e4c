import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
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
      description: 'Main content of the project (visible when Read More is clicked)',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Expanding', value: 'expanding' },
          { title: 'Completed', value: 'completed' },
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
          { title: 'Education', value: 'education' },
          { title: 'Advocacy', value: 'advocacy' },
          { title: 'Community', value: 'community' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Research', value: 'research' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'string',
      description: 'e.g., "250+", "500 women"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "2 years", "6 months"',
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'text',
      description: 'Brief description of the project impact',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'e.g., "Rural Communities", "National"',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'funding',
      title: 'Funding',
      type: 'string',
      description: 'e.g., "$50,000"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'image',
    },
  },
})
