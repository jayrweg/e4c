'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Partners from '@/components/Partners';

// Hero Section Component (slideshow)
const HeroSection = () => {
  const slides = [
    { src: "/slides/slide-1.jpg", alt: "Women empowerment 1" },
    { src: "/slides/slide-2.jpg", alt: "Women empowerment 2" },
    { src: "/slides/slide-3.jpg", alt: "Women empowerment 3" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, i) => (
          <motion.div
            key={s.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image src={s.src} alt={s.alt} fill className="object-cover" priority={i === 0} />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Empowering Women and Girls for a <span className="text-orange-500">Better Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Empowering women and girls of all abilities to realize their reproductive health goals by providing tools for informed decisions and creating enabling environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/about" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/volunteer" className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300">
                Get Involved
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
};

// Impact Statistics Component
const ImpactStats = () => {
  const [counts, setCounts] = useState({
    regions: 0,
    women: 0,
    srhBudget: 0,
    disabilityBudget: 0,
  });

  useEffect(() => {
    const animateCounts = () => {
      const targets = { regions: 8, women: 500, srhBudget: 12, disabilityBudget: 17 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounts({
          regions: Math.floor(targets.regions * easeOutQuart),
          women: Math.floor(targets.women * easeOutQuart),
          srhBudget: Math.floor(targets.srhBudget * easeOutQuart),
          disabilityBudget: Math.floor(targets.disabilityBudget * easeOutQuart),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounts();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('impact-stats');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    {
      number: counts.regions,
      label: 'Regions Covered',
      icon: '🌍',
    },
    {
      number: counts.women,
      label: 'Women & Girls Reached',
      icon: '👩',
    },
    {
      number: `${counts.srhBudget}%`,
      label: 'Increased SRH/FP Budget Allocation',
      icon: '💰',
    },
    {
      number: `${counts.disabilityBudget}%`,
      label: 'Increased Budget Allocation for People with Disability',
      icon: '♿',
    },
  ];

  return (
    <section id="impact-stats" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making difference in the lives of women and girls across Dar es Salaam and Dodoma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Preview Component
const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Empowered for Change (E4C)
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Empowered for Change (E4C) is a non-governmental organization registered under the non-governmental organizations ACT, 2002 on 25th February 2022 with registration number ooNGO/R/2844 to operate in Tanzania mainland.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We work with the government and collaborate with other partners to ensure increased access to correct information regarding sexual and reproductive issues and empower women and girls to exercise full autonomy regarding their sexual and reproductive health.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/about"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Read More About Us
              </Link>
            </motion.div>
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
                src="/about/about-preview.jpeg"
                alt="Women supporting each other"
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

// Projects Preview Component
const ProjectsPreview = () => {
  const projects = [
    {
      id: 1,
      title: 'Reproductive Health Education',
      description: 'Comprehensive education programs for women and girls about reproductive health, family planning, and informed decision-making.',
      image: '/projects/project-education.jpg',
      // TODO: Replace with Sanity CMS data
    },
    {
      id: 2,
      title: 'Disability Inclusion Initiative',
      description: 'Creating accessible programs and support systems for women and girls with disabilities to access reproductive health services.',
      image: '/projects/project-inclusion.jpg',
      // TODO: Replace with Sanity CMS data
    },
    {
      id: 3,
      title: 'Community Advocacy',
      description: 'Building community support networks and advocating for policy changes that benefit women and girls across Tanzania.',
      image: '/projects/project-advocacy.jpg',
      // TODO: Replace with Sanity CMS data
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
            Our Projects & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our ongoing initiatives and upcoming events that are making a difference in communities across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
                >
                  View More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/projects"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Team Section Component with click-to-bio modal
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
      image: '/team/Rita mbeba.jpg',
      bio: `Mrs Rita Mbeba is a public health professional with over 15 years' experience in leading health, women empowerment and development programs in Tanzania. She is currently working with Girls Effect in Tanzania as a country director where is responsible with overseeing and leading the country team and program unit. She is also responsible with managing the startup, design, Implementation, monitoring and evaluation of all projects. Prior to that, Mrs. Rita has worked with Pathfinder international as a Senior Portfolio Technical Advisor- AYSRH at Pathfinder. Prior to that she worked with Marie Stopes Tanzania as a project lead where she was responsible with strategic oversight and portfolio management of all donor-funded projects of varying size and technical scope. Prior to that she worked with Amref Tanzania as a project manager responsible with project management including coordination of project plans, monitor, implement and evaluate project interventions.`,
    },
  ];

  const teamMembers = [
    {
      id: 6,
      name: 'Lightness Charles Limbe',
      role: 'Projects Manager',
      image: '/team/Lightness-Limbe.jpg',
      bio: `Ms Lightness Limbe is a psychologist and a projects management professional with 4 years of experience in leading donor funded projects. She is currently working with Empowered for Change (E4C) as a projects manager, leading all SRHR, gender, and other development projects ensuring effective project design, planning, and implementation and reporting. She is also responsible with ensuring effective management of donor funding and maintain relationships with government and partners. Prior to that, Ms. Lightness was working with EKAMA Development Foundation as a clinical psychologist and research assistant providing individual and group therapy sessions using evidence-based practices and developing and implementing treatment plans tailored to clients' needs and goals. Ms. Lightness holds a bachelor's degree in Psychology from University of Dar Es Salaam.`,
    },
    {
      id: 7,
      name: 'Angeline Bathsheba Kwame',
      role: 'Projects Manager',
      image: '/team/team-6-zainab.jpg',
      bio: `A Zoologist and an environmentalist professional with one year of experience in projects management, biodiversity surveys, monitoring and environmental conservation. She is currently working with Empowered for Change (E4C) as a projects manager, leading all environmental, gender, and climate change projects ensuring effective project design, planning, implementation, monitoring, evaluation, reporting and maintain excellent relationships with relevant donors, government and stakeholders. In her role as projects manager, Ms. Angeline has pioneered digital innovations which has resulted in 10 folds increase of the organization reach of women, girls and people with disabilities, creating a pool of over 100 young women climate change makers. Time to time Ms. Angeline is also volunteering with Tanzania National Park (TANAPA) as an environmental ambassador creating awareness to the community of existing national parks. Ms. Angeline holds a bachelor's degree in Applied Zoology from University of Dar Es Salaam.`,
    },
  ];

  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const allMembers = [...boardMembers, ...teamMembers];
  const activeMember = activeMemberId ? allMembers.find(m => m.id === activeMemberId) : null;

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
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

// Gallery Preview Component
const GalleryPreview = () => {
  const galleryImages = [
    '/gallery/gallery-1.jpg',
    '/gallery/gallery-2.jpg',
    '/gallery/gallery-3.jpg',
    '/gallery/gallery-4.jpg',
    '/gallery/gallery-5.jpg',
    '/gallery/gallery-6.jpg',
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
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Moments of impact, empowerment, and positive change in our communities
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-32 md:h-40 rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/gallery"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </motion.div>
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
            Join us in empowering women and girls across Tanzania
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Together, we can create a world where every woman and girl has the tools, knowledge, and support they need to make informed decisions about their reproductive health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/volunteer"
                className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Volunteer With Us
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/donate"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
              >
                Make a Donation
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Homepage Component
export default function Home() {
  return (
    <div className="min-h-screen space-y-20">
      <HeroSection />
      <ImpactStats />
      <AboutPreview />
      <ProjectsPreview />
      <TeamSection />
      <GalleryPreview />
      <Partners />
      <CallToAction />
    </div>
  );
}