import Image from 'next/image';
import Link from 'next/link';
import { fetchResources } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import ResourcesClient from './ResourcesClient';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80"
          alt="Resources"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Resources
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Knowledge, insights, and tools to empower women and girls
        </p>
      </div>
    </section>
  );
};

// Main Resources Page Component (Server Component)
export default async function Resources() {
  // Fetch resources from Sanity CMS
  let resources = [];
  try {
    resources = await fetchResources();
  } catch (error) {
    console.error('Error fetching resources:', error);
  }

  // Format resources data for the client component
  const formattedResources = resources.map((resource: any) => ({
    id: resource._id,
    title: resource.title,
    description: resource.description || 'No description available',
    image: resource.thumbnail ? urlForImage(resource.thumbnail).url() : (resource.image ? urlForImage(resource.image).url() : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80'),
    category: resource.category || 'blog',
    type: resource.resourceType || resource.category || 'Article',
    slug: resource.slug?.current || resource._id,
    downloadUrl: resource.externalLink || (resource.fileUpload?.asset ? `/api/download/${resource.fileUpload.asset._ref}` : '#'),
    downloadCount: resource.downloadCount || '',
    publishDate: resource.publishDate || resource.publishedAt || new Date().toISOString().split('T')[0],
  }));

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ResourcesClient resources={formattedResources} />
    </div>
  );
}
