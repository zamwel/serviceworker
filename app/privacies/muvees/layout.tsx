import type { Metadata } from "next";
import { BRAND } from "./_components/data";

/* SEO/ASO metadata shared across every Muvees marketing & legal page.
   Individual pages override `title`/`description` as needed. */
export const metadata: Metadata = {
  metadataBase: new URL(BRAND.origin),
  title: {
    default: `${BRAND.name} | Watch & Download Movies and TV Shows Free`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.shortDescription,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
  category: "entertainment",
  keywords: [
    "Muvees",
    "free movie app",
    "watch movies online",
    "stream TV shows",
    "download movies offline",
    "free streaming app",
    "movie streaming Android",
    "HD movies app",
    "multi-language subtitles",
    "watch series free",
    "best free movie app",
    "offline movie downloader",
  ],
  alternates: {
    canonical: BRAND.basePath,
  },
  openGraph: {
    type: "website",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} | Watch & Download Movies and TV Shows Free`,
    description: BRAND.shortDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Stream & Download Free`,
    description: BRAND.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* JSON-LD structured data — helps Google render an app rich result and
   improves ASO/SEO discoverability. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: BRAND.name,
      operatingSystem: "ANDROID",
      applicationCategory: "MultimediaApplication",
      description: BRAND.description,
      url: BRAND.siteUrl,
      downloadUrl: BRAND.playStoreUrl,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: BRAND.rating,
        ratingCount: BRAND.ratingCount,
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@type": "Organization", name: BRAND.company },
    },
    {
      "@type": "Organization",
      name: BRAND.company,
      url: BRAND.origin,
      email: BRAND.supportEmail,
    },
  ],
};

export default function MuveesLayout({
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
