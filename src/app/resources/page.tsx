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

// Featured Resources Component
const FeaturedResources = () => {
  const featuredResources = [
    {
      title: 'Quick Start Guide to Women\'s Health',
      description: 'Essential information every woman should know about reproductive health and accessing services.',
      icon: '🚀',
      link: '/resources/quick-start-guide-womens-health',
    },
    {
      title: 'Disability Inclusion Checklist',
      description: 'A practical checklist for ensuring healthcare services are accessible to women with disabilities.',
      icon: '✅',
      link: '/resources/disability-inclusion-checklist',
    },
    {
      title: 'Community Engagement Strategies',
      description: 'Proven strategies for engaging communities in women\'s health advocacy and education.',
      icon: '🤝',
      link: '/resources/community-engagement-strategies',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Start with these essential resources to learn more about women's health and empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredResources.map((resource) => (
            <div
              key={resource.title}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {resource.description}
              </p>
              <Link
                href={resource.link}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
              >
                Access Resource
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
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
    image: resource.image ? urlForImage(resource.image).url() : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80',
    category: resource.category || 'blog',
    type: resource.type || 'guide',
    slug: resource.slug?.current || resource._id,
    downloadUrl: resource.downloadUrl || '#',
    downloadCount: resource.downloadCount || '',
    publishDate: resource.publishDate || new Date().toISOString().split('T')[0],
  }));

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ResourcesClient resources={formattedResources} />
      <FeaturedResources />
    </div>
  );
}
