import type { Metadata } from 'next';
import { Header, Footer, PageHeader, Section, MiniCard, ContactCta } from '../shared';
import { APP } from '../data';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern your use of ${APP.name}.`,
  alternates: { canonical: `${APP.basePath}/tos` },
};

const USE_TERMS = [
  { title: 'Eligibility', desc: 'You must be old enough to form a binding contract in your country and to use Google Play or the App Store.' },
  { title: 'Your documents', desc: 'You keep full ownership of everything you import. You’re responsible for having the right to have that document read aloud, translated or summarised.' },
  { title: 'Acceptable use', desc: 'Don’t use Loudable for unlawful purposes, to infringe someone else’s copyright, or to process documents you don’t have the right to possess or process.' },
];

const FREE_LIMITS = [
  '3 audiobook conversions per day',
  'Documents up to 40 pages per conversion',
  '2 standard voices',
  'Standard export and playback',
];

const PRO_BENEFITS = [
  'Unlimited conversions and unlimited document length',
  'The full premium voice library, offline translation and AI summaries',
  'A pronunciation dictionary, M4B/MP3 export, and overnight batch conversion',
  'No ads, ever',
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pb-20">
      <Header active="tos" />

      <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20">
        <PageHeader title="Terms of Service" />

        <main className="space-y-14">
          <Section n="01" title="Agreement to these terms">
            <p>
              By downloading or using <strong style={{ color: 'var(--text)' }}>{APP.name}</strong>, you agree to
              be bound by these Terms of Service. If you don’t agree with any part of them, please don’t use the
              app.
            </p>
          </Section>

          <Section n="02" title="Using the service">
            <div className="grid gap-4">
              {USE_TERMS.map((t) => <MiniCard key={t.title} {...t} />)}
            </div>
          </Section>

          <Section n="03" title="Free tier and Pro">
            <p className="mb-5">
              {APP.name} is free to use with the following limits. A Pro subscription or lifetime purchase removes
              them entirely.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Free includes</h3>
                <ul className="space-y-2 text-sm">
                  {FREE_LIMITS.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Pro adds</h3>
                <ul className="space-y-2 text-sm">
                  {PRO_BENEFITS.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </div>
            </div>
          </Section>

          <Section n="04" title="Subscriptions & billing">
            <p>
              Pro is offered as auto-renewing monthly and annual subscriptions, and a one-time lifetime purchase,
              billed through Google Play (and the App Store, once available on iOS). The annual plan may include a
              7-day free trial. Subscriptions renew automatically unless cancelled at least 24 hours before the
              current period ends, and can be managed or cancelled at any time from your Google Play or App Store
              account. Prices are shown in your local currency at checkout.
            </p>
            <p>
              You can also unlock 12 hours of Pro access for free by watching a short set of rewarded ads, offered
              only at specific points in onboarding and on the paywall — this never requires payment information.
              Promo and offer codes, where issued, can be redeemed from the Offers screen in the app.
            </p>
          </Section>

          <Section n="05" title="Disclaimer">
            <p>
              Document parsing, OCR, narration, translation and summarisation are provided &ldquo;as is.&rdquo;
              Quality can vary depending on the source document — scan quality, unusual layouts, or heavily
              stylised text may affect results. {APP.name} is a productivity aid, not a substitute for reading a
              document yourself where accuracy is critical, such as legal or medical material.
            </p>
          </Section>

          <Section n="06" title="Termination">
            <p>
              We may suspend or terminate access to the service for breach of these Terms. You can stop using the
              app and uninstall it at any time; your locally stored documents and audio are removed with the app
              unless you’ve backed them up yourself.
            </p>
          </Section>

          <Section n="07" title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, {APP.company} is not liable for any indirect, incidental or
              consequential damages arising from your use of {APP.name}, including from reliance on AI-generated
              narration, translation or summaries.
            </p>
          </Section>

          <Section n="08" title="Changes to these terms">
            <p>
              We may update these Terms from time to time. Continuing to use {APP.name} after a change takes
              effect means you accept the updated Terms.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}
