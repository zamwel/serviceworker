import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "End User License Agreement (EULA)",
  description: `End User License Agreement for ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/eula` },
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
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white border-l-4 border-purple-500 pl-5 flex items-baseline gap-3">
        <span className="text-purple-400 text-lg font-mono">{n}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function EULA() {
  return (
    <div className="min-h-screen bg-[#080C15] text-white font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
        <Link
          href={BRAND.basePath}
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {BRAND.name} Home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-500/10 rounded-full border border-purple-500/20">
            End User License
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            EULA
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            For {BRAND.name} &bull; Package: <span className="font-mono text-purple-400">{BRAND.packageId}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </header>

        <main>
          <Section n="01" title="License Grant">
            <p>
              Subject to your compliance with this Agreement, <strong>{BRAND.company}</strong> grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use <strong>{BRAND.name}</strong> strictly for personal, non-commercial purposes on compatible mobile devices you own or control.
            </p>
          </Section>

          <Section n="02" title="Restrictions on Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 mt-2">
              <li>Decompile, reverse engineer, disassemble, or attempt to derive the source code of the App.</li>
              <li>Modify, adapt, translate, or create derivative works from the software.</li>
              <li>Rent, lease, lend, sell, sublicense, or distribute the App to third parties.</li>
              <li>Remove, alter, or obscure any proprietary notices (including copyright and trademark notices) of {BRAND.company}.</li>
            </ul>
          </Section>

          <Section n="03" title="Third-Party Trademarks">
            <p>
              All manufacturer product names, logos, and brands (including Samsung, Apple, Google, Xiaomi, Huawei, etc.) are trademarks of their respective owners. Their mention in the App does not imply endorsement, affiliation, or sponsorship.
            </p>
          </Section>

          <Section n="04" title="Disclaimer of Warranties">
            <p>
              THE APPLICATION IS PROVIDED TO YOU &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, {BRAND.company} EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </p>
          </Section>

          <Section n="05" title="Termination">
            <p>
              This Agreement shall remain in effect until terminated by you or {BRAND.company}. You may terminate this Agreement by deleting the Application and all copies thereof from your mobile device.
            </p>
          </Section>

          <Section n="06" title="Contact Information">
            <p>
              If you have any questions about this EULA, please contact us at{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-purple-400 hover:underline">
                {BRAND.supportEmail}
              </a>.
            </p>
          </Section>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {BRAND.company}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
