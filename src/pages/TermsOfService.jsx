import React from 'react';

export default function TermsOfService() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last Updated: June 23, 2025</p>

      <p className="mb-6">
        Welcome to Personal Habit League (the "App"). These Terms of Service ("Terms") govern your use of the App. By accessing or using the App, you agree to comply with these Terms. If you do not agree, please do not use the App.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Eligibility</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You must be at least 13 years old (or the minimum legal age in your jurisdiction) to use the App.</li>
        <li>If you are under 18, you confirm that a parent or guardian has reviewed and agreed to these Terms on your behalf.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">2. Account Registration</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You must provide accurate and complete information when creating an account.</li>
        <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        <li>Notify us immediately if you suspect unauthorized access to your account.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You agree not to:</li>
        <ul className="list-disc list-inside ml-6">
          <li>Use the App for illegal or harmful purposes.</li>
          <li>Share false, misleading, or harmful content.</li>
          <li>Attempt to hack, reverse-engineer, or disrupt the App.</li>
          <li>Impersonate others or violate their privacy.</li>
        </ul>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
      <ul className="list-disc list-inside mb-4">
        <li>The App and its content (logos, design, code) are owned by Personal Habit League or its licensors.</li>
        <li>You may not copy, modify, or redistribute any part of the App without permission.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">5. Data Privacy</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Your use of the App is subject to our <a href="/privacy" className="text-indigo-600 underline">Privacy Policy</a>.</li>
        <li>We collect and process data as described in the Privacy Policy.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">6. Subscription & Payments (If Applicable)</h2>
      <ul className="list-disc list-inside mb-4">
        <li>If the App offers paid features, you agree to pay all applicable fees.</li>
        <li>Subscriptions auto-renew unless canceled before the billing cycle.</li>
        <li>Refunds are subject to our refund policy (if any).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">7. Termination</h2>
      <ul className="list-disc list-inside mb-4">
        <li>We may suspend or terminate your access for violations of these Terms.</li>
        <li>You may delete your account at any time.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">8. Disclaimers & Limitation of Liability</h2>
      <ul className="list-disc list-inside mb-4">
        <li>The App is provided "as is" without warranties of any kind.</li>
        <li>We are not liable for any indirect, incidental, or consequential damages.</li>
        <li>We do not guarantee uninterrupted or error-free service.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">9. Changes to These Terms</h2>
      <ul className="list-disc list-inside mb-4">
        <li>We may update these Terms and will notify users of significant changes.</li>
        <li>Continued use after changes constitutes acceptance.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">10. Governing Law & Dispute Resolution</h2>
      <ul className="list-disc list-inside mb-4">
        <li>These Terms are governed by the laws of [Your Jurisdiction].</li>
        <li>Disputes will be resolved through arbitration or small claims court (where applicable).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
      <p className="mb-6">
        For questions or concerns, contact us at: support@personalhabitleague.com.
      </p>

      <p className="mt-10 font-semibold">
        By using Personal Habit League, you acknowledge that you have read, understood, and agreed to these Terms.
      </p>
    </div>
  );
}
