'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { urlForImage } from '@/lib/sanity';
import { fetchApproaches } from '@/lib/api';

// Header Banner Component
const HeaderBanner = () => {
  const bannerImage = '/about/about-preview.jpg';
  const heading = 'About Us';
  const subheading = 'Empowering women and girls of all abilities to realize their reproductive health goals by providing tools for informed decisions';

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

// Organization Story Component
const OrganizationStory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 pb-2">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Empowered for Change was registered under the non-governmental organizations ACT, 2002 on 25th February 2022 with registration number ooNGO/R/2844 to operate in Tanzania mainland.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Since 2022, we have implemented our projects in Dar es Salaam and Dodoma regions, working with the government and collaborating with other partners to ensure increased access to correct information regarding sexual and reproductive issues.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We work with government and private health facilities to improve quality of SRH services including lifting barriers preventing women and girls from accessing SRH services, and collaborate with our partners to ensure more favourable policy and legal framework that supports equitable access of quality SRH services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about/about-preview.jpg"
                alt="Our team working together"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Mission and Vision Component
const MissionVision = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              To empower women, girls and marginalized groups with correct knowledge and skills while creating an enabling environment for them to exercise their rights and fulfil their potentials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Empowered women and girls enjoy their rights and fulfil their potentials.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Our Values Component
const OurValues = () => {
  const values = [
    {
      title: 'Beneficiary-Centered Approach',
      description: 'Our beneficiary-centered approach places women and girls at the heart of our efforts, ensuring that their specific needs and aspirations drive our programs and services. By actively listening to and engaging with them, we tailor our support to address their unique challenges and goals. This commitment fosters empowerment and ensures that our initiatives are both relevant and impactful.',
      icon: '👥',
    },
    {
      title: 'Innovative Approaches',
      description: 'Our innovative approaches are designed to create lasting and meaningful change. By leveraging new ideas and cutting-edge solutions, we address challenges in unique and effective ways. This commitment to innovation ensures that our efforts have a sustainable and profound impact on the communities we serve.',
      icon: '💡',
    },
    {
      title: 'Quality Through Learning',
      description: 'Through continuous learning, we refine and enhance our programs and services to ensure they meet the highest standards of quality. By staying informed about the latest research and best practices, we adapt our approaches to effectively address the needs of those we serve. This commitment to learning drives our dedication to delivering impactful and exceptional services.',
      icon: '📚',
    },
    {
      title: 'Results with Integrity',
      description: 'We achieve results with integrity by adhering to the highest ethical standards in all our actions. Our commitment to transparency and honesty ensures that our outcomes are both credible and trustworthy. By consistently aligning our practices with our values, we build lasting trust and credibility with those we serve.',
      icon: '⚖️',
    },
    {
      title: 'Highly Motivated Teams',
      description: 'We build highly motivated teams by fostering a supportive and empowering work environment. Through clear communication, professional development, and recognition of achievements, we inspire our team members to strive for excellence. This dedication to team motivation drives our collective success and ensures the highest quality in everything we deliver.',
      icon: '🤝',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 max-w-6xl mx-auto">
            The principles that guide our work and shape our commitment to empowering women and girls
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-12xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                <span className="text-3xl">{value.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Static fallback approaches (used when Sanity has no data yet)
const staticApproaches = [
  {
    title: 'Training and Mentorship',
    description: 'We have designed simplified training materials grounded on adult learning theories and we use age appropriate methodologies to make learning more joyful and enjoyable for young people. Our training packages incorporate on-going mentorship to ensure that gained knowledge is sustained and skills are put into practice and become part of day to day life of women and girls.',
    image: '/about/training.jpg',
    sanityImage: null,
  },
  {
    title: 'Structured Dialogues',
    description: 'Our learning approaches are grounded on theories from various scholars that, learning cannot occur without dialogue and reflection. Reading and listening are not enough. Interaction is required. We believe that, the process of putting ideas into words is itself an important form of active engagement with the content, and a way of growing knowledge (even without feedback).',
    image: '/about/dialogue.png',
    sanityImage: null,
  },
  {
    title: 'Domestic Resource Mobilization',
    description: 'Our organization strongly believe that domestic government spending on family planning should become the mainstay of a country\'s family planning program, providing a budgeted flow of funds for services and staff. Our advocacy efforts have therefore focused on working with regional, districts and health facilities to increase allocations, disbursement and utilization of resources for family planning, adolescents\' friendly SRH services and SRH services for people with disabilities.',
    image: '/about/domestic.png',
    sanityImage: null,
  },
  {
    title: 'Strengthening Women-Led CSOs',
    description: 'Our organization believes that women and girls are experts of their own needs and therefore meaningful engagement and involvement of women in policy development, planning, budgeting and all SRH interventions is paramount. Our interventions are focused on building the capacity of women and girls led civil society organizations (CSOs) to lead and fully participate in SRH policy making and programming. We strengthen the ability of CSOs to advocate for quality and equitable SRH information and services and hold the government accountable on its SRH commitments.',
    image: '/about/women.jpg',
    sanityImage: null,
  },
];

// Our Approach Component — fetches live data from Sanity, falls back to static
const OurApproach = ({ approaches }: { approaches: any[] }) => {
  const displayApproaches = approaches.length > 0 ? approaches : staticApproaches;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            Our technical approaches to empowering women and girls and creating lasting positive change in Dar es Salaam and Dodoma regions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayApproaches.map((approach: any, index: number) => {
            // Resolve image: prefer Sanity image, fall back to static path
            const imgSrc = approach.sanityImage
              ? urlForImage(approach.sanityImage)?.width(800).height(400).url()
              : approach.image;

            return (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {imgSrc && (
                  <div className="relative h-48">
                    <Image
                      src={imgSrc}
                      alt={approach.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {approach.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Team Section Component (matching homepage structure)
const TeamSection = () => {
  const boardMembers = [
    {
      id: 1,
      name: 'Judith Justine Kweka',
      role: 'Board Chairperson',
      image: '/team/judith-justine-kweka.jpg',
      bio: `Judith Justine is an experienced project manager and a public health specialist with more than eight years of progressive experience of working in the NGO sector both local and international NGOs, covering both the public and private health sectors. Specifically, she has worked on interventions in the areas of integrated Sexual Reproductive Health such as Family Planning, Comprehensive Post Abortion Care, Cervical Cancer, STIs, HIV and AIDS, GBV, and livelihood enhancement. Judith has extensive experience of working with ministries, the Parliament and local government authorities with profound experience across all the six WHO health systems building blocks financing, health workforce, information systems, medical products and technologies, leadership/governance, and service delivery.`,
    },
    {
      id: 2,
      name: 'Alice Henry Mbowe',
      role: 'Board Member',
      image: '/team/alice-henry-mbowe.jpg',
      bio: `Alice Henry Mbowe is a legal professional holding a bachelor degree in Low from Mzumbe University in Tanzania, with 6 years experience of working as an administration and human resources manager with crown healthcare (T) Ltd. She has extensive experience with the health sector in Tanzania including working directly with both private and public health facilities to ensure availability of medical equipment and devices.`,
    },
    {
      id: 3,
      name: 'Mwiru Siima',
      role: 'Board Member',
      image: '/team/mwiru-siima.jpg',
      bio: `A dynamic and visionary development professional with over 20 years of experience in the sector, with a master's degree in public health specializing in Medical Sociology, my diverse background encompasses research, monitoring and evaluation (M&E), and program management across various sectors. I possess a proven track record of successful leadership, strategic partnerships, institutional funding, and effective stakeholder engagement. Committed to driving impactful change, I am well-equipped to lead and shape the organization's mission, while fostering a culture of inclusivity, collaboration, and operational excellence.`,
    },
    {
      id: 4,    
      name: 'Agusta Kinunda',
      role: 'Board Member',
      image: '/team/Agusta Kinunda1.jpg',
      bio: `A Finance and Administration professional with over 10 years' experience working with national and international organization including NGOs. She is certified accountant, with CPA certification from the National Board of Accountants and Auditors (NBAA) in Tanzania. She holds a master's degree in finance and investment. She has worked with Tanzania Postal Bank (TPB) as a Banking Operation Officer, Plan International in Dar es Salaam as an accountant, Marie Stopes Tanzania, in Dar es Salaam as Project Accountant and Hanns R. Neumann Stiftung Africa, in Dar es Salaam as Finance and Administration Manager.`,
    },
    {
      id: 5,
      name: 'Rita Mbeba',
      role: 'Board Member',
      image: '/team/Rita.jpg',
      bio: `Mrs Rita Mbeba is a public health professional with over 15 years' experience in leading health, women empowerment and development programs in Tanzania. She is currently working with Girls Effect in Tanzania as a country director where is responsible with overseeing and leading the country team and program unit. She is also responsible with managing the startup, design, Implementation, monitoring and evaluation of all projects. Prior to that, Mrs. Rita has worked with Pathfinder international as a Senior Portfolio Technical Advisor- AYSRH at Pathfinder. Prior to that she worked with Marie Stopes Tanzania as a project lead where she was responsible with strategic oversight and portfolio management of all donor-funded projects of varying size and technical scope. Prior to that she worked with Amref Tanzania as a project manager responsible with project management including coordination of project plans, monitor, implement and evaluate project interventions.`,
    },
  ];

  const teamMembers = [
    {
      id: 6,
      name: 'Lightness Charles Limbe',
      role: 'Program Manager',
      image: '/team/Lightness-Limbe.jpg',
      bio: `Ms Lightness Limbe is a psychologist and a projects management professional with 4 years of experience in leading donor funded projects. She is currently working with Empowered for Change (E4C) as a projects manager, leading all SRHR, gender, and other development projects ensuring effective project design, planning, and implementation and reporting. She is also responsible with ensuring effective management of donor funding and maintain relationships with government and partners. Prior to that, Ms. Lightness was working with EKAMA Development Foundation as a clinical psychologist and research assistant providing individual and group therapy sessions using evidence-based practices and developing and implementing treatment plans tailored to clients' needs and goals. Ms. Lightness holds a bachelor's degree in Psychology from University of Dar Es Salaam.`,
    },
    {
      id: 7,
      name: 'Angeline Bathsheba Kwame',
      role: 'Project Manager',
      image: '/team/angeline.jpg',
      bio: `A Zoologist and an environmentalist professional with one year of experience in projects management, biodiversity surveys, monitoring and environmental conservation. She is currently working with Empowered for Change (E4C) as a projects manager, leading all environmental, gender, and climate change projects ensuring effective project design, planning, implementation, monitoring, evaluation, reporting and maintain excellent relationships with relevant donors, government and stakeholders. In her role as projects manager, Ms. Angeline has pioneered digital innovations which has resulted in 10 folds increase of the organization reach of women, girls and people with disabilities, creating a pool of over 100 young women climate change makers. Time to time Ms. Angeline is also volunteering with Tanzania National Park (TANAPA) as an environmental ambassador creating awareness to the community of existing national parks. Ms. Angeline holds a bachelor's degree in Applied Zoology from University of Dar Es Salaam.`,
    },
  ];

  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const allMembers = [...boardMembers, ...teamMembers];
  const activeMember = activeMemberId ? allMembers.find(m => m.id === activeMemberId) : null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-1xl mx-auto">
            Dedicated professionals working tirelessly to empower women and girls across Tanzania
          </p>
        </motion.div>

        {/* Board Members Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Board Members</h3>
            <p className="text-lg text-gray-600">Governance and strategic leadership</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden cursor-pointer" onClick={() => setActiveMemberId(member.id)}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Click for Bio</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-4 text-center">
                  {member.role}
                </p>
                <p className="text-gray-500 text-center text-sm">
                  Click image to view full bio
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h3>
            <p className="text-lg text-gray-600">Project management and implementation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden cursor-pointer" onClick={() => setActiveMemberId(member.id)}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Click for Bio</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-4 text-center">
                  {member.role}
                </p>
                <p className="text-gray-500 text-center text-sm">
                  Click image to view full bio
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio Modal */}
        {activeMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActiveMemberId(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button aria-label="Close" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl" onClick={() => setActiveMemberId(null)}>
                ✕
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={activeMember.image} alt={activeMember.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{activeMember.name}</h3>
                  <p className="text-orange-600 font-semibold text-lg">{activeMember.role}</p>
                </div>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">{activeMember.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Main About Page Component
export default function About() {
  const [approaches, setApproaches] = useState<any[]>([]);

  useEffect(() => {
    fetchApproaches()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          // Map Sanity documents to the shape OurApproach expects
          const formatted = data.map((item: any) => ({
            title: item.title,
            description: item.description,
            image: null,            // not used when sanityImage is present
            sanityImage: item.image, // raw Sanity image reference
          }));
          setApproaches(formatted);
        }
      })
      .catch(() => {
        // Network / Sanity error — OurApproach will use static fallback
      });
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeaderBanner />
      <OrganizationStory />
      <MissionVision />
      <OurValues />
      <OurApproach approaches={approaches} />
      <TeamSection />
    </div>
  );
}