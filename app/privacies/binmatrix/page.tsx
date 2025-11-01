export default function BinMatrixPrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-foreground">
        <h1 className="text-4xl font-bold mt-8 mb-4">BinMatrix Privacy Policy</h1>
        
        <p className="mb-6">
          <strong>Last Updated:</strong> December 2024
        </p>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">Introduction</h2>
          <p className="mb-4 leading-relaxed">
            BinMatrix (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application BinMatrix (the &quot;App&quot;). Please read this Privacy Policy carefully.
          </p>
          <p className="mb-4 leading-relaxed">
            By using the App, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
          
          <h3 className="text-2xl font-semibold mt-4 mb-2">1.1 Information You Provide</h3>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>BIN Lookup History</strong>: When you perform BIN lookups, we store the BIN numbers and lookup results locally on your device for your convenience.</li>
            <li><strong>Favorites</strong>: If you mark BINs as favorites, this information is stored locally on your device.</li>
            <li><strong>Preferences</strong>: App preferences such as theme settings (light/dark mode) are stored locally.</li>
            <li><strong>Support Communications</strong>: If you contact us for support, we may collect your email address and any information you provide in your communications with us.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">1.2 Automatically Collected Information</h3>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Device Information</strong>: We may collect certain information about your device, including:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Device type and model</li>
                <li>Operating system version</li>
                <li>Device identifiers (for advertising purposes)</li>
                <li>App version</li>
              </ul>
            </li>
            <li><strong>Usage Data</strong>: Information about how you use the App, including:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>BIN lookups performed</li>
                <li>Features accessed</li>
                <li>Interaction with advertisements</li>
              </ul>
            </li>
            <li><strong>Cache Data</strong>: Temporary cached data to improve app performance.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">1.3 Third-Party Services</h3>
          <p className="mb-4 leading-relaxed">The App uses the following third-party services that may collect information:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Google Mobile Ads (AdMob)</strong>: For users with the free version, we display advertisements through Google&apos;s AdMob service. AdMob may collect:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Device identifiers</li>
                <li>Advertising ID</li>
                <li>Location data (if permitted)</li>
                <li>Usage data</li>
              </ul>
              For more information, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google&apos;s Privacy Policy</a>
            </li>
            <li><strong>Google Play Services / Apple App Store</strong>: For in-app purchases and subscriptions, we use:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Google Play Billing (Android)</li>
                <li>App Store (iOS)</li>
                <li>These services collect payment information and purchase history</li>
              </ul>
              For more information, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Play Privacy Policy</a> or <a href="https://www.apple.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Apple Privacy Policy</a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="mb-4 leading-relaxed">We use the information we collect to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Provide the Service</strong>: Process BIN lookups and display results</li>
            <li><strong>Improve User Experience</strong>: Remember your preferences, maintain your lookup history and favorites</li>
            <li><strong>Monetization</strong>: Display relevant advertisements (for free users) through Google AdMob</li>
            <li><strong>Analytics</strong>: Understand how users interact with the App to improve functionality</li>
            <li><strong>Customer Support</strong>: Respond to your inquiries and provide support</li>
            <li><strong>Legal Compliance</strong>: Comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">3. Data Storage and Security</h2>
          
          <h3 className="text-2xl font-semibold mt-4 mb-2">3.1 Local Storage</h3>
          <p className="mb-4 leading-relaxed"><strong>All user data is stored locally on your device:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>BIN lookup history (stored using Hive database)</li>
            <li>Favorite BINs (stored using Hive database)</li>
            <li>App preferences (stored using SharedPreferences)</li>
            <li>Cache data (stored locally)</li>
          </ul>
          <p className="mb-4 leading-relaxed">
            <strong>We do not transmit your BIN lookup data, history, or favorites to our servers or any third parties</strong> (except as described in Section 3.2).
          </p>

          <h3 className="text-2xl font-semibold mt-4 mb-2">3.2 Data Transmission</h3>
          <p className="mb-4 leading-relaxed">The following data may be transmitted to third-party services:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>AdMob</strong>: Device identifiers, advertising ID, and usage data for ad personalization (see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google&apos;s Privacy Policy</a>)</li>
            <li><strong>Analytics</strong>: Anonymous usage statistics to improve the App</li>
            <li><strong>Crash Reports</strong>: Error logs and crash reports (if enabled) to help diagnose and fix issues</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">3.3 Data Security</h3>
          <p className="mb-4 leading-relaxed">We implement reasonable security measures to protect your information:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Local data encryption where applicable</li>
            <li>Secure storage practices</li>
            <li>However, no method of transmission over the internet or electronic storage is 100% secure</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">3.4 Data Retention</h3>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Local Data</strong>: Stored on your device until you:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Clear app data</li>
                <li>Uninstall the App</li>
                <li>Manually delete history/favorites within the App</li>
              </ul>
            </li>
            <li><strong>Third-Party Data</strong>: Subject to third-party privacy policies (see Section 1.3)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">4. Third-Party Services</h2>
          
          <h3 className="text-2xl font-semibold mt-4 mb-2">4.1 Google Mobile Ads (AdMob)</h3>
          <p className="mb-4 leading-relaxed">We use Google AdMob to display advertisements in the free version of our App. AdMob may:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Collect device identifiers and advertising IDs</li>
            <li>Use location data (if permitted) for ad targeting</li>
            <li>Collect usage data for analytics</li>
          </ul>
          <p className="mb-4 leading-relaxed"><strong>Opt-Out Options:</strong></p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Android: Google Settings &gt; Ads &gt; Opt out of interest-based ads</li>
            <li>iOS: Settings &gt; Privacy &gt; Advertising &gt; Limit Ad Tracking</li>
            <li>For more information: <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google Ad Choices</a></li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">4.2 In-App Purchases</h3>
          <p className="mb-4 leading-relaxed">Subscriptions and in-app purchases are processed by:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Android</strong>: Google Play Store</li>
            <li><strong>iOS</strong>: Apple App Store</li>
          </ul>
          <p className="mb-4 leading-relaxed">Payment information is handled securely by these platforms and is not accessible to us.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">5. Your Rights and Choices</h2>
          <p className="mb-4 leading-relaxed">You have the right to:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Access Your Data</strong>: View your BIN lookup history and favorites within the App</li>
            <li><strong>Delete Your Data</strong>: Clear history, favorites, and cache through the App settings</li>
            <li><strong>Opt-Out of Ads</strong>: Upgrade to Pro version or use device settings to limit ad tracking</li>
            <li><strong>Withdraw Consent</strong>: Stop using the App and uninstall it</li>
            <li><strong>Data Portability</strong>: Export your data (where technically feasible)</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">How to Exercise Your Rights:</h3>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li><strong>Clear History</strong>: Settings &gt; Clear History</li>
            <li><strong>Clear Favorites</strong>: Settings &gt; Clear Favorites</li>
            <li><strong>Clear Cache</strong>: Settings &gt; Clear Cache</li>
            <li><strong>Uninstall App</strong>: Remove the App from your device (this will delete all local data)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">6. Children&apos;s Privacy</h2>
          <p className="mb-4 leading-relaxed">
            BinMatrix is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
          <p className="mb-4 leading-relaxed">
            If we discover that we have collected information from a child under 13, we will delete that information promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">7. International Users</h2>
          <p className="mb-4 leading-relaxed">If you are using the App from outside the United States, please note that:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Your information may be transferred to and processed in the United States</li>
            <li>Data protection laws in your country may differ from those in the United States</li>
            <li>By using the App, you consent to the transfer of your information to the United States</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">8. California Privacy Rights (CCPA)</h2>
          <p className="mb-4 leading-relaxed">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
          </ul>
          <p className="mb-4 leading-relaxed">To exercise these rights, please contact us using the information in Section 10.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">9. European Privacy Rights (GDPR)</h2>
          <p className="mb-4 leading-relaxed">If you are a resident of the European Economic Area (EEA), you have certain data protection rights:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Right to access your personal data</li>
            <li>Right to rectification</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>
          <p className="mb-4 leading-relaxed">To exercise these rights, please contact us using the information in Section 10.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">10. Changes to This Privacy Policy</h2>
          <p className="mb-4 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Posting the new Privacy Policy in the App</li>
            <li>Updating the &quot;Last Updated&quot; date</li>
            <li>For significant changes, we may provide additional notice</li>
          </ul>
          <p className="mb-4 leading-relaxed">You are advised to review this Privacy Policy periodically for any changes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">11. Contact Us</h2>
          <p className="mb-4 leading-relaxed">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <p className="mb-4 leading-relaxed">
            <strong>Email:</strong> deverloper.codeink.playconsole@gmail.com<br />
            <strong>Subject:</strong> BinMatrix Privacy Policy Inquiry
          </p>
          <p className="mb-4 leading-relaxed">
            <strong>App Developer:</strong><br />
            CodeInk Studios<br />
            BinMatrix Application
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">12. Consent</h2>
          <p className="mb-4 leading-relaxed">
            By using BinMatrix, you consent to this Privacy Policy and agree to its terms. If you do not agree with this Privacy Policy, please do not use the App.
          </p>
        </section>

        <hr className="my-8 border-border" />

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mt-6 mb-3">Additional Information</h2>
          
          <h3 className="text-2xl font-semibold mt-4 mb-2">BIN Database</h3>
          <p className="mb-4 leading-relaxed">The BIN database used in this App:</p>
          <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
            <li>Is encrypted and bundled with the App</li>
            <li>Contains publicly available BIN (Bank Identification Number) information</li>
            <li>Is for informational purposes only</li>
            <li>Should not be used as the sole basis for financial decisions</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-4 mb-2">Disclaimer</h3>
          <p className="mb-4 leading-relaxed">
            The information provided by this App is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
          </p>
        </section>

        <hr className="my-8 border-border" />

        <p className="mb-8">
          <strong>Effective Date:</strong> December 2024<br />
          <strong>Version:</strong> 1.0
        </p>
      </div>
    </div>
  );
}
