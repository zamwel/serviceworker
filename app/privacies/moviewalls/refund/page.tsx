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
              All {BRAND.name} Pro purchases (monthly, yearly and lifetime) are billed and
              processed entirely by the Google Play Store. We do not process payments or
              store your card details ourselves, so refunds are handled by Google&apos;s
              own policies and tools.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              How to Request a Refund
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Within 48 hours", desc: "Google Play allows a self-service refund for most purchases made in the last 48 hours directly from the Play Store order history." },
                { title: "After 48 hours", desc: "Request a refund through Google Play's support flow, or contact us and we'll help escalate the request." },
                { title: "Subscriptions", desc: "Cancel any time from Google Play → Subscriptions. You keep Pro access until the end of the current billing period; no partial refunds are issued for unused time." },
                { title: "Lifetime purchases", desc: "One-time Lifetime purchases follow Google Play's standard refund window and eligibility rules for non-consumable in-app products." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
            <h2 className="text-2xl font-bold mb-6 text-white">Non-Refundable Cases</h2>
            <ul className="grid gap-4 list-none">
              {[
                "Purchases made more than 48 hours ago that fall outside Google Play's standard refund window",
                "Partial-period refunds for cancelled subscriptions (access continues until the period ends instead)",
                "Purchases confirmed to have violated our Terms of Service",
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

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              Promo Codes
            </h2>
            <p className="mb-6">
              Promo codes redeemed in the Offers screen or through Google Play are final
              once applied and are not eligible for cash refunds.
            </p>
          </section>

          <section className="border-t border-white/10 pt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Need Help?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              If you believe you&apos;re entitled to a refund outside these terms, reach
              out and we&apos;ll do our best to help.
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
