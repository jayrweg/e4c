import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client – useCdn: false + cache: 'no-store' so Sanity Studio edits
// appear on the site immediately without a rebuild or cache flush.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'published',
  stega: false,
  requestTagPrefix: 'e4c',
  timeout: 30000,
  // Bypass Next.js data cache – ensures every fetch goes directly to the
  // Sanity API so published changes are visible without a redeployment.
  fetchOptions: {
    cache: 'no-store',
  },
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
  fetchOptions: {
    cache: 'no-store',
  },
})
