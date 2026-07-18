'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
  { title: 'Photos & documents (on device)', desc: 'Photos, scans and PDFs you open are processed and stored on your device. They are not uploaded to our servers.' },
  { title: 'Permissions', desc: 'Camera and photo library access are used only for the file you choose to open — nothing is accessed in the background.' },
  { title: 'Advertising data', desc: 'The free tier uses Google AdMob, which may process device identifiers to serve and measure ads.' },
  { title: 'Purchase status', desc: 'Via Google Play Billing and RevenueCat we learn whether you have Pro, but never your card or payment details.' },
  { title: 'Push notifications', desc: 'Firebase Cloud Messaging delivers optional notifications (e.g. offers); you can disable these in system settings at any time.' },
];

const USES: string[] = [
  'To run on-device photo restoration, colorization, enhancement, upscaling and erasing',
  'To enable, verify and restore your Pro purchase',
  'To show ads in the free tier (removed entirely by Pro)',
  'To send optional notifications you can turn off at any time',
];

const SERVICES = ['On-device AI models (no cloud inference)', 'Google AdMob', 'RevenueCat', 'Google Play Billing', 'Firebase Cloud Messaging'];

const TOS_USE: Card[] = [
  { title: 'Eligibility', desc: 'You must be old enough to form a binding contract in your country and to use Google Play.' },
  { title: 'Your photos', desc: 'You keep full ownership of your photos and are responsible for having the right to edit and share them.' },
  { title: 'Acceptable use', desc: 'Do not use IILuk for unlawful purposes or to infringe the rights of others, including to alter photos of people without their consent.' },
];

const EULA_RESTRICTIONS: Card[] = [
  { title: 'No redistribution', desc: 'You may not sell, rent, sublicense or commercially exploit the application.' },
  { title: 'No reverse engineering', desc: 'You may not decompile, reverse engineer, or attempt to extract the underlying AI models for use outside the app.' },
];

export default function LegalView({ initialTab }: { initialTab: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div className="min-h-screen pb-20">
      <Glow />
      <NavBar />

      <div className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36">
        <header className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--gold-deep)' }}>Legal</p>
          <h1 className="iiluk-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.1] mb-5" style={{ textWrap: 'balance' }}>
            {TABS.find((t) => t.id === tab)?.label}
          </h1>
          <p style={{ color: 'var(--text-soft)' }}>
            Last updated: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{APP.lastUpdated}</span>
          </p>
        </header>

        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 rounded-2xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-2.5 rounded-[14px] text-sm font-bold transition-colors"
                style={tab === t.id
                  ? { background: 'var(--gold)', color: 'var(--ink)' }
                  : { color: 'var(--text-soft)' }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <main className="space-y-14 leading-relaxed" style={{ color: 'var(--text-soft)' }}>
          {tab === 'privacy' && (
            <div className="space-y-14">
              <Intro n="01" title="Introduction">
                <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> respects your privacy. The app restores,
                colorizes and enhances your photos using AI models that run entirely on your device. This policy
                explains what data is handled and how.
              </Intro>

              <Section title="What we handle">
                <div className="grid md:grid-cols-2 gap-5">
                  {COLLECT.map((c) => <MiniCard key={c.title} {...c} />)}
                </div>
              </Section>

              <Highlight title="How information is used">
                <CheckList items={USES} />
              </Highlight>

              <Section title="Third-party services">
                <p className="mb-6">We use a small number of trusted services to operate the app:</p>
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((s) => (
                    <span
                      key={s}
                      className="px-5 py-2 rounded-full text-sm font-medium"
                      style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="Your choices">
                <p>
                  Revoke camera or photo permissions in system settings, reset your advertising ID, and delete any
                  edit history in the app at any time. Uninstalling removes all locally stored data, unless you
                  chose to back up your AI models to a folder you selected.
                </p>
              </Section>
            </div>
          )}

          {tab === 'tos' && (
            <div className="space-y-14">
              <Intro n="01" title="Agreement to terms">
                By using <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> you agree to these Terms. If
                you disagree with any part, please do not use the app.
              </Intro>

              <Section title="Using the service">
                <div className="space-y-5">
                  {TOS_USE.map((c) => <MiniCard key={c.title} {...c} />)}
                </div>
              </Section>

              <Highlight title="Subscriptions & billing">
                <p>
                  Pro is offered as auto-renewing monthly and annual subscriptions, and a one-time lifetime
                  purchase, through Google Play. Subscriptions renew unless cancelled at least 24 hours before
                  the period ends and can be managed in Google Play. Prices are shown in your local currency at
                  checkout. Promo and offer codes can be redeemed via &ldquo;Redeem a code&rdquo; in the app, and a
                  free 12-hour Pro trial can be unlocked by watching a short ad.
                </p>
              </Highlight>

              <Section title="Disclaimer & termination">
                <p>
                  AI restoration, colorization and enhancement results are provided &ldquo;as is&rdquo; and may vary
                  in quality depending on the source photo. We may suspend access for breach of these Terms.
                </p>
              </Section>
            </div>
          )}

          {tab === 'eula' && (
            <div className="space-y-14">
              <Intro n="01" title="License grant">
                <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> grants you a revocable,
                non-exclusive, non-transferable, limited license to download, install and use the application in
                accordance with this agreement and the Google Play terms.
              </Intro>

              <Section title="Restrictions">
                <div className="grid md:grid-cols-2 gap-5">
                  {EULA_RESTRICTIONS.map((c) => <MiniCard key={c.title} {...c} />)}
                </div>
              </Section>

              <Highlight title="Disclaimer of warranties">
                <p className="text-sm italic">
                  THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF
                  ANY KIND TO THE EXTENT PERMITTED BY LAW.
                </p>
              </Highlight>

              <Section title="Limitation of liability">
                <p>
                  To the maximum extent permitted by law, {APP.name} shall not be liable for any indirect,
                  incidental or consequential damages arising from your use of the application.
                </p>
              </Section>
            </div>
          )}

          <section className="pt-14 text-center" style={{ borderTop: '1px solid var(--hairline)' }}>
            <h2 className="iiluk-serif text-2xl mb-4" style={{ color: 'var(--text)' }}>Questions?</h2>
            <p className="mb-7 max-w-md mx-auto">Reach out and we&rsquo;ll be glad to help.</p>
            <a
              href={`mailto:${APP.email}`}
              className="inline-flex items-center justify-center px-9 py-4 font-bold rounded-2xl transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
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
    <section className="rounded-3xl p-8" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
      <h2 className="text-xl font-bold mb-5 flex items-center" style={{ color: 'var(--text)' }}>
        <span
          className="iiluk-serif w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm"
          style={{ background: 'var(--gold)', color: 'var(--ink)' }}
        >
          {n}
        </span>
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="iiluk-serif text-2xl mb-6" style={{ color: 'var(--text)' }}>{title}</h2>
      {children}
    </section>
  );
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] p-10" style={{ background: 'var(--ink)', color: 'var(--gold-pale)' }}>
      <h2 className="iiluk-serif text-2xl mb-5">{title}</h2>
      <div className="opacity-90">{children}</div>
    </section>
  );
}

function MiniCard({ title, desc }: Card) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'var(--surface-2)' }}>
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--gold-deep)' }}>{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 list-none">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <FontAwesomeIcon icon={faCheck} className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--gold)' }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
