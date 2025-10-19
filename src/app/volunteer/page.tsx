'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects/project-education.jpg"
          alt="Volunteer with us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Volunteer With Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Join our mission as a volunteer and help empower women and girls across Tanzania
        </motion.p>
      </div>
    </section>
  );
};

// Volunteer Form Component
const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          areaOfInterest: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const areasOfInterest = [
    'Community Outreach',
    'Health Education',
    'Disability Inclusion',
    'Youth Programs',
    'Policy Advocacy',
    'Event Organization',
    'Administrative Support',
    'Translation Services',
    'Other',
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our Volunteer Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your skills, passion, and time can make a real difference in the lives of women and girls. Fill out the form below to get started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-semibold text-gray-700 mb-2">
                  Area of Interest *
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="">Select an area of interest</option>
                  {areasOfInterest.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about yourself and why you want to volunteer *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300 resize-none"
                placeholder="Share your background, skills, availability, and motivation for volunteering with us..."
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-800 font-medium">
                    Thank you for your interest in volunteering! We'll be in touch soon.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-red-800 font-medium">
                    There was an error submitting your application. Please try again.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit Volunteer Application'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// Volunteer Opportunities Component
const VolunteerOpportunities = () => {
  const opportunities = [
    {
      title: 'Community Outreach Volunteer',
      description: 'Help us reach women and girls in local communities through education and awareness programs.',
      requirements: ['Good communication skills', 'Cultural sensitivity', 'Flexible schedule'],
      timeCommitment: '4-8 hours per week',
      icon: '🌍',
    },
    {
      title: 'Health Education Facilitator',
      description: 'Lead workshops and training sessions on reproductive health topics for women and girls.',
      requirements: ['Health background preferred', 'Public speaking skills', 'Training materials provided'],
      timeCommitment: '6-10 hours per week',
      icon: '🏥',
    },
    {
      title: 'Disability Inclusion Advocate',
      description: 'Work to ensure our programs are accessible and inclusive for women and girls with disabilities.',
      requirements: ['Disability awareness', 'Advocacy experience', 'Accessibility knowledge'],
      timeCommitment: '3-6 hours per week',
      icon: '♿',
    },
    {
      title: 'Youth Program Coordinator',
      description: 'Support our youth empowerment programs and mentor young women and girls.',
      requirements: ['Youth work experience', 'Mentoring skills', 'Background check required'],
      timeCommitment: '5-8 hours per week',
      icon: '👧',
    },
    {
      title: 'Administrative Support',
      description: 'Help with office tasks, data entry, and organizational support to keep our programs running smoothly.',
      requirements: ['Computer skills', 'Attention to detail', 'Organizational abilities'],
      timeCommitment: '4-6 hours per week',
      icon: '📋',
    },
    {
      title: 'Event Volunteer',
      description: 'Assist with organizing and running events, workshops, and community activities.',
      requirements: ['Event planning skills', 'Team player', 'Flexible availability'],
      timeCommitment: 'Event-based',
      icon: '🎉',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Volunteer Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the different ways you can contribute to our mission and make a meaningful impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{opportunity.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {opportunity.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {opportunity.description}
              </p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {opportunity.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm text-orange-600 font-semibold">
                Time Commitment: {opportunity.timeCommitment}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Component
const VolunteerBenefits = () => {
  const benefits = [
    {
      title: 'Make a Real Impact',
      description: 'Contribute to meaningful change in the lives of women and girls across Tanzania.',
      icon: '💪',
    },
    {
      title: 'Develop New Skills',
      description: 'Gain valuable experience in community work, health education, and advocacy.',
      icon: '🎯',
    },
    {
      title: 'Join a Supportive Community',
      description: 'Connect with like-minded individuals who share your passion for women\'s empowerment.',
      icon: '🤝',
    },
    {
      title: 'Flexible Commitment',
      description: 'Choose opportunities that fit your schedule and interests.',
      icon: '⏰',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Volunteer With Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Volunteering with Empower for Change offers numerous benefits and opportunities for personal and professional growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Volunteer Page Component
export default function Volunteer() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <VolunteerForm />
      <VolunteerOpportunities />
      <VolunteerBenefits />
    </div>
  );
}