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
          src="/gallery/gallery-2.jpg"
          alt="Support our work"
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
          Support Our Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto"
        >
          Your donation helps us empower women and girls across Tanzania
        </motion.p>
      </div>
    </section>
  );
};

// Donation Form Component
const DonationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    donationType: '',
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
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          donationType: '',
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

  const donationTypes = [
    'One-time Donation',
    'Monthly Recurring',
    'Annual Support',
    'Project-specific Funding',
    'Emergency Relief',
    'Capacity Building',
    'Other',
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Make a Donation
          </h2>
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            Your support enables us to continue our vital work empowering women and girls across Tanzania. Every contribution makes a difference.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
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
                <label htmlFor="donationType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Type *
                </label>
                <select
                  id="donationType"
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300"
                >
                  <option value="">Select donation type</option>
                  {donationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-300 resize-none"
                placeholder="Tell us about your donation preferences or any specific areas you'd like to support..."
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
                    Thank you for your interest in supporting our work! We'll be in touch soon to discuss your donation.
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
                    There was an error submitting your donation inquiry. Please try again.
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
                'Submit Donation Inquiry'
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// Impact of Donations Component
const ImpactOfDonations = () => {
  const impactAreas = [
    {
      title: 'Education Programs',
      description: 'Support reproductive health education workshops and training programs for women and girls.',
      amount: '$50',
      impact: 'Sponsors one workshop participant',
      icon: '📚',
    },
    {
      title: 'Community Outreach',
      description: 'Fund mobile health clinics and community health fairs that reach remote areas.',
      amount: '$100',
      impact: 'Reaches 20 community members',
      icon: '🚐',
    },
    {
      title: 'Disability Inclusion',
      description: 'Support accessibility improvements and specialized programs for women with disabilities.',
      amount: '$200',
      impact: 'Makes services accessible for 10 women',
      icon: '♿',
    },
    {
      title: 'Healthcare Training',
      description: 'Train healthcare providers on inclusive practices and disability-friendly care.',
      amount: '$500',
      impact: 'Trains 5 healthcare providers',
      icon: '👩‍⚕️',
    },
    {
      title: 'Youth Programs',
      description: 'Fund youth leadership development and peer education programs.',
      amount: '$150',
      impact: 'Supports 3 youth leaders',
      icon: '👧',
    },
    {
      title: 'Policy Advocacy',
      description: 'Support advocacy campaigns and policy research initiatives.',
      amount: '$300',
      impact: 'Funds one advocacy campaign',
      icon: '📋',
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
            Your Donation's Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your contribution directly supports our programs and creates meaningful change in communities across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{area.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {area.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {area.description}
              </p>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {area.amount}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {area.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Donation Methods Component
const DonationMethods = () => {
  const methods = [
    {
      title: 'Bank Transfer',
      description: 'Direct bank transfer to our organization account',
      details: [
        'Account Name: Empower for Change',
        'Bank: [Bank Name]',
        'Account Number: [Account Number]',
        'Swift Code: [Swift Code]',
      ],
      icon: '🏦',
    },
    {
      title: 'Mobile Money',
      description: 'Convenient mobile money transfers',
      details: [
        'M-Pesa: +255 XXX XXX XXX',
        'Tigo Pesa: +255 XXX XXX XXX',
        'Airtel Money: +255 XXX XXX XXX',
        'Vodacom M-Pesa: +255 XXX XXX XXX',
      ],
      icon: '📱',
    },
    {
      title: 'Online Payment',
      description: 'Secure online payment processing',
      details: [
        'Credit/Debit Cards',
        'PayPal',
        'Stripe',
        'Other digital wallets',
      ],
      icon: '💳',
    },
    {
      title: 'In-Kind Donations',
      description: 'Donate materials, equipment, or services',
      details: [
        'Educational materials',
        'Medical equipment',
        'Transportation services',
        'Professional services',
      ],
      icon: '📦',
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
            Ways to Donate
          </h2>
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            Choose the donation method that works best for you. All donations are used to support our programs and create positive change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">{method.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {method.description}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {method.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Transparency Component
const Transparency = () => {
  const transparencyItems = [
    {
      title: 'Financial Accountability',
      description: 'We maintain transparent financial records and undergo regular audits to ensure proper use of funds.',
      icon: '📊',
    },
    {
      title: 'Impact Reporting',
      description: 'Regular reports on how donations are used and the impact achieved in communities.',
      icon: '📈',
    },
    {
      title: 'Donor Recognition',
      description: 'We acknowledge and recognize our donors while respecting privacy preferences.',
      icon: '🏆',
    },
    {
      title: 'Tax Deductible',
      description: 'Donations to Empower for Change are tax-deductible where applicable.',
      icon: '📋',
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
            Transparency & Accountability
          </h2>
          <p className="text-xl text-gray-600 max-w-8xl mx-auto">
            We are committed to transparency and accountability in all our operations and use of donor funds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {transparencyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Donate Page Component
export default function Donate() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <DonationForm />
      <DonationMethods />
      <Transparency />
    </div>
  );
}