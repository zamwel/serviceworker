import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import { BRAND } from './data';
import { THEME_INIT_SCRIPT } from './shared';
import './theme.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.origin),
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.oneLiner,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
  category: 'productivity',
  keywords: [
    'Loudable',
    'document to audiobook',
    'text to speech app',
    'PDF to audio',
    'on-device AI narration',
    'offline audiobook app',
    'private text to speech',
    'read documents aloud',
    'OCR audiobook',
    'AI voice reader',
  ],
  alternates: { canonical: BRAND.basePath },
  openGraph: {
    type: 'website',
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.oneLiner,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | ${BRAND.tagline}`,
    description: BRAND.oneLiner,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: BRAND.name,
      operatingSystem: 'ANDROID',
      applicationCategory: 'ProductivityApplication',
      description: BRAND.oneLiner,
      url: BRAND.siteUrl,
      identifier: BRAND.packageId,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: BRAND.company },
    },
    {
      '@type': 'Organization',
      name: BRAND.company,
      url: BRAND.origin,
      email: BRAND.supportEmail,
    },
  ],
};

export default function LoudableLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`loudable relative ${barlow.variable}`}>
      {/* Runs before paint so the light/dark toggle never flashes the wrong theme. */}
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
}
