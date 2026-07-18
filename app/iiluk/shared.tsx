'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faXmark, faSun, faMoon, faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { APP, NAV_LINKS } from './data';

/** Runs before paint (inlined in layout) so the theme never flashes. */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('iiluk-theme');
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
    localStorage.setItem('iiluk-theme', next ? 'dark' : 'light');
    setDark(next);
  };

  return { dark, toggle };
}

/** Ambient gold + teal glow, kept faint enough to read in both themes. */
export function Glow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[-12%] left-[-8%] w-[50%] h-[45%] blur-[140px] rounded-full"
        style={{ background: 'rgba(245,184,0,0.12)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[40%] blur-[140px] rounded-full"
        style={{ background: 'rgba(43,110,104,0.14)' }}
      />
    </div>
  );
}

export function BrandLogo() {
  return (
    <Link href="/iiluk" className="flex items-center gap-2.5">
      <Image src="/iiluk/logo.png" alt="IILuk" width={30} height={30} className="rounded-[8px]" />
      <span className="iiluk-serif text-[22px] leading-none" style={{ color: 'var(--text)' }}>
        II<span style={{ color: 'var(--gold-deep)' }}>Luk</span>
      </span>
    </Link>
  );
}

export function PlayBadge({ className = '' }: { className?: string }) {
  return (
    <a
      href={APP.playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 px-6 py-3.5 font-bold rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={{ background: 'var(--ink)', color: 'var(--gold-pale)' }}
    >
      <FontAwesomeIcon icon={faGooglePlay} className="w-4 h-4" />
      Get it on Google Play
    </a>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl"
      style={{ background: 'color-mix(in srgb, var(--bg) 78%, transparent)', borderBottom: '1px solid var(--hairline)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={`/iiluk${l.href}`}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-soft)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: 'var(--text-soft)' }}
          >
            {dark !== null && <FontAwesomeIcon icon={dark ? faSun : faMoon} className="w-4 h-4" />}
          </button>
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-bold rounded-xl transition-transform hover:scale-[1.02]"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
          >
            Download
          </a>
        </div>
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center"
            style={{ color: 'var(--text-soft)' }}
          >
            {dark !== null && <FontAwesomeIcon icon={dark ? faSun : faMoon} className="w-4 h-4" />}
          </button>
          <button
            className="p-2"
            style={{ color: 'var(--text)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} className="w-5 h-5" />
          </button>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden px-6 py-4 space-y-3"
          style={{ borderTop: '1px solid var(--hairline)', background: 'var(--bg)' }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={`/iiluk${l.href}`}
              onClick={() => setOpen(false)}
              className="block py-1.5"
              style={{ color: 'var(--text-soft)' }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-2 px-5 py-3 font-bold rounded-xl"
            style={{ background: 'var(--gold)', color: 'var(--ink)' }}
          >
            Download
          </a>
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
            {APP.oneLiner}
          </p>
          <a
            href={`mailto:${APP.email}`}
            className="inline-flex items-center gap-2 text-sm mt-4 transition-colors"
            style={{ color: 'var(--text-soft)' }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" /> {APP.email}
          </a>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Product</h4>
          <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-soft)' }}>
            <li><a href="/iiluk#tools">Tools</a></li>
            <li><a href="/iiluk#pricing">Pricing</a></li>
            <li><a href="/iiluk#faq">FAQ</a></li>
            <li><a href={APP.playUrl} target="_blank" rel="noopener noreferrer">Download</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Company</h4>
          <ul className="space-y-2.5 text-sm" style={{ color: 'var(--text-soft)' }}>
            <li><Link href="/iiluk/about">About</Link></li>
            <li><Link href="/iiluk/contact">Contact</Link></li>
            <li><Link href="/iiluk/legal?tab=privacy">Privacy</Link></li>
            <li><Link href="/iiluk/legal?tab=tos">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="py-6 text-center text-sm" style={{ borderTop: '1px solid var(--hairline)', color: 'var(--text-faint)' }}>
        © {new Date().getFullYear()} {APP.name} ·{' '}
        <Link href="https://codeinktechnologies.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          {APP.company}
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}
