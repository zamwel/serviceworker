'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { APP, NAV_LINKS, FOOTER_LINKS } from './data';

const ACCENT = '#2979FF';

/** Very subtle ambient tint — one corner each, very low opacity. */
export function Glow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute top-[-12%] right-[-8%] w-[48%] h-[48%] rounded-full blur-[160px]"
        style={{ background: `${ACCENT}08` }}
      />
      <div
        className="absolute bottom-[-12%] left-[-8%] w-[44%] h-[44%] rounded-full blur-[160px]"
        style={{ background: `${ACCENT}05` }}
      />
    </div>
  );
}

export function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <Link href="/inwebedit" className="flex items-center gap-2.5 shrink-0">
      {/* IMAGE: Replace src with /inwebedit/logo.png once the asset is ready */}
      <div
        className="rounded-[10px] flex items-center justify-center text-white text-xs font-black"
        style={{ width: size, height: size, background: ACCENT }}
      >
        iW
      </div>
      <span className="text-lg font-extrabold tracking-tight">
        In<span style={{ color: ACCENT }}>Web</span>Edit
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
      className={`inline-flex items-center gap-3 px-6 py-3.5 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-[1.02] ${className}`}
      style={{ background: ACCENT }}
    >
      <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current" aria-hidden>
        <path d="M48 59.5v393c0 5 5.5 8 9.5 5.5l217-202L57.5 54C53.5 51.5 48 54.5 48 59.5zM370 254l-52-48-235 219 235-123zM83 35l235 130 52-48L83 35zM406 232l-58-32-54 50 54 50 58-32c20-11 20-25 0-36z" />
      </svg>
      Get it on Google Play
    </a>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#08090D]/75 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block shrink-0">
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-colors"
            style={{ background: ACCENT }}
          >
            Download
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#08090D]/95 backdrop-blur-xl px-6 py-5 space-y-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-white py-1.5 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-3 px-5 py-3 text-white font-bold rounded-xl"
            style={{ background: ACCENT }}
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
    <footer className="relative border-t border-white/10 mt-24 bg-[#08090D]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <BrandLogo />
          <p className="text-sm text-gray-500 mt-5 leading-relaxed max-w-xs">
            {APP.oneLiner}
          </p>
          <a
            href={`mailto:${APP.email}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-5 transition-colors"
          >
            <Mail size={14} /> {APP.email}
          </a>
        </div>

        {(
          [
            ['Product', FOOTER_LINKS.product],
            ['Company', FOOTER_LINKS.company],
            ['Legal', FOOTER_LINKS.legal],
          ] as const
        ).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
              {title}
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()}{' '}
        <Link
          href="https://abelarai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition-colors"
        >
          {APP.company}
        </Link>
        . All rights reserved.
      </div>
    </footer>
  );
}
