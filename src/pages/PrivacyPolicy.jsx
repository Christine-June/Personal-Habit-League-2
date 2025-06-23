import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: June 23, 2025</p>

      <p className="mb-4">
        Thank you for using Personal Habit League (the "App"). Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our App.
      </p>
      <p className="mb-6">
        By using the App, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the App.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
      <h3 className="text-xl font-semibold mb-2">a. Personal Information</h3>
      <p className="mb-2">When you register or use the App, we may collect:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Your name, email address, and username.</li>
        <li>Habit-tracking data (e.g., goals, progress, streaks).</li>
        <li>Device information (e.g., device type, operating system).</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">b. Usage Data</h3>
      <p className="mb-2">We may collect:</p>
      <ul className="list-disc list-inside mb-4">
        <li>App activity (e.g., features used, interactions).</li>
        <li>Log data (e.g., IP address, timestamps, error logs).</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">c. Third-Party Services</h3>
      <p className="mb-6">
        If you sign in via Google, Apple, or other third-party services, we may receive basic profile information (subject to their privacy policies).
      </p>

      <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
      <p className="mb-6">
        We use your data to:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Provide and improve the App’s functionality.</li>
        <li>Personalize your experience.</li>
        <li>Analyze usage trends and fix issues.</li>
        <li>Send updates, support messages, or promotional content (if opted-in).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">3. Data Sharing & Disclosure</h2>
      <p className="mb-6">
        We do not sell your personal data. However, we may share information:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>With service providers (e.g., cloud storage, analytics) under confidentiality agreements.</li>
        <li>If required by law (e.g., legal requests, fraud prevention).</li>
        <li>In case of a business transfer (e.g., merger, acquisition).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
      <p className="mb-6">
        We implement security measures (e.g., encryption, access controls) to protect your data. However, no system is 100% secure—please use strong passwords and safeguard your login details.
      </p>

      <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
      <p className="mb-6">
        Depending on your location, you may:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Access, correct, or delete your data.</li>
        <li>Opt out of marketing emails.</li>
        <li>Request data portability.</li>
        <li>Withdraw consent (if applicable).</li>
      </ul>
      <p className="mb-6">
        To exercise these rights, contact us at support@personalhabitleague.com.
      </p>

      <h2 className="text-2xl font-semibold mb-3">6. Children’s Privacy</h2>
      <p className="mb-6">
        The App is not intended for users under 13 (or 16 in some regions). We do not knowingly collect children’s data.
      </p>

      <h2 className="text-2xl font-semibold mb-3">7. Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy. You will be notified of significant changes via the App or email. Continued use constitutes acceptance.
      </p>

      <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
      <p className="mb-6">
        For questions or requests, email: support@personalhabitleague.com.
      </p>

      <p className="mt-10 font-semibold">
        Thank you for trusting Personal Habit League!
      </p>
    </div>
  );
}
