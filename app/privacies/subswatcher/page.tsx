/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function PrivacyPolicyAndTerms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last Updated: December 2024
          </p>
        </header>

        {/* Privacy Policy Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
            Privacy Policy
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Introduction
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              SubsWatcher ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you use our mobile application.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Information We Collect
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Information You Provide
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Subscription Data</strong>:
                Service names, costs, renewal dates, billing cycles, categories, payment
                methods, and notes you enter manually
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Account Information</strong>:
                Email address and password (for cloud sync features) - stored securely and encrypted
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Receipt/Invoice Data</strong>:
                Images and documents you upload for OCR processing - processed locally on your device
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Email Content</strong>:
                Email messages you choose to scan (only when you explicitly grant permission and provide credentials)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">SMS Content</strong>:
                SMS messages you choose to scan (Android only, only when you explicitly grant permission)
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Automatically Collected Information
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Device Information</strong>:
                Device type, operating system version, app version
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Usage Data</strong>:
                App features used, error logs (for debugging)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Analytics</strong>:
                Anonymous usage statistics to improve app performance
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Third-Party Services
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Google Mobile Ads</strong>:
                We use AdMob for advertising. AdMob may collect device identifiers and usage data.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Firebase</strong>:
                We use Firebase for cloud sync and authentication.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              How We Use Your Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Provide Core Services</strong>:
                Manage and track your subscriptions, send reminders, generate analytics
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Email/SMS Scanning</strong>:
                Parse emails and SMS messages to automatically detect subscriptions (only with your explicit permission)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Receipt OCR</strong>:
                Extract subscription details from receipts and invoices you upload
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Cloud Sync</strong>:
                Synchronize your subscription data across devices (only if you enable this feature)
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Improve Services</strong>:
                Analyze usage patterns to enhance app functionality
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Advertising</strong>:
                Display relevant ads through Google Mobile Ads
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Data Storage and Security
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Local Storage
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>All subscription data is stored locally on your device using encrypted storage</li>
              <li>Email credentials are stored in memory only during active sessions and never persisted</li>
              <li>Receipt images are processed locally and not uploaded to our servers</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Cloud Storage (Optional)
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>If you enable cloud sync, your subscription data is stored in Firebase (encrypted at rest)</li>
              <li>You can disable cloud sync at any time</li>
              <li>You can delete your cloud data at any time through the app settings</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Security Measures
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure authentication for cloud sync</li>
              <li>No transmission of email/SMS credentials to our servers</li>
              <li>Regular security audits</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Data Sharing and Disclosure
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We do NOT sell your personal information. We may share data only in these circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">With Your Consent</strong>:
                When you explicitly authorize sharing
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Service Providers</strong>:
                Trusted third parties who assist in operating our app (Firebase, Google Ads) -
                they are bound by confidentiality agreements
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Legal Requirements</strong>:
                When required by law or to protect our rights
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Business Transfers</strong>:
                In case of merger, acquisition, or sale of assets (with notice to users)
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Your Rights and Choices
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Access and Control
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">View Your Data</strong>:
                Access all your subscription data within the app
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Edit Data</strong>:
                Modify or delete any subscription entry
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Export Data</strong>:
                Export your subscription data in standard formats
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Delete Account</strong>:
                Delete all your data (local and cloud) at any time
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Permissions
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Email Access</strong>:
                Only used when you explicitly grant permission and provide credentials.
                You can revoke access at any time.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">SMS Access</strong>:
                Only used when you explicitly grant permission (Android).
                You can revoke access at any time.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Camera/Photos</strong>:
                Only used for receipt upload. You can deny this permission.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Notifications</strong>:
                Used for subscription reminders. You can disable in app settings.
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Opt-Out Options
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Disable cloud sync</li>
              <li>Disable email/SMS scanning</li>
              <li>Disable analytics (through device settings)</li>
              <li>Disable personalized ads (through device settings)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Children's Privacy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our app is not intended for children under 12 years of age. We do not knowingly
              collect personal information from children under 13. If you believe we have collected
              information from a child under 13, please contact us immediately.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              International Data Transfers
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you use cloud sync, your data may be stored on servers located outside your country.
              We ensure appropriate safeguards are in place to protect your data in accordance with
              this Privacy Policy.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Data Retention
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Local Data</strong>:
                Stored on your device until you delete it or uninstall the app
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Cloud Data</strong>:
                Retained until you delete your account or disable cloud sync
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Email/SMS Credentials</strong>:
                Not stored - only used during active scanning sessions
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Receipt Images</strong>:
                Processed locally and not retained after processing
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Changes to This Privacy Policy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We may update this Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Posting the new Privacy Policy in the app</li>
              <li>Updating the "Last Updated" date</li>
              <li>For significant changes, we may provide additional notice</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Contact Us
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Email</strong>: privacy@subscriptions.app
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Address</strong>: [Your Company Address]
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Compliance
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This Privacy Policy complies with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>General Data Protection Regulation (GDPR) - EU users</li>
              <li>California Consumer Privacy Act (CCPA) - California users</li>
              <li>Children's Online Privacy Protection Act (COPPA) - US users</li>
              <li>Other applicable data protection laws</li>
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                By using SubsWatcher, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
            Terms of Service
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Agreement to Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              By downloading, installing, accessing, or using the SubsWatcher mobile application
              ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not
              agree to these Terms, do not use the App.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Description of Service
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              SubsWatcher is a mobile application that helps users:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Track and manage subscription services</li>
              <li>Receive reminders for upcoming renewals</li>
              <li>Analyze subscription spending</li>
              <li>Automatically detect subscriptions from emails, SMS, and receipts (optional features)</li>
              <li>Synchronize data across devices (optional feature)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Eligibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You must be at least 12 years old to use this App. If you are under 18, you represent
              that you have your parent's or guardian's permission to use the App.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              User Accounts
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Account Creation
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You may use the App without creating an account (local-only mode)</li>
              <li>Cloud sync features require account creation through Firebase</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Account Security
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You are responsible for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>We are not liable for any loss or damage arising from your failure to protect your account</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              User Responsibilities
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Acceptable Use
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Use the App only for lawful purposes</li>
              <li>Provide accurate and truthful information</li>
              <li>Not attempt to gain unauthorized access to the App or its systems</li>
              <li>Not interfere with or disrupt the App's functionality</li>
              <li>Not use the App to violate any laws or regulations</li>
              <li>Not reverse engineer, decompile, or disassemble the App</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Prohibited Activities
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Use the App for any illegal or unauthorized purpose</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Spam, harass, or abuse other users (if applicable)</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest information about other users</li>
              <li>Use automated systems to access the App without permission</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Subscription Data
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Your Data
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You own all data you enter into the App</li>
              <li>You are responsible for the accuracy of your subscription information</li>
              <li>We do not claim ownership of your data</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Data Accuracy
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                The App provides tools to help you track subscriptions, but you are responsible
                for verifying the accuracy of information
              </li>
              <li>
                We are not responsible for errors in subscription data you enter or that is
                extracted from emails/SMS/receipts
              </li>
              <li>Always verify extracted information before adding subscriptions</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Third-Party Services
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Email and SMS Access
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Email and SMS scanning features require your explicit permission</li>
              <li>You are responsible for ensuring you have the right to access the emails/SMS you scan</li>
              <li>We do not store your email/SMS credentials - they are used only during active scanning sessions</li>
              <li>You grant us permission to process email/SMS content solely for subscription detection</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Cloud Sync
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Cloud sync uses Firebase (Google) services</li>
              <li>Your data is subject to Firebase's terms and privacy policy</li>
              <li>We are not responsible for Firebase service outages or data loss</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Advertising
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>The App displays ads through Google Mobile Ads (AdMob)</li>
              <li>Ads are subject to Google's advertising policies</li>
              <li>We are not responsible for ad content or user interactions with ads</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Intellectual Property
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Our Rights
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                The App, including its design, features, and content, is owned by us or our licensors
              </li>
              <li>
                All trademarks, logos, and service marks are our property or their respective owners
              </li>
              <li>You may not copy, modify, distribute, or create derivative works without permission</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Your Rights
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You retain ownership of data you create or upload</li>
              <li>You grant us a license to use your data to provide the App's services</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Disclaimers
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Service Availability
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                We strive to provide reliable service but do not guarantee uninterrupted or error-free operation
              </li>
              <li>The App may be unavailable due to maintenance, updates, or technical issues</li>
              <li>We reserve the right to modify or discontinue features at any time</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Accuracy Disclaimer
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                Subscription information extracted from emails, SMS, or receipts may contain errors
              </li>
              <li>We do not guarantee the accuracy of automatically extracted data</li>
              <li>Always verify extracted information before relying on it</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Financial Disclaimer
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>The App is a tracking tool and does not provide financial advice</li>
              <li>We are not responsible for subscription charges, renewals, or cancellations</li>
              <li>You are solely responsible for managing your subscriptions and payments</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              No Warranty
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-semibold">
              THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Limitation of Liability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Errors or omissions in subscription information</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any damages exceeding the amount you paid for the App (if any)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Indemnification
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You agree to indemnify and hold us harmless from any claims, damages, losses,
              liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Your use of the App</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your violation of any applicable laws</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Termination
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              By You
            </h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>You may stop using the App at any time</li>
              <li>You may delete your account and data through app settings</li>
              <li>Uninstalling the App will remove local data (unless you have cloud sync enabled)</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              By Us
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We may terminate or suspend your access to the App immediately, without prior notice, for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended periods of inactivity</li>
              <li>At our sole discretion</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Changes to Terms
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We reserve the right to modify these Terms at any time. We will:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Post updated Terms in the App</li>
              <li>Update the "Last Updated" date</li>
              <li>For significant changes, provide additional notice</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Your continued use of the App after changes constitutes acceptance of the new Terms.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Governing Law
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of
              [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Dispute Resolution
            </h3>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Informal Resolution
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have a dispute, please contact us first to attempt informal resolution.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-3">
              Arbitration
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Any disputes that cannot be resolved informally shall be resolved through binding
              arbitration in accordance with applicable rules, except where prohibited by law.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Severability
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will remain in full effect.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Entire Agreement
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement
              between you and us regarding the App.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Contact Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you have questions about these Terms, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>
                <strong className="text-gray-900 dark:text-white">Email</strong>: legal@subscriptions.app
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Address</strong>: [Your Company Address]
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
              Acknowledgment
            </h3>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                BY USING THE APP, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO
                BE BOUND BY THESE TERMS OF SERVICE.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Effective Date: December 2024
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

