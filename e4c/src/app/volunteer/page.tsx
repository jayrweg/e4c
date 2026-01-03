import Image from 'next/image';
import Link from 'next/link';
import WorkWithUsClient from './WorkWithUsClient';

// Header Banner Component
const HeaderBanner = () => {
  const bannerImage = '/projects/project-education.jpg';
  const heading = 'Work With Us';
  const subheading = 'Join our mission to empower women and girls across Tanzania';

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

// Main Work With Us Page Component
export default function WorkWithUs() {
  // Use empty opportunities array - can be populated with static data later
  const formattedOpportunities: any[] = [];

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <WorkWithUsClient opportunities={formattedOpportunities} />
    </div>
  );
}
