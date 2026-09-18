'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Brain,
  Gauge,
  Sparkles,
  TrendingUp,
  Activity,
  Swords,
  Trophy,
  Unlock,
  Bell,
  Palette,
  Ticket,
  ShieldCheck,
  Sun,
  Moon,
  Mail,
  Menu,
  X,
  CheckCircle2,
  ExternalLink,
  Flame,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { BRAND, NAV_LINKS, FOOTER_LINKS } from './data';

export const FEATURE_ICONS: Record<string, LucideIcon> = {
  brain: Brain,
  gauge: Gauge,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  activity: Activity,
  swords: Swords,
  trophy: Trophy,
  unlock: Unlock,
  bell: Bell,
  palette: Palette,
  ticket: Ticket,
  shieldCheck: ShieldCheck,
};

export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('btd-theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export function useTheme() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('btd-theme', next ? 'dark' : 'light');
    setDark(next);
  };

  return { dark, toggle };
}

export function BrandLogo() {
  return (
    <Link href={BRAND.basePath} className="flex items-center gap-3 group">
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
          boxShadow: '0 4px 12px var(--accent-glow)',
        }}
      >
        <Flame className="w-5 h-5 text-white" />
      </span>
      <div className="flex flex-col">
        <span className="text-lg font-black tracking-tight" style={{ color: 'var(--text)' }}>
          {BRAND.name}
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase -mt-1" style={{ color: 'var(--accent)' }}>
          AI Football Analytics
        </span>
      </div>
    </Link>
  );
}

export function DownloadCta({ large = false, outline = false }: { large?: boolean; outline?: boolean }) {
  if (outline) {
    return (
      <Link
        href={BRAND.playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 font-bold rounded-2xl border transition-all ${large ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'
          }`}
        style={{
          borderColor: 'var(--hairline)',
          background: 'var(--surface)',
          color: 'var(--text)',
        }}
      >
        <span>Google Play</span>
        <ExternalLink className="w-4 h-4 opacity-70" />
      </Link>
    );
  }

  return (
    <Link
      href={BRAND.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 font-bold rounded-2xl transition-all shadow-md hover:shadow-lg ${large ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'
        }`}
      style={{
        background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
        color: 'var(--accent-on)',
        boxShadow: '0 6px 20px var(--accent-glow)',
      }}
    >
      <span>Get on Google Play</span>
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors"
      style={{
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        borderBottom: '1px solid var(--hairline)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold transition-colors hover:opacity-100"
              style={{ color: 'var(--text-soft)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggle}
            aria-label="Toggle dark/light theme"
            className="w-10 h-10 flex items-center justify-center rounded-xl border transition-colors"
            style={{
              borderColor: 'var(--hairline)',
              background: 'var(--surface)',
              color: 'var(--text-soft)',
            }}
          >
            {dark !== null && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <DownloadCta />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border"
            style={{
              borderColor: 'var(--hairline)',
              background: 'var(--surface)',
              color: 'var(--text-soft)',
            }}
          >
            {dark !== null && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <button
            className="p-2 rounded-lg"
            style={{ color: 'var(--text)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open navigation menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden px-6 py-6 space-y-4"
          style={{ borderTop: '1px solid var(--hairline)', background: 'var(--bg)' }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-base font-semibold"
              style={{ color: 'var(--text-soft)' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <DownloadCta large />
          </div>
        </div>
      )}
    </header>
  );
}


export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm"
      style={{
        background: 'var(--accent-subtle)',
        color: 'var(--accent)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
      {children}
    </div>
  );
}

/** Live interactive simulation of the mobile app's prediction card */
export function MatchPreviewHero() {
  return (
    <div
      className="relative rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl border transition-all"
      style={{
        background: 'var(--surface-elevated)',
        borderColor: 'var(--hairline)',
        boxShadow: '0 25px 50px -12px var(--accent-glow)',
      }}
    >
      {/* Top Bar: League + Live Indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--hairline)' }}>
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-black tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            PREMIER LEAGUE · MATCHDAY 28
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          VERIFIED HIT
        </div>
      </div>

      {/* Teams Matchup */}
      <div className="grid grid-cols-3 items-center gap-4 text-center my-4">
        <div>
          <div
            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-lg mb-2 shadow-sm"
            style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
          >
            ARS
          </div>
          <p className="font-extrabold text-sm" style={{ color: 'var(--text)' }}>
            Arsenal
          </p>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-faint)' }}>
            2.14 xG
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-3xl lg:text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            3 - 1
          </span>
          <span className="text-xs font-bold uppercase tracking-widest mt-1 text-emerald-500">
            FT · COMPLETE
          </span>
        </div>

        <div>
          <div
            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-black text-lg mb-2 shadow-sm"
            style={{ background: 'var(--surface-2)', color: 'var(--text)' }}
          >
            CHE
          </div>
          <p className="font-extrabold text-sm" style={{ color: 'var(--text)' }}>
            Chelsea
          </p>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-faint)' }}>
            0.98 xG
          </p>
        </div>
      </div>

      {/* Expert Prediction Banner */}
      <div
        className="rounded-2xl p-5 mt-6 border relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
          borderColor: 'transparent',
          color: '#ffffff',
          boxShadow: '0 8px 24px var(--accent-glow)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI EXPERT SELECTION
          </div>
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
            Confidence 88%
          </span>
        </div>
        <p className="text-xl font-black tracking-tight mb-1">
          Home Win & Over 2.5 Goals
        </p>
        <p className="text-xs text-white/80 leading-relaxed">
          High-possession offensive metrics, superior counter-pressing index, and 4-game home winning run.
        </p>
      </div>

      {/* Probability Gauge Bar */}
      <div className="mt-5 pt-4 border-t space-y-2" style={{ borderColor: 'var(--hairline)' }}>
        <div className="flex justify-between text-xs font-bold" style={{ color: 'var(--text-soft)' }}>
          <span>Win Probabilities</span>
          <span>1: 64% · X: 22% · 2: 14%</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden flex" style={{ background: 'var(--surface-2)' }}>
          <div className="h-full" style={{ width: '64%', background: 'var(--accent)' }} />
          <div className="h-full bg-amber-400" style={{ width: '22%' }} />
          <div className="h-full bg-slate-400 opacity-50" style={{ width: '14%' }} />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t" style={{ borderColor: 'var(--hairline)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo />
          <p className="text-sm mt-4 max-w-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            {BRAND.oneLiner}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: 'var(--text-soft)' }}
            >
              <Mail className="w-4 h-4" /> {BRAND.supportEmail}
            </a>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
              <span>FCM Push Alerts:</span>
              <code className="px-2 py-0.5 rounded text-[11px] bg-neutral-200/50 dark:bg-neutral-800/50">
                {BRAND.fcmTopic}
              </code>
            </div>
          </div>
        </div>

        {([
          ['Product', FOOTER_LINKS.product],
          ['Company', FOOTER_LINKS.company],
          ['Legal', FOOTER_LINKS.legal],
        ] as const).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>
              {title}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-soft)' }}>
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-amber-600">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="py-8 px-6 text-center text-xs border-t leading-relaxed"
        style={{ borderColor: 'var(--hairline)', color: 'var(--text-faint)' }}
      >
        <p className="mb-2">
          © {new Date().getFullYear()} {BRAND.name} · A product of{' '}
          <Link
            href="https://codeinktechnologies.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline hover:opacity-80"
          >
            {BRAND.company}
          </Link>
          . All rights reserved.
        </p>
        <p className="max-w-3xl mx-auto opacity-70">
          Disclaimer: Bet of the Day is an analytical statistics and expected goals (xG) research platform intended for entertainment and educational purposes only. We do not accept wagers or provide financial advice. Please gamble responsibly (18+).
        </p>
      </div>
    </footer>
  );
}
