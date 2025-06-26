import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, ChevronDown, User, Lock, ShieldCheck, Mail } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const sections = [
    {
      icon: <User className="h-5 w-5" />,
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Habit League collects information that you provide directly when using our services, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Account information (name, email, password)</li>
            <li>Profile information (profile picture, bio)</li>
            <li>Habit tracking data</li>
            <li>Challenge participation and progress</li>
            <li>Payment information (handled securely by our payment processor)</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your experience</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Data Security",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Secure development practices</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Privacy Team:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
            <p className="text-gray-700 dark:text-gray-300 mb-3 flex items-start">
              <span className="font-medium min-w-[80px]">Email:</span>
              <a href="mailto:privacy@habitleague.com" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">
                privacy@habitleague.com
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-start">
              <span className="font-medium min-w-[80px]">Address:</span>
              <span className="text-gray-700 dark:text-gray-400">123 Habit Street, Suite 100, San Francisco, CA 94107, USA</span>
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm italic">
            We take all privacy inquiries seriously and will respond to your request within 30 days of receipt.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl text-left border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-800 px-8 py-16 sm:px-12">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="relative z-10">
              <motion.button
                onClick={handleGoBack}
                className="absolute top-6 left-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Go back"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div className="max-w-3xl mx-auto text-center">
                <motion.div 
                  className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Shield className="h-12 w-12 text-white" />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Privacy Policy
                </motion.h1>
                <motion.p 
                  className="text-indigo-100 text-lg font-medium"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Last updated: June 26, 2025
                </motion.p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8 sm:px-8 md:px-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <motion.div 
              className="prose prose-indigo dark:prose-invert max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sections.map((section, index) => (
                <motion.section 
                  key={index} 
                  className="mb-16 last:mb-8 group"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="flex items-center mb-6 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30 mr-4 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-xl">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <ChevronDown className="ml-3 h-5 w-5 text-indigo-400 dark:text-indigo-300 transition-transform duration-300 group-hover:translate-y-1" />
                  </motion.div>
                  <div className="pl-16 pr-2">
                    {section.content}
                  </div>
                </motion.section>
              ))}

              <motion.div 
                className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Habit League. All rights reserved.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-3xl leading-relaxed">
                  This document was last updated on June 26, 2025. We may update this Privacy Policy from time to time. 
                  We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
