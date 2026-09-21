import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Binary,
  Clapperboard,
  CreditCard,
  FilePenLine,
  Flame,
  Headphones,
  HeartPulse,
  ScanText,
} from 'lucide-react';
import type { ReactNode } from 'react';

type AppEntry = {
  name: string;
  category: string;
  description: string;
  href: string;
  accent: string;
  logo: ReactNode;
  linkLabel?: string;
};

const apps: AppEntry[] = [
  {
    name: 'Bet of the Day',
    category: 'Sports analytics',
    description: 'AI-powered football predictions and match insights.',
    href: '/btd',
    accent: '#f97316',
    logo: <Flame className="h-7 w-7 text-white" aria-hidden="true" />,
  },
  {
    name: 'IILuk',
    category: 'Photo enhancement',
    description: 'Restore, colorize, enhance and clean up your photos.',
    href: '/iiluk',
    accent: '#7c3aed',
    logo: <Image src="/iiluk/logo.png" alt="" width={52} height={52} className="h-full w-full rounded-[14px] object-cover" />,
  },
  {
    name: 'InDocEdit',
    category: 'Document editing',
    description: 'Turn scans, PDFs and videos into editable documents.',
    href: '/indocedit',
    accent: '#10b981',
    logo: <Image src="/indocedit/logo.png" alt="" width={52} height={52} className="h-full w-full rounded-[14px] object-cover" />,
  },
  {
    name: 'InWebEdit',
    category: 'Web editing',
    description: 'Load any website and edit it live from your phone.',
    href: '/inwebedit',
    accent: '#2979ff',
    logo: <span className="text-lg font-black tracking-[-0.08em] text-white">iW</span>,
  },
  {
    name: 'Loudable',
    category: 'Audiobook studio',
    description: 'Turn any document into a studio-quality audiobook.',
    href: '/loudable',
    accent: '#d97706',
    logo: <Headphones className="h-7 w-7 text-white" aria-hidden="true" />,
  },
  {
    name: 'BinMatrix',
    category: 'Card intelligence',
    description: 'Look up bank identification numbers and organize your BIN history.',
    href: '/privacies/binmatrix',
    accent: '#0f766e',
    logo: <Binary className="h-7 w-7 text-white" aria-hidden="true" />,
    linkLabel: 'View privacy policy',
  },
  {
    name: 'FemCare+',
    category: 'Women’s wellness',
    description: 'Cycle tracking, wellness guidance and supportive health tools for women.',
    href: '/privacies/femcareplus',
    accent: '#e91e63',
    logo: <HeartPulse className="h-7 w-7 text-white" aria-hidden="true" />,
    linkLabel: 'Open app page',
  },
  {
    name: 'Muvees',
    category: 'Movies & TV',
    description: 'Stream and download movies and TV shows with subtitles and offline playback.',
    href: '/privacies/muvees',
    accent: '#dc2626',
    logo: <Clapperboard className="h-7 w-7 text-white" aria-hidden="true" />,
    linkLabel: 'Open app page',
  },
  {
    name: 'PDF Annotator Pro',
    category: 'PDF tools',
    description: 'Read, annotate and sign PDF documents directly on your device.',
    href: '/privacies/pdfannotator',
    accent: '#0175c2',
    logo: <FilePenLine className="h-7 w-7 text-white" aria-hidden="true" />,
    linkLabel: 'View privacy policy',
  },
  {
    name: 'SubsWatcher',
    category: 'Subscription tracking',
    description: 'Keep your subscriptions, renewal dates and recurring costs organized.',
    href: '/privacies/subswatcher',
    accent: '#4f46e5',
    logo: <CreditCard className="h-7 w-7 text-white" aria-hidden="true" />,
    linkLabel: 'View privacy policy',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f5] text-[#171717]">
      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <header className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Codeink apps home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#171717] text-white shadow-lg shadow-black/10">
              <ScanText className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight">Codeink Apps</span>
          </Link>
          <span className="hidden text-sm font-medium text-black/45 sm:block">Made for better everyday workflows</span>
        </header>

        <section className="relative max-w-3xl pb-16 pt-24 sm:pb-20 sm:pt-32">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-black/45">Our apps</p>
          <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl">
            Thoughtful tools for the way you work and play.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/55 sm:text-xl">
            Explore the Codeink Technologies app collection. Choose an app below to visit its homepage and learn more.
          </p>
        </section>

        <section aria-label="Apps" className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <Link
              key={app.href}
              href={app.href}
              className="group flex min-h-64 flex-col justify-between rounded-[28px] border border-black/[0.07] bg-white/80 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.04)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div>
                <span
                  className="mb-8 flex h-[52px] w-[52px] items-center justify-center rounded-[16px] shadow-sm"
                  style={{ backgroundColor: app.accent }}
                >
                  {app.logo}
                </span>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-black/40">{app.category}</p>
                <h2 className="text-2xl font-extrabold tracking-tight">{app.name}</h2>
                <p className="mt-3 max-w-xs leading-6 text-black/55">{app.description}</p>
              </div>
              <span className="mt-8 flex items-center gap-2 text-sm font-bold">
                {app.linkLabel ?? 'Visit homepage'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </section>

        <footer className="relative mt-16 border-t border-black/[0.08] pt-6 text-sm text-black/40 sm:mt-20">
          Copyright {new Date().getFullYear()} Codeink Technologies
        </footer>
      </div>
    </main>
  );
}
