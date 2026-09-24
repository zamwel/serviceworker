import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${BRAND.name}.`,
  alternates: { canonical: `${BRAND.basePath}/tos` },
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

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: <span className="text-white font-medium">{lastUpdated}</span>
          </p>
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors duration-500 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm">01</span>
              Agreement to Terms
            </h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) form a binding agreement between
              you and {BRAND.company} (&quot;{BRAND.name}&quot;, &quot;we&quot;,
              &quot;us&quot;) governing your use of the {BRAND.name} Android application
              (package <code className="text-gray-400">{BRAND.packageId}</code>). By
              installing, opening or using the app you accept these Terms in full. If you
              do not agree, do not use the app.
            </p>
          </section>

          <Section n="02" title="What MovieWalls Is">
            <p>
              {BRAND.name} lets you browse trending, popular and top-rated movies and TV
              shows, view each title&apos;s poster and backdrop galleries, search and
              filter the catalog by popularity, region, genre and release date, save
              titles to a local Favorites list, and download or directly set artwork as
              your device wallpaper. All movie/TV metadata and images are sourced from
              <strong> The Movie Database (TMDB)</strong>; {BRAND.name} does not create,
              own or claim authorship of that artwork.
            </p>
            <p className="text-sm bg-white/5 border border-white/10 rounded-2xl p-5">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
              All movie and show titles, artwork, logos and trademarks displayed in the
              app remain the property of their respective studios, distributors and
              rights holders.
            </p>
          </Section>

          <Section n="03" title="Eligibility & Accounts">
            <p>
              You must be at least 13 years old to use {BRAND.name}. The app has no
              sign-up or login of its own; the only account interaction is your existing
              Google Play account, used solely to process an optional Pro purchase and to
              restore that purchase on other devices.
            </p>
          </Section>

          <Section n="04" title="License to Use the App & Its Content">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Personal use only</h3>
                <p className="text-sm">
                  Posters, backdrops and other artwork you download or set as wallpaper
                  through {BRAND.name} are for your own personal, non-commercial device
                  personalization. You may not redistribute, sublicense, sell, publicly
                  display outside personal use, or otherwise commercially exploit that
                  artwork.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">Free-tier watermark</h3>
                <p className="text-sm">
                  Downloads made on the Free tier carry a small, semi-transparent{" "}
                  {BRAND.name} watermark. This watermark is part of the license granted to
                  Free users and must not be removed, cropped out or otherwise
                  circumvented; Pro removes the watermark automatically for all future
                  downloads.
                </p>
              </div>
            </div>
          </Section>

          <Section n="05" title="Acceptable Use">
            <p>You agree not to, and not to help anyone else:</p>
            <ul className="grid gap-3 list-none">
              {[
                "Reverse engineer, decompile or disassemble the app, or bypass its licensing/entitlement checks",
                "Scrape, proxy or automate bulk requests against TMDB or our infrastructure through the app",
                "Use the app for any unlawful purpose or in a way that infringes any third party's rights",
                "Circumvent the Free-tier watermark or ad experience without a valid Pro entitlement",
                "Interfere with, disrupt or attempt to gain unauthorized access to the app or its backing services",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="06" title="Advertising">
            <p>
              The Free tier is supported by Google AdMob interstitial and rewarded ads,
              shown at a capped frequency (never more than once per minute, gated further
              by downloads and navigation count). Watching a rewarded ad may grant a
              temporary, revocable ad-free/watermark-free period. Ads are removed entirely
              for Pro users. See our{" "}
              <Link href={`${BRAND.basePath}/privacy`} className="text-red-400 underline">Privacy Policy</Link>{" "}
              for how ad partners process data.
            </p>
          </Section>

          <Section n="07" title="Subscriptions & Purchases">
            <p>
              {BRAND.name} offers an optional Pro upgrade (monthly, yearly or lifetime)
              that removes ads and the download watermark and unlocks unlimited HD
              downloads. All purchases are billed and fulfilled entirely by{" "}
              <strong>Google Play Billing</strong>; pricing, currency, renewal, trial and
              cancellation mechanics follow Google Play&apos;s standard subscription
              rules. Entitlement state is reconciled through RevenueCat so your Pro status
              follows you across devices signed into the same store account. See our{" "}
              <Link href={`${BRAND.basePath}/refund`} className="text-red-400 underline">Refund Policy</Link>{" "}
              for cancellations and refunds.
            </p>
          </Section>

          <Section n="08" title="Intellectual Property">
            <p>
              The {BRAND.name} app - its code, design, branding and original UI - is the
              exclusive property of {BRAND.company}. All movie/TV artwork, titles and
              metadata displayed through the app belong to their respective owners and are
              provided via the TMDB API strictly as described in Section 2.
            </p>
          </Section>

          <Section n="09" title="Availability & Disclaimer">
            <p>
              {BRAND.name} depends on TMDB&apos;s availability and on your device having
              network connectivity for fresh content; when offline, the app falls back to
              a local cache that may be stale for up to seven days. We do not guarantee
              uninterrupted or error-free operation. The app and all content are provided
              &quot;as is&quot; without warranties of any kind, to the maximum extent
              permitted by law.
            </p>
          </Section>

          <Section n="10" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, {BRAND.name} and{" "}
              {BRAND.company} shall not be liable for any indirect, incidental, special,
              consequential or punitive damages, or any loss of data, arising from your
              use of, or inability to use, the app.
            </p>
          </Section>

          <Section n="11" title="Termination">
            <p>
              We may suspend or restrict access to the app, at our discretion and without
              prior notice, for conduct we believe violates these Terms or is harmful to
              other users, us, or third parties (including TMDB or our ad/billing
              partners). You may stop using the app and uninstall it at any time.
            </p>
          </Section>

          <Section n="12" title="Changes to These Terms">
            <p>
              We may revise these Terms from time to time. The &quot;Last updated&quot;
              date above reflects the most recent revision; continuing to use{" "}
              {BRAND.name} after changes take effect means you accept the updated Terms.
            </p>
          </Section>

          <section className="border-t border-white/10 pt-16 mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Us</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              If you have any questions about these Terms, please contact us.
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
