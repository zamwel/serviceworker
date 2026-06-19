"use client";

import { useState, useEffect } from "react";
import { Menu, X, Clapperboard } from "lucide-react";
import { BRAND, NAV_LINKS } from "./data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-extrabold text-xl">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <Clapperboard className="w-5 h-5 text-white" />
          </span>
          <span className="text-white">{BRAND.name}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={BRAND.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Get the App
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-gray-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={BRAND.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center px-5 py-3 bg-red-600 text-white font-bold rounded-xl"
          >
            Get the App
          </a>
        </div>
      )}
    </header>
  );
}
