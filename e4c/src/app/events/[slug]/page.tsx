import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client, urlForImage } from '@/lib/sanity';
import { getEventBySlug } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import ShareButtons from './ShareButtons';

// Fetch event data by slug
async function getEvent(slug: string) {
  const event = await client.fetch(getEventBySlug, { slug });
  return event;
}

// Event Detail Page
export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  // Format date and time
  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const eventDate = event.eventDate || event.date;
  const location = event.venue || event.location;
  const category = event.eventType || event.category;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Main Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={event.mainImage ? urlForImage(event.mainImage).url() : 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80'}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-8 right-8">
          <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg">
            {category}
          </span>
        </div>

        {/* Event Title and Basic Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            {event.status && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                event.status === 'upcoming' ? 'bg-green-500 text-white' :
                event.status === 'ongoing' ? 'bg-blue-500 text-white' :
                event.status === 'completed' ? 'bg-gray-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {event.title}
            </h1>
            {event.excerpt && (
              <p className="text-xl text-gray-200 max-w-3xl">
                {event.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Key Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-orange-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                      <p className="text-gray-700">{formatDate(eventDate)}</p>
                      <p className="text-gray-600 text-sm">{formatTime(eventDate)}</p>
                      {event.endDate && (
                        <p className="text-gray-600 text-sm mt-1">
                          Ends: {formatTime(event.endDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-orange-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-700">{location || 'TBA'}</p>
                    </div>
                  </div>
                </div>

                {event.capacity && (
                  <div className="bg-orange-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-orange-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Capacity</h3>
                        <p className="text-gray-700">{event.capacity}</p>
                      </div>
                    </div>
                  </div>
                )}

                {event.price && (
                  <div className="bg-orange-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-orange-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Price</h3>
                        <p className="text-gray-700">{event.price}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {/* Content (Rich Text) */}
              {event.content && event.content.length > 0 && (
                <div className="mb-8 prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Details</h2>
                  <div className="text-gray-700 leading-relaxed">
                    <PortableText value={event.content} />
                  </div>
                </div>
              )}

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((image: any, index: number) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden group">
                        <Image
                          src={urlForImage(image).url()}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Organizers */}
              {event.organizers && event.organizers.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Organized By</h3>
                  <ul className="space-y-2">
                    {event.organizers.map((organizer: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {organizer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Registration */}
              {event.registrationRequired && (
                <div className="bg-orange-600 rounded-lg shadow-lg p-6 mb-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Registration Required</h3>
                  <p className="mb-4 text-orange-100">
                    This event requires registration to attend.
                  </p>
                  {(event.registrationUrl || event.registrationLink) && (
                    <a
                      href={event.registrationUrl || event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg text-center hover:bg-orange-50 transition-colors duration-300"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              )}

              {/* Share Event */}
              <ShareButtons eventTitle={event.title} />

              {/* Back to Events */}
              <div className="mt-6">
                <Link
                  href="/events"
                  className="block w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-200 transition-colors duration-300"
                >
                  ← Back to Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} | E4C Events`,
    description: event.excerpt || event.description || 'Join us for this exciting event',
  };
}
