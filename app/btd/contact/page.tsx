import type { Metadata } from 'next';
import { Mail, Building, Clock, ShieldCheck } from 'lucide-react';
import { Header, Footer, Eyebrow } from '../shared';
import { BRAND } from '../data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact ${BRAND.name} support and engineering team at ${BRAND.company}.`,
  alternates: { canonical: `${BRAND.basePath}/contact` },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>Get in Touch</Eyebrow>
          <h1
            className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] font-black mb-6 tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            We are here to help.
          </h1>
          <p className="text-base font-medium leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            Have questions regarding matchday predictions, partnership inquiries, or your VIP subscription? Reach out to our dedicated support desk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="rounded-3xl p-8 border space-y-6"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
          >
            <div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
              >
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black mb-1" style={{ color: 'var(--text)' }}>
                Direct Email Inquiries
              </h2>
              <p className="text-xs mb-3" style={{ color: 'var(--text-soft)' }}>
                For general support, feedback, and technical assistance:
              </p>
              <a
                href={`mailto:${BRAND.supportEmail}`}
                className="font-mono text-sm font-bold text-amber-600 dark:text-amber-500 hover:underline"
              >
                {BRAND.supportEmail}
              </a>
            </div>

            <div className="pt-6 border-t" style={{ borderColor: 'var(--hairline)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Building className="w-5 h-5 opacity-60" />
                <span className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>
                  {BRAND.company}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                Official developer and publisher of Bet of the Day (BTD).
              </p>
            </div>
          </div>

          <div
            className="rounded-3xl p-8 border space-y-6"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 mt-1" style={{ color: 'var(--accent)' }} />
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                  Response Timeframe
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                  Our support desk monitors inquiries 7 days a week, typically responding within 24 hours (usually faster on matchdays).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 mt-1" style={{ color: 'var(--accent)' }} />
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                  Subscription Inquiries
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                  If your question concerns Google Play billing, include your Google Play Order Number (GPA.xxxx-xxxx-xxxx-xxxxx) for immediate resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
