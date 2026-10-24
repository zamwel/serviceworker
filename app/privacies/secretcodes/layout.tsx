import type { Metadata } from "next";
import { BRAND } from "./_components/data";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.origin),
  title: {
    default: `${BRAND.name} | Hidden USSD Codes, Hardware Diagnostics & Device Specs`,
    template: `%s - ${BRAND.name}`,
  },
  description: BRAND.shortDescription,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.company }],
  creator: BRAND.company,
  publisher: BRAND.company,
  category: "utilities",
  keywords: [
    "Mobile Secret Codes",
    "secret codes app",
    "Android secret codes",
    "USSD codes list",
    "MMI codes",
    "hardware diagnostic codes",
    "Samsung secret codes",
    "phone testing codes",
    "IMEI check code",
    "engineering mode Android",
    "battery status code",
    "device specs",
    "phone tips and tricks",
  ],
  alternates: {
    canonical: BRAND.basePath,
  },
  openGraph: {
    type: "website",
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} - Hidden USSD Codes & Hardware Diagnostics`,
    description: BRAND.shortDescription,
    locale: "en_US",
    images: [{ url: BRAND.logo }],
  },
  twitter: {
    card: "summary",
    title: `${BRAND.name} | Phone Diagnostics & Secret Codes`,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: BRAND.name,
      operatingSystem: "ANDROID",
      applicationCategory: "UtilitiesApplication",
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

export default function SecretCodesLayout({
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
