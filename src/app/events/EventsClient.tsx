'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Event Filter Component
const EventFilter = ({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) => {
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'training', label: 'Training' },
    { id: 'conference', label: 'Conference' },
    { id: 'community outreach', label: 'Community Outreach' },
    { id: 'awareness campaign', label: 'Awareness Campaign' },
    { id: 'fundraiser', label: 'Fundraiser' },
    { id: 'other', label: 'Other' },
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
    // If time is already formatted, return it
    if (timeString.includes('AM') || timeString.includes('PM') || timeString.includes('-')) {
      return timeString;
    }
    // Otherwise, try to parse it
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return timeString;
    }
  };

  return (
    <Link href={`/events/${event.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {event.category}
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

          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {event.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Capacity:</span> {event.capacity}
            </div>
            <span className="text-orange-600 font-semibold text-sm">
              View Details →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Events Grid Component
export default function EventsClient({ events }: { events: any[] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category && event.category.toLowerCase() === activeFilter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xl text-gray-600 max-w-1xl mx-auto">
            Join us for workshops, conferences, and community events that are making a difference in women's health and empowerment
          </p>
        </motion.div>

        <EventFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              {activeFilter === 'all'
                ? 'No events available yet. Check back soon!'
                : 'No events found for the selected category.'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
