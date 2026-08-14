'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Headphones, Sun, Moon, Mail, Menu, X,
  FileStack, Camera, ScanText, LayoutGrid, ListOrdered,
  AudioLines, Mic, SpellCheck, BookMarked,
  Languages, FileText, Search, Highlighter,
  Layers, Compass, ListChecks, FileOutput, Infinity as InfinityIcon,
  type LucideIcon,
} from 'lucide-react';
import { BRAND, NAV_LINKS, FOOTER_LINKS } from './data';

export const FEATURE_ICONS: Record<string, LucideIcon> = {
  fileStack: FileStack,
  camera: Camera,
  scanText: ScanText,
  layoutGrid: LayoutGrid,
  listOrdered: ListOrdered,
  audioLines: AudioLines,
  mic: Mic,
  spellCheck: SpellCheck,
  headphones: Headphones,
  bookMarked: BookMarked,
  languages: Languages,
  fileText: FileText,
  search: Search,
  highlighter: Highlighter,
  layers: Layers,
  compass: Compass,
  listChecks: ListChecks,
  fileOutput: FileOutput,
  infinity: InfinityIcon,
};

/** Runs before paint (inlined in layout) so the theme never flashes. */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('loudable-theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

function useTheme() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('loudable-theme', next ? 'dark' : 'light');
    setDark(next);
  };

  return { dark, toggle };
}

export function BrandLogo() {
  return (
    <Link href={BRAND.basePath} className="flex items-center gap-2.5">
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent)' }}
      >
        <Headphones className="w-4 h-4" style={{ color: 'var(--accent-on)' }} />
      </span>
      <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{BRAND.name}</span>
    </Link>
  );
}

/** The real download link isn't live yet (Section 0.11 open items) — this is
 *  an honest "coming soon" state, not a link to nowhere. */
export function DownloadCta({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-bold rounded-xl ${large ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'}`}
      style={{ background: 'var(--surface)', color: 'var(--text-faint)' }}
      title="Not yet published — see Settings > About once it ships"
    >
      Coming soon to Google Play
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderBottom: '1px solid var(--hairline)', backdropFilter: 'blur(10px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--text-soft)' }}
          >
            {dark !== null && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <DownloadCta />
        </div>
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center"
            style={{ color: 'var(--text-soft)' }}
          >
            {dark !== null && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <button className="p-2" style={{ color: 'var(--text)' }} onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 space-y-3" style={{ borderTop: '1px solid var(--hairline)', background: 'var(--bg)' }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-1.5" style={{ color: 'var(--text-soft)' }}>
              {l.label}
            </a>
          ))}
          <div className="pt-2"><DownloadCta /></div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24" style={{ borderTop: '1px solid var(--hairline)' }}>
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo />
          <p className="text-sm mt-4 max-w-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            {BRAND.oneLiner}
          </p>
          <a href={`mailto:${BRAND.supportEmail}`} className="inline-flex items-center gap-2 text-sm mt-4" style={{ color: 'var(--text-soft)' }}>
            <Mail className="w-3.5 h-3.5" /> {BRAND.supportEmail}
          </a>
        </div>
        {([['Product', FOOTER_LINKS.product], ['Company', FOOTER_LINKS.company], ['Legal', FOOTER_LINKS.legal]] as const).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>{title}</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-soft)' }}>
              {links.map((l) => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="py-6 text-center text-sm" style={{ borderTop: '1px solid var(--hairline)', color: 'var(--text-faint)' }}>
        © {new Date().getFullYear()} {BRAND.name} ·{' '}
        <Link href="https://codeinktechnologies.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          {BRAND.company}
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.14em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
      {children}
    </p>
  );
}

/** Flat, no-gradient stand-in for a hero screenshot: a waveform made of solid
 *  bars — no real product screenshots exist yet (see loudable-assets/, which
 *  the blueprint marks content-reference-only, not visual reference). */
export function WaveformHero() {
  const heights = [22, 38, 58, 30, 70, 45, 90, 55, 34, 66, 28, 48, 78, 40, 60, 25, 52, 36, 68, 30];
  return (
    <div className="rounded-[28px] p-10 lg:p-14" style={{ background: 'var(--surface)' }}>
      <div className="flex items-end justify-center gap-1.5 h-40">
        {heights.map((h, i) => (
          <span
            key={i}
            className="w-2.5 rounded-sm"
            style={{ height: `${h}%`, background: i % 3 === 0 ? 'var(--accent)' : 'var(--text-faint)' }}
          />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-sm" style={{ color: 'var(--text-soft)' }}>
        <span>Quarterly Board Report.pdf</span>
        <span style={{ color: 'var(--accent)' }}>On-device</span>
      </div>
    </div>
  );
}
