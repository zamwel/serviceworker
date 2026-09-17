import type { Metadata } from 'next';
import Link from 'next/link';
import { Ticket, Gift, CheckCircle, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND } from '../data';

export const metadata: Metadata = {
  title: 'Offers & Promo Codes',
  description: Redeem promotional codes and claim community voucher drops for .,
  alternates: { canonical: ${BRAND.basePath}/offers },
};

const HOW_TO_REDEEM = [
  'Open the Bet of the Day app on your Android device.',
  'Navigate to Settings and tap Offers & Promo Codes.',
  'Enter your promotional voucher code into the input box.',
  'Tap Redeem Code to activate your VIP Pro unlock instantly.',
];

export default function OffersPage() {
  return (
    <div className=min-h-screen>
      <Header />

      <main className=max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20>
        <div className=mb-14>
          <Eyebrow>Community Drops</Eyebrow>
          <h1
            className=text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] font-black mb-6 tracking-tight
            style={{ color: 'var(--text)' }}
          >
            Redeem VIP passes & seasonal offers.
          </h1>
          <p className=text-base font-medium leading-relaxed max-w-xl style={{ color: 'var(--text-soft)' }}>
            We regularly distribute promotional codes and community giveaway passes during major football tournament finals and season kickoffs.
          </p>
        </div>

        <div
          className=rounded-3xl p-8 lg:p-12 border mb-12 shadow-xl
          style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
        >
          <div className=flex items-center gap-3 mb-6>
            <span
              className=w-12 h-12 rounded-2xl flex items-center justify-center text-amber-500 bg-amber-500/10
            >
              <Ticket className=w-6 h-6 />
            </span>
            <div>
              <h2 className=text-xl font-black style={{ color: 'var(--text)' }}>
                How to Redeem Your Code
              </h2>
              <p className=text-xs style={{ color: 'var(--text-faint)' }}>
                Vouchers must be redeemed directly inside the Android application
              </p>
            </div>
          </div>

          <ol className=space-y-4 mb-8>
            {HOW_TO_REDEEM.map((step, idx) => (
              <li key={step} className=flex items-start gap-4 text-sm font-medium>
                <span
                  className=w-7 h-7 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs
                  style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
                >
                  {idx + 1}
                </span>
                <span className=pt-0.5 style={{ color: 'var(--text-soft)' }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div
            className=rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-4
            style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
          >
            <div className=flex items-center gap-3>
              <Smartphone className=w-6 h-6 style={{ color: 'var(--accent)' }} />
              <div>
                <p className=font-bold text-sm style={{ color: 'var(--text)' }}>
                  Don&apos;t have the app yet?
                </p>
                <p className=text-xs style={{ color: 'var(--text-faint)' }}>
                  Download Bet of the Day on Google Play to claim your pass
                </p>
              </div>
            </div>
            <DownloadCta />
          </div>
        </div>

        {/* Live Campaign Status */}
        <div
          className=rounded-3xl p-8 border
          style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
        >
          <div className=flex items-center justify-between flex-wrap gap-4 mb-4>
            <h3 className=font-bold text-base style={{ color: 'var(--text)' }}>
              Official Campaign Window
            </h3>
            <span className=text-xs font-black px-3 py-1 rounded-full text-emerald-500 bg-emerald-500/10>
              Active Server Sync
            </span>
          </div>
          <p className=text-xs leading-relaxed mb-4 style={{ color: 'var(--text-soft)' }}>
            Promotional codes are verified against our live backend server. All promotional entitlements sync seamlessly with your device storage and unlock full VIP Pro privileges for the duration specified on your code.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
