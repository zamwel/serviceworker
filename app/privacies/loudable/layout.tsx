import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import { APP } from './data';
import { THEME_INIT_SCRIPT } from './shared';
import './theme.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: {
    default: `${APP.name} | ${APP.tagline}`,
    template: `%s · ${APP.name}`,
  },
  description: APP.oneLiner,
  applicationName: APP.name,
  authors: [{ name: APP.company }],
  creator: APP.company,
  publisher: APP.company,
  category: 'productivity',
  alternates: {
    canonical: APP.basePath,
  },
  openGraph: {
    type: 'website',
    url: APP.basePath,
    siteName: APP.name,
    title: `${APP.name} | ${APP.tagline}`,
    description: APP.oneLiner,
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: APP.name,
      operatingSystem: 'ANDROID',
      applicationCategory: 'ProductivityApplication',
      description: APP.oneLiner,
      url: APP.basePath,
      identifier: APP.packageId,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: APP.company },
    },
    {
      '@type': 'Organization',
      name: APP.company,
      email: APP.email,
    },
  ],
};

export default function LoudableLegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`loudable relative ${barlow.variable}`}>
      {/* Runs before paint so the light/dark toggle never flashes the wrong theme. */}
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
