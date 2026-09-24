import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How refunds and cancellations work for ${BRAND.name} Pro.`,
  alternates: { canonical: `${BRAND.basePath}/refund` },
};

const lastUpdated = "September 24, 2026";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6 flex items-baseline gap-3">
        <span className="text-red-500 text-lg font-mono">{n}</span> {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-32">
        <Link href={BRAND.basePath} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <header className="mb-20 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Legal Document
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Refund Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: <span className="text-white font-medium">{lastUpdated}</span>
          </p>
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
              Billing Through Google Play
            </h2>
            <p>
              {BRAND.name} Pro is offered in three forms - <strong>Monthly</strong>,{" "}
              <strong>Yearly</strong> and a one-time <strong>Lifetime</strong> unlock -
              and every purchase is billed and processed entirely by the{" "}
              <strong>Google Play Store</strong>. We use RevenueCat only to read back
              your entitlement state after Google Play confirms the purchase; we never
              receive or store your card details ourselves, so all refunds are ultimately
              issued and controlled by Google, not by {BRAND.company} directly.
            </p>
          </section>

          <Section n="02" title="How to Request a Refund">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Within 48 hours", desc: "Google Play allows a self-service refund for most purchases made in the last 48 hours: open Google Play → Menu → Order history, find the MovieWalls purchase, and select Request a refund." },
                { title: "After 48 hours", desc: "Refunds outside the 48-hour window are at Google's discretion. Submit a request through Google Play's support flow, or contact us and we'll help you escalate it." },
                { title: "Monthly & Yearly subscriptions", desc: "Cancel any time from Google Play → Payments & subscriptions → Subscriptions → MovieWalls → Cancel subscription. Pro access continues until the end of the period you already paid for; we do not issue partial refunds for the unused remainder of a billing period." },
                { title: "Lifetime purchase", desc: "The Lifetime unlock is a one-time, non-recurring purchase. It follows Google Play's standard refund window and eligibility rules for non-consumable in-app products - generally the 48-hour self-service window above." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section n="03" title="What Refunding Does to Your Entitlement">
            <p>
              When Google Play confirms a refund or a chargeback, RevenueCat is notified
              automatically and your Pro entitlement is revoked the next time the app
              syncs - ads and the download watermark return, and any HD-download limits
              resume. If you believe your Pro access was removed in error after a refund
              you did not request, contact us immediately.
            </p>
          </Section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
            <h2 className="text-2xl font-bold mb-6 text-white">Non-Refundable Cases</h2>
            <ul className="grid gap-4 list-none">
              {[
                "Purchases outside Google Play's refund window that Google declines to refund at its discretion",
                "Partial-period refunds for cancelled subscriptions - access simply continues until the paid period ends instead",
                "Temporary rewarded-ad perks (24-hour ad-free/watermark-free periods) - these are free and not purchases",
                "Purchases confirmed to have been made in violation of our Terms of Service",
                "Fraudulent chargebacks: these are treated as a policy violation and may result in your Pro entitlement being revoked and, in serious or repeated cases, further restriction of app access on the associated device or account",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Section n="04" title="Promo Codes">
            <p>
              Promo codes redeemed in the app&apos;s Offers screen or through Google
              Play&apos;s own promo-code redemption are free grants of Pro access and are
              final once applied; since no payment was made, they are not eligible for a
              cash refund.
            </p>
          </Section>

          <Section n="05" title="Price Changes">
            <p>
              If Google Play notifies us of a subscription price change, existing
              subscribers are given advance notice through Google Play before the new
              price takes effect, in line with Google Play&apos;s own subscription price
              change policy. You can always cancel before a price change takes effect.
            </p>
          </Section>

          <section className="border-t border-white/10 pt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Need Help?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              If you believe you&apos;re entitled to a refund outside these terms, or your
              Pro entitlement isn&apos;t reflecting a purchase you made, reach out and
              we&apos;ll do our best to help.
            </p>
            <a
              href={`mailto:${BRAND.supportEmail}`}
              className="inline-flex items-center justify-center px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              Contact Support
            </a>
          </section>
        </main>

        <footer className="mt-32 pt-10 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
