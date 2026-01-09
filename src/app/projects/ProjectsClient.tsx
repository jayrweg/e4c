'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Project Card Component
const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.thumbnail || project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={index < 3}
          loading={index < 3 ? 'eager' : 'lazy'}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-lg">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/95 text-gray-700 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
            {project.status}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-5 leading-relaxed line-clamp-3 text-sm md:text-base">
          {project.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Impact:</span> {project.impact}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300 text-sm md:text-base"
          >
            Read More
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Project Impact at a Glance
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-7xl mx-auto">
            Our projects are creating measurable change across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
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
    <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Support Our Projects
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-8xl mx-auto leading-relaxed">
            Help us expand our reach and create even greater impact in communities across Tanzania
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/donate"
                className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-base md:text-lg transition-colors duration-300 shadow-xl hover:shadow-2xl"
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
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-base md:text-lg transition-all duration-300"
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

// Projects Grid Component
export default function ProjectsClient({ projects }: { projects: any[] }) {
  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our Impact Through Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-10xl mx-auto leading-relaxed">
              Discover the innovative programs and initiatives that are making a real difference in the lives of women and girls across Tanzania
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 md:py-20"
            >
              <p className="text-gray-500 text-lg md:text-xl">No projects found.</p>
            </motion.div>
          )}
        </div>
      </section>

      <ProjectStats />
      <CallToAction />
    </>
  );
}
