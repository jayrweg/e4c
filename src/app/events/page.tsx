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
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80"
          alt="Our Events"
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
          Our Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Join us in creating positive change through community events and workshops
        </motion.p>
      </div>
    </section>
  );
};

// Event Filter Component
const EventFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'conference', label: 'Conferences' },
    { id: 'community', label: 'Community Events' },
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

// Event Card Component
const EventCard = ({ event, index }: { event: any; index: number }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

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
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            event.status === 'upcoming' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
            {event.type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-orange-600 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold">{formatDate(event.date)}</span>
          <svg className="w-5 h-5 ml-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">{formatTime(event.time)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {event.title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {event.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Attendees:</span> {event.attendees}
          </div>
          {event.status === 'upcoming' && (
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
              Register
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Events Grid Component
const EventsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // TODO: Replace with Sanity CMS data fetching
  // This is sample data - in production, fetch from Sanity CMS
  const events = [
    {
      id: 1,
      title: 'Women\'s Health Awareness Workshop',
      description: 'A comprehensive workshop covering reproductive health, family planning, and informed decision-making for women and girls.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-02-15',
      time: '09:00',
      location: 'Dar es Salaam Community Center',
      type: 'Workshop',
      status: 'upcoming',
      attendees: '50 participants',
      tags: ['workshop', 'upcoming'],
    },
    {
      id: 2,
      title: 'Disability Inclusion in Healthcare Conference',
      description: 'A conference bringing together healthcare providers, advocates, and community members to discuss inclusive healthcare practices.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-20',
      time: '08:30',
      location: 'Arusha Convention Center',
      type: 'Conference',
      status: 'past',
      attendees: '200 participants',
      tags: ['conference', 'past'],
    },
    {
      id: 3,
      title: 'Community Health Fair',
      description: 'A community health fair providing free health screenings, education, and resources for women and families.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-03-10',
      time: '10:00',
      location: 'Mwanza City Park',
      type: 'Community Event',
      status: 'upcoming',
      attendees: '300+ expected',
      tags: ['community', 'upcoming'],
    },
    {
      id: 4,
      title: 'Youth Leadership Training',
      description: 'Empowering young women with leadership skills, reproductive health knowledge, and advocacy training.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-01-05',
      time: '09:00',
      location: 'Dodoma Youth Center',
      type: 'Workshop',
      status: 'past',
      attendees: '75 participants',
      tags: ['workshop', 'past'],
    },
    {
      id: 5,
      title: 'Policy Advocacy Roundtable',
      description: 'A roundtable discussion with policymakers, advocates, and community leaders on improving reproductive health policies.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2024-02-28',
      time: '14:00',
      location: 'Tanzania Parliament Building',
      type: 'Conference',
      status: 'upcoming',
      attendees: '100 participants',
      tags: ['conference', 'upcoming'],
    },
    {
      id: 6,
      title: 'Healthcare Provider Training',
      description: 'Training session for healthcare providers on disability-inclusive practices and accessible reproductive health services.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '2023-12-15',
      time: '08:00',
      location: 'Kilimanjaro Medical Center',
      type: 'Workshop',
      status: 'past',
      attendees: '45 participants',
      tags: ['workshop', 'past'],
    },
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.tags.includes(activeFilter));

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
            Upcoming & Past Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for workshops, conferences, and community events that are making a difference in women's health and empowerment
          </p>
        </motion.div>

        <EventFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No events found for the selected category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Event Statistics Component
const EventStats = () => {
  const stats = [
    {
      number: '25+',
      label: 'Events This Year',
      icon: '📅',
    },
    {
      number: '1,200+',
      label: 'Total Attendees',
      icon: '👥',
    },
    {
      number: '8',
      label: 'Regions Covered',
      icon: '🌍',
    },
    {
      number: '95%',
      label: 'Satisfaction Rate',
      icon: '⭐',
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
            Event Impact Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our events are creating meaningful connections and driving positive change
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
            Stay Updated on Our Events
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events, workshops, and community activities
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

// Main Events Page Component
export default function Events() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <EventsGrid />
      <EventStats />
      <NewsletterSignup />
    </div>
  );
}
