import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, CheckCircle } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Official Privacy Policy for ${BRAND.name} (${BRAND.packageId}) published by ${BRAND.company}.`,
  alternates: { canonical: `${BRAND.basePath}/privacy` },
};

const lastUpdated = "October 24, 2026";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white border-l-4 border-cyan-500 pl-5 flex items-baseline gap-3">
        <span className="text-cyan-400 text-lg font-mono">{n}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#080C15] text-white font-sans selection:bg-cyan-500/30">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
        <Link
          href={BRAND.basePath}
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {BRAND.name} Home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Official Legal Document
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Application: <strong className="text-white">{BRAND.name}</strong> &bull; Package ID:{" "}
            <span className="font-mono text-cyan-400">{BRAND.packageId}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </header>

        {/* Highlight box */}
        <div className="p-6 rounded-3xl bg-cyan-500/10 border border-cyan-500/25 mb-14 flex items-start gap-4">
          <ShieldCheck className="w-7 h-7 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-gray-200 leading-relaxed">
            <strong>Privacy Summary:</strong> {BRAND.name} does not require an account, does not collect your name, phone number, contacts, or personal files, and works offline. We respect your privacy and only use industry-standard Google AdMob for ad delivery to support free updates.
          </div>
        </div>

        <main>
          <Section n="01" title="Introduction">
            <p>
              This Privacy Policy explains how <strong>{BRAND.company}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) handles your data when you use our mobile application <strong>{BRAND.name}</strong> (&quot;the App&quot;, available on Google Play under package identifier <code className="font-mono text-cyan-400 text-sm">{BRAND.packageId}</code>).
            </p>
            <p>
              We believe in minimal data footprint. The App functions primarily as an offline reference handbook and diagnostics companion. We do not operate user accounts or cloud storage of user phone profiles.
            </p>
          </Section>

          <Section n="02" title="Data We Do NOT Collect">
            <p>
              To be clear about what we never access or collect:
            </p>
            <ul className="space-y-2.5 mt-2">
              {[
                "We do not collect your name, email address, physical address, or phone number.",
                "We do not access or read your contacts, call logs, SMS messages, or browsing history.",
                "We do not record audio, capture camera photos, or track GPS location.",
                "We do not store your device IMEI or serial numbers on any remote servers.",
                "We do not sell, rent, or trade any personal information to data brokers or third parties.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="03" title="Device Permissions & How They Are Used">
            <p>
              {BRAND.name} requests minimal device permissions strictly necessary for its functionality:
            </p>
            <div className="space-y-4 mt-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="font-bold text-white text-base">CALL_PHONE / DIAL Intent</div>
                <div className="text-sm text-gray-300 mt-1">
                  Used exclusively when you tap the &quot;Dial&quot; button next to a secret code. This triggers your device&apos;s standard dialer with the USSD code pre-filled for your convenience. The App does NOT place background calls, monitor calls, or access call records.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="font-bold text-white text-base">INTERNET &amp; ACCESS_NETWORK_STATE</div>
                <div className="text-sm text-gray-300 mt-1">
                  Used by the Google Mobile Ads SDK (AdMob) to load banner/interstitial advertisements and check network connectivity.
                </div>
              </div>
            </div>
          </Section>

          <Section n="04" title="Advertising (Google AdMob)">
            <p>
              {BRAND.name} is a free application supported by advertisements delivered by Google AdMob. Google AdMob may collect and process device signals (such as advertising identifier, coarse IP-derived location, device model, and operating system version) to serve, personalize, and measure advertisements.
            </p>
            <p>
              For more information on how Google uses data from apps, please review{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Google&apos;s Privacy &amp; Terms for Partner Sites
              </a>{" "}
              and the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Google Privacy Policy
              </a>.
            </p>
            <p>
              You can opt out of personalized ads at any time through your Android device settings by navigating to <strong>Settings &rarr; Google &rarr; Ads</strong> and selecting <strong>Delete advertising ID</strong> or opting out of personalized advertising.
            </p>
          </Section>

          <Section n="05" title="Third-Party SDKs">
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold">Provider</th>
                    <th className="py-3 pr-4 font-semibold">Purpose</th>
                    <th className="py-3 font-semibold">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-white align-top">Google AdMob</td>
                    <td className="py-3.5 pr-4 text-gray-300 align-top">Display ads to support free application development</td>
                    <td className="py-3.5 text-cyan-400 align-top">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Google Privacy Policy
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-white align-top">Google Play Services</td>
                    <td className="py-3.5 pr-4 text-gray-300 align-top">Core Android framework support and app distribution</td>
                    <td className="py-3.5 text-cyan-400 align-top">
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        Google Play Terms
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section n="06" title="Children's Privacy (COPPA Compliance)">
            <p>
              {BRAND.name} is intended for a general audience. We do not knowingly collect personal identifiable information from children under 13 years of age. Since our app does not collect personal data or require accounts, no child&apos;s personal information is stored on our servers. If you believe a child has provided us information, please contact us immediately so we can remove it.
            </p>
          </Section>

          <Section n="07" title="Data Security &amp; Retention">
            <p>
              Because the App does not store personal information on external servers, there is no personal data to retain. Any device preferences (such as bookmarked codes) are stored locally in sandbox storage on your device and are wiped completely whenever you clear the App data or uninstall the App.
            </p>
          </Section>

          <Section n="08" title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory requirements. Any modifications will be posted directly to this URL with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section n="09" title="Contact Us">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our practices, please reach out to us:
            </p>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mt-4 space-y-2">
              <div><strong>Publisher:</strong> {BRAND.company}</div>
              <div><strong>Application:</strong> {BRAND.name}</div>
              <div><strong>Package Name:</strong> {BRAND.packageId}</div>
              <div>
                <strong>Support Email:</strong>{" "}
                <a href={`mailto:${BRAND.supportEmail}`} className="text-cyan-400 hover:underline">
                  {BRAND.supportEmail}
                </a>
              </div>
              <div>
                <strong>Developer Email:</strong>{" "}
                <a href={`mailto:${BRAND.developerEmail}`} className="text-cyan-400 hover:underline">
                  {BRAND.developerEmail}
                </a>
              </div>
            </div>
          </Section>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BRAND.company}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
