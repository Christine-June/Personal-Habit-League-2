import React from 'react';

export default function CookieSettings() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cookie Settings</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <strong>Last Updated:</strong> June 23, 2025
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        At Personal Habit League, we use cookies and similar tracking technologies to enhance your experience, analyze usage, and improve our services. This page explains how we use cookies and how you can manage your preferences.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">1. What Are Cookies?</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Cookies are small text files stored on your device when you visit a website or use an app. They help remember your preferences, track activity, and personalize content.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">2. Types of Cookies We Use</h2>
      <table className="mb-4 w-full border text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Purpose</th>
            <th className="border px-2 py-1">Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Essential</td>
            <td className="border px-2 py-1">Required for basic functionality (e.g., login, security).</td>
            <td className="border px-2 py-1">Session authentication, security tokens.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Performance</td>
            <td className="border px-2 py-1">Helps us understand how users interact with the app.</td>
            <td className="border px-2 py-1">Google Analytics, error logs.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Functionality</td>
            <td className="border px-2 py-1">Remembers preferences (e.g., theme, language).</td>
            <td className="border px-2 py-1">Dark mode settings, UI customization.</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Advertising</td>
            <td className="border px-2 py-1">(If applicable) Displays personalized ads (we do not currently use these).</td>
            <td className="border px-2 py-1">N/A</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">3. How to Manage Cookies</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies (check your browser’s "Privacy" or "Security" section).
        </li>
        <li>
          <strong>App Permissions:</strong> Adjust tracking preferences in your device settings (iOS/Android).
        </li>
        <li>
          <strong>Opt-Out Tools:</strong> For third-party analytics (e.g., Google Analytics), use their opt-out tools.
        </li>
      </ul>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        <strong>Note:</strong> Disabling cookies may affect app functionality (e.g., saved logins, preferences).
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">4. Changes to This Policy</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        We may update our cookie usage. Significant changes will be communicated via the app or email.
      </p>

      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Contact Us</h2>
      <p className="text-gray-700 dark:text-gray-300">
        For questions about cookies, email: <a href="mailto:support@personalhabitleague.com" className="text-indigo-600 dark:text-indigo-400 underline">support@personalhabitleague.com</a>.
      </p>
    </div>
  );
}
