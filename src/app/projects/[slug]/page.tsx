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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {project.mainImage && (
            <Image
              src={urlForImage(project.mainImage).url()}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </h1>
          {project.excerpt && (
            <p className="text-xl md:text-2xl text-gray-200">
              {project.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 p-6 bg-gray-50 rounded-2xl">
            {project.status && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <div className="text-lg font-semibold text-orange-600 capitalize">
                  {project.status}
                </div>
              </div>
            )}
            {project.location && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.location}
                </div>
              </div>
            )}
            {project.beneficiaries && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Beneficiaries</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.beneficiaries}+
                </div>
              </div>
            )}
            {(project.startDate || project.endDate) && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="text-lg font-semibold text-gray-900">
                  {project.startDate && new Date(project.startDate).getFullYear()}
                  {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                  {!project.endDate && project.status === 'ongoing' && ' - Present'}
                </div>
              </div>
            )}
          </div>

          {/* Project Description */}
          {project.description && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={project.description} />
            </div>
          )}

          {/* Partners */}
          {project.partners && project.partners.length > 0 && (
            <div className="mb-12 p-6 bg-orange-50 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner Organizations</h2>
              <div className="flex flex-wrap gap-3">
                {project.partners.map((partner: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery.map((image: any, index: number) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={urlForImage(image).url()}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center p-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">Support This Project</h2>
            <p className="text-xl mb-6 text-orange-100">
              Help us make an even greater impact in the community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-xl"
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
              >
                Volunteer
              </Link>
            </div>
          </div>

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
