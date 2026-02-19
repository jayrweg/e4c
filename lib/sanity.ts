import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client – useCdn: false so Studio edits appear on the site immediately
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Always fetch fresh data so Studio edits show up right away
  apiVersion: '2024-01-01',
  perspective: 'published',
  stega: false,
  requestTagPrefix: 'e4c',
  timeout: 30000,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Optimized image URL builder with default quality settings
export function urlForImage(source: any) {
  if (!source) return null

  return builder
    .image(source)
    .auto('format') // Automatically serve WebP/AVIF when supported
    .quality(80) // Good balance between quality and size
}

export const staticClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'published',
  requestTagPrefix: 'e4c',
  timeout: 30000,
})
