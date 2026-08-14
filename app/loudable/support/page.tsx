import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Header, Footer, Eyebrow } from '../shared';
import { BRAND } from '../data';
import SupportFaqs from './SupportFaqs';

export const metadata: Metadata = {
  title: 'Support',
  description: `Help with importing, converting, voices, billing and troubleshooting in ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/support` },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>Support</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            Answers, or a real person if you need one.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            Browse by topic below, or{' '}
            <Link href={`${BRAND.basePath}/contact`} style={{ color: 'var(--accent)' }}>contact the team directly</Link>{' '}
            if you can’t find what you need.
          </p>
        </div>

        <SupportFaqs />

        <section className="mt-16 rounded-[32px] p-10 lg:p-14 text-center" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
          <Mail className="w-8 h-8 mb-5 mx-auto" style={{ color: 'var(--bg)' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--bg)' }}>Still stuck?</h2>
          <p className="mb-6 opacity-80">Email us and a real person will reply within 1–2 business days.</p>
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-xl"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}
          >
            {BRAND.supportEmail}
          </a>
        </section>

        <p className="text-center mt-10 text-sm" style={{ color: 'var(--text-faint)' }}>
          <Link href={BRAND.basePath}>← Back to {BRAND.name}</Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
