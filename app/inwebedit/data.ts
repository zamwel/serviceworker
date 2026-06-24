// Central content for all InWebEdit marketing pages.

export const APP = {
  name: 'InWebEdit',
  tagline: 'Load any website and start editing live.',
  shortDesc: 'The live website editor that fits in your pocket.',
  oneLiner:
    'Load any URL, edit text and images directly on the page, then export pixel-perfect screenshots, PDFs, or full HTML — all from your phone.',
  packageId: 'com.abelarai.inwebedit',
  playUrl: 'https://play.google.com/store/apps/details?id=com.abelarai.inwebedit',
  email: 'admin@abelarai.com',
  company: 'Abelar AI',
  lastUpdated: 'June 24, 2026',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Export', href: '#export' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export type Feature = {
  icon: string;
  title: string;
  desc: string;
};

export const FEATURES: Feature[] = [
  {
    icon: 'Globe',
    title: 'Any website, instantly',
    desc: 'Paste any public URL and InWebEdit loads it in a full-featured in-app browser. Every live page becomes your canvas without installing a browser extension or touching a laptop.',
  },
  {
    icon: 'PenLine',
    title: 'True inline editing',
    desc: 'Tap any heading, paragraph or caption and start typing. The page\'s own layout, typefaces and spacing stay intact around every edit — you are working on the real DOM, not a copy.',
  },
  {
    icon: 'ImageIcon',
    title: 'Image replacement',
    desc: 'Tap any image to change its source URL, swap in a photo from your library, adjust its dimensions or update its alt text — all without touching code.',
  },
  {
    icon: 'Type',
    title: 'Rich text toolbar',
    desc: 'Bold, italic, underline, text alignment, font size, foreground color, background highlight, and hyperlinks — a full formatting suite that floats above the keyboard as you edit.',
  },
  {
    icon: 'RotateCcw',
    title: 'Undo / redo',
    desc: 'Complete edit history tracked in real time. Step backward or forward through every single change as many times as you need, with zero data loss.',
  },
  {
    icon: 'History',
    title: 'Browsing history',
    desc: 'Every URL you have visited is saved with its title, favicon, and timestamp. Your three most recent sites appear on the home screen — reopen any of them in a single tap.',
  },
  {
    icon: 'FolderOpen',
    title: 'Docs library',
    desc: 'All exports are saved automatically to the Docs tab. Open screenshots in a pinch-to-zoom viewer, share files to any app, or revisit past exports at any time.',
  },
  {
    icon: 'LinkIcon',
    title: 'Link interception',
    desc: 'In Edit mode, tapping a hyperlink selects it rather than navigating away. Edit the link text or destination, then continue on the same page without losing your work.',
  },
];

export type Step = { num: string; icon: string; title: string; desc: string };

export const STEPS: Step[] = [
  {
    num: '01',
    icon: 'Globe',
    title: 'Paste any URL',
    desc: 'Type or paste a website address into the home screen bar and tap the arrow. InWebEdit loads the live page in its full, unaltered state.',
  },
  {
    num: '02',
    icon: 'PenLine',
    title: 'Enable Edit mode',
    desc: 'Tap the Edit button in the bottom bar. The entire page becomes content-editable. Tap any text element and start typing directly on it.',
  },
  {
    num: '03',
    icon: 'Type',
    title: 'Format & style',
    desc: 'Use the floating toolbar to apply bold, adjust size, change color, or realign. Every change is reflected live on the page and tracked in history.',
  },
  {
    num: '04',
    icon: 'Share2',
    title: 'Export & share',
    desc: 'Open the Export sheet from the bottom bar. Choose a screenshot mode, PDF, HTML or plain text, then share the resulting file straight from your phone.',
  },
];

export type ExportMode = { title: string; desc: string };

export const EXPORT_MODES: ExportMode[] = [
  {
    title: 'Viewport screenshot',
    desc: 'Captures exactly what is visible on screen at native resolution — the quickest way to grab a clean image of any page.',
  },
  {
    title: 'Full-page screenshot',
    desc: 'Scrolls the entire page programmatically and stitches every section into one continuous, high-resolution image.',
  },
  {
    title: 'Section crop',
    desc: 'Draw a selection box directly on the live page to isolate and capture any specific element — hero banners, pricing cards, nav bars.',
  },
  {
    title: 'PDF export',
    desc: 'Saves the edited page as a properly formatted A4 PDF file, ready to share, attach or print.',
  },
  {
    title: 'HTML export',
    desc: 'Downloads the complete edited DOM as an .html file. All inline styles applied during editing are preserved.',
  },
  {
    title: 'Text extract',
    desc: 'Pulls clean, formatted plain text from the entire page — useful for copying content, taking notes, or pasting into other tools.',
  },
];

export type Audience = { icon: string; title: string; desc: string };

export const AUDIENCES: Audience[] = [
  {
    icon: 'Palette',
    title: 'Designers',
    desc: 'Show clients live content changes on their real website without needing a staging environment, a code editor, or a laptop in the room.',
  },
  {
    icon: 'TrendingUp',
    title: 'Marketers',
    desc: 'Build competitor page mockups, visualise copy A/B variants, and create ad creatives directly from live landing pages — in minutes.',
  },
  {
    icon: 'Code2',
    title: 'Developers',
    desc: 'Prototype content changes against the real DOM, check text fit at different sizes, then export the edited HTML to hand off to your team.',
  },
  {
    icon: 'Video',
    title: 'Content creators',
    desc: 'Capture custom-styled screenshots of real pages for posts, stories, thumbnails and presentations — styled exactly the way you want them.',
  },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  featured: boolean;
  badge?: string;
  cta: string;
  perks: string[];
};

export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    featured: false,
    cta: 'Download free',
    perks: [
      'Load and browse any website',
      'Live inline text & image editing',
      'Rich text formatting toolbar',
      'Full undo / redo history',
      'Viewport screenshots',
      'Browsing history & recents',
      'Docs library',
    ],
  },
  {
    name: 'Pro',
    price: 'From local price',
    cadence: 'monthly · annual',
    featured: true,
    badge: 'Most popular',
    cta: 'Get Pro',
    perks: [
      'Everything in Free',
      'Full-page & section screenshots',
      'PDF export (A4)',
      'HTML source export',
      'Text extract',
      'Backend & webhook integration',
      'No watermarks on exports',
      'Priority support',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Does InWebEdit require an account or sign-up?',
    a: 'No. Open the app, paste a URL, and start editing. There is no account, no login, and no personal data collected at any point.',
  },
  {
    q: 'Can it edit any website?',
    a: 'InWebEdit works on the vast majority of public websites. A small number of sites run JavaScript that overrides or resets contenteditable — the Edit button re-injects the editor on demand when this happens.',
  },
  {
    q: 'How does the full-page screenshot work?',
    a: 'InWebEdit injects html2canvas into the WebView at runtime. It scrolls the page programmatically, captures each visible section, and stitches everything into one continuous PNG. For sites where html2canvas has trouble with cross-origin resources, the optional server-side Puppeteer integration handles those cases.',
  },
  {
    q: 'What is the section crop tool exactly?',
    a: 'Section crop activates a tap listener on the live page. When you tap an element, InWebEdit builds a precise CSS selector for it and captures just that element at full resolution — perfect for isolating hero sections, pricing cards, navigation bars, or any specific component.',
  },
  {
    q: 'What is included in the HTML export?',
    a: 'HTML export saves the full edited DOM as an .html file. All inline styles applied during editing are preserved. External resources — images, stylesheets, scripts — reference their original URLs, so the file renders correctly in any browser with a connection.',
  },
  {
    q: 'What does the backend integration do?',
    a: 'Pro users can configure a REST API base URL, an API key, a webhook URL, and an optional Puppeteer screenshot service URL. On save, InWebEdit posts the page URL, full edited HTML, and metadata to your endpoint as a JSON payload with an Authorization: Bearer header.',
  },
  {
    q: 'How do I earn Pro for free?',
    a: 'From the home screen, tap "Earn Pro Free" and watch five short videos. Once all five are completed, InWebEdit unlocks full Pro access for 12 hours with no payment, no subscription, and no credit card required.',
  },
  {
    q: 'How does Pro pricing work?',
    a: 'Pro is available as a monthly or annual subscription through Google Play. The exact price is displayed in your local currency at the checkout screen before any purchase is made.',
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '/inwebedit#features' },
    { label: 'How it works', href: '/inwebedit#how' },
    { label: 'Pricing', href: '/inwebedit#pricing' },
    { label: 'FAQ', href: '/inwebedit#faq' },
    { label: 'Download', href: 'https://play.google.com/store/apps/details?id=com.abelarai.inwebedit' },
  ],
  company: [
    { label: 'About', href: '/inwebedit/about' },
    { label: 'Contact', href: '/inwebedit/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/inwebedit/legal?tab=privacy' },
    { label: 'Terms of Service', href: '/inwebedit/legal?tab=tos' },
    { label: 'EULA', href: '/inwebedit/legal?tab=eula' },
  ],
};
