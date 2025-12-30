import Image from 'next/image';
import Link from 'next/link';
import { fetchJobs } from '@/lib/api';
import WorkWithUsClient from './WorkWithUsClient';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects/project-education.jpg"
          alt="Work with us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Work With Us
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Join our mission to empower women and girls across Tanzania
        </p>
      </div>
    </section>
  );
};

// Main Work With Us Page Component (Server Component)
export default async function WorkWithUs() {
  // Fetch all opportunities (jobs and internships) from Sanity CMS
  let opportunities = [];
  try {
    opportunities = await fetchJobs();
  } catch (error) {
    console.error('Error fetching opportunities:', error);
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
      <HeaderBanner />
      <WorkWithUsClient opportunities={formattedOpportunities} />
    </div>
  );
}
