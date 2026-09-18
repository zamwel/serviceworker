'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Check,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Activity,
  ArrowRight,
  Lock,
} from 'lucide-react';
import {
  Header,
  Footer,
  Eyebrow,
  DownloadCta,
  MatchPreviewHero,
  FEATURE_ICONS,
} from './shared';
import {
  BRAND,
  FEATURE_GROUPS,
  TRUST_POINTS,
  STEPS,
  PLANS,
  FAQS,
  STATS,
} from './data';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BtdLandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <main className="relative">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow>{BRAND.positioning}</Eyebrow>
              <h1
                className="text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] font-black mb-6 tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Data-backed football predictions,{' '}
                <span style={{ color: 'var(--accent)' }}>amplified by AI.</span>
              </h1>
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl font-medium"
                style={{ color: 'var(--text-soft)' }}
              >
                {BRAND.oneLiner} Stop guessing on gut instinct — evaluate expected goals (xG), tactical probabilities, and verified win rates.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <DownloadCta large />
                <a
                  href="#features"
                  className="px-8 py-4 rounded-2xl font-bold text-base border transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  style={{
                    borderColor: 'var(--hairline)',
                    background: 'var(--surface)',
                    color: 'var(--text)',
                  }}
                >
                  Explore Models
                </a>
              </div>

              <div
                className="flex flex-wrap items-center gap-6 text-xs font-semibold"
                style={{ color: 'var(--text-faint)' }}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  100% Auditable Record
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  Real-Time xG & Stats
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  No Bookmaker Signups
                </span>
              </div>
            </div>

            {/* Simulated Hero Card */}
            <div>
              <MatchPreviewHero />
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="border-y" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-black mb-1" style={{ color: 'var(--accent)' }}>
                    {s.value}
                  </div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                    {s.label}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Comprehensive Arsenal</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text)' }}>
              Built for precision sports research.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              From mathematical expected goals modeling to transparent streak verification, BTD delivers the complete analytic toolkit right in your pocket.
            </p>
          </div>

          <div className="space-y-16">
            {FEATURE_GROUPS.map((g) => (
              <div key={g.label}>
                <h3
                  className="text-xs font-black uppercase tracking-widest mb-6"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {g.label}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {g.features.map((f) => {
                    const Icon = FEATURE_ICONS[f.icon] || Sparkles;
                    return (
                      <div
                        key={f.id}
                        className="rounded-3xl p-6 border btd-card-hover flex flex-col justify-between"
                        style={{
                          background: 'var(--surface-elevated)',
                          borderColor: 'var(--hairline)',
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <span
                              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm"
                              style={{
                                background: 'var(--surface-2)',
                                color: 'var(--accent)',
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </span>
                            {f.tier === 'pro' && (
                              <span
                                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-amber-500 bg-amber-500/10"
                              >
                                VIP PRO
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                            {f.title}
                          </h4>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20 border-t" style={{ borderColor: 'var(--hairline)' }}>
          <div className="max-w-xl mb-14">
            <Eyebrow>Simple 4-Step Workflow</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
              How Bet of the Day works.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.num} className="relative">
                <span className="text-4xl font-black" style={{ color: 'var(--accent)' }}>
                  {s.num}
                </span>
                <h3 className="text-lg font-black mt-3 mb-2" style={{ color: 'var(--text)' }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY & TRUST */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div
            className="rounded-3xl p-8 lg:p-12 border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--hairline)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8" style={{ color: 'var(--accent)' }} />
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
                Audited & Transparent by Design
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              {TRUST_POINTS.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 style={{ color: 'var(--accent)' }}" />
                  <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Transparent Subscriptions</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text)' }}>
              Start with free daily unlocks. Upgrade for unlimited VIP edge.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              All VIP purchases are fulfilled securely via Google Play Billing. Cancel anytime with a single tap in your Google Play settings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl p-7 border flex flex-col justify-between transition-all"
                style={{
                  background: p.highlight ? 'var(--surface-elevated)' : 'var(--surface)',
                  borderColor: p.highlight ? 'var(--accent)' : 'var(--hairline)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black" style={{ color: 'var(--text)' }}>
                      {p.name}
                    </h3>
                    {p.badge && (
                      <span
                        className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{
                          background: 'var(--accent)',
                          color: 'var(--accent-on)',
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="my-5">
                    <div className="text-3xl font-black" style={{ color: 'var(--text)' }}>
                      {p.price}
                    </div>
                    <div className="text-xs font-semibold mt-1" style={{ color: 'var(--text-faint)' }}>
                      {p.cadence}
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--hairline)' }}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs font-medium leading-relaxed">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                        <span style={{ color: 'var(--text-soft)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <DownloadCta />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className="rounded-2xl border overflow-hidden transition-colors"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--hairline)',
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-sm"
                  style={{ color: 'var(--text)' }}
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--accent)' }}
                  />
                </button>
                {activeFaq === i && (
                  <div
                    className="px-6 pb-5 pt-1 text-xs leading-relaxed border-t"
                    style={{
                      borderColor: 'var(--hairline)',
                      color: 'var(--text-soft)',
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DOWNLOAD BOTTOM BANNER */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div
            className="rounded-3xl p-10 lg:p-16 text-center border relative overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--surface-elevated), var(--surface))',
              borderColor: 'var(--hairline)',
            }}
          >
            <h2 className="text-3xl lg:text-5xl font-black mb-5 tracking-tight" style={{ color: 'var(--text)' }}>
              Step up your matchday analysis today.
            </h2>
            <p className="max-w-xl mx-auto text-sm font-medium mb-8 leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Join thousands of football fans leveraging real-time expected goals, form analytics, and verified predictions on Android.
            </p>
            <div className="flex justify-center gap-4">
              <DownloadCta large />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
