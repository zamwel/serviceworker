import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Film, Users, Globe, Rocket } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${BRAND.name} by ${BRAND.company} and our mission to make movies and TV effortless to watch anywhere.`,
  alternates: { canonical: `${BRAND.basePath}/about` },
};

const VALUES = [
  { icon: Film, title: "Watching, simplified", desc: "We obsess over a player that just works. Tap a title and it plays, no clutter, no friction." },
  { icon: Globe, title: "For everyone, everywhere", desc: "Multi-language subtitles and audio so great stories aren't limited by where you live." },
  { icon: Users, title: "Built with our community", desc: "Features are shaped by real feedback from the people who use Muvees every day." },
  { icon: Rocket, title: "Always improving", desc: "Frequent updates bring faster playback, new sources and a smoother experience." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-24 lg:pt-32">
        <Link href={BRAND.basePath} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Our Story
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            About {BRAND.name}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {BRAND.description}
          </p>
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 lg:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Our mission</h2>
            <p className="mb-4">
              {BRAND.name} was created by <strong>{BRAND.company}</strong> with one goal:
              make watching movies and TV shows effortless. No tangled menus, no endless
              redirects. Just a clean, fast player that puts the story first.
            </p>
            <p>
              Whether you&apos;re streaming the latest release on the couch or watching a
              downloaded film 30,000 feet in the air, Muvees is designed to get out of the
              way and let you enjoy the show.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              What we stand for
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="grid place-items-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Ready to watch?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Join hundreds of thousands of viewers enjoying movies and TV on {BRAND.name}.
            </p>
            <a
              href={BRAND.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              Get {BRAND.name} on Google Play
            </a>
          </section>
        </main>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND.company}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
