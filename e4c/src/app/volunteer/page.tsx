import Image from 'next/image';
import Link from 'next/link';
import { fetchJobs, fetchPageBanner } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import WorkWithUsClient from './WorkWithUsClient';

// Header Banner Component
const HeaderBanner = ({ banner }: { banner: any }) => {
  const bannerImage = banner?.backgroundImage
    ? urlForImage(banner.backgroundImage).url()
    : '/projects/project-education.jpg';
  const heading = banner?.heading || 'Work With Us';
  const subheading = banner?.subheading || 'Join our mission to empower women and girls across Tanzania';

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

// Main Work With Us Page Component (Server Component)
export default async function WorkWithUs() {
  // Fetch opportunities and page banner from Sanity CMS
  let opportunities = [];
  let banner = null;

  try {
    [opportunities, banner] = await Promise.all([
      fetchJobs(),
      fetchPageBanner('volunteer')
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Format opportunities data for client component
  const formattedOpportunities = opportunities.map((job: any) => ({
    id: job._id,
    title: job.title,
    type: job.type,
    description: job.description,
    location: job.location,
    employmentType: job.employmentType,
    duration: job.duration,
    deadline: job.deadline,
    contactEmail: job.contactEmail,
    contactPhone: job.contactPhone,
    slug: job.slug?.current || job._id,
    publishedAt: job.publishedAt,
  }));

  return (
    <div className="min-h-screen">
      <HeaderBanner banner={banner} />
      <WorkWithUsClient opportunities={formattedOpportunities} />
    </div>
  );
}
