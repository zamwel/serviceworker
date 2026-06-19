'use client';

import { useState } from 'react';
import {
  ScanLine, Wand2, Table, Type, Search, Share2,
  Image as ImageIcon, FileText, Video, FileType,
  Lock, ShieldCheck, Sparkles, Check, ChevronDown,
  Bold, Italic, AlignLeft, Palette, GraduationCap, Briefcase, PenLine, Users,
} from 'lucide-react';
import { NavBar, Footer, Glow, PlayBadge } from './shared';
import {
  APP, FEATURES, STEPS, DOC_TYPES, SEARCH_POINTS, PRIVACY_POINTS, PLANS, FAQS,
} from './data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ScanLine, Wand2, Table, Type, Search, Share2,
  Image: ImageIcon, FileText, Video, FileType,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
      {children}
    </div>
  );
}

export default function InDocEditLanding() {
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-red-600/30">
      <Glow />
      <NavBar />

      <main className="relative">
        {/* 1 — HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow>{APP.tagline}</Eyebrow>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Edit the text on any document.
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
              {APP.oneLiner} Powered by on‑device OCR that is private, fast, and beautifully simple.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <PlayBadge />
              <a href="#features" className="px-6 py-3.5 rounded-2xl border border-white/15 hover:bg-white/5 font-semibold transition-colors">
                See features
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-red-500" /> No account</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-red-500" /> Works offline</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-red-500" /> On‑device</span>
            </div>
          </div>
          <HeroMock />
        </section>

        {/* 2 — VALUE STRIP */}
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ScanLine, label: 'Accurate OCR' },
              { icon: Wand2, label: 'Edit on the page' },
              { icon: Table, label: 'Keeps tables' },
              { icon: Lock, label: 'Private by design' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <p.icon className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-200">{p.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3 — FEATURES */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Everything you need to fix a document</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon] ?? Sparkles;
              return (
                <div key={i} className="bg-white/5 p-7 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4 — HOW IT WORKS */}
        <section id="how" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">From scan to share in four steps</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="relative bg-white/5 border border-white/10 rounded-3xl p-7">
                <span className="text-5xl font-extrabold text-red-600/30">{s.num}</span>
                <h3 className="text-lg font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 — ON-DOCUMENT EDITING SHOWCASE */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1"><EditingMock /></div>
          <div className="order-1 lg:order-2">
            <Eyebrow>The headline feature</Eyebrow>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5">Edit text right on the document</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              No more retyping into a blank box. Tap a recognised line and change it in place. InDocEdit samples
              the page's own background and matches the size so your edit blends into the original.
            </p>
            <ul className="space-y-3">
              {['Choose from premium fonts', 'Foreground & background color pickers', 'Bold, italic, alignment & size', 'Export the page with edits baked in'].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 — SUPPORTED FORMATS */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <Eyebrow>Works with</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Images, PDFs, videos & text</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DOC_TYPES.map((d, i) => {
              const Icon = ICONS[d.icon] ?? FileText;
              return (
                <div key={i} className="bg-gradient-to-br from-white/8 to-transparent border border-white/10 rounded-3xl p-7 text-center hover:border-red-500/30 transition-colors">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/15 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="font-bold mb-1.5">{d.title}</h3>
                  <p className="text-sm text-gray-400">{d.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7 — SEARCH */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow>Find anything</Eyebrow>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5">Search every word you’ve ever scanned</h2>
            <ul className="space-y-4">
              {SEARCH_POINTS.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <Search className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <SearchMock />
        </section>

        {/* 8 — PRIVACY */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-red-600/12 to-transparent border border-red-500/15 rounded-[40px] p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-7 h-7 text-red-500" />
              <h2 className="text-3xl font-extrabold tracking-tight">Private by design</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {PRIVACY_POINTS.map((t, i) => (
                <div key={i} className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-red-500 mt-0.5 shrink-0" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9 — PRICING */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Start free. Go Pro when you’re ready.</h2>
            <p className="text-gray-400 mt-4">Pro is monthly, annual or a one‑time lifetime purchase. The exact price is shown in your local currency at checkout.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((p) => (
              <div key={p.name} className={`rounded-3xl p-8 border ${p.highlight ? 'border-red-500/40 bg-gradient-to-b from-red-600/10 to-transparent' : 'border-white/10 bg-white/5'}`}>
                {p.badge && (
                  <span className="inline-block mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-600 text-white rounded-full">{p.badge}</span>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-gray-400 text-sm"> · {p.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center px-6 py-3 rounded-xl font-bold transition-colors ${p.highlight ? 'bg-red-600 hover:bg-red-500 text-white' : 'border border-white/15 hover:bg-white/5'}`}
                >
                  {p.highlight ? 'Get Pro' : 'Download free'}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 10 — BUILT FOR */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <Eyebrow>Built for</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Anyone who hates retyping</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, t: 'Students', d: 'Digitize notes, textbooks and handouts.' },
              { icon: Briefcase, t: 'Business', d: 'Edit contracts, invoices and receipts.' },
              { icon: PenLine, t: 'Writers', d: 'Pull quotes and passages from any page.' },
              { icon: Users, t: 'Everyone', d: 'Scan it, fix it, send it.' },
            ].map((u, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7">
                <u.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="font-bold mb-1.5">{u.t}</h3>
                <p className="text-sm text-gray-400">{u.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11 — FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Questions, answered</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-red-500 shrink-0 transition-transform ${faq === i ? 'rotate-180' : ''}`} />
                </button>
                {faq === i && (
                  <p className="px-6 pb-5 -mt-1 text-gray-400 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 12 — DOWNLOAD CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="relative overflow-hidden rounded-[40px] border border-red-500/20 bg-gradient-to-br from-red-600/20 to-transparent p-12 lg:p-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">Turn your documents into editable text</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">Free to start. No account required. Your documents stay on your device.</p>
            <div className="flex justify-center"><PlayBadge /></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ── Decorative mockups (pure CSS, no assets) ─────────────────────────────── */

function HeroMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-red-600/10 blur-3xl rounded-full" />
      <div className="relative bg-white/5 border border-white/10 rounded-[28px] p-5 backdrop-blur-sm shadow-2xl">
        <div className="rounded-2xl bg-[#111] p-6 space-y-3">
          <div className="text-center text-emerald-400 text-xs font-bold border border-dashed border-emerald-400/40 rounded-full w-fit mx-auto px-3 py-1">SUCCESS</div>
          <div className="h-2.5 w-1/2 bg-white/15 rounded mx-auto" />
          <div className="h-px bg-white/10 my-2" />
          {['Recipient', 'Reference', 'Amount'].map((k, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-2 w-20 bg-white/10 rounded" />
              <div className={`h-2 w-24 rounded ${i === 1 ? 'bg-red-500/70 ring-2 ring-red-500/40' : 'bg-white/20'}`} />
            </div>
          ))}
          <div className="flex items-center gap-1.5 mt-3 bg-black/60 rounded-lg p-1.5 w-fit">
            {[Bold, Italic, AlignLeft, Type, Palette].map((I, i) => (
              <div key={i} className={`w-7 h-7 rounded-md flex items-center justify-center ${i === 0 ? 'bg-red-600' : 'bg-white/5'}`}>
                <I className="w-3.5 h-3.5 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditingMock() {
  return (
    <div className="relative bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-sm">
      <div className="rounded-2xl bg-white p-6 text-gray-800">
        <div className="h-3 w-2/3 bg-gray-200 rounded mb-4" />
        <div className="space-y-2.5">
          <div className="h-2.5 w-full bg-gray-100 rounded" />
          <div className="relative">
            <div className="h-6 w-3/4 rounded bg-red-50 ring-2 ring-red-400 flex items-center px-2">
              <span className="text-[11px] font-semibold text-gray-700">Edited line: fonts, colors, size</span>
            </div>
          </div>
          <div className="h-2.5 w-5/6 bg-gray-100 rounded" />
          <div className="h-2.5 w-2/3 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#111] border border-white/10 rounded-xl p-1.5 shadow-xl">
        {[Bold, Italic, AlignLeft, Palette, Check].map((I, i) => (
          <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 4 ? 'bg-emerald-600' : i === 0 ? 'bg-red-600' : 'bg-white/5'}`}>
            <I className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchMock() {
  return (
    <div className="relative bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-4">
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-300">invoice march</span>
      </div>
      {[
        { t: 'Invoice, March', s: 92 },
        { t: 'Meeting notes', s: 64 },
        { t: 'Receipt 0558', s: 41 },
      ].map((r, i) => (
        <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 mb-2.5">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-200">{r.t}</span>
          </div>
          <span className="text-xs font-bold text-red-400">{r.s}%</span>
        </div>
      ))}
    </div>
  );
}
