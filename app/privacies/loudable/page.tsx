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
  { data: 'Backups and exports', leaves: 'Only when you choose a destination', notes: 'May contain your local database, downloaded models, source files and generated audio' },
  { data: 'Bookmarks, notes, highlights, positions', leaves: 'Never', notes: 'Local database only' },
  { data: 'Voice / pronunciation dictionary', leaves: 'Never', notes: 'Local database only' },
  { data: 'Listening history & stats', leaves: 'Never', notes: 'Local database only' },
  { data: 'Ad points and reward history', leaves: 'Never', notes: 'Stored locally to manage rewarded-ad eligibility and usage' },
  { data: 'Anonymous device ID', leaves: 'Yes', notes: 'Coupon redemption only' },
  { data: 'RevenueCat customer ID + purchase state', leaves: 'Yes', notes: 'Billing only' },
  { data: 'AdMob ad requests', leaves: 'Yes', notes: 'Only on the specific ad surfaces below, with consent gathered first' },
  { data: 'Push notification token', leaves: 'Yes', notes: 'Delivering optional notifications only' },
  { data: 'Catalog browse queries', leaves: 'Yes', notes: 'Only when you open Discover' },
  { data: 'Crash / analytics data', leaves: 'Not collected', notes: 'Not shipped in this version of the app' },
];

const SERVICES = [
  { title: 'On-device AI models', desc: 'Document parsing, OCR, layout understanding, narration, translation and summarisation all run locally on your phone. No document content is ever sent anywhere for processing.' },
  { title: 'Google AdMob', desc: 'Serves rewarded ads you choose to watch. Depending on your consent choices, Google may process advertising identifiers and device signals to deliver or measure an ad. Document content is never included.' },
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
              The free tier can show rewarded ads at clear opt-in points, such as before an import, after a chapter
              conversion, from the paywall, or during a long listening session. A rewarded ad must finish
              successfully before points are granted; a skipped or failed ad grants nothing. The app spaces these
              opportunities so ads are not continuously shown, and playback resumes after a deliberately paused
              ad has closed. Pro subscribers do not see rewarded ads. Where required, consent for ad
              personalisation is gathered before any ad request is made.
            </p>
          </Section>

          <Section n="06" title="Storage, backups and deletion">
            <p>
              Loudable stores imported documents, extracted text, transcripts, summaries, downloaded models and
              generated audio in app-managed local storage. A backup is not automatic cloud sync: it is an archive
              created only when you start it and saved to the destination you select. Because a backup can contain
              the same material as your library, protect and delete exported backup files as you would the originals.
            </p>
          </Section>

          <Section n="07" title="Your choices">
            <ul className="space-y-3 list-none">
              {CHOICES.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: 'var(--accent)' }} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="08" title="Permissions and children’s privacy">
            <p>
              Camera, notification and file-access permissions are requested only when their related feature is
              used. You can deny or revoke them in Android settings. {APP.name} is a productivity tool aimed at
              professionals and students and is not directed at children under 13. We do not knowingly collect
              personal information from children.
            </p>
          </Section>

          <Section n="09" title="Security and changes">
            <p>
              Local files are protected by the operating system’s app storage controls, but no device storage is
              risk-free. Use a device lock and keep exported backups protected. If this policy changes in a way
              that affects what data leaves your device, we’ll update the “Last updated” date above and, for
              material changes, surface a notice inside the app before the change takes effect.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}
