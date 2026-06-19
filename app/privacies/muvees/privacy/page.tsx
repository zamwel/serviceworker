import type { Metadata } from "next";
import { BRAND } from "../_components/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND.name} collects, uses and protects your data.`,
  alternates: { canonical: `${BRAND.basePath}/privacy` },
};

const lastUpdated = "June 18, 2026";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-600/30 pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 pt-24 lg:pt-32">
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
        </header>

        <main className="space-y-16 text-gray-300 leading-relaxed">
          <section className="backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center mr-4 text-sm font-bold">01</span>
              Introduction
            </h2>
            <p>
              Welcome to <strong>{BRAND.name}</strong>. We respect your privacy and are
              committed to protecting your personal data. This policy explains what we
              collect when you use our application, how we use it, and the rights you have.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              Information We Collect
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Account Information", desc: "If you purchase or restore Pro, your store account handles billing. We do not require an account to watch." },
                { title: "Usage Data", desc: "Watch history, watchlist and in-app interactions stored locally on your device to power resume and recommendations." },
                { title: "Device Information", desc: "Technical data such as device type, OS version and anonymous identifiers used for crash reporting and ads." },
                { title: "Advertising Data", desc: "For free users, ad partners may process limited data to serve relevant ads. Pro removes ads entirely." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">{item.title}</h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-600/10 to-transparent p-10 rounded-[40px] border border-red-500/10">
            <h2 className="text-2xl font-bold mb-6 text-white">How We Use Your Information</h2>
            <ul className="grid gap-4 list-none">
              {[
                "To provide, maintain and improve the app experience",
                "To remember your watch progress, watchlist and preferences",
                "To process Pro purchases and promo-code redemptions",
                "To display ads to free users and measure their performance",
                "To detect, prevent and address technical issues",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              Data Storage &amp; Your Rights
            </h2>
            <p className="mb-6">
              Most of your data, including watch history, watchlist and downloads, lives on your
              device and is removed when you uninstall the app or clear its data. You can
              clear your history at any time from the app settings. To request deletion of
              any data we hold, contact us at{" "}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-red-400 underline">
                {BRAND.supportEmail}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-6">
              Third-Party Services
            </h2>
            <p className="mb-6">
              We use trusted third parties to operate {BRAND.name}. They access only the
              data needed to perform their function on our behalf.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Google Play Billing", "RevenueCat", "Google AdMob", "TMDB API", "Firebase"].map((service) => (
                <span key={service} className="px-6 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full border border-white/10 text-sm font-medium">
                  {service}
                </span>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Questions?</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              If you have any questions about this Privacy Policy, reach out to our team.
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
