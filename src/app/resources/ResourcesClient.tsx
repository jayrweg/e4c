'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Resource Card Component
const ResourceCard = ({ resource, index }: { resource: any; index: number }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'blog':
        return '📝';
      case 'research':
        return '🔬';
      case 'toolkits':
        return '🛠️';
      case 'publications':
        return '📖';
      case 'videos':
        return '🎥';
      default:
        return '📄';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <span className="mr-1">{getCategoryIcon(resource.category)}</span>
            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
          </span>
        </div>
        {resource.type && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {resource.type}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(resource.publishDate)}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {resource.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {resource.description}
        </p>

        <div className="flex items-center justify-between">
          {resource.downloadCount && (
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Downloads:</span> {resource.downloadCount}
            </div>
          )}
          <Link
            href={`/resources/${resource.slug}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
          >
            View Resource
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Resources Grid Component
export default function ResourcesClient({ resources }: { resources: any[] }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            Access our collection of articles, research, toolkits, and guides designed to empower women and girls with knowledge and resources
          </p>
        </motion.div>

        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No resources available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
