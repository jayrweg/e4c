import { defineType, defineField } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job/Internship',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internship', value: 'internship' },
          { title: 'Job', value: 'job' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief summary of the position',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Key responsibilities and duties',
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Required qualifications and skills',
    }),
    defineField({
      name: 'guidelines',
      title: 'Application Guidelines',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Guidelines and requirements for applicants',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., "Dar es Salaam", "Remote", "Dodoma"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 months", "6 months", "Permanent"',
    }),
    defineField({
      name: 'deadline',
      title: 'Application Deadline',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email for applications',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Phone number for inquiries',
    }),
    defineField({
      name: 'applicationInstructions',
      title: 'Application Instructions',
      type: 'text',
      description: 'How to apply',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'open',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date Posted',
      type: 'date',
      description: 'Date when the job/internship was posted',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})
