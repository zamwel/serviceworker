import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} collects, uses and protects your data.`,
  alternates: { canonical: `${BRAND.basePath}/privacy` },
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-24 lg:pt-32">
        <Link href={BRAND.basePath} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 rounded-full border border-red-500/20">
            Legal Document
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: <span className="text-white font-medium">{lastUpdated}</span>
          </p>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Package: <code className="text-gray-400">{BRAND.packageId}</code>
          </p>
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
              Introduction
            </h2>
            <p>
              <strong>{BRAND.name}</strong> is developed and published by{" "}
              {BRAND.company}. This policy describes, in specific and honest terms,
              exactly what the app does and does not collect, why it needs the Android
              permissions it requests, what happens to the data that stays on your
              device, and what leaves it. {BRAND.name} does not require an account, a
              phone number, an email address or a name to browse, favorite or download
              artwork - most of what this policy covers is either stored only on your
              device or is the minimum needed to run ads and process an optional Pro
              purchase.
            </p>
          </section>

          <Section n="02" title="Information We Collect">
            <p>We separate what we collect into three categories:</p>
            <div className="grid gap-6 mt-2">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">A. Data that never leaves your device</h3>
                <p className="text-sm mb-3">
                  Stored locally in the app&apos;s private storage (via Hive, an
                  on-device database) and never transmitted to us or to any third party:
                </p>
                <ul className="text-sm space-y-2 list-disc list-inside marker:text-red-500">
                  <li>Your <strong>Favorites</strong> - the titles you&apos;ve saved</li>
                  <li>Your <strong>search history</strong> (the last 10 searches, used only to show suggestions)</li>
                  <li>App preferences: theme (light/dark), poster grid size, download quality and whether you&apos;ve completed onboarding</li>
                  <li>A local cache of movie/show metadata and poster/backdrop images fetched from The Movie Database, kept for up to 30 days (7 days once stale) so the app loads fast and works briefly offline</li>
                  <li>A local mirror of your Pro entitlement status, so the app can show the right UI instantly without a network round trip</li>
                </ul>
                <p className="text-sm mt-3">
                  All of this is deleted automatically if you clear the app&apos;s
                  storage or uninstall {BRAND.name}, and you can clear your Favorites or
                  search history at any time from within the app.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">B. Data processed by our service providers</h3>
                <p className="text-sm">
                  We do not run our own analytics or advertising servers. Instead, the
                  SDKs listed in Section 5 (Google AdMob, RevenueCat, Google Play
                  Billing) independently collect technical data - such as your
                  advertising identifier, approximate region, device model and OS
                  version - under their own privacy policies, in order to serve ads,
                  measure ad performance, and reconcile subscription/purchase state
                  across your devices.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold mb-3 text-red-400">C. What we deliberately do not collect</h3>
                <p className="text-sm">
                  {BRAND.name} has no sign-up or login, so we never see your name, email
                  address or phone number. We do not request access to your photo
                  gallery, camera, microphone, contacts or location at any point - see
                  Section 3 for exactly which Android permissions the app declares and
                  why.
                </p>
              </div>
            </div>
          </Section>

          <Section n="03" title="Android Permissions, Explained">
            <p>
              {BRAND.name} requests the smallest set of permissions it can to do its job,
              and explicitly avoids the ones commonly abused by wallpaper apps:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              {[
                { p: "Internet / Network State", d: "Required to fetch movie and TV artwork and metadata from The Movie Database (TMDB). Network State lets the app detect when you're offline and fall back to cached content instead of showing an error." },
                { p: "Set Wallpaper / Set Wallpaper Hints", d: "Lets you apply a poster or backdrop directly as your home screen and/or lock screen wallpaper from inside the app, instead of exporting it and setting it manually." },
                { p: "Notifications (Android 13+)", d: "Used only to let you know when a wallpaper download has finished. You can deny this and the app still works; you just won't see the completion notice." },
                { p: "Write External Storage (legacy, Android 9 and below only)", d: "On modern Android (10+) the app writes downloaded images through the system MediaStore API, which needs no storage permission at all. This legacy permission exists solely so saving still works on older OS versions, and it is capped in the app manifest so it cannot be requested on newer Android." },
              ].map((row) => (
                <div key={row.p} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="text-sm font-semibold text-white mb-2">{row.p}</div>
                  <div className="text-sm text-gray-400">{row.d}</div>
                </div>
              ))}
            </div>
            <p className="text-sm bg-red-500/5 border border-red-500/20 rounded-2xl p-5 mt-4">
              <strong className="text-red-400">We do not request, and the app cannot access, your existing photo
              gallery.</strong> {BRAND.name} only ever <em>writes</em> images it downloads;
              it never reads photos already on your device, and it does not declare the
              Android photo/media <em>read</em> permissions required to do so.
            </p>
          </Section>

          <Section n="04" title="How We Use Information">
            <ul className="grid gap-4 list-none">
              {[
                "To load and display trending, popular and top-rated titles and their poster/backdrop galleries",
                "To remember your Favorites, search history and app preferences between sessions",
                "To cache recently viewed artwork and metadata so the app is fast and partially usable offline",
                "To apply a light, semi-transparent watermark to wallpapers downloaded on the Free tier (removed automatically once you upgrade to Pro)",
                "To show interstitial and rewarded ads to Free-tier users, at a deliberately capped frequency, and to measure how those ads perform",
                "To verify and restore an active Pro subscription or lifetime purchase across your devices via RevenueCat and Google Play Billing",
                "To diagnose crashes and technical issues from anonymous, aggregated signals surfaced by the SDKs above",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section n="05" title="Advertising (Google AdMob)">
            <p>
              Free-tier use of {BRAND.name} is supported by Google AdMob. We only run
              interstitial and rewarded ads (no banner ads) - shown at most every few
              downloads or every few screen navigations, and never more than once per
              minute. Watching a rewarded ad temporarily unlocks Pro-like benefits (no
              ads, no watermark) for 24 hours.
            </p>
            <p>
              AdMob may collect your advertising identifier and other device signals to
              select and measure ads, and may use this data consistent with{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-400 underline">Google&apos;s Privacy Policy</a>. You
              can reset or opt out of personalized advertising at any time from your
              device&apos;s Settings &rarr; Privacy &rarr; Ads (Android) &rarr; Delete/reset advertising
              ID or opt out of Ads Personalization. Upgrading to Pro removes ads
              entirely, so no ad SDK activity occurs for Pro users.
            </p>
          </Section>

          <Section n="06" title="Third-Party Services We Rely On">
            <p>
              These providers each process a limited slice of data on our behalf, under
              their own privacy policies:
            </p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold">Service</th>
                    <th className="py-3 pr-4 font-semibold">Purpose</th>
                    <th className="py-3 font-semibold">Data involved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { s: "The Movie Database (TMDB)", p: "Source of all movie/TV metadata, posters and backdrops", d: "Your request for a title/search triggers a call to TMDB's API; no personal identifiers are sent beyond a standard network request." },
                    { s: "Google AdMob", p: "Serves interstitial and rewarded ads to Free-tier users", d: "Advertising ID, device/OS info, coarse location, ad interaction data." },
                    { s: "RevenueCat", p: "Reconciles your Pro entitlement across devices and stores", d: "An anonymous app user ID and purchase/entitlement state - no payment card data." },
                    { s: "Google Play Billing", p: "Processes all Pro purchases (monthly, yearly, lifetime)", d: "Payment details are handled entirely by Google; we never see or store your card information." },
                  ].map((row) => (
                    <tr key={row.s}>
                      <td className="py-3 pr-4 font-medium text-white align-top whitespace-nowrap">{row.s}</td>
                      <td className="py-3 pr-4 align-top">{row.p}</td>
                      <td className="py-3 align-top text-gray-400">{row.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section n="07" title="Data Retention & Deletion">
            <p>
              Cached metadata and images expire automatically after 30 days (or 7 days
              once considered stale) and are refreshed from TMDB as needed. Favorites and
              search history persist locally until you clear them from within the app or
              uninstall {BRAND.name} - at which point Android deletes all of the app&apos;s
              local storage. Because we hold no server-side account or profile for you,
              there is no remote copy of this data for us to delete on request; if you
              believe we hold any data linked to you (for example, through a support
              email you sent us), contact us at{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-red-400 underline">{BRAND.supportEmail}</a>{" "}
              and we will delete it.
            </p>
          </Section>

          <Section n="08" title="Children's Privacy">
            <p>
              {BRAND.name} is a general-audience app, but its catalog includes titles
              rated for mature audiences (e.g. TV-MA) alongside family content, exactly
              as shown on TMDB. The app is not directed at children under 13, we do not
              knowingly collect personal information from children, and no account
              creation exists through which a child could provide personal data. If you
              believe a child has provided us information, contact us and we will
              address it.
            </p>
          </Section>

          <Section n="09" title="International Data & Security">
            <p>
              Our third-party providers (TMDB, Google AdMob, RevenueCat, Google Play)
              operate infrastructure in multiple countries, so data processed by them may
              be transferred outside your country of residence. We rely on industry
              standard transport security (HTTPS/TLS) for all network requests the app
              makes, and we do not operate our own servers that store personal data.
            </p>
          </Section>

          <Section n="10" title="Changes to This Policy">
            <p>
              We may update this Privacy Policy as the app evolves. Material changes will
              be reflected by updating the &quot;Last updated&quot; date above; we
              encourage you to review this page periodically. Continued use of{" "}
              {BRAND.name} after a change constitutes acceptance of the revised policy.
            </p>
          </Section>

          <section className="border-t border-white/10 pt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Questions?</h2>
            <p className="text-gray-400 mb-2 max-w-md mx-auto">
              For app support, reach our support inbox.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              For privacy or legal inquiries directed at the developer of record,
              use{" "}
              <a href={`mailto:${BRAND.developerEmail}`} className="text-red-400 underline">
                {BRAND.developerEmail}
              </a>.
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
