import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client, urlForImage } from '@/lib/sanity';
import { getResourceBySlug, getResources } from '@/lib/queries';
import PortableText from '@/components/PortableText';

// Generate static params for all resources
export async function generateStaticParams() {
  const resources = await client.fetch(getResources);
  return resources.map((resource: any) => ({
    slug: resource.slug.current,
  }));
}

// Fetch resource data
async function getResource(slug: string) {
  const resource = await client.fetch(getResourceBySlug, { slug });
  return resource;
}

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = await getResource(params.slug);

  if (!resource) {
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
      case 'blog':
        return '📝';
      case 'research':
        return '🔬';
      case 'toolkits':
        return '🛠️';
      case 'publications':
        return '📖';
      case 'videos':
        return '🎥';
      default:
        return '📄';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {resource.thumbnail && (
            <Image
              src={urlForImage(resource.thumbnail).url()}
              alt={resource.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            {resource.category && (
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <span className="mr-2">{getCategoryIcon(resource.category)}</span>
                {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
              </span>
            )}
            {resource.resourceType && (
              <span className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {resource.resourceType}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {resource.title}
          </h1>
          {resource.description && (
            <p className="text-xl md:text-2xl text-gray-200">
              {typeof resource.description === 'string' ? resource.description : ''}
            </p>
          )}
        </div>
      </section>

      {/* Resource Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resource Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded-2xl">
            {resource.publishedAt && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Published</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(resource.publishedAt)}
                </div>
              </div>
            )}
            {resource.author && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Author</div>
                <div className="text-lg font-semibold text-gray-900">
                  {resource.author}
                </div>
              </div>
            )}
            {resource.language && (
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Language</div>
                <div className="text-lg font-semibold text-gray-900 capitalize">
                  {resource.language}
                </div>
              </div>
            )}
          </div>

          {/* Resource Content */}
          {resource.content && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={resource.content} />
            </div>
          )}

          {/* Video Embed */}
          {resource.videoUrl && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={resource.videoUrl}
                  title={resource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="mb-12 p-6 bg-orange-50 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-3">
                {resource.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Download/External Link Section */}
          {(resource.fileUpload || resource.externalLink || resource.downloadable) && (
            <div className="mt-12 p-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Access This Resource</h2>
              <p className="text-xl mb-6 text-orange-100">
                {resource.downloadable ? 'Download this resource or access it online' : 'Access this resource online'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {resource.fileUpload?.asset && (
                  <a
                    href={resource.fileUpload.asset.url}
                    download
                    className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-xl"
                  >
                    Download Resource
                  </a>
                )}
                {resource.externalLink && (
                  <a
                    href={resource.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
                  >
                    View Online
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Back to Resources */}
          <div className="mt-12 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
