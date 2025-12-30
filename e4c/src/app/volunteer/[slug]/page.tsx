import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { getJobBySlug } from '@/lib/queries';
import { PortableText } from '@portabletext/react';

// Fetch job/internship data by slug
async function getOpportunity(slug: string) {
  const opportunity = await client.fetch(getJobBySlug, { slug });
  return opportunity;
}

// Job/Internship Detail Page
export default async function OpportunityDetailPage({ params }: { params: { slug: string } }) {
  const opportunity = await getOpportunity(params.slug);

  if (!opportunity) {
    notFound();
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No deadline specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Check if deadline has passed
  const isOpen = () => {
    if (!opportunity.deadline) return true;
    const deadline = new Date(opportunity.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deadline >= today;
  };

  const status = isOpen();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Type Badge */}
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase mb-4 ${
                opportunity.type === 'internship'
                  ? 'bg-purple-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {opportunity.type}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {opportunity.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {opportunity.employmentType}
                </span>
                <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  📍 {opportunity.location}
                </span>
                {opportunity.duration && (
                  <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ⏱️ {opportunity.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="ml-6">
              <span className={`inline-block px-6 py-3 rounded-full text-base font-bold shadow-lg ${
                status
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}>
                {status ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Position</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {opportunity.description}
                </p>
              </div>

              {/* Responsibilities */}
              {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Responsibilities</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={opportunity.responsibilities} />
                  </div>
                </div>
              )}

              {/* Qualifications */}
              {opportunity.qualifications && opportunity.qualifications.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Qualifications & Requirements</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={opportunity.qualifications} />
                  </div>
                </div>
              )}

              {/* Application Guidelines */}
              {opportunity.guidelines && opportunity.guidelines.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Guidelines</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <PortableText value={opportunity.guidelines} />
                  </div>
                </div>
              )}

              {/* Application Instructions */}
              {opportunity.applicationInstructions && (
                <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {opportunity.applicationInstructions}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Information</h3>

                <div className="space-y-4">
                  {/* Deadline */}
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Application Deadline</p>
                      <p className="text-gray-600 text-sm mt-1">{formatDate(opportunity.deadline)}</p>
                    </div>
                  </div>

                  {/* Date Posted */}
                  {opportunity.publishedAt && (
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Date Posted</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {new Date(opportunity.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600 text-sm mt-1">{opportunity.location}</p>
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Employment Type</p>
                      <p className="text-gray-600 text-sm mt-1">{opportunity.employmentType}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${opportunity.contactEmail}`}
                      className="flex items-center text-orange-600 hover:text-orange-700 transition-colors text-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {opportunity.contactEmail}
                    </a>
                    {opportunity.contactPhone && (
                      <a
                        href={`tel:${opportunity.contactPhone}`}
                        className="flex items-center text-orange-600 hover:text-orange-700 transition-colors text-sm"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {opportunity.contactPhone}
                      </a>
                    )}
                  </div>
                </div>

                {status && (
                  <div className="mt-6">
                    <a
                      href={`mailto:${opportunity.contactEmail}?subject=Application for ${opportunity.title}`}
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors duration-300 shadow-lg"
                    >
                      Apply via Email
                    </a>
                  </div>
                )}
              </div>

              {/* Back to Opportunities */}
              <Link
                href="/volunteer"
                className="block w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-200 transition-colors duration-300"
              >
                ← Back to Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const opportunity = await getOpportunity(params.slug);

  if (!opportunity) {
    return {
      title: 'Opportunity Not Found',
    };
  }

  return {
    title: `${opportunity.title} | E4C Careers`,
    description: opportunity.description || 'Join our team at Empowered for Change',
  };
}
