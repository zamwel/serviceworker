'use client';

import { useState } from 'react';
import { Lock, Wifi, ShieldCheck, Check, ChevronDown } from 'lucide-react';
import { Header, Footer, Eyebrow, WaveformHero, DownloadCta, FEATURE_ICONS } from './shared';
import { BRAND, FEATURE_GROUPS, TRUST_POINTS, STEPS, PLANS, FAQS } from './data';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function LoudableLanding() {
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <main className="relative">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow>{BRAND.positioning}</Eyebrow>
              <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] font-bold mb-6" style={{ color: 'var(--text)' }}>
                Every document deserves to be heard.
              </h1>
              <p className="text-lg leading-relaxed mb-9 max-w-xl" style={{ color: 'var(--text-soft)' }}>
                {BRAND.oneLiner} Contracts, papers, reports and books — narrated with real neural voices, without a
                single byte leaving your phone.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <DownloadCta large />
                <a href="#features" className="px-6 py-4 rounded-xl font-semibold text-base" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                  See what it can do
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--text-faint)' }}>
                <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Nothing uploaded</span>
                <span className="flex items-center gap-2"><Wifi className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Works offline</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Verifiable, not just promised</span>
              </div>
            </div>
            <WaveformHero />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="mb-14 max-w-xl">
            <Eyebrow>Everything it can do</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              A complete audiobook studio, not a text-to-speech toggle.
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>
              Every feature below runs as a local model on your phone — pick a document, apply a tool, and it just
              works, on or offline.
            </p>
          </div>
          <div className="space-y-14">
            {FEATURE_GROUPS.map((g) => (
              <div key={g.label}>
                <h3 className="text-sm font-bold uppercase tracking-wide mb-5" style={{ color: 'var(--text-faint)' }}>
                  {g.label}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {g.features.map((f) => {
                    const Icon = FEATURE_ICONS[f.icon];
                    return (
                      <div key={f.id} className="rounded-2xl p-6" style={{ background: 'var(--surface)' }}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                            <Icon className="w-4.5 h-4.5" style={{ color: 'var(--accent)' }} />
                          </span>
                          {f.tier === 'pro' && (
                            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>Pro</span>
                          )}
                        </div>
                        <h4 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="mb-12 max-w-xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--text)' }}>
              From document to audiobook in four steps.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num}>
                <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{s.num}</span>
                <h3 className="text-base font-bold mt-3 mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRIVACY */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="rounded-[32px] p-10 lg:p-14" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text)' }}>Private by design</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {TRUST_POINTS.map((t) => (
                <div key={t} className="flex items-start gap-3" style={{ color: 'var(--text-soft)' }}>
                  <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--accent)' }} /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Start free. Go Pro when you need more.
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>
              Pro is monthly, annual, or a one-time lifetime purchase, with a 7-day free trial on annual. Exact
              pricing is shown in your local currency at checkout.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl p-8"
                style={p.highlight
                  ? { background: 'var(--text)', color: 'var(--bg)' }
                  : { background: 'var(--surface)', color: 'var(--text)' }}
              >
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-3 mb-6">
                  <div className="text-lg font-bold">{p.price}</div>
                  <div className="text-sm opacity-70">{p.cadence}</div>
                </div>
                <ul className="space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--text)' }}>Questions, answered.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)' }}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${faq === i ? 'rotate-180' : ''}`} style={{ color: 'var(--accent)' }} />
                </button>
                {faq === i && (
                  <p className="px-6 pb-5 -mt-1 leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="rounded-[32px] p-12 lg:p-16 text-center" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-5" style={{ color: 'var(--bg)' }}>
              Give your first document a voice.
            </h2>
            <p className="max-w-xl mx-auto mb-8 opacity-80">
              Free to start. Nothing you import ever leaves your phone.
            </p>
            <div className="flex justify-center"><DownloadCta large /></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
