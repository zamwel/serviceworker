import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND } from '../data';
import FeatureGrid from './FeatureGrid';

export const metadata: Metadata = {
  title: 'Features',
  description: `Every ${BRAND.name} feature — import, narration, translation, summaries and library tools, all running on-device.`,
  alternates: { canonical: `${BRAND.basePath}/features` },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative">
        <section className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <Eyebrow>Features</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            Everything {BRAND.name} can do, all of it on-device.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
            No feature below phones home to process your document. Free features work for anyone; Pro features are
            marked and unlock with a subscription or lifetime purchase.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <FeatureGrid />
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="rounded-[32px] p-10 lg:p-14" style={{ background: 'var(--surface)' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Free covers real use. Pro removes the ceiling.</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <ul className="space-y-3 text-sm" style={{ color: 'var(--text-soft)' }}>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />3 conversions a day, documents up to 40 pages</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />2 standard voices and the full player</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />Watch a short ad for 12 hours of Pro, any time</li>
              </ul>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--text-soft)' }}>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />Unlimited conversions, no length ceiling</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />Full voice library, offline translation, AI summaries</li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />Export, batch conversion, and no ads, ever</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
          <div className="flex justify-center"><DownloadCta large /></div>
          <p className="text-sm mt-6" style={{ color: 'var(--text-faint)' }}>
            <Link href={BRAND.basePath}>← Back to {BRAND.name}</Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
