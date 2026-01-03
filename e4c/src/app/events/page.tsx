import Image from 'next/image';
import { fetchEvents, fetchPageBanner } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import EventsClient from './EventsClient';

// Header Banner Component
const HeaderBanner = ({ banner }: { banner: any }) => {
  const bannerImage = banner?.backgroundImage
    ? urlForImage(banner.backgroundImage).url()
    : 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80';
  const heading = banner?.heading || 'Our Events';
  const subheading = banner?.subheading || 'Join us in creating positive change through community events and workshops';

  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          {subheading}
        </p>
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Event Impact Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-1xl mx-auto">
            Our events are creating meaningful connections and driving positive change
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Events Page Component (Server Component)
export default async function Events() {
  // Fetch events and page banner from Sanity CMS
  let events = [];
  let banner = null;

  try {
    [events, banner] = await Promise.all([
      fetchEvents(),
      fetchPageBanner('events')
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Format events data for the client component
  const formattedEvents = events.map((event: any) => ({
    id: event._id,
    slug: event.slug?.current || '',
    title: event.title,
    description: event.excerpt || event.description || 'No description available',
    image: event.mainImage ? urlForImage(event.mainImage).url() : 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1976&q=80',
    date: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : (event.date || new Date().toISOString().split('T')[0]),
    time: event.eventDate ? new Date(event.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : (event.time || '09:00'),
    location: event.venue || event.location || 'TBA',
    category: event.eventType || event.category || 'community',
    capacity: event.capacity || 'TBA',
    status: event.status || 'upcoming',
    organizers: event.organizers || [],
    registrationRequired: event.registrationRequired || false,
  }));

  return (
    <div className="min-h-screen">
      <HeaderBanner banner={banner} />
      <EventsClient events={formattedEvents} />
      <EventStats />
    </div>
  );
}
