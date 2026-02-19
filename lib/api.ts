import { client } from './sanity'
import {
  getProjects,
  getEvents,
  getFeaturedEvents,
  getEventBySlug,
  getResources,
  getFeaturedResources,
  getGalleryImages,
  getFeaturedGalleryImages,
  getJobs,
  getJobBySlug,
} from './queries'

// Helper function to handle fetch with timeout and error handling.
// { cache: 'no-store' } bypasses Next.js data cache permanently so Sanity
// edits appear on the site immediately without needing a rebuild.
async function safeFetch<T>(query: string, params?: any, fallback: T = [] as T): Promise<T> {
  try {
    const result = await client.fetch(query, params, { cache: 'no-store' })
    return result || fallback
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return fallback
  }
}

// Projects
export async function fetchProjects() {
  return await safeFetch(getProjects, undefined, [])
}

// Events
export async function fetchEvents() {
  return await safeFetch(getEvents, undefined, [])
}

export async function fetchFeaturedEvents() {
  return await safeFetch(getFeaturedEvents, undefined, [])
}

export async function fetchEventBySlug(slug: string) {
  return await safeFetch(getEventBySlug, { slug }, null)
}

// Resources
export async function fetchResources() {
  return await safeFetch(getResources, undefined, [])
}

export async function fetchFeaturedResources() {
  return await safeFetch(getFeaturedResources, undefined, [])
}

// Gallery
export async function fetchGalleryImages() {
  return await safeFetch(getGalleryImages, undefined, [])
}

export async function fetchFeaturedGalleryImages() {
  return await safeFetch(getFeaturedGalleryImages, undefined, [])
}

// Jobs
export async function fetchJobs() {
  return await safeFetch(getJobs, undefined, [])
}

export async function fetchJobBySlug(slug: string) {
  return await safeFetch(getJobBySlug, { slug }, null)
}
