import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, ChevronDown, Scale, Users, Shield, AlertTriangle, BookOpen } from 'lucide-react';

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

const TermsOfService = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const sections = [
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By accessing or using the Personal Habit League application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We reserve the right to update and change these Terms from time to time without notice. Continued use of the Service after any such changes shall constitute your consent to such changes.
          </p>
        </div>
      ),
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "User Responsibilities",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            As a user of our Service, you agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your account and password</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Not attempt to gain unauthorized access to the Service</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The Service and its original content, features, and functionality are and will remain the exclusive property of Personal Habit League and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Personal Habit League.
          </p>
        </div>
      ),
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            In no event shall Personal Habit League, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Governing Law",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
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
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-800 px-8 py-16 sm:px-12">
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
                  <FileText className="h-12 w-12 text-white" />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Terms of Service
                </motion.h1>
                <motion.p 
                  className="text-blue-100 text-lg font-medium"
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
              className="prose prose-blue dark:prose-invert max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed"
                variants={itemVariants}
              >
                Welcome to Personal Habit League! These Terms of Service outline the rules and regulations for the use of our application. By accessing this application, we assume you accept these terms and conditions in full. Do not continue to use Personal Habit League if you do not accept all of the terms and conditions stated on this page.
              </motion.p>

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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-100 dark:shadow-blue-900/30 mr-4 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-xl">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <ChevronDown className="ml-3 h-5 w-5 text-blue-400 dark:text-blue-300 transition-transform duration-300 group-hover:translate-y-1" />
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
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Contact Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="font-medium min-w-[80px]">Email:</span>
                      <a href="mailto:legal@personalhabitleague.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">
                        legal@personalhabitleague.com
                      </a>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="font-medium min-w-[80px]">Address:</span>
                      <span className="text-gray-700 dark:text-gray-400">123 Habit Street, Nairobi</span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
                  &copy; {new Date().getFullYear()} Personal Habit League. All rights reserved.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-3xl leading-relaxed">
                  These Terms of Service were last updated on June 26, 2025.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
