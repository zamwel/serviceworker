import { ScanLine, Wand2, Lock, Sparkles } from 'lucide-react';
import { NavBar, Footer, Glow, PlayBadge } from '../shared';
import { APP } from '../data';

export const metadata = {
  title: 'About · InDocEdit',
  description: APP.oneLiner,
};

const VALUES = [
  { icon: ScanLine, title: 'Fast & accurate', desc: 'On‑device OCR that reads pages instantly and keeps their layout.' },
  { icon: Wand2, title: 'Genuinely editable', desc: 'Edit the text on the document itself instead of just copying it somewhere else.' },
  { icon: Lock, title: 'Private', desc: 'Your documents stay on your device. No accounts, no uploads.' },
  { icon: Sparkles, title: 'Beautifully simple', desc: 'A focused, distraction‑free design in light and dark themes.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-red-600/30">
      <Glow />
      <NavBar />

      <main className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36 pb-10">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            About
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            We built {APP.name} to end retyping
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {APP.oneLiner}
          </p>
        </div>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 mb-12 leading-relaxed text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-4">Our mission</h2>
          <p className="mb-4">
            Every day people retype text that already exists: on a receipt, a contract, a slide, a scanned page.
            {' '}{APP.name} turns any of those into clean, editable text using on‑device OCR, then lets you change the
            words right on the document, preserving its look, including tables and columns.
          </p>
          <p>
            We believe powerful document tools should be private and effortless. Everything happens on your device,
            there’s no account to create, and the interface stays out of your way.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {VALUES.map((v, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-red-500/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-5">
                <v.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <section className="text-center bg-gradient-to-br from-red-600/15 to-transparent border border-red-500/20 rounded-[40px] p-12">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Try it for yourself</h2>
          <p className="text-gray-300 mb-8">Free to start, and your first scan takes seconds.</p>
          <div className="flex justify-center"><PlayBadge /></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
