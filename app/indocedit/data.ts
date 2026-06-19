// Central content for the InDocEdit marketing + legal pages.
// Single source of truth so the landing, about, contact and legal pages stay in sync.

export const APP = {
  name: 'InDocEdit',
  tagline: 'Scan. Edit. Search. Export.',
  oneLiner:
    'Turn photos, PDFs and videos into clean, editable text, then edit the words right on the document.',
  packageId: 'com.stsl.codeink.indocedit',
  playUrl:
    'https://play.google.com/store/apps/details?id=com.stsl.codeink.indocedit',
  email: 'deverloper.codeink.playconsole@gmail.com',
  company: 'Codeink Technologies',
  lastUpdated: 'June 18, 2026',
} as const;

export type Feature = { icon: string; title: string; desc: string };

export const FEATURES: Feature[] = [
  {
    icon: 'ScanLine',
    title: 'On‑device OCR',
    desc: 'Google ML Kit reads text from photos and scans instantly, with no account and no upload required.',
  },
  {
    icon: 'Wand2',
    title: 'Edit on the document',
    desc: 'Tap any line and change it right on the page. The result still looks like the original.',
  },
  {
    icon: 'Table',
    title: 'Tables & layout preserved',
    desc: 'Columns, line breaks and tabular data stay intact so documents read the way they should.',
  },
  {
    icon: 'Type',
    title: 'Rich formatting',
    desc: 'Pick fonts, sizes, weight, alignment and foreground/background colors with a real color picker.',
  },
  {
    icon: 'Search',
    title: 'Powerful search',
    desc: 'Real‑time, fuzzy and similarity search across everything you’ve scanned, with autocomplete.',
  },
  {
    icon: 'Share2',
    title: 'Export anywhere',
    desc: 'Save the updated document as PDF, image or text, then share or print in one tap.',
  },
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  { num: '01', title: 'Scan or import', desc: 'Capture with the camera or import a photo, PDF or video.' },
  { num: '02', title: 'Text is extracted', desc: 'On‑device OCR reads the page and keeps its layout, including tables.' },
  { num: '03', title: 'Edit on the page', desc: 'Tap a line to edit in place; style it with the formatting toolbar.' },
  { num: '04', title: 'Export & share', desc: 'Save as PDF, image or text, or share it straight from the app.' },
];

export type DocType = { icon: string; title: string; desc: string };

export const DOC_TYPES: DocType[] = [
  { icon: 'Image', title: 'Images', desc: 'Photos, screenshots and scanned pages.' },
  { icon: 'FileText', title: 'PDFs', desc: 'Extract and edit the real text layer, page by page.' },
  { icon: 'Video', title: 'Videos', desc: 'Capture on‑screen text from video frames (Pro).' },
  { icon: 'FileType', title: 'Text', desc: 'Open and refine plain‑text documents.' },
];

export const SEARCH_POINTS: string[] = [
  'Full‑text search across all scanned content',
  'Fuzzy matching that forgives typos',
  'Similarity search to find related documents',
  'Autocomplete from your history and titles',
];

export const PRIVACY_POINTS: string[] = [
  'OCR, editing and search run on your device',
  'Your documents are stored locally and never uploaded to us',
  'Camera & photos are used only for files you choose',
  'Pro removes ads entirely',
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
};

// Prices are illustrative; the live, localized price is always shown in-app at checkout.
export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: [
      'Up to 5 documents',
      'On‑device OCR & editing',
      'Search & export (with a short ad)',
      'Light & dark themes',
    ],
  },
  {
    name: 'Pro',
    price: 'From local price',
    cadence: 'monthly · annual · lifetime',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited documents',
      'Ad‑free, unlimited exports',
      'Video OCR & similarity search',
      'Priority processing',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Does InDocEdit work offline?',
    a: 'Yes. Text recognition, editing and search all run on your device, so most of the app works without a connection.',
  },
  {
    q: 'Can I really edit text on the document itself?',
    a: 'Yes, that\'s the core feature. Tap any recognised line and edit it in place on the image or PDF page, with full control over font, size, style and colors.',
  },
  {
    q: 'Are my documents private?',
    a: 'Your documents and extracted text stay on your device and are never uploaded to our servers.',
  },
  {
    q: 'What can I export?',
    a: 'You can export the edited document as a PDF, an image, or plain text, and share or print it.',
  },
  {
    q: 'How does Pro pricing work?',
    a: 'Pro is available as monthly, annual or a one‑time lifetime purchase through Google Play. The exact price is shown in your local currency at checkout.',
  },
  {
    q: 'Can I redeem a promo code?',
    a: 'Yes. Use “Redeem a code” in the app (Settings or the upgrade screen) to apply a Google Play promo or gift code.',
  },
];

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;
