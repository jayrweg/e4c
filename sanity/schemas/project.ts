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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
      subtitle: 'status',
      media: 'image',
    },
  },
})
