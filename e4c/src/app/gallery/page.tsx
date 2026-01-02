import Image from 'next/image';
import { fetchGalleryImages } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import GalleryClient from './GalleryClient';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/gallery-1.webp"
          alt="Our Gallery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Our Gallery
        </h1>
        <p className="text-xl md:text-2xl max-w-6xl mx-auto">
          Moments of impact, empowerment, and positive change in our communities
        </p>
      </div>
    </section>
  );
};

// Main Gallery Page Component (Server Component)
export default async function Gallery() {
  // Fetch gallery images from Sanity CMS
  let galleryImages = [];
  try {
    galleryImages = await fetchGalleryImages();
  } catch (error) {
    console.error('Error fetching gallery images:', error);
  }

  // Format gallery data for client component
  const formattedImages = galleryImages.map((image: any) => ({
    id: image._id,
    src: image.image ? urlForImage(image.image).url() : '/gallery/gallery-1.webp',
    alt: image.title,
    title: image.title,
    description: image.description,
    category: image.category || 'community',
    tags: [image.category?.toLowerCase() || 'community'],
  }));

  // Fallback data if no images in Sanity yet
  const fallbackImages = [
    {
      id: 1,
      src: '/gallery/gallery-1.webp',
      alt: 'Women empowerment workshop',
      title: 'Women Empowerment Workshop',
      description: 'Participants learning about reproductive health and decision-making',
      category: 'workshops',
      tags: ['workshops', 'events'],
    },
    {
      id: 2,
      src: '/gallery/gallery-2.webp',
      alt: 'Community health fair',
      title: 'Community Health Fair',
      description: 'Free health screenings and education for community members',
      category: 'community',
      tags: ['community', 'events'],
    },
    {
      id: 3,
      src: '/gallery/gallery-3.webp',
      alt: 'Healthcare provider training',
      title: 'Healthcare Provider Training',
      description: 'Training session on inclusive healthcare practices',
      category: 'workshops',
      tags: ['workshops', 'team'],
    },
    {
      id: 4,
      src: '/gallery/gallery-4.webp',
      alt: 'Disability inclusion conference',
      title: 'Disability Inclusion Conference',
      description: 'Conference on inclusive healthcare and accessibility',
      category: 'events',
      tags: ['events', 'impact'],
    },
    {
      id: 5,
      src: '/gallery/gallery-5.webp',
      alt: 'Youth leadership program',
      title: 'Youth Leadership Program',
      description: 'Young women developing leadership and advocacy skills',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 6,
      src: '/gallery/gallery-6.webp',
      alt: 'Team meeting',
      title: 'Team Strategy Meeting',
      description: 'Our team planning future initiatives and programs',
      category: 'team',
      tags: ['team'],
    },
    {
      id: 7,
      src: '/gallery/gallery-1.webp',
      alt: 'Policy advocacy event',
      title: 'Policy Advocacy Event',
      description: 'Meeting with policymakers to discuss women\'s health policies',
      category: 'events',
      tags: ['events', 'impact'],
    },
    {
      id: 8,
      src: '/gallery/gallery-2.webp',
      alt: 'Community outreach',
      title: 'Community Outreach',
      description: 'Engaging with community members about reproductive health',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 9,
      src: '/gallery/gallery-3.webp',
      alt: 'Medical training session',
      title: 'Medical Training Session',
      description: 'Healthcare professionals learning about disability inclusion',
      category: 'workshops',
      tags: ['workshops', 'team'],
    },
    {
      id: 10,
      src: '/gallery/gallery-4.webp',
      alt: 'Support group meeting',
      title: 'Support Group Meeting',
      description: 'Women sharing experiences and supporting each other',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 11,
      src: '/gallery/gallery-5.webp',
      alt: 'Team building activity',
      title: 'Team Building Activity',
      description: 'Our team participating in a community service project',
      category: 'team',
      tags: ['team', 'community'],
    },
    {
      id: 12,
      src: '/gallery/gallery-6.webp',
      alt: 'Award ceremony',
      title: 'Recognition Ceremony',
      description: 'Celebrating the achievements of our program participants',
      category: 'events',
      tags: ['events', 'impact'],
    },
  ];

  // Use Sanity data if available, otherwise use fallback
  const displayImages = formattedImages.length > 0 ? formattedImages : fallbackImages;

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <GalleryClient images={displayImages} />
    </div>
  );
}
