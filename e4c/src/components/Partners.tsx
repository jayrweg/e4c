'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Partners = () => {
  const [showFirstCharityInfo, setShowFirstCharityInfo] = useState(false);

  const partners = [
    {
      id: 1,
      name: 'First Charity',
      logo: '/partners/partner-1.webp',
      website: 'https://thefirstcharity.org',
      isFirstCharity: true,
    },
    {
      id: 2,
      name: 'Partner 2',
      logo: '/partners/partner-2.webp',
      website: '#',
      isFirstCharity: false,
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We work with organizations that share our commitment to empowering women and girls
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div key={partner.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="relative w-64 h-32">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* First Charity Shop Button */}
              {partner.isFirstCharity && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center mt-6"
                >
                  <button
                    onClick={() => setShowFirstCharityInfo(!showFirstCharityInfo)}
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    {showFirstCharityInfo ? 'Hide' : 'Learn About'} The First Charity Shop
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* First Charity Shop Information */}
        {showFirstCharityInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                The First Charity Shop Initiative
              </h3>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Empowered for Change (E4C) is proud to partner with The First Charity Shop in a groundbreaking initiative that combines social entrepreneurship with women's empowerment.
                </p>
                <p>
                  Through this partnership, we work together to create sustainable economic opportunities for women while raising awareness about reproductive health and rights. The First Charity Shop provides a platform for women entrepreneurs to showcase their products and services, with proceeds supporting our programs that empower women and girls across Tanzania.
                </p>
                <p className="font-semibold text-orange-600">
                  Together, we are creating a model where commerce meets compassion, and every purchase makes a difference in the lives of women and girls.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-2">Our Impact Together</h4>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li>• Supporting women entrepreneurs</li>
                      <li>• Funding health education programs</li>
                      <li>• Creating sustainable livelihoods</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-2">How You Can Help</h4>
                    <ul className="space-y-2 text-base text-gray-700">
                      <li>• Shop at The First Charity Shop</li>
                      <li>• Support women-owned businesses</li>
                      <li>• Spread awareness about our work</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Partners;
