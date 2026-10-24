import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions governing the use of ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/tos` },
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white border-l-4 border-indigo-500 pl-5 flex items-baseline gap-3">
        <span className="text-indigo-400 text-lg font-mono">{n}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#080C15] text-white font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
        <Link
          href={BRAND.basePath}
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {BRAND.name} Home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
            Legal Terms
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            For {BRAND.name} &bull; Package: <span className="font-mono text-indigo-400">{BRAND.packageId}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Effective date: {lastUpdated}</p>
        </header>

        <main>
          <Section n="01" title="Acceptance of Terms">
            <p>
              By installing, accessing, or using <strong>{BRAND.name}</strong> (&quot;the App&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not download or use the App.
            </p>
          </Section>

          <Section n="02" title="Informational & Educational Purpose">
            <p>
              The secret codes, MMI strings, hardware testing sequences, and device tips provided within {BRAND.name} are assembled for educational, troubleshooting, and diagnostic purposes. While we strive to verify code accuracy for each smartphone brand, hardware manufacturers and mobile network carriers frequently modify, restrict, or deprecate secret codes via over-the-air firmware updates.
            </p>
            <p>
              We cannot guarantee that every code will operate on every specific model, firmware variant, or carrier-locked device.
            </p>
          </Section>

          <Section n="03" title="User Responsibility & Safety">
            <p>
              You acknowledge and agree that executing any code on your device is done at your own discretion and risk. Most codes in the App are strictly read-only diagnostics. However, certain advanced engineering commands (such as firmware modification or device format commands) can alter device parameters.
            </p>
            <p>
              You agree to carefully read the descriptions and safety warnings provided before executing any advanced procedure on your device.
            </p>
          </Section>

          <Section n="04" title="Intellectual Property">
            <p>
              All software design, interface elements, icons, databases, graphics, and compilation rights related to {BRAND.name} are the intellectual property of <strong>{BRAND.company}</strong>. All third-party trademarks, device brand names (e.g., Samsung, Apple, Xiaomi, Motorola, Sony, etc.) and logos referenced in the App belong to their respective owners and are used purely for descriptive, comparative, and identification purposes under nominative fair use.
            </p>
          </Section>

          <Section n="05" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, <strong>{BRAND.company}</strong> and its developers shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, the App or any secret codes executed on your device.
            </p>
          </Section>

          <Section n="06" title="Modifications & Termination">
            <p>
              We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page with an updated effective date.
            </p>
          </Section>

          <Section n="07" title="Contact">
            <p>
              Questions regarding these Terms of Service should be directed to{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-indigo-400 hover:underline">
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
