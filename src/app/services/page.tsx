'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Services() {
  const services = [
    {
      id: 'reproductive-health',
      title: 'Reproductive Health Education',
      description: 'Comprehensive education programs covering reproductive health, family planning, sexual wellness, and informed decision-making.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Interactive workshops and seminars',
        'Online learning modules',
        'Resource materials and toolkits',
        'One-on-one counseling sessions',
        'Peer education programs'
      ],
      targetAudience: 'Women and girls aged 15-45',
      duration: 'Ongoing programs',
      impact: 'Improved health outcomes and informed decision-making'
    },
    {
      id: 'education',
      title: 'Education Programs',
      description: 'Structured educational initiatives designed to build knowledge, skills, and confidence in reproductive health matters.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Curriculum development and delivery',
        'Trainer certification programs',
        'Community-based learning circles',
        'Digital literacy for health information',
        'Cultural sensitivity training'
      ],
      targetAudience: 'Community health workers, educators, and women leaders',
      duration: '6-month to 2-year programs',
      impact: 'Enhanced capacity building and knowledge transfer'
    },
    {
      id: 'support',
      title: 'Support Groups',
      description: 'Safe, confidential spaces where women can share experiences, seek guidance, and build supportive networks.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Peer support networks',
        'Professional counseling services',
        'Crisis intervention support',
        'Group therapy sessions',
        'Mentorship programs'
      ],
      targetAudience: 'Women facing reproductive health challenges',
      duration: 'Weekly/bi-weekly meetings',
      impact: 'Improved mental health and social support'
    },
    {
      id: 'advocacy',
      title: 'Advocacy & Rights',
      description: 'Fighting for women\'s reproductive rights through policy advocacy, legal support, and awareness campaigns.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d6f3ad06f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Policy research and analysis',
        'Legislative advocacy campaigns',
        'Legal aid and representation',
        'Public awareness initiatives',
        'Coalition building and partnerships'
      ],
      targetAudience: 'Policy makers, legal professionals, and activists',
      duration: 'Ongoing advocacy efforts',
      impact: 'Policy changes and increased rights awareness'
    },
    {
      id: 'accessibility',
      title: 'Accessibility Services',
      description: 'Ensuring all women, including those with disabilities, have equal access to reproductive health services and information.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Accessible facility design',
        'Assistive technology support',
        'Sign language interpretation',
        'Braille and audio materials',
        'Specialized care coordination'
      ],
      targetAudience: 'Women with disabilities and their families',
      duration: 'Ongoing support services',
      impact: 'Increased accessibility and inclusion'
    },
    {
      id: 'community',
      title: 'Community Outreach',
      description: 'Bringing services directly to communities through mobile clinics, outreach programs, and community partnerships.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Mobile health clinics',
        'Community health fairs',
        'Door-to-door outreach',
        'School-based programs',
        'Workplace wellness initiatives'
      ],
      targetAudience: 'Underserved and rural communities',
      duration: 'Monthly outreach activities',
      impact: 'Increased service accessibility and community engagement'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive support and services designed to empower women and girls of all abilities 
              to make informed decisions about their reproductive health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                      <p className="text-sm text-gray-600">{service.targetAudience}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                      <p className="text-sm text-gray-600">{service.duration}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Expected Impact:</h4>
                    <p className="text-gray-600">{service.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Access Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Access Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with our services is easy. Choose the option that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Contact Us',
                description: 'Reach out through our contact form, phone, or email to discuss your needs and available services.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Assessment',
                description: 'We\'ll conduct a brief assessment to understand your specific needs and recommend the most suitable services.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                step: '03',
                title: 'Get Started',
                description: 'Begin your journey with our services, supported by our team of dedicated professionals and peer supporters.',
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">{step.step}</span>
                </div>
                <div className="text-orange-600 mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Contact us today to learn more about our services and how we can support you on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Call Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
