import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Privacy Policy</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <strong>Last Updated:</strong> June 23, 2025
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Your privacy is important to us. This policy explains how we collect, use, and protect your information...
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">1. Information We Collect</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We collect information you provide directly, such as when you create an account...
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Contact Us</h2>
      <p className="text-gray-700 dark:text-gray-300">
        For privacy questions, email: <a href="mailto:support@personalhabitleague.com" className="text-indigo-600 dark:text-indigo-400 underline">support@personalhabitleague.com</a>.
      </p>
    </div>
  );
}
