import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "EULA",
  description: `The End User License Agreement for ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/eula` },
};

const lastUpdated = "September 24, 2026";

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
    <section>
      <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6 flex items-baseline gap-3">
        <span className="text-red-500 text-lg font-mono">{n}</span> {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function EULA() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-32">
        <Link href={BRAND.basePath} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <header className="mb-20 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Legal Document
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            EULA
          </h1>
          <p className="text-gray-400 text-lg text-center">
            End User License Agreement
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Last updated: <span className="text-white font-medium">{lastUpdated}</span>
          </p>
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm">01</span>
              License Grant
            </h2>
            <p className="mb-4">
              Subject to your compliance with this Agreement, {BRAND.company} grants you a
              personal, revocable, non-exclusive, non-transferable, limited license to
              download, install and run one copy of the {BRAND.name} application (package{" "}
              <code className="text-gray-400">{BRAND.packageId}</code>) on Android devices
              you own or control, for your own personal, non-commercial use.
            </p>
          </section>

          <Section n="02" title="What the License Covers">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Free tier</h3>
                <p className="text-sm">
                  Unlimited browsing, search, favorites and downloads. Downloaded and
                  set wallpapers carry a small {BRAND.name} watermark, and the
                  experience is supported by interstitial/rewarded ads.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Pro tier</h3>
                <p className="text-sm">
                  An additional, revocable license extension - purchased monthly,
                  yearly or as a one-time lifetime unlock via Google Play Billing -
                  that removes ads and the watermark and lifts download limits for as
                  long as the entitlement remains active (or permanently, for
                  lifetime).
                </p>
              </div>
            </div>
          </Section>

          <Section n="03" title="Restrictions">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">No Redistribution</h3>
                <p className="text-sm">You agree not to license, sell, rent, lease, assign, distribute, host, outsource, disclose or otherwise commercially exploit the Application or the artwork it displays or lets you download.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Reverse Engineering</h3>
                <p className="text-sm">You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the Application, or bypass any entitlement, watermark or ad-serving logic it implements.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">No Automated Access</h3>
                <p className="text-sm">You may not use bots, scrapers or other automated means to access the Application or the TMDB data it relies on beyond normal, interactive personal use.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Third-Party Content Stays Third-Party</h3>
                <p className="text-sm">Nothing in this license transfers ownership of any movie/TV artwork, title or metadata to you; it remains the property of its respective studio or rights holder, made available through the TMDB API.</p>
              </div>
            </div>
          </Section>

          <Section n="04" title="Updates">
            <p>
              We may release updates to {BRAND.name} that add features, fix bugs, or
              change how existing features work, including the ad frequency, cache
              behavior or Pro entitlement checks described elsewhere in our legal pages.
              Continuing to use the app after an update constitutes acceptance of the
              app as updated.
            </p>
          </Section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
            <h2 className="text-2xl font-bold mb-6 text-white">Disclaimer of Warranties</h2>
            <p className="text-sm italic">
              THE APPLICATION IS PROVIDED TO YOU &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY
              KIND, INCLUDING RELIANCE ON THIRD-PARTY DATA (TMDB) THAT WE DO NOT
              CONTROL.
            </p>
          </section>

          <Section n="05" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, in no event shall{" "}
              {BRAND.name}, {BRAND.company} or its suppliers be liable for any special,
              incidental, indirect, or consequential damages whatsoever arising out of
              or in connection with your use of, or inability to use, the Application.
            </p>
          </Section>

          <Section n="06" title="Termination">
            <p>
              This license is effective until terminated. It terminates automatically,
              without notice, if you fail to comply with any of its terms. Upon
              termination you must cease all use of the Application and uninstall it
              from all devices.
            </p>
          </Section>

          <Section n="07" title="Governing Law">
            <p>
              This Agreement is governed by the laws applicable to {BRAND.company},
              without regard to conflict-of-law principles, except where local
              consumer-protection law mandatorily provides otherwise.
            </p>
          </Section>

          <section className="border-t border-white/10 pt-16 mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              If you have any questions about this EULA, please contact us.
            </p>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              Contact Support
            </a>
          </section>
        </main>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
