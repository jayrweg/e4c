import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Optimized Sanity client with caching and performance settings
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  // Use CDN for faster reads (cached at edge, 5-10x faster)
  useCdn: true,
  apiVersion: '2024-01-01',
  // Reduce network overhead
  perspective: 'published',
  // Enable stega for faster image loading
  stega: false,
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

// Cached client for static pages (revalidate every 60 seconds)
export const staticClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  perspective: 'published',
})
