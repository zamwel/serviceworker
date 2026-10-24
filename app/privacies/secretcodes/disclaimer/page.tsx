import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Safety Disclaimer",
  description: `Important safety and operational disclaimer for using USSD and secret codes in ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/disclaimer` },
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white border-l-4 border-amber-500 pl-5 flex items-baseline gap-3">
        <span className="text-amber-400 text-lg font-mono">{n}</span>
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
        {children}
      </div>
    </section>
  );
}

export default function SafetyDisclaimer() {
  return (
    <div className="min-h-screen bg-[#080C15] text-white font-sans selection:bg-amber-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
        <Link
          href={BRAND.basePath}
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {BRAND.name} Home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 rounded-full border border-amber-500/20">
            Safety Advisory
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Safety &amp; Operational Disclaimer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            For {BRAND.name} &bull; Package: <span className="font-mono text-amber-400">{BRAND.packageId}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </header>

        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 mb-14 flex items-start gap-4">
          <ShieldAlert className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-gray-200 leading-relaxed">
            <strong>Critical Notice:</strong> While most secret codes display harmless diagnostic screens and read-only telemetry, certain vendor-specific engineering commands can perform factory resets or alter network configurations. Always read the code description before dialing.
          </div>
        </div>

        <main>
          <Section n="01" title="Read-Only vs Configuration Codes">
            <p>
              Secret codes in {BRAND.name} are divided into distinct categories:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Read-Only Informational Codes:</strong> (e.g. <code className="font-mono text-cyan-400">*#06#</code> for IMEI, firmware query, battery temperature). These codes simply display hardware metrics without making any changes. They are 100% safe.
              </li>
              <li>
                <strong>Diagnostic Test Menus:</strong> (e.g. LCD RGB test, vibration test, touch screen grid test). These codes open interactive hardware test screens. Exiting the screen returns your phone to normal operation.
              </li>
              <li>
                <strong>Advanced Engineering / Reset Commands:</strong> Certain manufacturer codes are meant for authorized service technicians (e.g., custom ROM wiping, camera firmware flashing). These codes are clearly highlighted with warning notices inside the App.
              </li>
            </ul>
          </Section>

          <Section n="02" title="Carrier &amp; Manufacturer Variations">
            <p>
              Mobile carriers (AT&amp;T, Verizon, T-Mobile, Vodafone, etc.) and device manufacturers frequently customize, restrict, or disable secret dialer codes. Therefore, a code that executes successfully on an international unlocked model may produce an &quot;Invalid MMI code&quot; or &quot;Connection problem&quot; message on carrier-branded firmware.
            </p>
          </Section>

          <Section n="03" title="No Responsibility for User Actions">
            <p>
              {BRAND.company} provides this collection purely as a reference utility. You are solely responsible for executing any code on your personal device. We strongly recommend backing up personal data prior to executing any advanced configuration commands.
            </p>
          </Section>

          <Section n="04" title="Questions &amp; Contact">
            <p>
              For inquiries regarding safety notices, please reach out to{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-amber-400 hover:underline">
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
