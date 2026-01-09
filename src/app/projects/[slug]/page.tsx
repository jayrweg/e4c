import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlForImage } from '@/lib/sanity';
import { getProjectBySlug, getProjects } from '@/lib/queries';
import PortableText from '@/components/PortableText';

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch(getProjects);
  return projects.map((project: any) => ({
    slug: project.slug.current,
  }));
}

// Fetch project data
async function getProject(slug: string) {
  const project = await client.fetch(getProjectBySlug, { slug });
  return project;
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'education':
        return '📚';
      case 'advocacy':
        return '📢';
      case 'community':
        return '🤝';
      case 'healthcare':
        return '🏥';
      case 'research':
        return '🔬';
      default:
        return '🎯';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-600';
      case 'ongoing':
        return 'bg-blue-600';
      case 'expanding':
        return 'bg-purple-600';
      case 'completed':
        return 'bg-gray-600';
      default:
        return 'bg-orange-600';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {project.thumbnail && (
            <Image
              src={urlForImage(project.thumbnail).url()}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            {project.category && (
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <span className="mr-2">{getCategoryIcon(project.category)}</span>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            )}
            {project.status && (
              <span className={`${getStatusColor(project.status)} text-white px-4 py-2 rounded-full text-sm font-semibold capitalize`}>
                {project.status}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-xl md:text-2xl text-gray-200">
              {typeof project.description === 'string' ? project.description : ''}
            </p>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded-2xl">
            {project.startDate && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Start Date</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(project.startDate)}
                </div>
              </div>
            )}
            {project.participants && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Participants</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.participants}
                </div>
              </div>
            )}
            {project.duration && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Duration</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.duration}
                </div>
              </div>
            )}
          </div>

          {/* Additional Project Info */}
          {(project.region || project.funding || project.impact) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-orange-50 rounded-2xl">
              {project.region && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Region</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {project.region}
                  </div>
                </div>
              )}
              {project.funding && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Funding</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {project.funding}
                  </div>
                </div>
              )}
              {project.impact && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Impact</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {project.impact}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Content */}
          {project.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={project.content} />
            </div>
          )}

          {/* Project Image */}
          {project.image && (
            <div className="mb-12">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={urlForImage(project.image).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Back to Projects */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
