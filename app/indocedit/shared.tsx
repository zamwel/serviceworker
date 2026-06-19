'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { APP, NAV_LINKS } from './data';

/** Ambient red glow used on every InDocEdit page. */
export function Glow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-red-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-red-600/5 blur-[130px] rounded-full" />
    </div>
  );
}

export function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <Link href="/indocedit" className="flex items-center gap-2.5">
      <Image
        src="/indocedit/logo.png"
        alt="InDocEdit"
        width={size}
        height={size}
        className="rounded-[10px]"
      />
      <span className="text-lg font-extrabold tracking-tight">
        In<span className="text-red-500">Doc</span>Edit
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
      className={`inline-flex items-center gap-3 px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-[1.03] shadow-[0_0_40px_rgba(220,38,38,0.35)] ${className}`}
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
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0A0A0A]/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={`/indocedit${l.href}`}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Download
          </a>
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0A0A0A]/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={`/indocedit${l.href}`}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-white py-1.5"
            >
              {l.label}
            </a>
          ))}
          <a
            href={APP.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-2 px-5 py-3 bg-red-600 text-white font-bold rounded-xl"
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
    <footer className="relative border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo />
          <p className="text-gray-400 text-sm mt-4 max-w-sm leading-relaxed">{APP.oneLiner}</p>
          <a
            href={`mailto:${APP.email}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-4 transition-colors"
          >
            <Mail size={15} /> {APP.email}
          </a>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4">Product</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><a href="/indocedit#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="/indocedit#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="/indocedit#faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href={APP.playUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Download</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li><Link href="/indocedit/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/indocedit/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/indocedit/legal?tab=privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/indocedit/legal?tab=tos" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div> 
      </div>
      <div className="border-t border-white/5 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {APP.name} · <Link href="https://codeinktechnologies.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">{APP.company}</Link>. All rights reserved.
      </div>
    </footer> 
  );
}
