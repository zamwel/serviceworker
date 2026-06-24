'use client';

import { useState } from 'react';
import {
  Globe, PenLine, Type, RotateCcw, History, FolderOpen, Link as LinkIcon,
  Image as ImageIcon, Camera, FileDown, Share2, Check, ChevronDown,
  Palette, TrendingUp, Code2, Video, ShieldOff, Zap, Lock,
} from 'lucide-react';
import { NavBar, Footer, Glow, PlayBadge } from './shared';
import {
  APP, FEATURES, STEPS, EXPORT_MODES, AUDIENCES, PLANS, FAQS,
} from './data';

// ── Accent values (match Flutter app_colors.dart) ─────────────────────────────
const ACCENT        = '#2979FF';
const ACCENT_DARK   = '#2962FF';
const ACCENT_LIGHT  = '#82B1FF';
const ACCENT_BG     = '#0D1F3C';
const BG            = '#08090D';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, PenLine, Type, RotateCcw, History, FolderOpen,
  LinkIcon, ImageIcon, Camera, FileDown, Share2, Palette, TrendingUp, Code2, Video,
};

// ── Shared primitives ─────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full"
      style={{ background: `${ACCENT}14`, color: ACCENT_LIGHT }}
    >
      {children}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_LIGHT }} />
      {children}
    </li>
  );
}

// ── CSS-only UI mockups ───────────────────────────────────────────────────────

function BrowserEditorMock() {
  return (
    <div className="relative">
      {/* Phone shell */}
      <div
        className="relative w-[260px] mx-auto rounded-[40px] p-3 shadow-2xl ring-1 ring-white/10"
        style={{ background: 'linear-gradient(160deg,#1a1d28,#111318)' }}
      >
        <div
          className="relative w-full rounded-[32px] overflow-hidden"
          style={{ background: BG }}
        >
          {/* Status bar notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

          {/* Browser chrome */}
          <div className="px-3 pt-8 pb-2">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
              <Globe className="w-3 h-3 shrink-0" style={{ color: ACCENT_LIGHT }} />
              <span className="text-[10px] text-white/40 flex-1 truncate">example.com/about</span>
              <PenLine className="w-3 h-3 shrink-0" style={{ color: ACCENT }} />
            </div>
          </div>

          {/* Simulated webpage */}
          <div className="mx-3 mb-2 rounded-xl bg-white p-3 space-y-2">
            {/* H1 */}
            <div className="h-3.5 w-3/4 rounded-md bg-gray-800" />
            {/* Paragraph lines */}
            <div className="h-2 w-full rounded bg-gray-200" />
            {/* Active editing line */}
            <div
              className="h-6 w-full rounded flex items-center px-2 gap-1"
              style={{ background: `${ACCENT}14`, outline: `2px solid ${ACCENT}60` }}
            >
              <span className="text-[10px] font-medium text-gray-700 leading-none">
                Editing this headline inline…
              </span>
              <div
                className="w-[1.5px] h-3 rounded animate-pulse"
                style={{ background: ACCENT }}
              />
            </div>
            <div className="h-2 w-5/6 rounded bg-gray-200" />
            <div className="h-2 w-4/6 rounded bg-gray-200" />
            {/* Image placeholder block */}
            <div className="h-16 w-full rounded-md bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-gray-300" />
            </div>
          </div>

          {/* Floating toolbar */}
          <div
            className="mx-3 mb-3 flex items-center gap-1.5 rounded-xl p-1.5"
            style={{ background: '#111318' }}
          >
            {[
              { label: 'B', active: true },
              { label: 'I', active: false },
              { label: 'U', active: false },
              { label: 'A', active: false },
              { label: '↔', active: false },
            ].map(({ label, active }) => (
              <div
                key={label}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-1"
                style={{
                  background: active ? ACCENT : 'rgba(255,255,255,0.05)',
                  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Bottom nav bar */}
          <div
            className="flex items-center justify-around py-3 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            {[Globe, PenLine, Camera, FolderOpen].map((Icon, i) => (
              <div
                key={i}
                className="w-5 h-5 flex items-center justify-center"
                style={{ color: i === 1 ? ACCENT : 'rgba(255,255,255,0.25)' }}
              >
                <Icon className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportSheetMock() {
  const modes = [
    { label: 'Viewport', sub: 'What you see' },
    { label: 'Full page', sub: 'Scroll-stitched' },
    { label: 'Section crop', sub: 'Tap to select' },
    { label: 'PDF', sub: 'A4 format' },
    { label: 'HTML', sub: 'Full source' },
    { label: 'Text', sub: 'Clean copy' },
  ];

  return (
    <div
      className="rounded-[28px] p-5 space-y-3"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-white">Export</span>
        <span className="text-xs text-gray-500">6 formats</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {modes.map(({ label, sub }, i) => (
          <div
            key={label}
            className="px-3 py-3 rounded-xl"
            style={{
              background: i === 0 ? `${ACCENT}20` : 'rgba(255,255,255,0.05)',
            }}
          >
            <div
              className="text-xs font-bold mb-0.5"
              style={{ color: i === 0 ? ACCENT_LIGHT : 'rgba(255,255,255,0.8)' }}
            >
              {label}
            </div>
            <div className="text-[10px] text-gray-500">{sub}</div>
          </div>
        ))}
      </div>
      <button
        className="w-full py-3 rounded-xl text-xs font-bold text-white"
        style={{ background: ACCENT }}
      >
        Export selected
      </button>
    </div>
  );
}

function HistoryMock() {
  const items = [
    { domain: 'stripe.com', title: 'Stripe — Payment Processing', time: '2m ago' },
    { domain: 'vercel.com', title: 'Vercel — Deploy & Scale', time: '1h ago' },
    { domain: 'figma.com', title: 'Figma — Collaborative Design', time: '3h ago' },
  ];
  const colors = [ACCENT, '#00C853', '#FF6D00'];

  return (
    <div
      className="rounded-[28px] p-5"
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <div className="text-sm font-bold text-white mb-4">Recent</div>
      <div className="space-y-1">
        {items.map(({ domain, title, time }, i) => (
          <div
            key={domain}
            className="flex items-center gap-3 px-3 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: `${colors[i]}20`, color: colors[i] }}
            >
              {domain[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-white truncate">{title}</div>
              <div className="text-[10px] text-gray-500">{domain}</div>
            </div>
            <span className="text-[10px] text-gray-600 shrink-0">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Image asset placeholders ──────────────────────────────────────────────────

function ImgPlaceholder({ label, aspect = 'aspect-video' }: { label: string; aspect?: string }) {
  return (
    <div
      className={`w-full ${aspect} rounded-2xl flex flex-col items-center justify-center gap-2`}
      style={{ background: 'rgba(255,255,255,0.04)' }}
    >
      <ImageIcon className="w-6 h-6 text-white/15" />
      <span className="text-xs text-white/20 text-center px-4">{label}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InWebEditLanding() {
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen text-white" style={{ background: BG, colorScheme: 'dark' }}>
      <Glow />
      <NavBar />

      <main className="relative">

        {/* ── 1 HERO ──────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-32 lg:pt-44 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Live website editor</Eyebrow>

            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6 text-white">
              Load any website.<br />
              Start editing live.
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              {APP.oneLiner}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PlayBadge />
              <a
                href="#features"
                className="px-6 py-3.5 rounded-2xl font-semibold text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                See features
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: ACCENT_LIGHT }} /> No account required
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: ACCENT_LIGHT }} /> Any public website
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: ACCENT_LIGHT }} /> Android
              </span>
            </div>
          </div>

          {/* Hero visual — replace inner placeholder once screenshot is ready */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <BrowserEditorMock />
              {/* IMAGE PLACEHOLDER: Full hero phone screenshot — place at same size as mock (260×540px) */}
              {/* <Image src="/inwebedit/hero-phone.png" width={260} height={540} alt="InWebEdit editor" className="rounded-[40px]" /> */}
            </div>
          </div>
        </section>

        {/* ── 2 QUICK VALUE STRIP ─────────────────────────────────────────── */}
        <section className="border-y border-white/5" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: PenLine,   label: 'Inline editing'      },
              { icon: Camera,    label: 'Screenshot exports'   },
              { icon: FileDown,  label: 'PDF & HTML export'    },
              { icon: Lock,      label: 'No account needed'    },
            ].map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <Icon className="w-5 h-5 shrink-0" style={{ color: ACCENT_LIGHT }} />
                <span className="text-sm font-semibold text-gray-200">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3 FEATURES ──────────────────────────────────────────────────── */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Features</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Everything built into one app
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
              No extensions, no desktop software, no account. Everything you need to edit and export is already there when you open InWebEdit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Globe;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl transition-colors duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${ACCENT}14` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ACCENT_LIGHT }} />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 4 HOW IT WORKS ──────────────────────────────────────────────── */}
        <section
          id="how"
          className="border-y border-white/5 scroll-mt-20"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                From URL to export in four steps
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((s, i) => {
                const Icon = ICON_MAP[s.icon] ?? Globe;
                return (
                  <div
                    key={s.num}
                    className="p-7 rounded-3xl"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{ background: ACCENT }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className="text-4xl font-black"
                        style={{ color: 'rgba(255,255,255,0.07)' }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-2 text-white">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5 EDITING SHOWCASE ──────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            {/* IMAGE PLACEHOLDER: Side-by-side before/after of a webpage being edited */}
            <ImgPlaceholder
              label="[ Screenshot: editing text on a real webpage ]"
              aspect="aspect-[4/3]"
            />
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>The core feature</Eyebrow>
            <h2 className="text-4xl font-extrabold tracking-tight mb-5">
              Edit text right on the live page
            </h2>
            <p className="text-gray-400 leading-relaxed mb-7">
              No blank text boxes, no retyping into a separate editor. InWebEdit injects
              <code className="mx-1.5 px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(255,255,255,0.08)' }}>
                contenteditable
              </code>
              directly into the page DOM. The site's own layout, typography, and styling all stay
              intact around every edit you make.
            </p>
            <ul className="space-y-3">
              {[
                'Tap any text element and type immediately',
                'Bold, italic, underline, alignment, size, color',
                'Link clicks intercepted — never lose your place',
                'Full undo / redo with no step limit',
              ].map((t, i) => <CheckItem key={i}>{t}</CheckItem>)}
            </ul>
          </div>
        </section>

        {/* ── 6 EXPORT SECTION ────────────────────────────────────────────── */}
        <section
          id="export"
          className="border-y border-white/5 scroll-mt-20"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow>Export</Eyebrow>
              <h2 className="text-4xl font-extrabold tracking-tight mb-5">
                Six ways to save and share your work
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                One export sheet, six formats. Whether you need a quick screenshot, a PDF to send
                to a client, or the full HTML source to hand off to a developer — it is all one
                tap from the bottom bar.
              </p>
              <div className="space-y-4">
                {EXPORT_MODES.map((m, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: ACCENT_LIGHT }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{m.title}</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <ExportSheetMock />
              {/* IMAGE PLACEHOLDER: Full-page screenshot output example */}
              <ImgPlaceholder
                label="[ Screenshot: full-page screenshot result ]"
                aspect="aspect-[16/7]"
              />
            </div>
          </div>
        </section>

        {/* ── 7 SCREENSHOT SHOWCASE ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <Eyebrow>Screenshot quality</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Pixel-perfect captures, every time
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
              Three screenshot modes to cover every use case — from a quick share image to a
              high-fidelity full-page capture for client presentations.
            </p>
          </div>

          {/* IMAGE PLACEHOLDER: Three-panel showing viewport / full-page / section crop side by side */}
          <ImgPlaceholder
            label="[ Three-panel image: Viewport · Full-page · Section crop screenshots ]"
            aspect="aspect-[21/9]"
          />

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {[
              {
                title: 'Viewport',
                desc: 'Captures exactly what is on screen, at the native pixel density of your device.',
              },
              {
                title: 'Full page',
                desc: 'Programmatically scrolls the entire page and stitches it into one continuous image.',
              },
              {
                title: 'Section crop',
                desc: 'Tap any element on the live page to isolate and capture just that component.',
              },
            ].map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-4 text-xs font-black"
                  style={{ background: `${ACCENT}14`, color: ACCENT_LIGHT }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold mb-2 text-white">{m.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8 BROWSING HISTORY & DOCS ───────────────────────────────────── */}
        <section
          className="border-y border-white/5"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow>History &amp; Docs</Eyebrow>
              <h2 className="text-4xl font-extrabold tracking-tight mb-5">
                Every visit and export, always at hand
              </h2>
              <p className="text-gray-400 leading-relaxed mb-7">
                InWebEdit keeps a full log of every URL you have visited, with favicons, titles,
                and timestamps. Your most recent three appear on the home screen — no searching
                required. Every export lands in the Docs tab, ready to share or revisit.
              </p>
              <ul className="space-y-3">
                {[
                  'Full browsing history with favicon and timestamp',
                  'Three most recent sites on the home screen',
                  'All exports saved automatically to Docs',
                  'Pinch-to-zoom viewer for screenshots in Docs',
                  'Share any export file directly from the app',
                ].map((t, i) => <CheckItem key={i}>{t}</CheckItem>)}
              </ul>
            </div>

            <HistoryMock />
          </div>
        </section>

        {/* ── 9 WHO IS IT FOR ─────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <Eyebrow>Built for</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Anyone who works with the web
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIENCES.map((a, i) => {
              const Icon = ICON_MAP[a.icon] ?? Globe;
              return (
                <div
                  key={i}
                  className="p-7 rounded-3xl"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${ACCENT}14` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: ACCENT_LIGHT }} />
                  </div>
                  <h3 className="font-bold mb-2 text-white">{a.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 10 NO-ACCOUNT / PRIVACY STRIP ──────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div
            className="rounded-[32px] p-10 lg:p-12"
            style={{ background: `${ACCENT_BG}` }}
          >
            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${ACCENT}20` }}
              >
                <ShieldOff className="w-5 h-5" style={{ color: ACCENT_LIGHT }} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-1">
                  No account. No sign-up. No tracking.
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  InWebEdit does not require an account at any point. Open it, paste a URL,
                  and start editing. Your history and exports stay entirely on your device.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
              {[
                'No account or email required',
                'Browsing history stored locally on your device',
                'Exports saved to your device, never uploaded',
                'Camera and media used only for files you choose',
                'No background data collection or analytics',
                'Pro removes ads entirely',
              ].map((t, i) => <CheckItem key={i}>{t}</CheckItem>)}
            </div>
          </div>
        </section>

        {/* ── 11 PRICING ──────────────────────────────────────────────────── */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Start free. Go Pro when you're ready.
            </h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto leading-relaxed">
              The exact price is shown in your local currency at checkout. Or earn 12 hours
              of Pro free by watching five short videos — no payment required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-[28px] p-8"
                style={{
                  background: p.featured ? `${ACCENT_BG}` : 'rgba(255,255,255,0.04)',
                }}
              >
                {p.badge && (
                  <span
                    className="inline-block mb-5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full"
                    style={{ background: ACCENT }}
                  >
                    {p.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{p.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-3xl font-extrabold text-white">{p.price}</span>
                  <span className="text-gray-500 text-sm ml-2">· {p.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.perks.map((f, i) => <CheckItem key={i}>{f}</CheckItem>)}
                </ul>
                <a
                  href={APP.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-[1.02]"
                  style={{
                    background: p.featured ? ACCENT : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Earn free Pro callout */}
          <div
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <Zap className="w-5 h-5 shrink-0" style={{ color: ACCENT_LIGHT }} />
            <div>
              <span className="font-semibold text-white text-sm">Earn 12 hours of Pro free</span>
              <span className="text-gray-400 text-sm ml-2">
                Tap "Earn Pro Free" on the home screen and watch five short videos. Full Pro access, no card needed.
              </span>
            </div>
          </div>
        </section>

        {/* ── 12 FAQ ──────────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="border-t border-white/5 scroll-mt-20"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-3xl mx-auto px-6 py-24">
            <div className="text-center mb-14">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                Questions, answered
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <button
                    onClick={() => setFaq(faq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-white text-sm leading-relaxed">{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${faq === i ? 'rotate-180' : ''}`}
                      style={{ color: ACCENT_LIGHT }}
                    />
                  </button>
                  {faq === i && (
                    <p className="px-6 pb-5 -mt-1 text-gray-400 text-sm leading-relaxed">{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13 FINAL CTA ────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          {/* IMAGE PLACEHOLDER: Feature graphic / banner (1024×500) — place as absolute bg image */}
          <div
            className="relative overflow-hidden rounded-[40px] p-12 lg:p-20 text-center"
            style={{ background: ACCENT_BG }}
          >
            {/* Placeholder comment for feature banner image: */}
            {/* <Image src="/inwebedit/cta-banner.png" fill alt="" className="object-cover opacity-20" /> */}

            <div className="relative">
              <Eyebrow>Free to download</Eyebrow>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 text-white">
                Start editing the web today
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
                No account. No desktop. Just paste a URL and get to work.
                InWebEdit is free to download on Android.
              </p>
              <div className="flex justify-center">
                <PlayBadge />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
