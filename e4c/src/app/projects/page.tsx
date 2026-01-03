import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
      <div className="relative z-10 text-center text-white px-4">
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

// Main Projects Page Component
export default function Projects() {
  // Use static project data
  const fallbackProjects = [
    {
      id: '1',
      title: 'Reproductive Health Education Program',
      description: 'Comprehensive education programs for women and girls about reproductive health, family planning, and informed decision-making across 8 regions of Tanzania.',
      image: '/gallery/gallery-1.jpg',
      category: 'Reproductive Health',
      status: 'Active',
      impact: '500+ women reached',
      slug: 'reproductive-health-education',
      tags: ['reproductive-health', 'education'],
    },
    {
      id: '2',
      title: 'Disability Inclusion Initiative',
      description: 'Creating accessible programs and support systems for women and girls with disabilities to access reproductive health services and information.',
      image: '/gallery/gallery-3.jpg',
      category: 'Disability Inclusion',
      status: 'Active',
      impact: '200+ women with disabilities',
      slug: 'disability-inclusion-initiative',
      tags: ['disability-inclusion', 'advocacy'],
    },
    {
      id: '3',
      title: 'Community Advocacy Network',
      description: 'Building community support networks and advocating for policy changes that benefit women and girls across Tanzania.',
      image: '/gallery/gallery-5.jpg',
      category: 'Advocacy',
      status: 'Active',
      impact: '12% budget increase',
      slug: 'community-advocacy-network',
      tags: ['advocacy', 'education'],
    },
    {
      id: '4',
      title: 'Youth Empowerment Program',
      description: 'Empowering young women and girls with life skills, reproductive health knowledge, and leadership training to become change agents in their communities.',
      image: '/gallery/gallery-1.jpg',
      category: 'Education',
      status: 'Active',
      impact: '300+ young women',
      slug: 'youth-empowerment-program',
      tags: ['education', 'reproductive-health'],
    },
    {
      id: '5',
      title: 'Healthcare Provider Training',
      description: 'Training healthcare providers on inclusive practices and disability-friendly approaches to reproductive health services.',
      image: '/gallery/gallery-3.jpg',
      category: 'Education',
      status: 'Completed',
      impact: '150+ providers trained',
      slug: 'healthcare-provider-training',
      tags: ['education', 'disability-inclusion'],
    },
    {
      id: '6',
      title: 'Policy Advocacy Campaign',
      description: 'Advocating for policy changes at the national level to improve reproductive health services and disability inclusion in healthcare.',
      image: '/gallery/gallery-5.jpg',
      category: 'Advocacy',
      status: 'Ongoing',
      impact: '17% budget increase',
      slug: 'policy-advocacy-campaign',
      tags: ['advocacy'],
    },
  ];

  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <ProjectsClient projects={fallbackProjects} />
    </div>
  );
}
