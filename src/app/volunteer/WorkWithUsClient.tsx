'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Opportunity Card Component
const OpportunityCard = ({ opportunity, index }: { opportunity: any; index: number }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No deadline specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return deadline >= today;
  };

  const status = isOpen();

  return (
    <Link href={`/volunteer/${opportunity.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {opportunity.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  opportunity.type === 'internship'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {opportunity.type}
                </span>
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {opportunity.employmentType}
                </span>
                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {opportunity.location}
                </span>
                {opportunity.duration && (
                  <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {opportunity.duration}
                  </span>
                )}
              </div>
            </div>
            {/* Status Badge */}
            <div className="ml-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                status
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {status ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {opportunity.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span><strong>Deadline:</strong> {formatDate(opportunity.deadline)}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hover:text-orange-600 transition-colors">
                {opportunity.contactEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-orange-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// Main Work With Us Client Component
export default function WorkWithUsClient({ opportunities }: { opportunities: any[] }) {
  const [filter, setFilter] = useState<'all' | 'job' | 'internship'>('all');

  const filteredOpportunities = filter === 'all'
    ? opportunities
    : opportunities.filter(opp => opp.type === filter);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            Join our mission to empower women and girls across Tanzania
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
            }`}
          >
            All Opportunities
          </button>
          <button
            onClick={() => setFilter('job')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === 'job'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setFilter('internship')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filter === 'internship'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
            }`}
          >
            Internships
          </button>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOpportunities.map((opportunity, index) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-lg"
          >
            <p className="text-gray-500 text-lg">
              No {filter !== 'all' ? filter : ''} opportunities available at the moment. Please check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
