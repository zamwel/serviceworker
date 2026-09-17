import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BRAND } from './data';
import { THEME_INIT_SCRIPT } from './shared';
import './theme.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.origin),
  title: {
    default: ${BRAND.name} | ,
    template: %s · ,
  },
  description: BRAND.oneLiner,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
  category: 'sports',
  keywords: [
    'Bet of the Day',
    'BTD',
    'AI football predictions',
    'soccer prediction engine',
    'expected goals xG stats',
    'Premier League predictions',
    'Champions League tips',
    'daily betting tips app',
    'sports analytics Android',
    'football probability models',
  ],
  alternates: { canonical: BRAND.basePath },
  openGraph: {
    type: 'website',
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: ${BRAND.name} | ,
    description: BRAND.oneLiner,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: ${BRAND.name} | ,
    description: BRAND.oneLiner,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: BRAND.name,
      operatingSystem: 'ANDROID',
      applicationCategory: 'SportsApplication',
      description: BRAND.oneLiner,
      url: BRAND.siteUrl,
      downloadUrl: BRAND.playStoreUrl,
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

export default function BtdLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={td relative }>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <script type=application/ld+json dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
}
