'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/gallery-1.jpg"
          alt="Our Gallery"
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
          Our Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Moments of impact, empowerment, and positive change in our communities
        </motion.p>
      </div>
    </section>
  );
};

// Gallery Filter Component
const GalleryFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'events', label: 'Events' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'community', label: 'Community' },
    { id: 'team', label: 'Team' },
    { id: 'impact', label: 'Impact' },
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

// Lightbox Component
const Lightbox = ({ isOpen, onClose, image, images, currentIndex, setCurrentIndex }: {
  isOpen: boolean;
  onClose: () => void;
  image: any;
  images: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}) => {
  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-6xl max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <div className="relative">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 rounded-b-lg">
              <h3 className="text-lg font-semibold mb-1">{images[currentIndex].title}</h3>
              <p className="text-sm opacity-90">{images[currentIndex].description}</p>
              {images.length > 1 && (
                <p className="text-xs opacity-75 mt-2">
                  {currentIndex + 1} of {images.length}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Gallery Grid Component
const GalleryGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // TODO: Replace with Sanity CMS data fetching
  // This is sample data - in production, fetch from Sanity CMS
  const galleryImages = [
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

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.tags.includes(activeFilter));

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

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
            Moments of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our gallery to see the faces, places, and moments that define our mission to empower women and girls
          </p>
        </motion.div>

        <GalleryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Image Info */}
              <div className="mt-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No images found for the selected category.</p>
          </motion.div>
        )}

        {/* Lightbox */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          image={filteredImages[currentImageIndex]}
          images={filteredImages}
          currentIndex={currentImageIndex}
          setCurrentIndex={setCurrentImageIndex}
        />
      </div>
    </section>
  );
};

// Gallery Statistics Component
const GalleryStats = () => {
  const stats = [
    {
      number: '500+',
      label: 'Photos Captured',
      icon: '📸',
    },
    {
      number: '50+',
      label: 'Events Documented',
      icon: '📅',
    },
    {
      number: '1,000+',
      label: 'Lives Touched',
      icon: '❤️',
    },
    {
      number: '8',
      label: 'Regions Covered',
      icon: '🌍',
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
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every photo tells a story of empowerment, growth, and positive change
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

// Main Gallery Page Component
export default function Gallery() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <GalleryGrid />
      <GalleryStats />
    </div>
  );
}
