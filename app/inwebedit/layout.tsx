import type { Metadata } from 'next';
import { APP } from './data';

export const metadata: Metadata = {
  metadataBase: new URL('https://abelarai.com'),
  title: {
    default: `${APP.name} | Edit Any Website Live on Your Phone`,
    template: `%s · ${APP.name}`,
  },
  description: APP.oneLiner,
  applicationName: APP.name,
  authors: [{ name: APP.company }],
  creator: APP.company,
  publisher: APP.company,
  category: 'productivity',
  keywords: [
    'InWebEdit',
    'live website editor',
    'edit any website',
    'inline web editing',
    'webpage screenshot',
    'full page screenshot',
    'HTML editor mobile',
    'web page editor Android',
    'no-code web editor',
    'website mockup app',
    'screenshot tool Android',
    'PDF export from website',
    'HTML export mobile',
    'edit text on website',
    'web content editor',
  ],
  alternates: {
    canonical: '/inwebedit',
  },
  openGraph: {
    type: 'website',
    url: 'https://abelarai.com/inwebedit',
    siteName: APP.name,
    title: `${APP.name} | Edit Any Website Live on Your Phone`,
    description: APP.oneLiner,
    locale: 'en_US',
    // images: [{ url: '/inwebedit/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP.name} | Live Website Editor`,
    description: APP.oneLiner,
    // images: ['/inwebedit/og-image.png'],
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
      applicationCategory: 'ProductivityApplication',
      description: APP.oneLiner,
      url: 'https://abelarai.com/inwebedit',
      downloadUrl: APP.playUrl,
      identifier: APP.packageId,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: APP.company },
    },
    {
      '@type': 'Organization',
      name: APP.company,
      url: 'https://abelarai.com',
      email: APP.email,
    },
  ],
};

export default function InWebEditLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
