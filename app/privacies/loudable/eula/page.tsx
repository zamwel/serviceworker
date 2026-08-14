import type { Metadata } from 'next';
import { Header, Footer, PageHeader, Section, MiniCard, ContactCta } from '../shared';
import { APP } from '../data';

export const metadata: Metadata = {
  title: 'EULA',
  description: `The end user license agreement for ${APP.name}.`,
  alternates: { canonical: `${APP.basePath}/eula` },
};

const RESTRICTIONS = [
  { title: 'No redistribution', desc: 'You may not sell, rent, sublicense or otherwise commercially exploit the application itself.' },
  { title: 'No reverse engineering', desc: 'You may not decompile, reverse engineer, disassemble, or attempt to extract the on-device AI models for use outside the app.' },
];

export default function EulaPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header active="eula" />

      <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20">
        <PageHeader title="End User License Agreement" />

        <main className="space-y-14">
          <Section n="01" title="License grant">
            <p>
              <strong style={{ color: 'var(--text)' }}>{APP.company}</strong> grants you a revocable,
              non-exclusive, non-transferable, limited license to download, install and use{' '}
              <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> on a device you own or control, strictly
              in accordance with this Agreement and the terms of the app store you downloaded it from.
            </p>
          </Section>

          <Section n="02" title="Your content stays yours">
            <p>
              This license covers the application itself — not the documents you import. You retain full
              ownership of every document, and the audiobooks {APP.name} generates from them, at all times.
            </p>
          </Section>

          <Section n="03" title="Restrictions">
            <div className="grid sm:grid-cols-2 gap-4">
              {RESTRICTIONS.map((r) => <MiniCard key={r.title} {...r} />)}
            </div>
          </Section>

          <Section n="04" title="On-device AI models">
            <p>
              The AI models {APP.name} downloads to your device for parsing, OCR, narration, translation and
              summarisation are licensed for use within the app only. They may not be extracted, copied, or used
              in any other application or context.
            </p>
          </Section>

          <Section n="05" title="Disclaimer of warranties">
            <p className="text-sm italic">
              THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTY OF
              ANY KIND, TO THE EXTENT PERMITTED BY LAW.
            </p>
          </Section>

          <Section n="06" title="Limitation of liability">
            <p>
              To the maximum extent permitted by applicable law, {APP.company} shall not be liable for any
              special, incidental, indirect, or consequential damages whatsoever arising from your use of, or
              inability to use, {APP.name}.
            </p>
          </Section>

          <Section n="07" title="Termination">
            <p>
              This license is effective until terminated. It terminates automatically if you fail to comply with
              any of its terms, or when you uninstall the application.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}
