import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, LifeBuoy, Bug, Shield, Send } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${BRAND.name} team for support, feedback or partnership enquiries.`,
  alternates: { canonical: `${BRAND.basePath}/contact` },
};

const CHANNELS = [
  { icon: LifeBuoy, title: "Support", desc: "Trouble with playback, downloads or your Pro subscription.", subject: "Support request" },
  { icon: Bug, title: "Report a bug", desc: "Found something broken? Tell us how to reproduce it.", subject: "Bug report" },
  { icon: Shield, title: "Privacy & data", desc: "Requests about your data or our privacy practices.", subject: "Privacy request" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-24 lg:pt-32">
        <Link href={BRAND.basePath} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Get in touch
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We usually reply within 1–2 business days. Pick the topic that fits best.
          </p>
        </header>

        <main className="space-y-12">
          <section className="grid md:grid-cols-3 gap-6">
            {CHANNELS.map(({ icon: Icon, title, desc, subject }) => (
              <a
                key={title}
                href={`mailto:${BRAND.supportEmail}?subject=${encodeURIComponent(`[${BRAND.name}] ${subject}`)}`}
                className="group bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all"
              >
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </a>
            ))}
          </section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10 text-center">
            <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-red-600 mb-6 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">Email us directly</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Prefer email? Reach the {BRAND.name} team any time at the address below.
            </p>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              <Send className="w-5 h-5" /> {BRAND.supportEmail}
            </a>
          </section>
        </main>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND.company}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
