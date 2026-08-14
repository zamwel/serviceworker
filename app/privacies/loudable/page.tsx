import type { Metadata } from 'next';
import { Header, Footer, PageHeader, Section, MiniCard, ContactCta } from './shared';
import { APP } from './data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${APP.name} handles your documents and data.`,
  alternates: { canonical: APP.basePath },
};

type Row = { data: string; leaves: string; notes: string };

const CONTRACT: Row[] = [
  { data: 'Document file bytes', leaves: 'Never', notes: 'Not for parsing, OCR, narration, translation or summaries' },
  { data: 'Extracted text', leaves: 'Never', notes: 'Stored in a local database on your device only' },
  { data: 'Generated audio', leaves: 'Never', notes: 'Local files under the app’s own storage' },
  { data: 'Bookmarks, notes, highlights, positions', leaves: 'Never', notes: 'Local database only' },
  { data: 'Voice / pronunciation dictionary', leaves: 'Never', notes: 'Local database only' },
  { data: 'Listening history & stats', leaves: 'Never', notes: 'Local database only' },
  { data: 'Anonymous device ID', leaves: 'Yes', notes: 'Coupon redemption only' },
  { data: 'RevenueCat customer ID + purchase state', leaves: 'Yes', notes: 'Billing only' },
  { data: 'AdMob ad requests', leaves: 'Yes', notes: 'Only on the specific ad surfaces below, with consent gathered first' },
  { data: 'Push notification token', leaves: 'Yes', notes: 'Delivering optional notifications only' },
  { data: 'Catalog browse queries', leaves: 'Yes', notes: 'Only when you open Discover' },
  { data: 'Crash / analytics data', leaves: 'Not collected', notes: 'Not shipped in this version of the app' },
];

const SERVICES = [
  { title: 'On-device AI models', desc: 'Document parsing, OCR, layout understanding, narration, translation and summarisation all run locally on your phone. No document content is ever sent anywhere for processing.' },
  { title: 'Google AdMob', desc: 'Serves the rewarded ads you can optionally choose to watch. Pro subscribers never see an ad.' },
  { title: 'RevenueCat & Google Play Billing', desc: 'Verifies and restores your Pro subscription or lifetime purchase. We never see your card details.' },
  { title: 'Firebase Cloud Messaging', desc: 'Delivers optional push notifications, which you can disable at any time in system settings.' },
  { title: 'Codeink catalog & campaign services', desc: 'Power the optional Discover catalog and promo/coupon features. Used only when you actively browse Discover or redeem a code.' },
];

const CHOICES = [
  'Revoke camera or storage permissions at any time in your device settings — Loudable simply won’t be able to import or scan new documents until you grant them again.',
  'Reset your advertising ID from your device’s Google settings at any time.',
  'Delete any document, its audio, notes and history individually from your library, or clear everything from Settings.',
  'Uninstalling the app removes all locally stored documents, audio and history, unless you’ve chosen to keep your downloaded AI models in a folder you selected.',
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header active="privacy" />

      <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20">
        <PageHeader title="Privacy Policy" />

        <main className="space-y-14">
          <Section n="01" title="Introduction">
            <p>
              <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> ({APP.oneLiner}) is built by{' '}
              <strong style={{ color: 'var(--text)' }}>{APP.company}</strong>. This policy explains, in plain
              language, exactly what data the app handles and why.
            </p>
            <p>
              The short version: the documents you import and the audiobooks {APP.name} creates from them never
              leave your device. Everything below is the complete, specific list of what does.
            </p>
          </Section>

          <Section n="02" title="The privacy contract">
            <p className="mb-2">
              This table is a product guarantee, not marketing copy. If a change to the app ever requires adding a
              row that leaves the device, this policy will be updated first.
            </p>
            <div className="overflow-x-auto rounded-2xl" style={{ background: 'var(--surface)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--hairline)' }}>
                    <th className="text-left font-bold px-5 py-3.5" style={{ color: 'var(--text)' }}>Data</th>
                    <th className="text-left font-bold px-5 py-3.5" style={{ color: 'var(--text)' }}>Leaves device?</th>
                    <th className="text-left font-bold px-5 py-3.5" style={{ color: 'var(--text)' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRACT.map((r) => (
                    <tr key={r.data} style={{ borderBottom: '1px solid var(--hairline)' }}>
                      <td className="px-5 py-3.5 align-top" style={{ color: 'var(--text)' }}>{r.data}</td>
                      <td
                        className="px-5 py-3.5 align-top font-semibold whitespace-nowrap"
                        style={{ color: r.leaves === 'Never' || r.leaves === 'Not collected' ? 'var(--accent)' : 'var(--text-soft)' }}
                      >
                        {r.leaves}
                      </td>
                      <td className="px-5 py-3.5 align-top">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section n="03" title="How on-device processing works">
            <p>
              When you import a PDF, DOCX, EPUB, TXT or scanned image, {APP.name} runs a complete pipeline —
              parsing, OCR, layout recovery, language detection, chapter detection and narration — entirely on
              your phone’s hardware using local AI models. No page, sentence or word of your document is
              transmitted to any server at any point in that process, including when the app is offline. You can
              verify this yourself: turn on airplane mode and convert a document — it works exactly the same.
            </p>
          </Section>

          <Section n="04" title="Third-party services we use">
            <p className="mb-6">
              A small number of trusted services support the parts of the app that do need a network connection —
              billing, optional ads, optional push notifications, and the optional Discover catalog. None of them
              ever receive your document content.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => <MiniCard key={s.title} {...s} />)}
            </div>
          </Section>

          <Section n="05" title="Advertising">
            <p>
              The free tier of {APP.name} can optionally show a small number of rewarded ads — for example, to
              unlock 12 hours of Pro features. Ads only ever appear on two specific screens: the onboarding
              value-preview step, and the escape-hatch option on the paywall. Ads never interrupt playback, an
              in-progress conversion, or document import, and Pro subscribers never see an ad at all. Where
              required, consent for ad personalisation is gathered before any ad request is made.
            </p>
          </Section>

          <Section n="06" title="Your choices">
            <ul className="space-y-3 list-none">
              {CHOICES.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: 'var(--accent)' }} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="07" title="Children’s privacy">
            <p>
              {APP.name} is a productivity tool aimed at professionals and students and is not directed at
              children under 13. We do not knowingly collect personal information from children.
            </p>
          </Section>

          <Section n="08" title="Changes to this policy">
            <p>
              If this policy changes in a way that affects what data leaves your device, we’ll update the
              &ldquo;Last updated&rdquo; date above and, for material changes, surface a notice inside the app
              before the change takes effect.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}
