'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// Header Banner Component
const HeaderBanner = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/gallery/gallery-2.jpg"
          alt="Support our work"
          fill
          className="object-cover"
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
          Stand with E4C Today
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-4xl mx-auto"
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
    customAmount: '',
    message: '',
  });
  const [selectedAmount, setSelectedAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const oneTimeAmounts = ['20', '35', '50', '100', '500', '2500'];
  const monthlyAmounts = ['10', '15', '25', '35', '50', '100'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDonationTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, donationType: type }));
    setSelectedAmount('');
  };

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setFormData(prev => ({ ...prev, customAmount: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Google Apps Script URL - REPLACE WITH YOUR ACTUAL URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzzXyLyCOaU9G0uVMWc_CVZICJKGqQ4OKDI9d7J7CF-ASqoyldmPlI03tcuWFUQUsij/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          donationType: formData.donationType,
          selectedAmount: selectedAmount,
          customAmount: formData.customAmount,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          donationType: '',
          customAmount: '',
          message: '',
        });
        setSelectedAmount('');
      } else {
        console.error('Error from server:', result.message);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFinalAmount = () => {
    if (formData.customAmount) return formData.customAmount;
    return selectedAmount;
  };

  return (
    <section className="min-h-screen py-20 bg-gray-50 flex items-center">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Your Support Makes a Difference
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              In a world where women's rights and reproductive health face ongoing challenges, Empowered for Change (E4C) stands committed to creating lasting impact. We work tirelessly to ensure women and girls of all abilities have access to the information, resources, and support they need to make informed decisions about their bodies and futures.
            </p>
            <p>
              Your donation will go a long way to support women and girls, adapting to community needs and prioritizing women's health, dignity, and rights. Together, we can create an enabling environment where every woman and girl can fulfill their potential.
            </p>
            <p className="font-semibold text-orange-600">
              Make a gift now to help E4C continue our critical work
            </p>
          </div>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Donation Inquiry
          </h2>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You for Your Generosity!
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We have received your donation inquiry. Our team will reach back shortly with payment instructions and details.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                Make Another Donation
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Donation Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Donation Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => handleDonationTypeChange('one-time')}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      formData.donationType === 'one-time'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDonationTypeChange('monthly')}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      formData.donationType === 'monthly'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Amount Selection */}
                {formData.donationType && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {(formData.donationType === 'one-time' ? oneTimeAmounts : monthlyAmounts).map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            selectedAmount === amount
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          ${amount}{formData.donationType === 'monthly' ? '/mo' : ''}
                        </button>
                      ))}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="customAmount"
                        value={formData.customAmount}
                        onChange={handleInputChange}
                        placeholder={`Type amount in $ ${formData.donationType === 'monthly' ? 'per month' : ''}`}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Message */}
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
                  placeholder="Add any additional comments or questions"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.donationType || (!selectedAmount && !formData.customAmount)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Donation Inquiry'}
                </button>
              </div>

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <p className="text-red-800 font-medium">
                        There was an error submitting your donation inquiry.
                      </p>
                      <p className="text-red-700 text-sm mt-1">
                        Please check your internet connection and try again. If the problem persists, contact us directly at empoweredforchangetz@gmail.com or call +255(0) 767 439217
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Main Donate Page
export default function Donate() {
  return (
    <div className="min-h-screen">
      <HeaderBanner />
      <DonationForm />
    </div>
  );
}
