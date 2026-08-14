import type { Metadata } from 'next';
import { Header, Footer, PageHeader, Section, MiniCard, ContactCta } from '../shared';
import { APP } from '../data';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${APP.name}'s website and app use local storage.`,
  alternates: { canonical: `${APP.basePath}/cookies` },
};

const APP_STORAGE = [
  { title: 'Settings & preferences', desc: 'Theme, playback speed, sleep timer and similar choices are saved locally so they persist between sessions.' },
  { title: 'Library database', desc: 'Documents, chapters, bookmarks, notes, highlights and listening position are stored in a local database on your device — see the Privacy Policy for the full contract.' },
  { title: 'Downloaded voice & AI models', desc: 'Cached on-device once downloaded, so conversion and narration keep working offline.' },
  { title: 'Advertising & purchase identifiers', desc: 'A device advertising ID and a RevenueCat purchase state are kept locally to serve ads and unlock Pro without needing an account.' },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pb-20">
      <Header active="cookies" />

      <div className="max-w-4xl mx-auto px-6 pt-16 lg:pt-20">
        <PageHeader title="Cookie Policy" />

        <main className="space-y-14">
          <Section n="01" title="What this covers">
            <p>
              This page explains the browser storage used on this website (where you&rsquo;re reading it now) and,
              since &ldquo;cookies&rdquo; don&rsquo;t really apply to a mobile app, the equivalent on-device storage
              used by the <strong style={{ color: 'var(--text)' }}>{APP.name}</strong> app itself.
            </p>
          </Section>

          <Section n="02" title="Cookies on this website">
            <p>
              This site does not use tracking or advertising cookies, and there is no analytics script running on
              it. The only browser storage it uses is a single <code>localStorage</code> entry that remembers
              whether you last chose light or dark mode — nothing else is read, written, or sent anywhere. It stays
              in your browser and is never transmitted to {APP.company} or anyone else.
            </p>
          </Section>

          <Section n="03" title="Local storage inside the app">
            <p className="mb-6">
              The app itself doesn&rsquo;t use browser cookies, but it does rely on on-device storage to function.
              None of the following is a tracking mechanism — it&rsquo;s simply how the app remembers your library
              and settings between launches.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {APP_STORAGE.map((s) => <MiniCard key={s.title} {...s} />)}
            </div>
          </Section>

          <Section n="04" title="Third-party SDKs">
            <p>
              Google AdMob and Firebase Cloud Messaging may set their own local identifiers on your device to serve
              ads or deliver notifications, exactly as described in the Privacy Policy. {APP.name} does not ship
              any analytics or crash-reporting SDK in this version of the app.
            </p>
          </Section>

          <Section n="05" title="Managing or clearing this data">
            <p>
              In your browser: use your browser&rsquo;s &ldquo;clear site data&rdquo; option for this site to reset
              the theme preference. In the app: clear an individual document, model, or your whole library from
              Settings, or uninstall the app to remove everything stored on-device at once.
            </p>
          </Section>

          <Section n="06" title="Changes to this policy">
            <p>
              If what&rsquo;s stored locally changes in a way that affects your privacy, we&rsquo;ll update the
              &ldquo;Last updated&rdquo; date above.
            </p>
          </Section>

          <ContactCta />
        </main>
      </div>

      <Footer />
    </div>
  );
}
