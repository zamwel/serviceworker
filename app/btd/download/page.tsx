import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone, CheckCircle, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND, REQUIREMENTS } from '../data';

export const metadata: Metadata = {
  title: 'Download App',
  description: `Download ${BRAND.name} for Android on Google Play — Daily AI football predictions and xG statistics.`,
  alternates: { canonical: `${BRAND.basePath}/download` },
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Available Now</Eyebrow>
          <h1
            className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] font-black mb-6 tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Get {BRAND.name} on your device.
          </h1>
          <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            Instant access to daily AI predictions, live scores, and verified winning streaks. Free to download.
          </p>
        </div>

        <div
          className="rounded-3xl p-8 lg:p-12 border mb-12 shadow-xl"
          style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {REQUIREMENTS.android.status}
              </div>
              <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--text)' }}>
                Android App (Google Play)
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-soft)' }}>
                Built natively with Flutter for lightning-fast performance, low battery footprint, and real-time FCM match notifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <DownloadCta large />
              </div>
            </div>

            <div
              className="rounded-2xl p-6 border space-y-3 text-xs"
              style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
            >
              <h3 className="font-extrabold uppercase tracking-wider text-sm mb-2" style={{ color: 'var(--text)' }}>
                System Compatibility
              </h3>
              <div className="flex justify-between py-1.5 border-b" style={{ borderColor: 'var(--hairline)' }}>
                <span style={{ color: 'var(--text-faint)' }}>OS Version</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>{REQUIREMENTS.android.version}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b" style={{ borderColor: 'var(--hairline)' }}>
                <span style={{ color: 'var(--text-faint)' }}>Memory</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>{REQUIREMENTS.android.ram}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b" style={{ borderColor: 'var(--hairline)' }}>
                <span style={{ color: 'var(--text-faint)' }}>Architectures</span>
                <span className="font-bold" style={{ color: 'var(--text)' }}>{REQUIREMENTS.android.arch}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span style={{ color: 'var(--text-faint)' }}>Package ID</span>
                <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>{BRAND.packageId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Quality Guarantees */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div
            className="rounded-2xl p-6 border"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <ShieldCheck className="w-6 h-6 mb-3" style={{ color: 'var(--accent)' }} />
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Play Protect Verified</h4>
            <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
              100% clean package vetted and signed through Google Play app signing.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 border"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <Zap className="w-6 h-6 mb-3" style={{ color: 'var(--accent)' }} />
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Instant Updates</h4>
            <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
              Predictions and daily fixtures sync automatically upon app launch.
            </p>
          </div>
          <div
            className="rounded-2xl p-6 border"
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <Smartphone className="w-6 h-6 mb-3" style={{ color: 'var(--accent)' }} />
            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Offline Capable</h4>
            <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
              Locally cached match schedules and past prediction streaks viewable offline.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
