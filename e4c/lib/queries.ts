import { groq } from 'next-sanity'

// Projects queries
export const getProjects = groq`
  *[_type == "project"] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    content,
    image,
    thumbnail,
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

export const getProjectBySlug = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    image,
    thumbnail,
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
  *[_type == "event"] | order(eventDate desc) {
    _id,
    title,
    slug,
    description,
    excerpt,
    content,
    mainImage,
    gallery,
    eventDate,
    endDate,
    date,
    time,
    location,
    venue,
    category,
    eventType,
    capacity,
    price,
    registrationRequired,
    registrationUrl,
    registrationLink,
    organizers,
    status,
    featured,
    publishedAt
  }
`

export const getFeaturedEvents = groq`
  *[_type == "event" && featured == true] | order(eventDate desc) [0...4] {
    _id,
    title,
    slug,
    description,
    excerpt,
    content,
    mainImage,
    gallery,
    eventDate,
    endDate,
    date,
    time,
    location,
    venue,
    category,
    eventType,
    capacity,
    price,
    registrationRequired,
    registrationUrl,
    registrationLink,
    organizers,
    status,
    publishedAt
  }
`

export const getEventBySlug = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    excerpt,
    content,
    mainImage,
    gallery,
    eventDate,
    endDate,
    date,
    time,
    location,
    venue,
    category,
    eventType,
    capacity,
    price,
    registrationRequired,
    registrationUrl,
    registrationLink,
    organizers,
    status,
    featured,
    publishedAt
  }
`

// Resources queries
export const getResources = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    thumbnail,
    category,
    resourceType,
    fileUpload,
    externalLink,
    videoUrl,
    author,
    language,
    tags,
    downloadable,
    downloadCount,
    publishDate,
    featured,
    publishedAt
  }
`

export const getResourceBySlug = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    image,
    thumbnail,
    category,
    resourceType,
    fileUpload,
    externalLink,
    videoUrl,
    author,
    language,
    tags,
    downloadable,
    downloadCount,
    publishDate,
    featured,
    publishedAt
  }
`

export const getFeaturedResources = groq`
  *[_type == "resource" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    image,
    thumbnail,
    category,
    resourceType,
    fileUpload,
    externalLink,
    videoUrl,
    author,
    language,
    tags,
    downloadable,
    downloadCount,
    publishDate,
    publishedAt
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

// Gallery queries
export const getGalleryImages = groq`
  *[_type == "gallery"] | order(publishedAt desc) {
    _id,
    title,
    image,
    caption,
    category,
    tags,
    location,
    date,
    photographer,
    featured,
    publishedAt
  }
`

export const getFeaturedGalleryImages = groq`
  *[_type == "gallery" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    image,
    caption,
    category,
    tags,
    location,
    date,
    photographer,
    publishedAt
  }
`

// Jobs queries
export const getJobs = groq`
  *[_type == "job"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    description,
    responsibilities,
    qualifications,
    guidelines,
    location,
    employmentType,
    duration,
    deadline,
    contactEmail,
    contactPhone,
    applicationInstructions,
    status,
    publishedAt
  }
`

export const getJobBySlug = groq`
  *[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    description,
    responsibilities,
    qualifications,
    guidelines,
    location,
    employmentType,
    duration,
    deadline,
    contactEmail,
    contactPhone,
    applicationInstructions,
    status,
    publishedAt
  }
`

// Page Banners queries
export const getPageBannerByPage = groq`
  *[_type == "pageBanner" && page == $page && isActive == true][0] {
    _id,
    title,
    page,
    heading,
    subheading,
    backgroundImage
  }
`

export const getAllPageBanners = groq`
  *[_type == "pageBanner" && isActive == true] {
    _id,
    title,
    page,
    heading,
    subheading,
    backgroundImage
  }
`

// Approaches queries
export const getApproaches = groq`
  *[_type == "approach" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    image,
    order
  }
`
