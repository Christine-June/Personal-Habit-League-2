import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft, ChevronDown, Shield, Settings, BarChart2, Info } from 'lucide-react';

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

const CookiePolicy = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const sections = [
    {
      icon: <Cookie className="h-5 w-5" />,
      title: "What Are Cookies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the site owners.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device for a set period of time or until you delete them).
          </p>
        </div>
      ),
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "How We Use Cookies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use cookies for several purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
            <li><strong>Functionality Cookies:</strong> Enable enhanced functionality and personalization</li>
            <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and track ad performance</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: "Third-Party Cookies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. These include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
            <li>Google Analytics for website analytics</li>
            <li>Facebook Pixel for advertising and analytics</li>
            <li>Stripe for payment processing</li>
            <li>Other third-party services as needed</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These third-party services have their own privacy policies and may use cookies to collect information about your activities on our website and other websites.
          </p>
        </div>
      ),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Your Cookie Choices",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or by updating your browser settings.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Browser Controls</h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, and in some cases, prevent you from using certain features of our website.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: <Info className="h-5 w-5" />,
      title: "Changes to This Policy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this Cookie Policy.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-amber-900/30 dark:via-gray-800 dark:to-amber-900/20 transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl text-left border border-amber-100 dark:border-amber-900/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-700 dark:via-orange-700 dark:to-amber-800 px-8 py-16 sm:px-12">
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
                  <Cookie className="h-12 w-12 text-white" />
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Cookie Policy
                </motion.h1>
                <motion.p 
                  className="text-amber-100 text-lg font-medium"
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
              className="prose prose-amber dark:prose-invert max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed"
                variants={itemVariants}
              >
                This Cookie Policy explains how Personal Habit League ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at <span className="font-medium">habitleague.com</span>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
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
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-100 dark:shadow-amber-900/30 mr-4 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-xl">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <ChevronDown className="ml-3 h-5 w-5 text-amber-400 dark:text-amber-300 transition-transform duration-300 group-hover:translate-y-1" />
                  </motion.div>
                  <div className="pl-16 pr-2">
                    {section.content}
                  </div>
                </motion.section>
              ))}

              <motion.div 
                className="mt-16 pt-8 border-t border-amber-100 dark:border-amber-900/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800">
                  <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">Contact Us</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have any questions about our use of cookies or other technologies, please email us at:
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 font-medium">
                    <a href="mailto:privacy@personalhabitleague.com" className="hover:underline">
                      privacy@personalhabitleague.com
                    </a>
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
                  &copy; {new Date().getFullYear()} Personal Habit League. All rights reserved.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-3 max-w-3xl leading-relaxed">
                  This Cookie Policy was last updated on June 26, 2025.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
