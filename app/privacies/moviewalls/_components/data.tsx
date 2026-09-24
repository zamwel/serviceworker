import {
  Image as ImageIcon,
  Download,
  Search,
  Heart,
  Sparkles,
  Layers,
  Share2,
  Gift,
  ShieldCheck,
  Zap,
  Clapperboard,
  Palette,
  History,
  Filter,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   Brand / site constants — single source of truth for the MovieWalls
   marketing site. Update these in one place if store IDs, emails or URLs
   change. Mirrors AppConstants in the Flutter project (lib/core/constants).
   ──────────────────────────────────────────────────────────────────────── */
export const BRAND = {
  name: "MovieWalls",
  company: "Codeink Technologies",
  tagline: "Cinematic wallpapers, ready to download.",
  description:
    "MovieWalls turns movie and TV posters, backdrops and key art into a beautiful wallpaper library. Browse trending titles, save studio-quality artwork in seconds, and personalize every screen with the shows you love.",
  shortDescription:
    "Browse, favorite and download HD movie & TV posters and backdrops as wallpapers.",
  packageId: "com.codeink.stsl.movie_posters",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.codeink.stsl.movie_posters",
  playRedeemUrl: "https://play.google.com/redeem",
  supportEmail: "deverloper.codeink.playconsole@gmail.com",
  /* Official developer/publisher contact registered on the Google Play
     Console listing - required on the legal pages in addition to the
     in-app support address. */
  developerEmail: "deverloper.codeink.playconsole@gmail.com",
  siteUrl: "https://serviceworker-two.vercel.app/privacies/moviewalls",
  origin: "https://serviceworker-two.vercel.app",
  basePath: "/privacies/moviewalls",
  rating: "4.7",
  ratingCount: "3200",
  downloads: "100K+",
  logo: "/moviewalls/logo.png",
} as const;

/* Real Google Play listing screenshots (downloaded from the store listing),
   used as actual device mockups across the landing page instead of drawn
   placeholders. */
export const SCREENSHOTS = {
  home: { src: "/moviewalls/screenshots/shot1.png", alt: "MovieWalls home feed with Trending Now, Popular Wallpapers and Top Rated" },
  backdropDetail: { src: "/moviewalls/screenshots/shot2.png", alt: "Game of Thrones detail screen showing the Backdrops gallery" },
  synopsis: { src: "/moviewalls/screenshots/shot3.png", alt: "Title synopsis and details bottom sheet with rating, year and genres" },
  searchFilters: { src: "/moviewalls/screenshots/shot4.png", alt: "Search screen with the Filters sheet for popularity, region, genre and date range" },
  favorites: { src: "/moviewalls/screenshots/shot5.png", alt: "Favorites screen showing saved titles" },
  postersGrid: { src: "/moviewalls/screenshots/shot6.png", alt: "Posters gallery grid for Game of Thrones" },
  posterDetail: { src: "/moviewalls/screenshots/shot7.png", alt: "Game of Thrones detail screen showing the Posters gallery" },
  searchResults: { src: "/moviewalls/screenshots/shot8.png", alt: "Search results grid with favorite icons on every poster" },
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
    title: "Trending & Top Rated",
    desc: "A constantly refreshed feed of trending, popular and top-rated movies and TV shows to explore.",
  },
  {
    icon: ImageIcon,
    title: "Posters & Backdrops",
    desc: "Every title ships with a full gallery of official posters and cinematic backdrops in high resolution.",
  },
  {
    icon: Download,
    title: "One-Tap Download",
    desc: "Save any poster or backdrop straight to your device in a single tap.",
  },
  {
    icon: Smartphone,
    title: "Set as Wallpaper Directly",
    desc: "Apply artwork straight to your home screen, lock screen or both, no gallery app required.",
  },
  {
    icon: Search,
    title: "Powerful Search & Filters",
    desc: "Find exactly what you want by popularity, region, genre or release date range.",
  },
  {
    icon: Heart,
    title: "Favorites Library",
    desc: "Keep a personal collection of the titles and artwork you love, synced right on your device.",
  },
  {
    icon: Share2,
    title: "Share Instantly",
    desc: "Send any poster or backdrop to friends in a tap, straight from the detail screen.",
  },
  {
    icon: Layers,
    title: "Rich Movie Details",
    desc: "Ratings, synopses, release year and genres for every title, right alongside the artwork.",
  },
  {
    icon: Sparkles,
    title: "Fresh Picks Daily",
    desc: "Curated Trending Now, Popular Wallpapers and Top Rated rows updated around the clock.",
  },
];

export const STEPS = [
  {
    icon: Download,
    title: "Install MovieWalls",
    desc: "Get the app from Google Play in seconds. It's free, and no sign-up is required to start browsing.",
  },
  {
    icon: Search,
    title: "Find a title",
    desc: "Search by name or explore Trending Now, Popular Wallpapers and Top Rated collections.",
  },
  {
    icon: ImageIcon,
    title: "Pick your art",
    desc: "Flip between posters and backdrops for that title and preview them full-screen.",
  },
  {
    icon: Heart,
    title: "Save & set",
    desc: "Download, favorite or share your pick, then set it as your wallpaper straight away.",
  },
];

export const HIGHLIGHTS: Feature[] = [
  {
    icon: Palette,
    title: "Studio-Quality Art",
    desc: "Crisp, high-resolution posters and backdrops sourced straight from official artwork.",
  },
  {
    icon: History,
    title: "Always Fresh",
    desc: "New releases and updated collections mean there's always something new to set.",
  },
  {
    icon: Filter,
    title: "Precise Filters",
    desc: "Narrow results by popularity, region, genre IDs or a custom release date range.",
  },
  {
    icon: ShieldCheck,
    title: "Private by Design",
    desc: "No account needed to browse or download. We collect the minimum and never sell your data.",
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
      "Unlimited browsing",
      "Posters & backdrops for every title",
      "Favorites & search filters",
      "Watermarked downloads, supported by occasional ads",
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
      "Unlimited HD downloads",
      "No watermark on saved wallpapers",
      "Early access to new features",
    ],
  },
];

export const FAQS = [
  {
    q: "Is MovieWalls free to use?",
    a: "Yes. MovieWalls is free to download and browse. An optional Pro upgrade removes ads and the watermark and unlocks unlimited HD downloads, but the core experience is completely free.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to browse, favorite or download wallpapers. You only need a store login if you choose to purchase or restore a Pro subscription.",
  },
  {
    q: "Where do downloaded wallpapers get saved?",
    a: "Downloads are saved directly to your device's gallery, ready to set as your home or lock screen wallpaper.",
  },
  {
    q: "What's the difference between posters and backdrops?",
    a: "Posters are the vertical key art for a title; backdrops are wide, cinematic scene shots. Every title's detail screen lets you flip between both galleries.",
  },
  {
    q: "How do I redeem a promo code?",
    a: "Open MovieWalls, head to the Offers screen and enter your code, or redeem store promo codes directly through Google Play. Pro benefits unlock automatically once the code is verified.",
  },
  {
    q: "Which devices are supported?",
    a: "MovieWalls runs on Android phones and tablets (Android 6.0 and above).",
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Get the app", href: BRAND.playStoreUrl },
  ],
  legal: [
    { label: "Privacy Policy", href: `${BRAND.basePath}/privacy` },
    { label: "Terms of Service", href: `${BRAND.basePath}/tos` },
    { label: "EULA", href: `${BRAND.basePath}/eula` },
    { label: "Refund Policy", href: `${BRAND.basePath}/refund` },
  ],
};

export const PERKS_QUICK = [
  { icon: Zap, label: "Instant browsing" },
  { icon: Gift, label: "Free forever" },
  { icon: ShieldCheck, label: "No tracking" },
] as const;

export const LEGAL_TABS = [
  { id: "privacy", label: "Privacy Policy", href: `${BRAND.basePath}/privacy` },
  { id: "tos", label: "Terms of Service", href: `${BRAND.basePath}/tos` },
  { id: "eula", label: "EULA", href: `${BRAND.basePath}/eula` },
  { id: "refund", label: "Refund Policy", href: `${BRAND.basePath}/refund` },
] as const;
