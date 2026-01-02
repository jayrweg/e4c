'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Resources', href: '/resources' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const ctaItems = [
    { name: 'Donate', href: '/donate', primary: true },
    { name: 'Volunteer', href: '/volunteer', primary: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo/logo.webp"
                alt="Empowered for Change Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                EMPOWERED FOR CHANGE (E4C)
              </span>
              <div className="text-xs text-gray-500 -mt-1">Women's Rights Organization</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Main Navigation */}
            <div className="flex items-center gap-2">
              {mainNavItems.map((item) => {
                // Check if current path matches or is a child route
                const isActive = item.href === '/'
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-600 text-white font-bold border-orange-600'
                        : 'text-orange-600 border border-gray-300 hover:bg-orange-600 hover:text-white hover:border-orange-600 font-medium'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ml-10">
            {ctaItems.map((item) => {
              // Check if current path matches or is a child route
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-lg'
                      : item.primary
                      ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                      : 'border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeCTA"
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-2 pt-4 pb-6 space-y-1">
                {/* Main Navigation */}
                <div className="mb-6">
                  {mainNavItems.map((item) => {
                    // Check if current path matches or is a child route
                    const isActive = item.href === '/'
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`relative block px-3 py-3 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'text-orange-600 bg-orange-50 font-bold border-l-4 border-orange-600'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {ctaItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 ${
                          isActive
                            ? 'bg-orange-600 text-white border-l-4 border-white'
                            : item.primary
                            ? 'bg-orange-600 text-white hover:bg-orange-700'
                            : 'border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;