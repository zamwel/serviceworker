import type { Metadata } from 'next';
import { Header, Footer, Eyebrow, DownloadCta, FEATURE_ICONS } from '../shared';
import { BRAND, FEATURE_GROUPS } from '../data';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: `Complete feature inventory of ${BRAND.name} — AI prediction models, xG stats, and live match tracker.`,
  alternates: { canonical: `${BRAND.basePath}/features` },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="max-w-3xl mb-16">
          <Eyebrow>Feature Arsenal</Eyebrow>
          <h1
            className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] font-black mb-6 tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            A full-spectrum football intelligence suite.
          </h1>
          <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            Every tool in {BRAND.name} is engineered to provide actionable context, eliminate bias, and give you clear insights into upcoming fixtures.
          </p>
        </div>

        <div className="space-y-16">
          {FEATURE_GROUPS.map((g) => (
            <div key={g.label}>
              <h2
                className="text-sm font-black uppercase tracking-widest mb-6"
                style={{ color: 'var(--accent)' }}
              >
                {g.label}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.features.map((f) => {
                  const Icon = FEATURE_ICONS[f.icon] || Sparkles;
                  return (
                    <div
                      key={f.id}
                      className="rounded-3xl p-7 border btd-card-hover flex flex-col justify-between"
                      style={{
                        background: 'var(--surface-elevated)',
                        borderColor: 'var(--hairline)',
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
                          >
                            <Icon className="w-6 h-6" />
                          </span>
                          {f.tier === 'pro' && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-amber-500 bg-amber-500/10">
                              VIP PRO
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                          {f.title}
                        </h3>
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

        <div
          className="mt-20 rounded-3xl p-10 lg:p-14 text-center border"
          style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
        >
          <h2 className="text-3xl font-black mb-4 tracking-tight" style={{ color: 'var(--text)' }}>
            Start with daily free unlocks.
          </h2>
          <p className="max-w-md mx-auto text-sm mb-8" style={{ color: 'var(--text-soft)' }}>
            Test out our predictions and expected goals breakdowns at no cost on Google Play.
          </p>
          <div className="flex justify-center">
            <DownloadCta large />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
