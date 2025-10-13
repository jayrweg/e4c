import { groq } from 'next-sanity'

// Projects queries
export const getProjects = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    status,
    category,
    participants,
    duration,
    impact,
    region,
    startDate,
    funding,
    featured
  }
`

export const getFeaturedProjects = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    description,
    image,
    status,
    category,
    participants,
    duration,
    impact,
    region,
    startDate,
    funding
  }
`

// Events queries
export const getEvents = groq`
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    image,
    date,
    time,
    location,
    category,
    capacity,
    price,
    registrationUrl,
    featured
  }
`

export const getFeaturedEvents = groq`
  *[_type == "event" && featured == true] | order(date desc) [0...4] {
    _id,
    title,
    slug,
    description,
    image,
    date,
    time,
    location,
    category,
    capacity,
    price,
    registrationUrl
  }
`

// Resources queries
export const getResources = groq`
  *[_type == "resource"] | order(publishDate desc) {
    _id,
    title,
    slug,
    description,
    image,
    category,
    type,
    downloadUrl,
    downloadCount,
    publishDate,
    featured
  }
`

export const getFeaturedResources = groq`
  *[_type == "resource" && featured == true] | order(publishDate desc) [0...6] {
    _id,
    title,
    slug,
    description,
    image,
    category,
    type,
    downloadUrl,
    downloadCount,
    publishDate
  }
`

// Testimonials queries
export const getTestimonials = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    role,
    location,
    image,
    quote,
    rating,
    featured
  }
`

export const getFeaturedTestimonials = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    role,
    location,
    image,
    quote,
    rating
  }
`

// Team members queries
export const getTeamMembers = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    image,
    bio,
    email,
    linkedin,
    order
  }
`

// Services queries
export const getServices = groq`
  *[_type == "service"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    features,
    targetAudience,
    duration,
    impact,
    featured
  }
`

export const getFeaturedServices = groq`
  *[_type == "service" && featured == true] | order(_createdAt desc) [0...4] {
    _id,
    title,
    slug,
    description,
    image,
    features,
    targetAudience,
    duration,
    impact
  }
`
