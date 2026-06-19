import {
  Clapperboard,
  Download,
  Subtitles,
  Languages,
  Server,
  History,
  PictureInPicture2,
  Sparkles,
  Search,
  Heart,
  ShieldCheck,
  Cast,
  Tv,
  Wifi,
  Gift,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   Brand / site constants — single source of truth for the Muvees marketing
   site. Update these in one place if store IDs, emails or URLs change.
   ──────────────────────────────────────────────────────────────────────── */
export const BRAND = {
  name: "Muvees",
  company: "Codeink Technologies",
  tagline: "Your cinema, anywhere.",
  description:
    "Muvees is a free movie and TV streaming app. Watch trending films and series in HD, download for offline viewing, and enjoy multi-language subtitles, all in one beautifully simple player.",
  shortDescription:
    "Stream & download movies and TV shows free with HD playback, offline downloads and multi-language subtitles.",
  packageId: "com.codeink.stsl.muvees",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.codeink.stsl.muvees",
  playRedeemUrl: "https://play.google.com/redeem",
  supportEmail: "support@muvees.app",
  siteUrl: "https://serviceworker-two.vercel.app/privacies/muvees",
  origin: "https://serviceworker-two.vercel.app",
  basePath: "/privacies/muvees",
  rating: "4.8",
  ratingCount: "12500",
  downloads: "500K+",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export type Feature = { icon: LucideIcon; title: string; desc: string };

export const CORE_FEATURES: Feature[] = [
  {
    icon: Clapperboard,
    title: "Endless Movies & TV",
    desc: "Browse a massive, always-updated catalog of movies and series, from new releases to all-time classics.",
  },
  {
    icon: Download,
    title: "Offline Downloads",
    desc: "Save titles straight to your device and watch on the plane, the train, or anywhere without a connection.",
  },
  {
    icon: Subtitles,
    title: "Multi-Language Subtitles",
    desc: "Switch between subtitle tracks on the fly in English, Spanish, Korean, French and many more.",
  },
  {
    icon: Languages,
    title: "Audio Language Switching",
    desc: "Pick your preferred audio track whenever a title ships with multiple languages.",
  },
  {
    icon: Server,
    title: "Multiple Sources",
    desc: "Smart source switching automatically finds the fastest working stream so playback just starts.",
  },
  {
    icon: History,
    title: "Resume Where You Left Off",
    desc: "Your watch history syncs your progress so you can pick up any movie or episode instantly.",
  },
  {
    icon: PictureInPicture2,
    title: "Picture-in-Picture",
    desc: "Keep watching in a floating window while you reply to messages or browse other apps.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    desc: "Personalized suggestions based on what you actually watch, not just what's trending.",
  },
];

export const STEPS = [
  {
    icon: Download,
    title: "Install Muvees",
    desc: "Get the app from Google Play in seconds. It's free, and no sign-up is required to start watching.",
  },
  {
    icon: Search,
    title: "Find something to watch",
    desc: "Search by title or explore trending, top-rated and upcoming rows curated for you.",
  },
  {
    icon: Clapperboard,
    title: "Press play",
    desc: "Muvees finds the best stream automatically and opens it in a clean, full-screen player.",
  },
  {
    icon: Heart,
    title: "Save & download",
    desc: "Add titles to your watchlist or download them for offline viewing on the go.",
  },
];

export const HIGHLIGHTS: Feature[] = [
  {
    icon: Tv,
    title: "HD Streaming",
    desc: "Crisp 1080p playback with adaptive quality that adjusts to your connection.",
  },
  {
    icon: Wifi,
    title: "Watch Offline",
    desc: "Downloaded titles live on your device with zero buffering and zero data.",
  },
  {
    icon: Cast,
    title: "Big-Screen Ready",
    desc: "Picture-in-picture and a distraction-free player built for binge sessions.",
  },
  {
    icon: ShieldCheck,
    title: "Private by Design",
    desc: "No account needed to watch. We collect the minimum and never sell your data.",
  },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  featured: boolean;
  perks: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    featured: false,
    cta: "Download Free",
    perks: [
      "Unlimited streaming",
      "Multi-language subtitles",
      "Watchlist & history",
      "Supported by occasional ads",
    ],
  },
  {
    name: "Pro",
    price: "Upgrade",
    cadence: "monthly / yearly / lifetime",
    featured: true,
    cta: "Go Pro",
    perks: [
      "Completely ad-free",
      "Unlimited offline downloads",
      "Priority source switching",
      "Early access to new features",
    ],
  },
];

export const FAQS = [
  {
    q: "Is Muvees free to use?",
    a: "Yes. Muvees is free to download and stream. An optional Pro upgrade removes ads and unlocks unlimited offline downloads, but the core experience is completely free.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to browse and watch. You only need an account or store login if you choose to purchase or restore a Pro subscription.",
  },
  {
    q: "Can I watch movies offline?",
    a: "Absolutely. Tap the download button on the player to save a title to your device, then watch it later with no internet connection.",
  },
  {
    q: "How do I change subtitles or audio language?",
    a: "Open the player controls and tap the subtitles or audio icon. You can switch between every track included with the title at any time during playback.",
  },
  {
    q: "How do I redeem a promo code?",
    a: "Open Muvees, head to the Offers screen and enter your code, or redeem store promo codes directly through Google Play. Pro benefits unlock automatically once the code is verified.",
  },
  {
    q: "Which devices are supported?",
    a: "Muvees runs on Android phones and tablets (Android 6.0 and above). Downloads are saved to your device's Downloads/Muvees folder.",
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Get the app", href: BRAND.playStoreUrl },
  ],
  company: [
    { label: "About", href: `${BRAND.basePath}/about` },
    { label: "Contact", href: `${BRAND.basePath}/contact` },
  ],
  legal: [
    { label: "Privacy Policy", href: `${BRAND.basePath}/privacy` },
    { label: "Terms of Service", href: `${BRAND.basePath}/tos` },
    { label: "EULA", href: `${BRAND.basePath}/eula` },
  ],
};

export const PERKS_QUICK = [
  { icon: Zap, label: "Instant playback" },
  { icon: Gift, label: "Free forever" },
  { icon: ShieldCheck, label: "No tracking" },
] as const;
