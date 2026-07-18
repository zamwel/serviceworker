import type { Metadata } from 'next';
import { APP } from './data';
import { THEME_INIT_SCRIPT } from './shared';
import './theme.css';

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
  category: 'photography',
  keywords: [
    'IILuk',
    'photo restoration app',
    'AI photo colorization',
    'old photo repair',
    'remove background app',
    'photo watermark remover',
    'AI photo upscaler',
    'on-device photo AI',
    'restore old photos Android',
    'colorize black and white photos',
  ],
  alternates: {
    canonical: '/iiluk',
  },
  openGraph: {
    type: 'website',
    url: '/iiluk',
    siteName: APP.name,
    title: `${APP.name} | ${APP.tagline}`,
    description: APP.oneLiner,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP.name} | ${APP.tagline}`,
    description: APP.oneLiner,
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
      name: APP.name,
      operatingSystem: 'ANDROID',
      applicationCategory: 'PhotographyApplication',
      description: APP.oneLiner,
      url: '/iiluk',
      downloadUrl: APP.playUrl,
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

export default function IILukLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="iiluk relative">
      {/* Runs before paint so the light/dark toggle never flashes the wrong theme. */}
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="iiluk-grain" />
      {children}
    </div>
  );
}
