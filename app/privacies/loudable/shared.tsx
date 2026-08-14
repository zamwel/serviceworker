'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Headphones, Sun, Moon, Mail } from 'lucide-react';
import { APP, TABS, type TabId } from './data';

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
    <Link href={APP.basePath} className="flex items-center gap-2.5">
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent)' }}
      >
        <Headphones className="w-4 h-4" style={{ color: 'var(--accent-on)' }} />
      </span>
      <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{APP.name}</span>
    </Link>
  );
}

export function Header({ active }: { active: TabId }) {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--hairline)' }}
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden sm:flex items-center gap-1">
          {TABS.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={t.id === active
                ? { background: 'var(--surface)', color: 'var(--text)' }
                : { color: 'var(--text-soft)' }}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: 'var(--text-soft)' }}
          >
            {dark !== null && (dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <button
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold"
            style={{ color: 'var(--text)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <div
          className="sm:hidden px-6 py-3 space-y-1"
          style={{ borderTop: '1px solid var(--hairline)' }}
        >
          {TABS.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold"
              style={t.id === active
                ? { background: 'var(--surface)', color: 'var(--text)' }
                : { color: 'var(--text-soft)' }}
            >
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--hairline)' }}>
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
          © {new Date().getFullYear()}{' '}
          <Link href="https://codeinktechnologies.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            {APP.company}
          </Link>
          . All rights reserved.
        </p>
        <a
          href={`mailto:${APP.email}`}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--text-soft)' }}
        >
          <Mail className="w-3.5 h-3.5" /> {APP.email}
        </a>
      </div>
    </footer>
  );
}

export function PageHeader({ title }: { title: string }) {
  return (
    <header className="mb-12">
      <p className="text-xs font-bold tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
        Legal
      </p>
      <h1 className="text-[clamp(1.8rem,4.5vw,2.75rem)] leading-[1.1] mb-4 font-bold" style={{ color: 'var(--text)' }}>
        {title}
      </h1>
      <p style={{ color: 'var(--text-soft)' }}>
        Last updated <span style={{ color: 'var(--text)', fontWeight: 600 }}>{APP.lastUpdated}</span>
      </p>
    </header>
  );
}

export function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: 'var(--text)' }}>
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0"
          style={{ background: 'var(--surface)', color: 'var(--text-soft)' }}
        >
          {n}
        </span>
        {title}
      </h2>
      <div className="leading-relaxed space-y-4" style={{ color: 'var(--text-soft)' }}>
        {children}
      </div>
    </section>
  );
}

export function MiniCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: 'var(--surface)' }}>
      <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--text)' }}>{title}</h3>
      <p className="text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export function ContactCta() {
  return (
    <section className="pt-12 text-center" style={{ borderTop: '1px solid var(--hairline)' }}>
      <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>Questions about this document?</h2>
      <p className="mb-6" style={{ color: 'var(--text-soft)' }}>We read every message and reply within 1–2 business days.</p>
      <a
        href={`mailto:${APP.email}`}
        className="inline-flex items-center justify-center px-7 py-3.5 font-bold rounded-xl transition-transform hover:scale-[1.02]"
        style={{ background: 'var(--accent)', color: 'var(--accent-on)' }}
      >
        Contact {APP.name}
      </a>
    </section>
  );
}
