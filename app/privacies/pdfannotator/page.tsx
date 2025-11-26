import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-5 font-sans leading-relaxed text-gray-800">
      <h1 className="text-[#0175C2] border-b-2 border-[#0175C2] pb-2.5">
        Privacy Policy
      </h1>
      
      <p className="text-sm text-gray-600 mb-8">
        <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">1. Introduction</h2>
        <p>
          PDF Annotator Pro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your 
          information when you use our mobile application (the &quot;App&quot;). Please read this 
          privacy policy carefully. If you do not agree with the terms of this privacy policy, 
          please do not access the App.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">2. Information We Collect</h2>
        
        <h3 className="text-gray-700 mt-5">2.1 Information You Provide</h3>
        <p>
          We may collect information that you voluntarily provide to us when using the App, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>PDF Documents:</strong> PDF files you open, create, or edit within the App</li>
          <li><strong>Annotations:</strong> Drawings, text, images, signatures, and other annotations you add to documents</li>
          <li><strong>Images:</strong> Photos you import or capture using the App&apos;s camera feature</li>
          <li><strong>Signatures:</strong> Digital signatures you create or import</li>
        </ul>

        <h3 className="text-gray-700 mt-5">2.2 Automatically Collected Information</h3>
        <p>
          When you use the App, we may automatically collect certain information, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Device Information:</strong> Device type, operating system version, unique device identifiers</li>
          <li><strong>Usage Data:</strong> Features you use, time spent in the App, error logs</li>
          <li><strong>App Performance:</strong> Crash reports and performance metrics to improve app stability</li>
        </ul>
      </section> 

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide, maintain, and improve the App&apos;s functionality</li>
          <li>Process and store your PDF documents and annotations locally on your device</li>
          <li>Display personalized advertisements through Google AdMob</li>
          <li>Analyze app usage patterns to enhance user experience</li>
          <li>Detect and prevent technical issues and security threats</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">4. Data Storage and Security</h2>
        <p>
          <strong>Local Storage:</strong> All PDF documents, annotations, images, and signatures 
          are stored locally on your device. We do not upload, transmit, or store your documents 
          on our servers unless you explicitly choose to share them through the App&apos;s sharing features.
        </p>
        <p>
          <strong>Security Measures:</strong> We implement appropriate technical and organizational 
          measures to protect your information. However, no method of transmission over the internet 
          or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">5. Third-Party Services</h2>
        
        <h3 className="text-gray-700 mt-5">5.1 Google AdMob</h3>
        <p>
          Our App uses Google AdMob to display advertisements. AdMob may collect and use data 
          about your device and app usage to provide personalized ads. For more information about 
          how Google uses data, please visit: 
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
             className="text-[#0175C2] hover:underline">
            https://policies.google.com/privacy
          </a>
        </p>
        <p>
          You can opt out of personalized advertising by adjusting your device&apos;s ad settings or 
          by visiting Google&apos;s Ad Settings page.
        </p>

        <h3 className="text-gray-700 mt-5">5.2 ML Kit (Text Recognition & Barcode Scanning)</h3>
        <p>
          The App uses Google ML Kit for text recognition and barcode scanning features. 
          Text recognition and barcode scanning are performed locally on your device. 
          No data is sent to Google servers for these features.
        </p>

        <h3 className="text-gray-700 mt-5">5.3 File Sharing</h3>
        <p>
          When you use the App&apos;s sharing features, your documents may be shared through 
          third-party services (email, cloud storage, etc.) according to their respective 
          privacy policies. We are not responsible for the privacy practices of these services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">6. Permissions</h2>
        <p>The App may request the following permissions:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Storage/Camera:</strong> To access, import, and save PDF files and images</li>
          <li><strong>Internet:</strong> To display advertisements and check for app updates</li>
          <li><strong>Network State:</strong> To optimize ad delivery and app functionality</li>
        </ul>
        <p>
          You can revoke these permissions at any time through your device settings, 
          though this may limit certain App features.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">7. Children&apos;s Privacy</h2>
        <p>
          Our App is not intended for children under the age of 13. We do not knowingly collect 
          personal information from children under 13. If you are a parent or guardian and believe 
          your child has provided us with personal information, please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">8. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify inaccurate or incomplete data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information provided in 
          the &quot;Contact Us&quot; section below.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">9. Data Retention</h2>
        <p>
          We retain your information only for as long as necessary to provide the App&apos;s 
          services and fulfill the purposes described in this Privacy Policy. Since most 
          data is stored locally on your device, you can delete it at any time by 
          uninstalling the App or deleting files through the App&apos;s interface.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">10. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your 
          country of residence. These countries may have data protection laws that differ 
          from those in your country. By using the App, you consent to the transfer of your 
          information to these countries.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new Privacy Policy on this page and updating the 
          &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically 
          for any changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[#0175C2] mt-8">12. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data 
          practices, please contact us at:
        </p>
        <div className="bg-gray-100 p-4 rounded-md mt-2.5">
          <p className="my-1.5">
            <strong>Email:</strong> support@codeink.stsl.com
          </p>
          <p className="my-1.5">
            <strong>Developer:</strong> CodeInk STSL
          </p>
          <p className="my-1.5">
            <strong>App Name:</strong> PDF Annotator Pro
          </p>
        </div>
      </section>

      <section className="mt-10 p-5 bg-blue-50 rounded-md border border-[#0175C2]">
        <h3 className="text-[#0175C2] mt-0">Consent</h3>
        <p className="mb-0">
          By using our App, you consent to our Privacy Policy and agree to its terms.
        </p>
      </section>

      <footer className="mt-10 pt-5 border-t border-gray-300 text-center text-gray-600 text-xs">
        <p>© {new Date().getFullYear()} CodeInk STSL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

