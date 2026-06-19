import { Mail, LifeBuoy, Bug, CreditCard, Clock } from 'lucide-react';
import Link from 'next/link';
import { NavBar, Footer, Glow } from '../shared';
import { APP } from '../data';

export const metadata = {
  title: 'Contact · InDocEdit',
  description: `Get in touch with the ${APP.name} team.`,
};

const TOPICS = [
  { icon: LifeBuoy, title: 'Support & help', desc: 'Questions about scanning, editing or exporting.' },
  { icon: Bug, title: 'Report a bug', desc: 'Tell us what happened and we’ll fix it.' },
  { icon: CreditCard, title: 'Billing & Pro', desc: 'Subscriptions, restores, refunds and promo codes.' },
];

export default function ContactPage() {
  const subject = encodeURIComponent(`${APP.name} support`);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-red-600/30">
      <Glow />
      <NavBar />

      <main className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36 pb-10">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Contact
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            We’d love to hear from you
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Reach the {APP.name} team directly by email, and we read every message.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {TOPICS.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-5">
                <t.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold mb-1.5">{t.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-br from-red-600/15 to-transparent border border-red-500/20 rounded-[40px] p-10 lg:p-14 text-center mb-10">
          <Mail className="w-10 h-10 text-red-500 mx-auto mb-5" />
          <h2 className="text-2xl font-extrabold tracking-tight mb-2">Email us</h2>
          <a href={`mailto:${APP.email}?subject=${subject}`} className="text-xl font-semibold text-red-400 hover:text-red-300 transition-colors">
            {APP.email}
          </a>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-5">
            <Clock className="w-4 h-4" /> We typically reply within 1–2 business days.
          </div>
          <div className="mt-8">
            <a
              href={`mailto:${APP.email}?subject=${subject}`}
              className="inline-flex items-center gap-2 px-9 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              <Mail className="w-5 h-5" /> Compose email
            </a>
          </div>
        </section>

        <p className="text-center text-gray-400">
          Looking for policies? Read our{' '}
          <Link href="/indocedit/legal?tab=privacy" className="text-red-400 hover:text-red-300">Privacy Policy</Link>{' '}
          and{' '}
          <Link href="/indocedit/legal?tab=tos" className="text-red-400 hover:text-red-300">Terms of Service</Link>.
        </p>
      </main>

      <Footer />
    </div>
  );
}
