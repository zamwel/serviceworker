import type { Metadata } from 'next';
import Link from 'next/link';
import { Brain, TrendingUp, ShieldCheck, Database, Award } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND } from '../data';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${BRAND.name} — data science and statistical modeling for global football fixtures.`,
  alternates: { canonical: `${BRAND.basePath}/about` },
};

const PILLARS = [
  {
    icon: Database,
    title: 'Data-First Foundation',
    desc: 'We harvest and parse over 10 seasons of match events, expected goals metrics, shot placements, lineup adjustments, and historical head-to-heads.',
  },
  {
    icon: Brain,
    title: 'Continuous AI Modeling',
    desc: 'Our probability distributions recalibrate dynamically every matchday, preventing human emotional bias from influencing match expectations.',
  },
  {
    icon: TrendingUp,
    title: '100% Auditable Record',
    desc: 'We believe in absolute transparency. Every past prediction and winning streak remains permanently recorded and publicly verifiable in our in-app analytics.',
  },
  {
    icon: ShieldCheck,
    title: 'Disciplined Sports Research',
    desc: 'We are an analytical research tool, not a sportsbook. We champion disciplined bankroll thinking, realistic variance expectations, and responsible engagement.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>About Bet of the Day</Eyebrow>
          <h1
            className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] font-black mb-6 tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            Engineering transparency into football analytics.
          </h1>
          <p className="text-lg leading-relaxed font-medium" style={{ color: 'var(--text-soft)' }}>
            {BRAND.oneLiner}
          </p>
        </div>

        <section
          className="rounded-3xl p-8 lg:p-12 mb-12 border leading-relaxed space-y-4"
          style={{ background: 'var(--surface)', borderColor: 'var(--hairline)', color: 'var(--text-soft)' }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--text)' }}>
            Why We Built BTD
          </h2>
          <p>
            The world of football betting tips is plagued by sensationalist promises, unverified claims, and deleted losses. We built <strong style={{ color: 'var(--text)' }}>{BRAND.name}</strong> to replace dubious tipsters with verifiable data science.
          </p>
          <p>
            By combining Expected Goals (xG), Poisson goal distributions, tactical match context, and weighted recent form metrics, our system evaluates fixtures as probabilistic events rather than emotional certainties.
          </p>
          <p>
            Whether you follow the English Premier League, UEFA Champions League, or South American domestic leagues, BTD provides a clean, disciplined reference point for your football research.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-black mb-8 tracking-tight" style={{ color: 'var(--text)' }}>
            Our Core Principles
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-3xl p-7 border"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-soft)' }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          className="rounded-3xl p-10 text-center border"
          style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
        >
          <h2 className="text-2xl font-black mb-4" style={{ color: 'var(--text)' }}>
            Experience the BTD Difference
          </h2>
          <p className="max-w-md mx-auto text-sm mb-6" style={{ color: 'var(--text-soft)' }}>
            Get started on Google Play today with free daily unlock slots.
          </p>
          <div className="flex justify-center">
            <DownloadCta large />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
