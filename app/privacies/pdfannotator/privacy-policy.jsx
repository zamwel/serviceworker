import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1 style={{ color: '#0175C2', borderBottom: '2px solid #0175C2', paddingBottom: '10px' }}>
        Privacy Policy
      </h1>
      
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
        
        <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>1. Introduction</h2>
        <p>
          PDF Annotator Pro ("we," "our," or "us") is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your 
          information when you use our mobile application (the "App"). Please read this 
          privacy policy carefully. If you do not agree with the terms of this privacy policy, 
          please do not access the App.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>2. Information We Collect</h2>
        
        <h3 style={{ color: '#555', marginTop: '20px' }}>2.1 Information You Provide</h3>
        <p>
          We may collect information that you voluntarily provide to us when using the App, including:
        </p>
        <ul>
          <li><strong>PDF Documents:</strong> PDF files you open, create, or edit within the App</li>
          <li><strong>Annotations:</strong> Drawings, text, images, signatures, and other annotations you add to documents</li>
          <li><strong>Images:</strong> Photos you import or capture using the App's camera feature</li>
          <li><strong>Signatures:</strong> Digital signatures you create or import</li>
        </ul>

        <h3 style={{ color: '#555', marginTop: '20px' }}>2.2 Automatically Collected Information</h3>
        <p>
          When you use the App, we may automatically collect certain information, including:
        </p>
        <ul>
          <li><strong>Device Information:</strong> Device type, operating system version, unique device identifiers</li>
          <li><strong>Usage Data:</strong> Features you use, time spent in the App, error logs</li>
          <li><strong>App Performance:</strong> Crash reports and performance metrics to improve app stability</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve the App's functionality</li>
          <li>Process and store your PDF documents and annotations locally on your device</li>
          <li>Display personalized advertisements through Google AdMob</li>
          <li>Analyze app usage patterns to enhance user experience</li>
          <li>Detect and prevent technical issues and security threats</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>4. Data Storage and Security</h2>
        <p>
          <strong>Local Storage:</strong> All PDF documents, annotations, images, and signatures 
          are stored locally on your device. We do not upload, transmit, or store your documents 
          on our servers unless you explicitly choose to share them through the App's sharing features.
        </p>
        <p>
          <strong>Security Measures:</strong> We implement appropriate technical and organizational 
          measures to protect your information. However, no method of transmission over the internet 
          or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>5. Third-Party Services</h2>
        
        <h3 style={{ color: '#555', marginTop: '20px' }}>5.1 Google AdMob</h3>
        <p>
          Our App uses Google AdMob to display advertisements. AdMob may collect and use data 
          about your device and app usage to provide personalized ads. For more information about 
          how Google uses data, please visit: 
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
             style={{ color: '#0175C2' }}>
            https://policies.google.com/privacy
          </a>
        </p>
        <p>
          You can opt out of personalized advertising by adjusting your device's ad settings or 
          by visiting Google's Ad Settings page.
        </p>

        <h3 style={{ color: '#555', marginTop: '20px' }}>5.2 ML Kit (Text Recognition & Barcode Scanning)</h3>
        <p>
          The App uses Google ML Kit for text recognition and barcode scanning features. 
          Text recognition and barcode scanning are performed locally on your device. 
          No data is sent to Google servers for these features.
        </p>

        <h3 style={{ color: '#555', marginTop: '20px' }}>5.3 File Sharing</h3>
        <p>
          When you use the App's sharing features, your documents may be shared through 
          third-party services (email, cloud storage, etc.) according to their respective 
          privacy policies. We are not responsible for the privacy practices of these services.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>6. Permissions</h2>
        <p>The App may request the following permissions:</p>
        <ul>
          <li><strong>Storage/Camera:</strong> To access, import, and save PDF files and images</li>
          <li><strong>Internet:</strong> To display advertisements and check for app updates</li>
          <li><strong>Network State:</strong> To optimize ad delivery and app functionality</li>
        </ul>
        <p>
          You can revoke these permissions at any time through your device settings, 
          though this may limit certain App features.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>7. Children's Privacy</h2>
        <p>
          Our App is not intended for children under the age of 13. We do not knowingly collect 
          personal information from children under 13. If you are a parent or guardian and believe 
          your child has provided us with personal information, please contact us immediately.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>8. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Rectify inaccurate or incomplete data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information provided in 
          the "Contact Us" section below.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>9. Data Retention</h2>
        <p>
          We retain your information only for as long as necessary to provide the App's 
          services and fulfill the purposes described in this Privacy Policy. Since most 
          data is stored locally on your device, you can delete it at any time by 
          uninstalling the App or deleting files through the App's interface.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>10. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your 
          country of residence. These countries may have data protection laws that differ 
          from those in your country. By using the App, you consent to the transfer of your 
          information to these countries.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          changes by posting the new Privacy Policy on this page and updating the 
          "Last Updated" date. You are advised to review this Privacy Policy periodically 
          for any changes.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0175C2', marginTop: '30px' }}>12. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data 
          practices, please contact us at:
        </p>
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          marginTop: '10px'
        }}>
          <p style={{ margin: '5px 0' }}>
            <strong>Email:</strong> support@codeink.stsl.com
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Developer:</strong> CodeInk STSL
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>App Name:</strong> PDF Annotator Pro
          </p>
        </div>
      </section>

      <section style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f0f7ff', 
        borderRadius: '5px',
        border: '1px solid #0175C2'
      }}>
        <h3 style={{ color: '#0175C2', marginTop: '0' }}>Consent</h3>
        <p style={{ marginBottom: '0' }}>
          By using our App, you consent to our Privacy Policy and agree to its terms.
        </p>
      </section>

      <footer style={{ 
        marginTop: '40px', 
        paddingTop: '20px', 
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        color: '#666',
        fontSize: '12px'
      }}>
        <p>© {new Date().getFullYear()} CodeInk STSL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

