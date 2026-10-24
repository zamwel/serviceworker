"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
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
          ? "bg-[#090D16]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 font-extrabold text-xl group">
          <span className="relative grid place-items-center w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.5)] ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Image
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {BRAND.name}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={BRAND.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-105"
          >
            <FaGooglePlay className="w-4 h-4" />
            <span>Get App</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#090D16]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-gray-200 hover:text-cyan-400 py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={BRAND.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-sm shadow-lg"
            >
              <FaGooglePlay className="w-4 h-4" />
              <span>Download on Google Play</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
