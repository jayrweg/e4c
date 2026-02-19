import Image from 'next/image';
import EventsClient from './EventsClient';

// Header Banner Component
const HeaderBanner = () => {
  const bannerImage = '/gallery/gallery-1.jpg';
  const heading = 'Our Events';
  const subheading = 'Join us in creating positive change through community events and workshops';

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
      <div className="relative z-10 text-center text-white px-6 sm:px-10">
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
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
export default function Events() {
  // Use empty events array - can be populated with static data later
  const formattedEvents: any[] = [];

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <EventsClient events={formattedEvents} />
      <EventStats />
    </div>
  );
}
