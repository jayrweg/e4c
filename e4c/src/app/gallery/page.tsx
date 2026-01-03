import Image from 'next/image';
import { fetchGalleryImages, fetchPageBanner } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import GalleryClient from './GalleryClient';

// Header Banner Component
const HeaderBanner = ({ banner }: { banner: any }) => {
  const bannerImage = banner?.backgroundImage
    ? urlForImage(banner.backgroundImage).url()
    : '/gallery/gallery-1.jpg';
  const heading = banner?.heading || 'Our Gallery';
  const subheading = banner?.subheading || 'Moments of impact, empowerment, and positive change in our communities';

  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          {subheading}
        </p>
      </div>
    </section>
  );
};

// Main Gallery Page Component (Server Component)
export default async function Gallery() {
  // Fetch gallery images and page banner from Sanity CMS
  let galleryImages = [];
  let banner = null;

  try {
    [galleryImages, banner] = await Promise.all([
      fetchGalleryImages(),
      fetchPageBanner('gallery')
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Format gallery data for client component
  const formattedImages = galleryImages.map((image: any) => ({
    id: image._id,
    src: image.image ? urlForImage(image.image).url() : '/gallery/gallery-1.jpg',
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
      src: '/gallery/gallery-1.jpg',
      alt: 'Women empowerment workshop',
      title: 'Women Empowerment Workshop',
      description: 'Participants learning about reproductive health and decision-making',
      category: 'workshops',
      tags: ['workshops', 'events'],
    },
    {
      id: 2,
      src: '/gallery/gallery-2.jpg',
      alt: 'Community health fair',
      title: 'Community Health Fair',
      description: 'Free health screenings and education for community members',
      category: 'community',
      tags: ['community', 'events'],
    },
    {
      id: 3,
      src: '/gallery/gallery-3.jpg',
      alt: 'Healthcare provider training',
      title: 'Healthcare Provider Training',
      description: 'Training session on inclusive healthcare practices',
      category: 'workshops',
      tags: ['workshops', 'team'],
    },
    {
      id: 4,
      src: '/gallery/gallery-4.jpg',
      alt: 'Disability inclusion conference',
      title: 'Disability Inclusion Conference',
      description: 'Conference on inclusive healthcare and accessibility',
      category: 'events',
      tags: ['events', 'impact'],
    },
    {
      id: 5,
      src: '/gallery/gallery-5.jpg',
      alt: 'Youth leadership program',
      title: 'Youth Leadership Program',
      description: 'Young women developing leadership and advocacy skills',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 6,
      src: '/gallery/gallery-6.jpg',
      alt: 'Team meeting',
      title: 'Team Strategy Meeting',
      description: 'Our team planning future initiatives and programs',
      category: 'team',
      tags: ['team'],
    },
    {
      id: 7,
      src: '/gallery/gallery-1.jpg',
      alt: 'Policy advocacy event',
      title: 'Policy Advocacy Event',
      description: 'Meeting with policymakers to discuss women\'s health policies',
      category: 'events',
      tags: ['events', 'impact'],
    },
    {
      id: 8,
      src: '/gallery/gallery-2.jpg',
      alt: 'Community outreach',
      title: 'Community Outreach',
      description: 'Engaging with community members about reproductive health',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 9,
      src: '/gallery/gallery-3.jpg',
      alt: 'Medical training session',
      title: 'Medical Training Session',
      description: 'Healthcare professionals learning about disability inclusion',
      category: 'workshops',
      tags: ['workshops', 'team'],
    },
    {
      id: 10,
      src: '/gallery/gallery-4.jpg',
      alt: 'Support group meeting',
      title: 'Support Group Meeting',
      description: 'Women sharing experiences and supporting each other',
      category: 'community',
      tags: ['community', 'impact'],
    },
    {
      id: 11,
      src: '/gallery/gallery-5.jpg',
      alt: 'Team building activity',
      title: 'Team Building Activity',
      description: 'Our team participating in a community service project',
      category: 'team',
      tags: ['team', 'community'],
    },
    {
      id: 12,
      src: '/gallery/gallery-6.jpg',
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
      <HeaderBanner banner={banner} />
      <GalleryClient images={displayImages} />
    </div>
  );
}
