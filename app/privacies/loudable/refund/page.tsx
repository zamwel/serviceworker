import type { Metadata } from 'next';
import { Header, Footer, PageHeader, Section, MiniCard, ContactCta } from '../shared';
import { APP } from '../data';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: `How refunds work for ${APP.name} Pro subscriptions and lifetime purchases.`,
  alternates: { canonical: `${APP.basePath}/refund` },
};

const PURCHASE_TYPES = [
  { title: 'Monthly & annual subscriptions', desc: 'Billed on a recurring basis through Google Play. The annual plan includes a 7-day free trial — cancel before it ends and you won’t be charged.' },
  { title: 'Lifetime purchase', desc: 'A single, non-recurring payment through Google Play that unlocks Pro permanently — there’s nothing to cancel afterward.' },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header active="refund" />

      <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20">
        <PageHeader title="Refund Policy" />

        <main className="space-y-14">
          <Section n="01" title="Overview">
            <p>
              Every {APP.name} purchase — monthly, annual, or lifetime — is processed by Google Play (and, once
              available, the App Store on iOS). Refunds are handled primarily through that store&rsquo;s own
              policies, since they hold your payment details; {APP.name} and {APP.company} never see your card
              information at all.
            </p>
          </Section>

          <Section n="02" title="What you’re buying">
            <div className="grid sm:grid-cols-2 gap-4">
              {PURCHASE_TYPES.map((p) => <MiniCard key={p.title} {...p} />)}
            </div>
          </Section>

          <Section n="03" title="Refunds through Google Play">
            <p>
              Google generally allows a refund request within 48 hours of a purchase directly from the Play Store
              app, no questions asked. Outside that window, Google may still grant a refund at its discretion —
              start from Play Store &gt; Order history, or visit{' '}
              <a href="https://play.google.com/store/account" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                play.google.com/store/account
              </a>
              . {APP.name} honours whatever Google processes on its end automatically; you don&rsquo;t need to
              contact us separately for a standard Play Store refund to take effect.
            </p>
          </Section>

          <Highlight title="Free trial & cancellation">
            <p>
              The 7-day free trial on the annual plan converts to a paid subscription automatically unless you
              cancel at least 24 hours before it ends. Cancelling is done entirely inside Google Play — Play Store
              &gt; Subscriptions &gt; {APP.name} &gt; Cancel — and takes effect at the end of the current billing
              period, with no partial refund for the remaining days.
            </p>
          </Highlight>

          <Section n="04" title="Requesting a refund from us directly">
            <p>
              If a standard Play Store refund isn&rsquo;t available to you — for example, a technical issue
              prevented you from using Pro after purchase, or you were charged in error — email{' '}
              <a href={`mailto:${APP.email}`} style={{ color: 'var(--accent)' }}>{APP.email}</a> with your order or
              transaction ID and a brief description of what happened. We review these case by case and will work
              with you directly or point you to the right Google Play flow.
            </p>
          </Section>

          <Section n="05" title="Promo codes & watch-to-unlock">
            <p>
              Redeemed promo codes and the 12-hour Pro access unlocked by watching ads have no monetary value and
              aren&rsquo;t eligible for a cash refund — there was nothing purchased to refund.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] p-10" style={{ background: 'var(--text)', color: 'var(--bg)' }}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="opacity-90 leading-relaxed">{children}</div>
    </section>
  );
}
