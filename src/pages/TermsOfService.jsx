import React from 'react';

export default function TermsOfService() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Terms of Service</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <strong>Last Updated:</strong> June 23, 2025
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Welcome to Personal Habit League! By using our app, you agree to the following terms and conditions...
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">1. Acceptance of Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        By accessing or using our services, you agree to be bound by these Terms of Service...
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Contact Us</h2>
      <p className="text-gray-700 dark:text-gray-300">
        For questions, email: <a href="mailto:support@personalhabitleague.com" className="text-indigo-600 dark:text-indigo-400 underline">support@personalhabitleague.com</a>.
      </p>
    </div>
  );
}
