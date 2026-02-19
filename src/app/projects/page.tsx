import Image from 'next/image';
import { fetchProjects } from '@/lib/api';
import { urlForImage } from '@/lib/sanity';
import ProjectsClient from './ProjectsClient';

// Header Banner Component
const HeaderBanner = () => {
  const bannerImage = '/gallery/gallery-2.jpg';
  const heading = 'Our Projects';
  const subheading = 'Empowering women and girls through innovative programs and initiatives in Dar es Salaam and Dodoma regions';

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

// Main Projects Page Component (Server Component)
export default async function Projects() {
  // Fetch projects from Sanity CMS
  let projects = [];

  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  // Format projects data for the client component
  const formattedProjects = projects.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description || 'No description available',
    image: project.thumbnail ? urlForImage(project.thumbnail).url() : (project.image ? urlForImage(project.image).url() : '/gallery/gallery-1.jpg'),
    thumbnail: project.thumbnail ? urlForImage(project.thumbnail).url() : (project.image ? urlForImage(project.image).url() : '/gallery/gallery-1.jpg'),
    category: project.category || 'General',
    status: project.status || 'Active',
    impact: project.impact || 'Impact data coming soon',
    slug: project.slug?.current || project._id,
    tags: project.tags || [],
  }));

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ProjectsClient projects={formattedProjects} />
    </div>
  );
}
