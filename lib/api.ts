import { client } from './sanity'
import {
  getProjects,
  getFeaturedProjects,
  getEvents,
  getFeaturedEvents,
  getResources,
  getFeaturedResources,
  getTestimonials,
  getFeaturedTestimonials,
  getTeamMembers,
  getServices,
  getFeaturedServices,
} from './queries'

// Projects
export async function fetchProjects() {
  return await client.fetch(getProjects)
}

export async function fetchFeaturedProjects() {
  return await client.fetch(getFeaturedProjects)
}

// Events
export async function fetchEvents() {
  return await client.fetch(getEvents)
}

export async function fetchFeaturedEvents() {
  return await client.fetch(getFeaturedEvents)
}

// Resources
export async function fetchResources() {
  return await client.fetch(getResources)
}

export async function fetchFeaturedResources() {
  return await client.fetch(getFeaturedResources)
}

// Testimonials
export async function fetchTestimonials() {
  return await client.fetch(getTestimonials)
}

export async function fetchFeaturedTestimonials() {
  return await client.fetch(getFeaturedTestimonials)
}

// Team Members
export async function fetchTeamMembers() {
  return await client.fetch(getTeamMembers)
}

// Services
export async function fetchServices() {
  return await client.fetch(getServices)
}

export async function fetchFeaturedServices() {
  return await client.fetch(getFeaturedServices)
}
