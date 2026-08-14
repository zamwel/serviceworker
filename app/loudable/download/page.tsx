import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell, Smartphone, Apple } from 'lucide-react';
import { Header, Footer, Eyebrow } from '../shared';
import { BRAND, REQUIREMENTS } from '../data';

export const metadata: Metadata = {
  title: 'Download',
  description: `Get ${BRAND.name} on Android, with iOS coming in a later release.`,
  alternates: { canonical: `${BRAND.basePath}/download` },
};

export default function DownloadPage() {
  const subject = encodeURIComponent(`Notify me when ${BRAND.name} launches`);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>Download</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            {BRAND.name} isn&rsquo;t published yet — but it&rsquo;s close.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            We&rsquo;d rather tell you that plainly than link you to a store page that doesn&rsquo;t exist. Here&rsquo;s
            where things stand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
            <Smartphone className="w-6 h-6 mb-5" style={{ color: 'var(--accent)' }} />
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold" style={{ color: 'var(--text)' }}>{REQUIREMENTS.android.label}</h3>
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                {REQUIREMENTS.android.status}
              </span>
            </div>
            <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-soft)' }}>
              <li>{REQUIREMENTS.android.version}</li>
              <li>{REQUIREMENTS.android.ram}</li>
            </ul>
          </div>
          <div className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
            <Apple className="w-6 h-6 mb-5" style={{ color: 'var(--text-faint)' }} />
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold" style={{ color: 'var(--text)' }}>{REQUIREMENTS.ios.label}</h3>
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>
                {REQUIREMENTS.ios.status}
              </span>
            </div>
            <ul className="text-sm space-y-1.5" style={{ color: 'var(--text-soft)' }}>
              <li>{REQUIREMENTS.ios.version}</li>
            </ul>
          </div>
        </div>

        <section className="rounded-[32px] p-10 lg:p-14 text-center" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
          <Bell className="w-8 h-8 mb-5 mx-auto" style={{ color: 'var(--bg)' }} />
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--bg)' }}>Want to know the moment it&rsquo;s live?</h2>
          <p className="mb-8 opacity-80 max-w-md mx-auto">
            Email us and we&rsquo;ll let you know when {BRAND.name} publishes on Google Play.
          </p>
          <a
            href={`mailto:${BRAND.supportEmail}?subject=${subject}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-bold rounded-xl"
            style={{ background: 'var(--bg)', color: 'var(--text)' }}
          >
            Notify me
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
