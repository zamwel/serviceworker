import type { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, Layers as LayersIcon, Lock, BookOpenText } from 'lucide-react';
import { Header, Footer, Eyebrow, DownloadCta } from '../shared';
import { BRAND } from '../data';

export const metadata: Metadata = {
  title: 'About',
  description: BRAND.oneLiner,
  alternates: { canonical: `${BRAND.basePath}/about` },
};

const VALUES = [
  { icon: Cpu, title: 'Runs on your phone', desc: 'Parsing, OCR, narration, translation and summaries all execute on-device. No server round trip, ever.' },
  { icon: LayersIcon, title: 'One studio, not six apps', desc: 'Import once and layer chapters, voices, translation and notes in the same session.' },
  { icon: Lock, title: 'Private by default', desc: 'Your documents are never uploaded. No account required to convert or listen, nothing to opt out of.' },
  { icon: BookOpenText, title: 'Built for real reading loads', desc: 'Contracts, papers, board packs and theses are the actual problem Loudable was designed to solve.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="relative max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-10">
        <div className="mb-14">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] font-bold mb-6" style={{ color: 'var(--text)' }}>
            We built {BRAND.name} so no document goes unread.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
            {BRAND.oneLiner}
          </p>
        </div>

        <section className="rounded-3xl p-8 lg:p-10 mb-12 leading-relaxed" style={{ background: 'var(--surface)', color: 'var(--text-soft)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Why we made it</h2>
          <p className="mb-4">
            Professionals accumulate documents faster than they can read them — contracts, research papers, board
            packs, reports, saved articles. Reading takes eyes, hands, posture and uninterrupted attention: exactly
            what a busy person has least of. Robotic text-to-speech is unpleasant to listen to, commercial
            audiobooks never cover the document you actually need read, and cloud TTS services require uploading
            confidential material to a third-party server — a non-starter for legal, medical, financial and
            government work.
          </p>
          <p>
            {BRAND.name} takes a different approach: a complete document-understanding and speech-synthesis
            pipeline that runs entirely on the device itself. {BRAND.company} builds small, focused on-device tools
            rather than one app that tries to do everything — {BRAND.name} is our answer to a very specific
            problem: documents that deserve to be heard, not just read.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl p-7" style={{ background: 'var(--surface)' }}>
              <v.icon className="w-6 h-6 mb-5" style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <section className="text-center rounded-[32px] p-12" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: 'var(--bg)' }}>Try it for yourself</h2>
          <p className="mb-8 opacity-80">Free to start, and your first conversion takes minutes, not hours.</p>
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
