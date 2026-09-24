import {
  Star,
  Download,
  Check,
  ArrowRight,
  Quote,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import NextImage from "next/image";
import Navbar from "./_components/Navbar";
import Faq from "./_components/Faq";
import {
  BRAND,
  CORE_FEATURES,
  STEPS,
  HIGHLIGHTS,
  PLANS,
  FAQS,
  FOOTER_LINKS,
  PERKS_QUICK,
  SCREENSHOTS,
} from "./_components/data";

/* FAQ structured data for the landing page (rich result eligibility). */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ── Small shared building blocks ─────────────────────────────────────────── */

function PlayButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={BRAND.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-white text-black font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] ${
        large ? "px-8 py-4 text-lg" : "px-6 py-3.5"
      }`}
    >
      <FaGooglePlay className={large ? "w-7 h-7" : "w-6 h-6"} />
      <span className="flex flex-col leading-none text-left">
        <span className="text-[10px] font-medium text-gray-500">GET IT ON</span>
        <span className={large ? "text-xl" : "text-base"}>Google Play</span>
      </span>
    </a>
  );
}

function PhoneMockup({
  screenshot,
  className = "",
  priority = false,
}: {
  screenshot: { src: string; alt: string };
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[260px] h-[540px] rounded-[44px] bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 shadow-[0_30px_80px_-20px_rgba(220,38,38,0.45)] ring-1 ring-white/10">
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#0A0A0A]">
          <NextImage
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes="260px"
            className="object-cover"
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}

function ScreenCard({
  screenshot,
  label,
  className = "",
}: {
  screenshot: { src: string; alt: string };
  label: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <div className="relative w-[180px] h-[374px] mx-auto rounded-[32px] bg-gradient-to-b from-zinc-800 to-zinc-900 p-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0A0A0A]">
          <NextImage src={screenshot.src} alt={screenshot.alt} fill sizes="180px" className="object-cover" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-300">{label}</p>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
      {children}
    </div>
  );
}

const TESTIMONIALS = [
  {
    name: "Priya S.",
    role: "Wallpaper collector",
    text: "I change my lock screen every day and MovieWalls never runs out of fresh art. The backdrops look incredible in full resolution.",
  },
  {
    name: "Daniel R.",
    role: "Film enthusiast",
    text: "Finding official posters used to mean digging through a dozen sketchy sites. Now I just search the title and download in one tap.",
  },
  {
    name: "Chidi O.",
    role: "Casual browser",
    text: "The filters are so specific, I can sort by genre and release year and land on exactly the poster I'm picturing. Clean, fast app.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function MovieWallsLanding() {
  return (
    <div id="top" className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-red-600/5 blur-[140px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative">
        {/* 1 ── HERO ─────────────────────────────────────────── */}
        <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-44 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <SectionTag>Movie &amp; TV Wallpapers</SectionTag>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  {BRAND.tagline}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8">
                {BRAND.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <PlayButton large />
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl border border-white/15 text-white hover:bg-white/5 transition-colors"
                >
                  Explore features <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10">
                {PERKS_QUICK.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="w-4 h-4 text-red-500" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup
                screenshot={SCREENSHOTS.home}
                priority
                className="animate-in fade-in zoom-in-95 duration-1000"
              />
            </div>
          </div>
        </section>

        {/* 2 ── TRUST STATS ──────────────────────────────────── */}
        <section className="relative border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: BRAND.downloads, l: "Downloads" },
              { v: `${BRAND.rating}★`, l: "Average rating" },
              { v: "50K+", l: "Titles covered" },
              { v: "2", l: "Galleries per title" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl lg:text-4xl font-extrabold text-white">{s.v}</div>
                <div className="text-sm text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 ── FEATURES ─────────────────────────────────────── */}
        <section id="features" className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>Everything you need</SectionTag>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Built for the way you decorate
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features wrapped in a clean, distraction-free interface.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-red-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 ── HOW IT WORKS ─────────────────────────────────── */}
        <section id="how" className="relative bg-white/[0.02] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-16">
              <SectionTag>Get started in seconds</SectionTag>
              <h2 className="text-4xl lg:text-5xl font-extrabold">How MovieWalls works</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative">
                  <div className="bg-white/5 p-7 rounded-3xl border border-white/10 h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className="grid place-items-center w-12 h-12 rounded-2xl bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-5xl font-black text-white/10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 ── SHOWCASE ─────────────────────────────────────── */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>A gallery you&apos;ll love</SectionTag>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Cinema-grade art, on your phone
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Full-screen previews, smooth swiping between posters and backdrops, and a
              beautiful dark interface that keeps the focus on the artwork.
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-center gap-8">
            <PhoneMockup screenshot={SCREENSHOTS.postersGrid} className="scale-90 opacity-80 hidden sm:block" />
            <PhoneMockup screenshot={SCREENSHOTS.backdropDetail} className="scale-110 z-10" />
            <PhoneMockup screenshot={SCREENSHOTS.posterDetail} className="scale-90 opacity-80 hidden sm:block" />
          </div>
        </section>

        {/* 5b ── MORE SCREENS GALLERY ────────────────────────── */}
        <section className="relative max-w-6xl mx-auto px-6 pb-24 lg:pb-32">
          <div className="grid grid-cols-3 gap-6">
            <ScreenCard screenshot={SCREENSHOTS.synopsis} label="Full details & synopsis" />
            <ScreenCard screenshot={SCREENSHOTS.favorites} label="Your Favorites library" />
            <ScreenCard screenshot={SCREENSHOTS.searchResults} label="Search with one-tap favoriting" />
          </div>
        </section>

        {/* 6 ── HIGHLIGHTS GRID ──────────────────────────────── */}
        <section className="relative bg-white/[0.02] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center px-4">
                  <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
                    <Icon className="w-7 h-7 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 ── POSTERS & BACKDROPS SPOTLIGHT ──────────────────── */}
        <section className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTag>Two galleries, every title</SectionTag>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                Posters &amp; backdrops, side by side
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Every movie and show comes with a dedicated gallery. Flip between tall
                poster art and wide cinematic backdrops, then tap to preview full-screen
                before you save.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ImageIcon, t: "Full poster galleries", d: "Every regional and alternate poster released for a title." },
                  { icon: Layers, t: "Wide-screen backdrops", d: "Cinematic scene art, perfect for landscape wallpapers." },
                  { icon: Download, t: "Download in HD", d: "Save the exact resolution the studio released, no compression." },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <div className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-red-500/10 border border-red-500/20">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{t}</div>
                      <div className="text-sm text-gray-400">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <PhoneMockup screenshot={SCREENSHOTS.posterDetail} />
            </div>
          </div>
        </section>

        {/* 8 ── SEARCH & FILTERS SPOTLIGHT ───────────────────── */}
        <section className="relative bg-white/[0.02] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <PhoneMockup screenshot={SCREENSHOTS.searchFilters} />
            </div>
            <div className="order-1 lg:order-2">
              <SectionTag>Find it fast</SectionTag>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                Search, then narrow it down
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Sort by popularity, restrict results to a region, target specific genre
                IDs or bound your search to a release date range, then apply and browse
                exactly what you were picturing.
              </p>
              <PlayButton />
            </div>
          </div>
        </section>

        {/* 9 ── PRICING ──────────────────────────────────────── */}
        <section id="pricing" className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>Simple pricing</SectionTag>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Free to browse. Pro to go further.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free and upgrade any time. Have a promo code? Redeem it in the app
              from the Offers screen or through Google Play.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-[32px] border ${
                  plan.featured
                    ? "bg-gradient-to-br from-red-600/15 to-transparent border-red-500/40 shadow-[0_0_60px_-15px_rgba(220,38,38,0.5)]"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.featured && (
                  <span className="absolute top-6 right-6 px-3 py-1 text-xs font-bold bg-red-600 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-red-400 shrink-0" />
                      <span className="text-sm">{perk}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BRAND.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 10 ── TESTIMONIALS ────────────────────────────────── */}
        <section className="relative bg-white/[0.02] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
            <div className="text-center mb-16">
              <SectionTag>Loved by collectors</SectionTag>
              <h2 className="text-4xl lg:text-5xl font-extrabold">
                Rated {BRAND.rating} by {BRAND.downloads} fans
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col"
                >
                  <Quote className="w-8 h-8 text-red-500/40 mb-4" />
                  <p className="text-gray-300 leading-relaxed flex-1">{t.text}</p>
                  <div className="flex items-center gap-1 mt-5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11 ── FAQ ─────────────────────────────────────────── */}
        <section id="faq" className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center mb-16">
            <SectionTag>Questions &amp; answers</SectionTag>
            <h2 className="text-4xl lg:text-5xl font-extrabold">Frequently asked</h2>
          </div>
          <Faq />
        </section>

        {/* 12 ── FINAL CTA ───────────────────────────────────── */}
        <section className="relative max-w-7xl mx-auto px-6 pb-28">
          <div className="relative overflow-hidden rounded-[40px] border border-red-500/20 bg-gradient-to-br from-red-600/20 via-red-900/10 to-transparent px-8 py-16 lg:py-24 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.25),transparent_60%)]" />
            <div className="relative flex flex-col items-center">
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 mb-8 rounded-[28px] overflow-hidden ring-1 ring-white/15 shadow-[0_0_60px_-10px_rgba(220,38,38,0.6)]">
                <NextImage
                  src={BRAND.logo}
                  alt={`${BRAND.name} app icon`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
                Start decorating tonight
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
                Download {BRAND.name} free and turn every screen into a piece of cinema.
              </p>
              <div className="flex justify-center">
                <PlayButton large />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 font-extrabold text-xl mb-4">
                <span className="relative grid place-items-center w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10">
                  <NextImage src={BRAND.logo} alt={`${BRAND.name} logo`} fill sizes="36px" className="object-cover" />
                </span>
                {BRAND.name}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {BRAND.shortDescription}
              </p>
            </div>

            {(
              [
                ["Product", FOOTER_LINKS.product],
                ["Legal", FOOTER_LINKS.legal],
              ] as const
            ).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()}{" "}
              <a
                href="https://codeinktechnologies.com/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BRAND.company}
              </a>
              . All rights reserved.
            </p>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              {BRAND.supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
