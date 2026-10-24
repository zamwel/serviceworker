import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Download,
  Copy,
  PhoneCall,
  Check,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Zap,
  Terminal,
  Activity,
  Flame,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import Navbar from "./_components/Navbar";
import Faq from "./_components/Faq";
import {
  BRAND,
  CORE_FEATURES,
  SUPPORTED_BRANDS,
  CODE_SHOWCASE,
  STEPS,
  FAQS,
  FOOTER_LINKS,
  HIGHLIGHTS,
} from "./_components/data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function PlayButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={BRAND.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] ${
        large ? "px-8 py-4 text-lg" : "px-6 py-3.5"
      }`}
    >
      <FaGooglePlay className={large ? "w-7 h-7" : "w-6 h-6"} />
      <span className="flex flex-col leading-none text-left">
        <span className="text-[10px] font-medium text-cyan-200 uppercase tracking-wider">
          Download Free on
        </span>
        <span className={large ? "text-xl" : "text-base font-extrabold"}>
          Google Play
        </span>
      </span>
    </a>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
      {children}
    </span>
  );
}

export default function SecretCodesLandingPage() {
  return (
    <div id="top" className="min-h-screen bg-[#080C15] text-white selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[35%] -left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] -right-[10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <SectionTag>
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                The Ultimate Device Diagnostics Handbook
              </SectionTag>

              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                Unlock Hidden Features &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Phone Secret Codes
                </span>
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Instantly discover hidden manufacturer USSD &amp; MMI codes, test touchscreen and hardware sensors, inspect battery fuel metrics, and unlock device tips and tricks for every major phone brand.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <PlayButton large />
                <a
                  href="#categories"
                  className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-white/10 transition-all hover:scale-105"
                >
                  Explore Codes
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">{BRAND.rating}</span>
                  <span>({BRAND.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">{BRAND.downloads}</span>
                  <span>Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-300">100% Offline &amp; Safe</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Mockup / Card showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-[36px] bg-gradient-to-b from-slate-900/90 to-[#0A101D] p-5 border border-cyan-500/30 shadow-[0_0_80px_-20px_rgba(6,182,212,0.3)] backdrop-blur-xl">
                {/* Simulated Phone Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 grid place-items-center">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Diagnostics Console</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        System Ready - All Brands
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">
                    USSD v2.6
                  </span>
                </div>

                {/* Simulated Secret Code Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg font-mono font-black text-cyan-300 tracking-wider">
                        *#06#
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                        Universal
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mb-1">IMEI Identification Number</div>
                    <div className="text-[11px] text-gray-400">Instantly displays unique device serial and IMEI identifier.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg font-mono font-black text-indigo-300 tracking-wider">
                        *#0*#
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                        Samsung
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mb-1">Hardware Diagnostic Menu</div>
                    <div className="text-[11px] text-gray-400">Interactive testing for LCD, Touch screen, Sensor, and Speaker.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg font-mono font-black text-emerald-300 tracking-wider">
                        *#*#4636#*#*
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        Android General
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white mb-1">Testing &amp; Battery Analytics</div>
                    <div className="text-[11px] text-gray-400">Deep telemetry, Wi-Fi performance, and battery health data.</div>
                  </div>
                </div>

                {/* Bottom dialer simulator button */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">1-Tap Dial Support</span>
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </span>
                    <span className="p-2 rounded-xl bg-white/10 text-gray-300">
                      <Copy className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORTED BRANDS MARQUEE / GRID */}
        <section id="brands" className="max-w-7xl mx-auto px-6 py-16 border-y border-white/10 bg-white/[0.01]">
          <div className="text-center mb-10">
            <SectionTag>Compatibility Matrix</SectionTag>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Works Across All Leading Phone Manufacturers
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
              Each brand features dedicated codes for testing, engineering menus, and hidden device capabilities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SUPPORTED_BRANDS.map((b) => (
              <div
                key={b.name}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 relative mb-3 filter drop-shadow">
                  <Image
                    src={b.logo}
                    alt={`${b.name} logo`}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                  {b.name}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">{b.count}</div>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR CODES SHOWCASE */}
        <section id="categories" className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>Essential Codes</SectionTag>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Explore Popular Secret Codes
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Real codes you can run right away on your smartphone to reveal hidden menus and hardware diagnostics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CODE_SHOWCASE.map((item) => (
              <div
                key={item.code}
                className={`relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-xl hover:border-cyan-500/50 transition-all hover:-translate-y-1 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-black text-white tracking-wider">
                    {item.code}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Device: <strong className="text-white">{item.badge}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Read-only Safe
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE FEATURES */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10 bg-white/[0.015]">
          <div className="text-center mb-16">
            <SectionTag>Complete Toolkit</SectionTag>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Everything You Need in One Pocket App
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Designed for phone enthusiasts, everyday users, and repair technicians looking for quick hardware telemetry.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 grid place-items-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600/30 transition-all">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>Quick &amp; Seamless</SectionTag>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              How Mobile Secret Codes Works
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Four simple steps to unlock full hardware diagnostics on any Android or iOS device.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="relative p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <div className="text-4xl font-black text-cyan-500/30 font-mono mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SAFETY & RESPONSIBILITY CALLOUT */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="relative overflow-hidden rounded-[36px] border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-transparent p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 grid place-items-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-amber-400" />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">
                  Safety First: Tested &amp; Clearly Labeled
                </h3>
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  Most secret codes in our app are purely informational and read-only. For any advanced operations (such as camera firmware re-flashing or factory resets), our app clearly displays safety warnings so you never execute dangerous actions accidentally.
                </p>
              </div>
              <Link
                href={`${BRAND.basePath}/disclaimer`}
                className="shrink-0 px-6 py-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/30 text-sm transition-all"
              >
                Read Safety Disclaimer
              </Link>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section id="faq" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <SectionTag>Have Questions?</SectionTag>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Everything you need to know about USSD codes, device support, and diagnostics safety.
            </p>
          </div>
          <Faq />
        </section>

        {/* FINAL DOWNLOAD CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="relative overflow-hidden rounded-[40px] border border-cyan-500/30 bg-gradient-to-br from-indigo-900/40 via-cyan-900/20 to-slate-900 p-10 lg:p-20 text-center shadow-[0_0_80px_-20px_rgba(6,182,212,0.3)]">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                Get Mobile Secret Codes Free Today
              </h2>
              <p className="text-gray-300 text-base sm:text-xl leading-relaxed mb-10">
                Unlock full control over your smartphone hardware, testing menus, and device insights in seconds.
              </p>
              <div className="flex justify-center">
                <PlayButton large />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 bg-[#060910]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 font-extrabold text-xl text-white mb-4">
                <span className="relative grid place-items-center w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/20">
                  <Image
                    src={BRAND.logo}
                    alt={BRAND.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
                {BRAND.name}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {BRAND.shortDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Product
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.product.map((l) => (
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

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Legal &amp; Policies
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.legal.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">
                Company &amp; Support
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-500 mb-1">Developer Contact:</div>
                <a
                  href={`mailto:${BRAND.supportEmail}`}
                  className="text-xs text-cyan-400 hover:underline break-all"
                >
                  {BRAND.supportEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://codeinktechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-400"
              >
                {BRAND.company}
              </a>
              . All rights reserved.
            </p>
            <p>App Package: <span className="font-mono text-gray-400">{BRAND.packageId}</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
