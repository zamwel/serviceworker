import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, Ticket, Play } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND, OFFER_HIGHLIGHTS, OFFER_FAQS } from '../data';

export const metadata: Metadata = {
  title: 'Offers',
  description: `How to redeem a promo code or unlock free Pro access in ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/offers` },
};

export default function OffersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>Offers</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            Got a code? Here&rsquo;s how to use it.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            Promo codes and free Pro unlocks are both handled from inside the app — this page just explains how.
          </p>
        </div>

        <section className="rounded-3xl p-8 lg:p-10 mb-10" style={{ background: 'var(--surface)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Ticket className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Redeeming a code</h2>
          </div>
          <ol className="space-y-4">
            {OFFER_HIGHLIGHTS.map((step, i) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'var(--surface-2)', color: 'var(--text-soft)' }}
                >
                  {i + 1}
                </span>
                <span style={{ color: 'var(--text-soft)' }}>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid sm:grid-cols-2 gap-5 mb-14">
          <div className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
            <Gift className="w-6 h-6 mb-5" style={{ color: 'var(--accent)' }} />
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Promo codes</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Occasionally issued by {BRAND.company} for launches, partnerships or community giveaways. There&rsquo;s
              never a need to hunt one down — every feature works on the free tier without one.
            </p>
          </div>
          <div className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
            <Play className="w-6 h-6 mb-5" style={{ color: 'var(--accent)' }} />
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Watch-to-unlock</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              No code, no problem. Watch a short set of rewarded ads from onboarding or the paywall for 12 hours of
              full Pro access — available any time, to anyone on the free tier.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-5" style={{ color: 'var(--text-faint)' }}>
            Questions
          </h2>
          <div className="space-y-4">
            {OFFER_FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl p-6" style={{ background: 'var(--surface)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{f.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center rounded-[32px] p-12" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--bg)' }}>Don&rsquo;t have {BRAND.name} yet?</h2>
          <p className="mb-8 opacity-80">Codes redeem inside the app — get it first, then come back to redeem.</p>
          <div className="flex justify-center"><DownloadCta /></div>
        </section>

        <p className="text-center mt-10 text-sm" style={{ color: 'var(--text-faint)' }}>
          <Link href={BRAND.basePath}>← Back to {BRAND.name}</Link>
        </p>
      </main>

      <Footer />
    </div>
  );
}
