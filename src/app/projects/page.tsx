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
          src="/projects/project-education.jpg"
          alt="Our Projects"
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
          Our Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Empowering women and girls through innovative programs and initiatives in Dar es Salaam and Dodoma regions
        </motion.p>
      </div>
    </section>
  );
};

// Project Filter Component
const ProjectFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'reproductive-health', label: 'Reproductive Health' },
    { id: 'education', label: 'Education' },
    { id: 'disability-inclusion', label: 'Disability Inclusion' },
    { id: 'advocacy', label: 'Advocacy' },
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

// Project Card Component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {project.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Impact:</span> {project.impact}
          </div>
          <Link
            href={`/projects/${project.slug}`}
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

// Projects Grid Component
const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // TODO: Replace with Sanity CMS data fetching
  // This is sample data - in production, fetch from Sanity CMS
  const projects = [
    {
      id: 1,
      title: 'Reproductive Health Education Program',
      description: 'Comprehensive education programs for women and girls about reproductive health, family planning, and informed decision-making across 8 regions of Tanzania.',
      image: '/projects/project-education.jpg',
      category: 'Reproductive Health',
      status: 'Active',
      impact: '500+ women reached',
      slug: 'reproductive-health-education',
      tags: ['reproductive-health', 'education'],
    },
    {
      id: 2,
      title: 'Disability Inclusion Initiative',
      description: 'Creating accessible programs and support systems for women and girls with disabilities to access reproductive health services and information.',
      image: '/projects/project-inclusion.jpg',
      category: 'Disability Inclusion',
      status: 'Active',
      impact: '200+ women with disabilities',
      slug: 'disability-inclusion-initiative',
      tags: ['disability-inclusion', 'advocacy'],
    },
    {
      id: 3,
      title: 'Community Advocacy Network',
      description: 'Building community support networks and advocating for policy changes that benefit women and girls across Tanzania.',
      image: '/projects/project-advocacy.jpg',
      category: 'Advocacy',
      status: 'Active',
      impact: '12% budget increase',
      slug: 'community-advocacy-network',
      tags: ['advocacy', 'education'],
    },
    {
      id: 4,
      title: 'Youth Empowerment Program',
      description: 'Empowering young women and girls with life skills, reproductive health knowledge, and leadership training to become change agents in their communities.',
      image: '/projects/project-education.jpg',
      category: 'Education',
      status: 'Active',
      impact: '300+ young women',
      slug: 'youth-empowerment-program',
      tags: ['education', 'reproductive-health'],
    },
    {
      id: 5,
      title: 'Healthcare Provider Training',
      description: 'Training healthcare providers on inclusive practices and disability-friendly approaches to reproductive health services.',
      image: '/projects/project-inclusion.jpg',
      category: 'Education',
      status: 'Completed',
      impact: '150+ providers trained',
      slug: 'healthcare-provider-training',
      tags: ['education', 'disability-inclusion'],
    },
    {
      id: 6,
      title: 'Policy Advocacy Campaign',
      description: 'Advocating for policy changes at the national level to improve reproductive health services and disability inclusion in healthcare.',
      image: '/projects/project-advocacy.jpg',
      category: 'Advocacy',
      status: 'Ongoing',
      impact: '17% budget increase',
      slug: 'policy-advocacy-campaign',
      tags: ['advocacy'],
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

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
            Our Impact Through Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the innovative programs and initiatives that are making a real difference in the lives of women and girls across Tanzania
          </p>
        </motion.div>

        <ProjectFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No projects found for the selected category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Project Statistics Component
const ProjectStats = () => {
  const stats = [
    {
      number: '8',
      label: 'Active Projects',
      icon: '🚀',
    },
    {
      number: '500+',
      label: 'Women Reached',
      icon: '👩',
    },
    {
      number: '8',
      label: 'Regions Covered',
      icon: '🌍',
    },
    {
      number: '95%',
      label: 'Success Rate',
      icon: '📈',
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
            Project Impact at a Glance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our projects are creating measurable change across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Support Our Projects
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Help us expand our reach and create even greater impact in communities across Tanzania
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/donate"
                className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Donate Now
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/volunteer"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
              >
                Volunteer
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Projects Page Component
export default function Projects() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ProjectsGrid />
      <ProjectStats />
      <CallToAction />
    </div>
  );
}
