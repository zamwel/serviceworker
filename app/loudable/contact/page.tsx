import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, LifeBuoy, Bug, CreditCard, Clock } from 'lucide-react';
import { Header, Footer, Eyebrow } from '../shared';
import { BRAND } from '../data';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${BRAND.name} team.`,
  alternates: { canonical: `${BRAND.basePath}/contact` },
};

const TOPICS = [
  { icon: LifeBuoy, title: 'Support & help', desc: 'Questions about importing, converting, or listening to a document.' },
  { icon: Bug, title: 'Report a bug', desc: 'Tell us what happened and which document type, and we’ll look into it.' },
  { icon: CreditCard, title: 'Billing & Pro', desc: 'Subscriptions, restores, refunds and promo codes.' },
];

export default function ContactPage() {
  const subject = encodeURIComponent(`${BRAND.name} support`);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-10">
        <div className="mb-14">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            We&rsquo;d love to hear from you.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            Reach the {BRAND.name} team directly by email — a real person reads every message.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
              <t.icon className="w-6 h-6 mb-5" style={{ color: 'var(--accent)' }} />
              <h3 className="font-bold mb-1.5" style={{ color: 'var(--text)' }}>{t.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <section className="rounded-[32px] p-10 lg:p-14 text-center mb-10" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
          <Mail className="w-8 h-8 mb-5 mx-auto" style={{ color: 'var(--bg)' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--bg)' }}>Email us</h2>
          <a href={`mailto:${BRAND.supportEmail}?subject=${subject}`} className="text-lg font-semibold" style={{ color: 'var(--bg)' }}>
            {BRAND.supportEmail}
          </a>
          <div className="flex items-center justify-center gap-2 text-sm mt-5 opacity-70">
            <Clock className="w-3.5 h-3.5" /> We typically reply within 1–2 business days.
          </div>
        </section>

        <p className="text-center" style={{ color: 'var(--text-soft)' }}>
          Looking for policies? Read our{' '}
          <Link href={BRAND.legalBasePath} style={{ color: 'var(--accent)' }}>Privacy Policy</Link>{' '}
          and{' '}
          <Link href={`${BRAND.legalBasePath}/tos`} style={{ color: 'var(--accent)' }}>Terms of Service</Link>.
        </p>

        <p className="text-center mt-10 text-sm" style={{ color: 'var(--text-faint)' }}>
          <Link href={BRAND.basePath}>← Back to {BRAND.name}</Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
