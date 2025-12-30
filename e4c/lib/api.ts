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

// Projects
export async function fetchProjects() {
  return await client.fetch(getProjects)
}

// Events
export async function fetchEvents() {
  return await client.fetch(getEvents)
}

export async function fetchFeaturedEvents() {
  return await client.fetch(getFeaturedEvents)
}

export async function fetchEventBySlug(slug: string) {
  return await client.fetch(getEventBySlug, { slug })
}

// Resources
export async function fetchResources() {
  return await client.fetch(getResources)
}

export async function fetchFeaturedResources() {
  return await client.fetch(getFeaturedResources)
}

// Gallery
export async function fetchGalleryImages() {
  return await client.fetch(getGalleryImages)
}

export async function fetchFeaturedGalleryImages() {
  return await client.fetch(getFeaturedGalleryImages)
}

// Jobs
export async function fetchJobs() {
  return await client.fetch(getJobs)
}

export async function fetchJobBySlug(slug: string) {
  return await client.fetch(getJobBySlug, { slug })
}
