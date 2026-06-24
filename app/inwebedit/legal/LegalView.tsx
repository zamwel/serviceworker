'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { NavBar, Footer, Glow } from '../shared';
import { APP } from '../data';

const ACCENT       = '#2979FF';
const ACCENT_LIGHT = '#82B1FF';
const ACCENT_BG    = '#0D1F3C';

type TabId = 'privacy' | 'tos' | 'eula';

const TABS: { id: TabId; label: string }[] = [
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'tos',     label: 'Terms of Service' },
  { id: 'eula',    label: 'EULA' },
];

type Card = { title: string; desc: string };
type DataCard = Card & { ephemeral: boolean; storage: string };

// ── Privacy content ────────────────────────────────────────────────────────────

// ephemeral: true  = processed in memory only, never written to disk by this app
// ephemeral: false = actually persisted (on-device or by a third party)
const COLLECT: DataCard[] = [
  {
    title: 'Website content',
    desc: 'The HTML, CSS, and JavaScript of pages you visit are loaded into WebView memory so you can browse and edit them. The app never writes raw page content to disk.',
    ephemeral: true,
    storage: 'In WebView RAM only — discarded when the page closes',
  },
  {
    title: 'Page edits',
    desc: 'Text changes, image swaps, and formatting you apply exist in WebView memory. They are not persisted unless you explicitly export them.',
    ephemeral: true,
    storage: 'In WebView RAM only — discarded unless exported',
  },
  {
    title: 'Browsing history',
    desc: 'The URLs, page titles, favicons, and timestamps of sites you visit are stored locally on your device in app storage. This data is never sent to our servers.',
    ephemeral: false,
    storage: 'Persisted in app storage on your device',
  },
  {
    title: 'Exported files',
    desc: 'Screenshots, PDFs, HTML files, and text extracts you create are saved to your device storage. We do not receive, upload, or retain copies of your exports.',
    ephemeral: false,
    storage: 'Saved to device storage',
  },
  {
    title: 'Advertising identifiers',
    desc: 'The free version uses Google AdMob. AdMob processes your device\'s advertising ID to serve and measure ads. Pro removes all ads.',
    ephemeral: false,
    storage: 'Processed and stored by Google AdMob per Google\'s privacy policy',
  },
  {
    title: 'Purchase status',
    desc: 'We use RevenueCat to verify and restore your Pro subscription. RevenueCat receives your store account ID but not your payment or card details.',
    ephemeral: false,
    storage: 'Stored by RevenueCat and locally cached on device',
  },
  {
    title: 'Crash diagnostics',
    desc: 'Anonymous crash reports and technical diagnostics (OS version, device type, app version) may be collected to help us identify and fix bugs.',
    ephemeral: false,
    storage: 'Sent to and stored by our crash reporting service',
  },
  {
    title: 'Backend configuration (optional, Pro)',
    desc: 'If you configure a backend URL or API key in Settings, those credentials are stored locally on your device and sent only to the endpoint you specify.',
    ephemeral: false,
    storage: 'Persisted in app storage on your device',
  },
];

const USES: string[] = [
  'To load, display, and allow you to edit websites you navigate to',
  'To save your browsing history and exported files locally on your device',
  'To process, verify, and restore Pro purchases and subscriptions',
  'To show ads in the free version (completely removed by Pro)',
  'To diagnose crashes and improve app reliability',
  'To send edited page content to your own configured backend (only if you choose to)',
];

const PRIVACY_SERVICES: string[] = [
  'Google AdMob',
  'RevenueCat',
  'Google Play Billing',
  'html2canvas (client-side only)',
];

const USER_RIGHTS: Card[] = [
  {
    title: 'Access & portability',
    desc: 'Your history and exports are stored on your device. You can access, copy, or share them at any time directly from the app.',
  },
  {
    title: 'Deletion',
    desc: 'Delete individual history entries or exports from within the app at any time. Uninstalling the app removes all locally stored data from your device.',
  },
  {
    title: 'Advertising opt-out',
    desc: 'You can reset or opt out of interest-based advertising through your device\'s system settings. Upgrading to Pro removes all ads entirely.',
  },
  {
    title: 'Permissions',
    desc: 'Camera and photo-library permissions are used only when you explicitly choose to swap an image. You can revoke them at any time in your device\'s system settings.',
  },
];

// ── Terms of Service content ───────────────────────────────────────────────────

const TOS_ELIGIBILITY: Card[] = [
  {
    title: 'Age requirement',
    desc: 'You must be old enough to form a binding contract in your country and to use Google Play under its Terms of Service.',
  },
  {
    title: 'Your websites',
    desc: 'You are responsible for having the right to access and edit the content of the websites you load in InWebEdit. Do not use the app to infringe copyright or circumvent access controls.',
  },
  {
    title: 'Acceptable use',
    desc: 'InWebEdit may not be used for unlawful purposes, to violate the rights of others, or to transmit content that is fraudulent, defamatory, or harmful.',
  },
  {
    title: 'Accuracy of exports',
    desc: 'Exports reflect the current live state of the websites you edit. We do not guarantee the accuracy, completeness, or fitness for purpose of any exported content.',
  },
];

const SUBSCRIPTION_POINTS: string[] = [
  'Pro is sold as a monthly or annual auto-renewing subscription through Google Play',
  'Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period',
  'Manage or cancel your subscription any time in the Google Play Store under Subscriptions',
  'The exact local-currency price is always shown at checkout before any purchase is confirmed',
  'Promotional codes can be redeemed via the "Offers" screen in the app or through Google Play',
  'Earn 12 hours of free Pro access by completing the "Earn Pro Free" rewarded video flow',
];

const TOS_DISCLAIMER: Card[] = [
  {
    title: 'Service availability',
    desc: 'InWebEdit loads live public web pages. We do not guarantee availability or that any specific third-party website will be accessible or editable.',
  },
  {
    title: 'Export accuracy',
    desc: 'Screenshot and HTML export quality depends on the complexity of the website. Some cross-origin resources may not render in exports — the optional Puppeteer integration handles such cases.',
  },
  {
    title: 'Termination',
    desc: 'We may suspend or terminate access to InWebEdit if you materially breach these Terms. Sections on ownership, disclaimers, and liability survive termination.',
  },
];

// ── EULA content ───────────────────────────────────────────────────────────────

const EULA_RESTRICTIONS: Card[] = [
  {
    title: 'No redistribution',
    desc: 'You may not sell, rent, sublicense, transfer, or commercially exploit InWebEdit or any portion of it.',
  },
  {
    title: 'No reverse engineering',
    desc: 'You may not decompile, disassemble, or reverse engineer the application or attempt to derive its source code.',
  },
  {
    title: 'No circumvention',
    desc: 'You may not circumvent, disable, or interfere with any security, licensing, or access-control features of the app.',
  },
  {
    title: 'Third-party websites',
    desc: 'Use of InWebEdit to access and edit third-party websites must comply with those websites\' own terms of service and applicable law.',
  },
];

// ── Shared building blocks ────────────────────────────────────────────────────

function Intro({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section
      className="p-8 rounded-3xl"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <h2 className="text-2xl font-bold mb-5 text-white flex items-center gap-4">
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white shrink-0"
          style={{ background: ACCENT }}
        >
          {n}
        </span>
        {title}
      </h2>
      <p className="text-gray-300 leading-relaxed">{children}</p>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-2xl lg:text-3xl font-bold mb-7 text-white pl-6"
        style={{ borderLeft: `4px solid ${ACCENT}` }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="p-10 rounded-[32px]" style={{ background: ACCENT_BG }}>
      <h2 className="text-2xl font-bold mb-5 text-white">{title}</h2>
      {children}
    </section>
  );
}

function MiniCard({ title, desc }: Card) {
  return (
    <div
      className="p-6 rounded-2xl transition-colors"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <h3 className="text-base font-semibold mb-2.5" style={{ color: ACCENT_LIGHT }}>
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function DataMiniCard({ title, desc, ephemeral, storage }: DataCard) {
  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-3"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold" style={{ color: ACCENT_LIGHT }}>
          {title}
        </h3>
        <span
          className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={
            ephemeral
              ? { background: 'rgba(0,200,83,0.12)', color: '#00C853' }
              : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }
          }
        >
          {ephemeral ? 'Ephemeral' : 'Stored'}
        </span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      <p className="text-xs text-gray-600 leading-relaxed">{storage}</p>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_LIGHT }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LegalView({ initialTab }: { initialTab: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div className="min-h-screen text-white pb-20" style={{ background: '#08090D' }}>
      <Glow />
      <NavBar />

      <div className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36">

        {/* Header */}
        <header className="mb-10 text-center">
          <div
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full"
            style={{ background: `${ACCENT}14`, color: ACCENT_LIGHT }}
          >
            Legal
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white">
            {TABS.find((t) => t.id === tab)?.label}
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: <span className="text-gray-300 font-medium">{APP.lastUpdated}</span>
          </p>
        </header>

        {/* Tab switcher */}
        <div className="flex justify-center mb-14">
          <div
            className="inline-flex p-1 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-2.5 rounded-[14px] text-sm font-bold transition-all duration-200"
                style={
                  tab === t.id
                    ? { background: ACCENT, color: '#fff' }
                    : { color: 'rgba(255,255,255,0.4)' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="space-y-14 leading-relaxed">

          {/* ── PRIVACY POLICY ──────────────────────────────────────────── */}
          {tab === 'privacy' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-3 duration-500">

              <Intro n="01" title="Introduction">
                <strong>{APP.name}</strong> is a live website editor. We built it with a privacy-first
                approach: editing happens in your browser, history lives on your device, and exports stay
                with you. This policy explains the limited data we handle and how.
              </Intro>

              <Section title="What we handle">
                <p className="text-gray-500 text-xs mb-5 leading-relaxed">
                  <span className="font-bold" style={{ color: '#00C853' }}>Ephemeral</span> = processed in memory only, never written to disk by this app.{' '}
                  <span className="font-bold text-white/40">Stored</span> = persisted on your device or by a third-party service.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  {COLLECT.map((c, i) => <DataMiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="How information is used">
                <CheckList items={USES} />
              </Highlight>

              <Section title="What we do not collect">
                <CheckList items={[
                  'We do not collect, upload, or store the content of websites you browse',
                  'We do not read, copy, or upload the text you type or edits you make',
                  'We do not retain copies of your screenshots, PDFs, or HTML exports',
                  'We do not require an account and do not collect your name or email address',
                  'We do not sell or share your data with third parties for marketing purposes',
                ]} />
              </Section>

              <Section title="Third-party services">
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  We use a small number of trusted services to operate {APP.name}. Each processes only
                  the data necessary to perform its specific function.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {PRIVACY_SERVICES.map((s) => (
                    <span
                      key={s}
                      className="px-5 py-2 rounded-full text-sm font-medium text-gray-300"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <strong className="text-white">html2canvas</strong> runs entirely client-side within
                  the WebView and does not transmit any data externally.{' '}
                  <strong className="text-white">RevenueCat</strong> and{' '}
                  <strong className="text-white">Google Play Billing</strong> handle subscription
                  verification; neither service receives payment card information.{' '}
                  <strong className="text-white">Google AdMob</strong> operates under Google's privacy
                  policy; upgrading to Pro disables it entirely.
                </p>
              </Section>

              <Section title="Your rights &amp; choices">
                <div className="grid md:grid-cols-2 gap-5">
                  {USER_RIGHTS.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Section title="Children's privacy">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {APP.name} is not directed at children under 13. We do not knowingly collect personal
                  information from children. If you believe a child has provided us with personal
                  information, please contact us at{' '}
                  <a href={`mailto:${APP.email}`} className="underline" style={{ color: ACCENT_LIGHT }}>
                    {APP.email}
                  </a>{' '}
                  and we will delete it promptly.
                </p>
              </Section>

              <Section title="Changes to this policy">
                <p className="text-gray-400 text-sm leading-relaxed">
                  We may update this policy to reflect changes to our practices or applicable law. The
                  "Last updated" date at the top of this page reflects the most recent revision. Continued
                  use of {APP.name} after a revision constitutes acceptance of the updated policy.
                </p>
              </Section>

            </div>
          )}

          {/* ── TERMS OF SERVICE ────────────────────────────────────────── */}
          {tab === 'tos' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-3 duration-500">

              <Intro n="01" title="Agreement to terms">
                By downloading or using <strong>{APP.name}</strong> you agree to be bound by these Terms
                of Service and to our Privacy Policy. If you do not agree, please do not download or use
                the app.
              </Intro>

              <Section title="Eligibility &amp; your responsibilities">
                <div className="grid md:grid-cols-2 gap-5">
                  {TOS_ELIGIBILITY.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="Subscriptions &amp; billing">
                <CheckList items={SUBSCRIPTION_POINTS} />
              </Highlight>

              <Section title="Intellectual property">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {APP.name} and all related intellectual property — including but not limited to the app,
                  its source code, UI design, and brand — are owned by {APP.company} or its licensors and
                  are protected by applicable intellectual property law.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  These Terms do not grant you ownership of any part of {APP.name}. You receive only a
                  limited right to use the app as permitted by the EULA below.
                </p>
              </Section>

              <Section title="Third-party websites">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {APP.name} provides a browser and editing layer over third-party websites. We do not
                  control, endorse, or assume responsibility for any content, policies, or practices of
                  the websites you access. Your use of those websites is subject to their own terms and
                  applicable law.
                </p>
              </Section>

              <Section title="Disclaimers &amp; termination">
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  {TOS_DISCLAIMER.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND TO THE FULLEST EXTENT
                  PERMITTED BY APPLICABLE LAW. IN NO EVENT SHALL {APP.company.toUpperCase()} BE LIABLE
                  FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.
                </p>
              </Section>

              <Section title="Governing law">
                <p className="text-gray-400 text-sm leading-relaxed">
                  These Terms shall be governed by and construed in accordance with applicable laws.
                  If any provision is found unenforceable, the remaining provisions remain in full force.
                  Our failure to enforce any right is not a waiver of that right.
                </p>
              </Section>

            </div>
          )}

          {/* ── EULA ────────────────────────────────────────────────────── */}
          {tab === 'eula' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-3 duration-500">

              <Intro n="01" title="License grant">
                <strong>{APP.company}</strong> grants you a revocable, non-exclusive, non-transferable,
                limited license to download, install, and use <strong>{APP.name}</strong> on Android
                devices you own or control, strictly in accordance with this End User License Agreement
                and the Google Play Terms of Service.
              </Intro>

              <Section title="Restrictions">
                <div className="grid md:grid-cols-2 gap-5">
                  {EULA_RESTRICTIONS.map((c, i) => <MiniCard key={i} {...c} />)}
                </div>
              </Section>

              <Highlight title="Disclaimer of warranties">
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE APPLICATION IS PROVIDED "AS IS"
                  AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                  NON-INFRINGEMENT.
                </p>
                <CheckList items={[
                  'We do not warrant that the app will be error-free or uninterrupted',
                  'We do not warrant that websites you access will be editable or that exports will be accurate',
                  'We do not warrant that the app will be compatible with every device or Android version',
                ]} />
              </Highlight>

              <Section title="Limitation of liability">
                <p className="text-gray-400 text-sm leading-relaxed">
                  To the maximum extent permitted by law, {APP.company} and its affiliates, officers,
                  employees, and licensors shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages — including loss of data, revenue, or profits —
                  arising from your use of or inability to use the application, even if we have been
                  advised of the possibility of such damages.
                </p>
              </Section>

              <Section title="Updates &amp; termination">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  We may release updates to {APP.name} at any time. Updates may change functionality or
                  remove features. Continued use after an update constitutes acceptance of the revised
                  version of the app and this EULA.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This license is effective until terminated. It terminates automatically if you fail to
                  comply with any provision of this agreement. Upon termination you must uninstall and
                  destroy all copies of the application in your possession.
                </p>
              </Section>

              <Section title="Severability">
                <p className="text-gray-400 text-sm leading-relaxed">
                  If any provision of this EULA is held to be unenforceable or invalid, that provision
                  will be modified to the minimum extent necessary to make it enforceable, and the
                  remaining provisions will continue in full force and effect.
                </p>
              </Section>

            </div>
          )}

          {/* Contact footer */}
          <section
            className="border-t pt-14 text-center"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Questions?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              If you have any questions about this document or how we handle your data, reach out
              and we will respond promptly.
            </p>
            <a
              href={`mailto:${APP.email}`}
              className="inline-flex items-center justify-center px-9 py-4 text-white font-bold rounded-2xl transition-all duration-200 hover:scale-[1.02]"
              style={{ background: ACCENT }}
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
