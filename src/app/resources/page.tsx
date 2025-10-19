'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Resources
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Knowledge, insights, and tools to empower women and girls
        </motion.p>
      </div>
    </section>
  );
};

// Resource Filter Component
const ResourceFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'articles', label: 'Articles' },
    { id: 'research', label: 'Research' },
    { id: 'toolkits', label: 'Toolkits' },
    { id: 'guides', label: 'Guides' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-orange-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

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
    switch (category) {
      case 'articles':
        return '📄';
      case 'research':
        return '🔬';
      case 'toolkits':
        return '🛠️';
      case 'guides':
        return '📖';
      case 'reports':
        return '📊';
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
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {resource.readTime}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(resource.date)}</span>
          <span className="mx-2">•</span>
          <span>By {resource.author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {resource.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {resource.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {resource.tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href={`/resources/${resource.slug}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
          >
            Read More
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
const ResourcesGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // TODO: Replace with Sanity CMS data fetching
  // This is sample data - in production, fetch from Sanity CMS
  const resources = [
    {
      id: 1,
      title: 'Understanding Reproductive Health Rights in Tanzania',
      excerpt: 'A comprehensive guide to understanding reproductive health rights, legal frameworks, and how to access services in Tanzania.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'guides',
      date: '2024-01-15',
      author: 'Dr. Sarah Mwangi',
      readTime: '8 min read',
      slug: 'understanding-reproductive-health-rights-tanzania',
      tags: ['reproductive-health', 'rights', 'legal', 'tanzania'],
    },
    {
      id: 2,
      title: 'Disability-Inclusive Healthcare: A Research Study',
      excerpt: 'Research findings on the barriers faced by women with disabilities in accessing reproductive health services and recommendations for improvement.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'research',
      date: '2024-01-10',
      author: 'Fatuma Ali',
      readTime: '12 min read',
      slug: 'disability-inclusive-healthcare-research',
      tags: ['disability', 'healthcare', 'research', 'inclusion'],
    },
    {
      id: 3,
      title: 'Community Outreach Toolkit',
      excerpt: 'A practical toolkit for conducting community outreach programs focused on women\'s reproductive health education and awareness.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'toolkits',
      date: '2024-01-05',
      author: 'Grace Kimaro',
      readTime: '15 min read',
      slug: 'community-outreach-toolkit',
      tags: ['community', 'outreach', 'education', 'toolkit'],
    },
    {
      id: 4,
      title: 'Annual Impact Report 2023',
      excerpt: 'Our comprehensive annual report showcasing the impact of our programs, key achievements, and stories of transformation from the past year.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'reports',
      date: '2023-12-20',
      author: 'Empower for Change Team',
      readTime: '20 min read',
      slug: 'annual-impact-report-2023',
      tags: ['impact', 'report', 'annual', 'achievements'],
    },
    {
      id: 5,
      title: 'Youth Empowerment: Building Future Leaders',
      excerpt: 'An article exploring the importance of youth empowerment in women\'s health advocacy and how to engage young people in meaningful ways.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'articles',
      date: '2023-12-15',
      author: 'Mary Ndege',
      readTime: '6 min read',
      slug: 'youth-empowerment-building-future-leaders',
      tags: ['youth', 'empowerment', 'leadership', 'advocacy'],
    },
    {
      id: 6,
      title: 'Healthcare Provider Training Manual',
      excerpt: 'A comprehensive manual for healthcare providers on delivering disability-inclusive reproductive health services with practical guidelines and best practices.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'guides',
      date: '2023-12-10',
      author: 'Dr. Sarah Mwangi',
      readTime: '25 min read',
      slug: 'healthcare-provider-training-manual',
      tags: ['healthcare', 'training', 'disability', 'manual'],
    },
    {
      id: 7,
      title: 'Policy Advocacy: Making Your Voice Heard',
      excerpt: 'A guide for community members and advocates on how to effectively engage with policymakers and influence reproductive health policies.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'guides',
      date: '2023-12-05',
      author: 'Zainab Mwalimu',
      readTime: '10 min read',
      slug: 'policy-advocacy-making-voice-heard',
      tags: ['policy', 'advocacy', 'engagement', 'influence'],
    },
    {
      id: 8,
      title: 'Mental Health and Reproductive Health: The Connection',
      excerpt: 'Research article exploring the intersection of mental health and reproductive health, and the importance of holistic care approaches.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'research',
      date: '2023-11-30',
      author: 'Amina Hassan',
      readTime: '14 min read',
      slug: 'mental-health-reproductive-health-connection',
      tags: ['mental-health', 'reproductive-health', 'holistic', 'research'],
    },
  ];

  const filteredResources = activeFilter === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeFilter);

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Knowledge Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our collection of articles, research, toolkits, and guides designed to empower women and girls with knowledge and resources
          </p>
        </motion.div>

        <ResourceFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <ResourceCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No resources found for the selected category.</p>
          </motion.div>
        )}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with these essential resources to learn more about women's health and empowerment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Signup Component
const NewsletterSignup = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest resources, research updates, and insights on women's health and empowerment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Resources Page Component
export default function Resources() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ResourcesGrid />
      <FeaturedResources />
      <NewsletterSignup />
    </div>
  );
}
