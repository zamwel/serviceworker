import type { Metadata } from "next";
import { BRAND } from "./_components/data";

/* SEO/ASO metadata shared across every MovieWalls marketing & legal page.
   Individual pages override `title`/`description` as needed. */
export const metadata: Metadata = {
  metadataBase: new URL(BRAND.origin),
  title: {
    default: `${BRAND.name} | Movie & TV Wallpapers, Posters and Backdrops`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.shortDescription,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
  category: "entertainment",
  keywords: [
    "MovieWalls",
    "movie wallpapers app",
    "movie poster wallpapers",
    "TV show wallpapers",
    "HD movie posters",
    "cinematic backdrops",
    "download movie posters",
    "movie wallpaper HD",
    "poster app Android",
    "free wallpaper app",
  ],
  alternates: {
    canonical: BRAND.basePath,
  },
  openGraph: {
    type: "website",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} | Movie & TV Wallpapers, Posters and Backdrops`,
    description: BRAND.shortDescription,
    locale: "en_US",
    images: [{ url: BRAND.logo }],
  },
  twitter: {
    card: "summary",
    title: `${BRAND.name} | Cinematic Wallpapers`,
    description: BRAND.shortDescription,
    images: [BRAND.logo],
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
      applicationCategory: "PersonalizationApplication",
      description: BRAND.description,
      url: BRAND.siteUrl,
      downloadUrl: BRAND.playStoreUrl,
      image: BRAND.logo,
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

export default function MovieWallsLayout({
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
