'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { NavBar, Footer, Glow } from '../shared';
import { APP } from '../data';

type TabId = 'privacy' | 'tos' | 'eula';

const TABS: { id: TabId; label: string }[] = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'tos', label: 'Terms of Service' },
  { id: 'eula', label: 'EULA' },
];

type Card = { title: string; desc: string };

const COLLECT: Card[] = [
  { title: 'Documents (on device)', desc: 'The images, PDFs, videos and text you import are processed and stored locally. They are not uploaded to our servers.' },
  { title: 'Permissions', desc: 'Camera and photo access are used only to import the files you choose to scan or open.' },
  { title: 'Advertising data', desc: 'The free version uses Google AdMob, which may process device identifiers to serve and measure ads.' },
  { title: 'Purchase status', desc: 'Via Google Play and RevenueCat we learn whether you have Pro, but never your card or payment details.' },
];

const USES: string[] = [
  'To provide on‑device OCR, editing, search and export',
  'To enable and restore your purchases',
  'To show ads in the free version (removed by Pro)',
  'To diagnose crashes and improve reliability',
];

const SERVICES = ['Google ML Kit (on‑device)', 'Google AdMob', 'RevenueCat', 'Google Play Billing'];

const TOS_USE: Card[] = [
  { title: 'Eligibility', desc: 'You must be old enough to form a binding contract in your country and to use Google Play.' },
  { title: 'Your content', desc: 'You keep ownership of your documents and are responsible for having the right to scan and edit them.' },
  { title: 'Acceptable use', desc: 'Do not use the app for unlawful purposes or to infringe the rights of others.' },
];

const EULA_RESTRICTIONS: Card[] = [
  { title: 'No redistribution', desc: 'You may not sell, rent, sublicense or commercially exploit the application.' },
  { title: 'No reverse engineering', desc: 'You may not decompile, reverse engineer or attempt to derive the source code.' },
];

export default function LegalView({ initialTab }: { initialTab: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-red-600/30 pb-20">
      <Glow />
      <NavBar />

      <div className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36">
        <header className="mb-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Legal
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            {TABS.find((t) => t.id === tab)?.label}
          </h1>
          <p className="text-gray-400">
            Last updated: <span className="text-white font-medium">{APP.lastUpdated}</span>
          </p>
        </header>

        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-[14px] text-sm font-bold transition-all duration-300 ${
                  tab === t.id
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <main className="space-y-14 text-gray-300 leading-relaxed">
          {tab === 'privacy' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Intro n="01" title="Introduction">
                <strong>{APP.name}</strong> respects your privacy. The app turns your photos, PDFs and videos into
                editable text. This policy explains what data is handled and how.
              </Intro>

              <Section title="What we handle">
                <div className="grid md:grid-cols-2 gap-6">
                  {COLLECT.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="How information is used">
                <CheckList items={USES} />
              </Highlight>

              <Section title="Third‑party services">
                <p className="mb-6">We use a small number of trusted services to operate the app:</p>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((s) => (
                    <span key={s} className="px-5 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10 text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="Your choices">
                <p>
                  Revoke camera/photo permissions in system settings, reset your advertising ID, and delete documents
                  in the app at any time. Uninstalling removes locally stored data.
                </p>
              </Section>
            </div>
          )}

          {tab === 'tos' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Intro n="01" title="Agreement to terms">
                By using <strong>{APP.name}</strong> you agree to these Terms. If you disagree with any part, please do
                not use the app.
              </Intro>

              <Section title="Using the service">
                <div className="space-y-6">
                  {TOS_USE.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="Subscriptions & billing">
                <p>
                  Pro is offered as auto‑renewing monthly and annual subscriptions, and a one‑time lifetime purchase,
                  through Google Play. Subscriptions renew unless cancelled at least 24 hours before the period ends and
                  can be managed in Google Play. Prices are shown in your local currency at checkout. Promo and offer
                  codes can be redeemed via the “Redeem a code” option in the app.
                </p>
              </Highlight>

              <Section title="Disclaimer & termination">
                <p>
                  OCR and exports are provided “as is” and may contain inaccuracies, so always verify important results.
                  We may suspend access for breach of these Terms.
                </p>
              </Section>
            </div>
          )}

          {tab === 'eula' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Intro n="01" title="License grant">
                <strong>{APP.name}</strong> grants you a revocable, non‑exclusive, non‑transferable, limited license to
                download, install and use the application in accordance with this agreement and the Google Play terms.
              </Intro>

              <Section title="Restrictions">
                <div className="grid md:grid-cols-2 gap-6">
                  {EULA_RESTRICTIONS.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="Disclaimer of warranties">
                <p className="text-sm italic">
                  THE APPLICATION IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTY OF ANY KIND TO THE EXTENT
                  PERMITTED BY LAW.
                </p>
              </Highlight>

              <Section title="Limitation of liability">
                <p>
                  To the maximum extent permitted by law, {APP.name} shall not be liable for any indirect, incidental or
                  consequential damages arising from your use of the application.
                </p>
              </Section>
            </div>
          )}

          <section className="border-t border-white/10 pt-14 text-center">
            <h2 className="text-3xl font-bold mb-5 text-white">Questions?</h2>
            <p className="text-gray-400 mb-7 max-w-md mx-auto">Reach out and we’ll be glad to help.</p>
            <a
              href={`mailto:${APP.email}`}
              className="inline-flex items-center justify-center px-9 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              Contact {APP.name}
            </a>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Intro({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
      <h2 className="text-2xl font-bold mb-5 text-white flex items-center">
        <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">{n}</span>
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl lg:text-3xl font-bold mb-7 text-white border-l-4 border-red-600 pl-6">{title}</h2>
      {children}
    </section>
  );
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
      <h2 className="text-2xl font-bold mb-5 text-white">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, desc }: Card) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
      <h3 className="text-lg font-semibold mb-2.5 text-red-400">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
