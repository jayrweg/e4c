'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Header Banner Component
const HeaderBanner = () => {
  const bannerImage = '/projects/project-inclusion.jpg';
  const heading = 'Our Services';
  const subheading = 'Comprehensive programs and services designed to empower women and girls';

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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
    >
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-300">
          <span className="text-3xl">{service.icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {service.title}
        </h3>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed text-center">
        {service.description}
      </p>
      
      <div className="space-y-3 mb-6">
        {service.features.map((feature: string, featureIndex: number) => (
          <div key={featureIndex} className="flex items-center text-gray-700">
            <svg className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Services Grid Component
const ServicesGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Reproductive Health Education',
      description: 'Comprehensive education programs covering reproductive health, family planning, and informed decision-making for women and girls of all abilities.',
      icon: '🏥',
      features: [
        'Interactive workshops and seminars',
        'Age-appropriate education materials',
        'Peer education programs',
        'Community health worker training',
        'Accessible formats for all abilities',
      ],
      link: '/services/reproductive-health-education',
    },
    {
      id: 2,
      title: 'Disability Inclusion Programs',
      description: 'Specialized programs ensuring women and girls with disabilities have equal access to reproductive health services and information.',
      icon: '♿',
      features: [
        'Accessibility assessments and improvements',
        'Sign language interpretation services',
        'Braille and audio materials',
        'Mobility-friendly facilities',
        'Disability awareness training',
      ],
      link: '/services/disability-inclusion-programs',
    },
    {
      id: 3,
      title: 'Community Outreach',
      description: 'Grassroots community engagement programs that bring reproductive health education and services directly to local communities.',
      icon: '🌍',
      features: [
        'Mobile health clinics',
        'Community health fairs',
        'Door-to-door education campaigns',
        'Local leader engagement',
        'Cultural sensitivity training',
      ],
      link: '/services/community-outreach',
    },
    {
      id: 4,
      title: 'Healthcare Provider Training',
      description: 'Professional development programs for healthcare providers to deliver inclusive, accessible, and culturally sensitive reproductive health services.',
      icon: '👩‍⚕️',
      features: [
        'Inclusive care protocols',
        'Communication skills training',
        'Disability awareness workshops',
        'Cultural competency training',
        'Best practices sharing',
      ],
      link: '/services/healthcare-provider-training',
    },
    {
      id: 5,
      title: 'Youth Empowerment',
      description: 'Programs designed to empower young women and girls with knowledge, skills, and confidence to make informed decisions about their health.',
      icon: '👧',
      features: [
        'Leadership development workshops',
        'Peer mentoring programs',
        'Life skills training',
        'Advocacy and activism training',
        'Safe spaces for discussion',
      ],
      link: '/services/youth-empowerment',
    },
    {
      id: 6,
      title: 'Policy Advocacy',
      description: 'Advocacy initiatives working to influence policies and create systemic change that benefits women and girls across Tanzania.',
      icon: '📋',
      features: [
        'Policy research and analysis',
        'Stakeholder engagement',
        'Campaign development',
        'Media advocacy',
        'Coalition building',
      ],
      link: '/services/policy-advocacy',
    },
    {
      id: 7,
      title: 'Support Groups',
      description: 'Safe spaces where women can share experiences, receive emotional support, and access peer-to-peer learning opportunities.',
      icon: '🤝',
      features: [
        'Peer support networks',
        'Facilitated group discussions',
        'Mental health support',
        'Resource sharing',
        'Community building',
      ],
      link: '/services/support-groups',
    },
    {
      id: 8,
      title: 'Research & Evaluation',
      description: 'Evidence-based research programs that inform our services and measure the impact of our interventions on women and girls.',
      icon: '🔬',
      features: [
        'Impact assessment studies',
        'Community needs assessments',
        'Program evaluation',
        'Data collection and analysis',
        'Evidence-based recommendations',
      ],
      link: '/services/research-evaluation',
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
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We offer programs and services that support the diverse needs of women and girls across Tanzania.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Approach Component
const ServiceApproach = () => {
  const approaches = [
    {
      title: 'Holistic Care',
      description: 'We address the physical, emotional, and social aspects of women\'s health, ensuring comprehensive support for all needs.',
      icon: '🔄',
    },
    {
      title: 'Community-Centered',
      description: 'Our services are designed with and for the communities we serve, ensuring cultural relevance and local ownership.',
      icon: '🏘️',
    },
    {
      title: 'Evidence-Based',
      description: 'All our programs are grounded in research and best practices, ensuring effective and measurable outcomes.',
      icon: '📊',
    },
    {
      title: 'Inclusive Design',
      description: 'We ensure our services are accessible to women and girls of all abilities, backgrounds, and circumstances.',
      icon: '🌐',
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
            Our Service Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Our approach to service delivery is guided by principles that ensure maximum impact and meaningful change
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{approach.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {approach.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Impact Component
const ServiceImpact = () => {
  const impactStats = [
    {
      number: '500+',
      label: 'Women Reached',
      description: 'Through our various service programs',
    },
    {
      number: '8',
      label: 'Regions Covered',
      description: 'Across Tanzania with our services',
    },
    {
      number: '95%',
      label: 'Satisfaction Rate',
      description: 'From program participants',
    },
    {
      number: '50+',
      label: 'Healthcare Providers Trained',
      description: 'In inclusive care practices',
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
            Service Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto">
            Our services are making a measurable difference in the lives of women and girls across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Access Our Services?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-5xl mx-auto">
            Whether you're looking for education, support, or advocacy, we're here to help you access the services you need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/volunteer"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
              >
                Volunteer With Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Services Page Component
export default function Services() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ServicesGrid />
      <ServiceApproach />
      <ServiceImpact />
      <CallToAction />
    </div>
  );
}