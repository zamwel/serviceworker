// Central content for the IILuk marketing + legal pages.
// Single source of truth so landing, about, contact and legal pages stay in sync.

export const APP = {
  name: 'IILuk',
  tagline: 'Give your photos a second look',
  oneLiner:
    'Restore, colorize, enhance and clean up photos with on-device AI — nothing you edit ever leaves your phone.',
  packageId: 'com.stsl.codeink.iiluk',
  playUrl: 'https://play.google.com/store/apps/details?id=com.stsl.codeink.iiluk',
  email: 'admin@abelarai.com',
  company: 'Codeink Technologies',
  lastUpdated: 'July 15, 2026',
} as const;

export type Tool = { icon: string; image: string; title: string; desc: string; tag: 'gold' | 'teal' };

// Mirrors the app's actual 7-tool lineup (Home's "what IILuk can do" grid) —
// keep this list and its images in sync with lib/features/tools/tool_config.dart
// in the Flutter project if a tool is ever added, renamed, or removed there.
export const TOOLS: Tool[] = [
  {
    icon: 'wandMagicSparkles',
    image: '/iiluk/tools/tool_restore.png',
    title: 'Restore',
    desc: 'Repair scratches, tears, creases and fading. Bring damaged memories back to life in seconds.',
    tag: 'gold',
  },
  {
    icon: 'palette',
    image: '/iiluk/tools/tool_colorize.png',
    title: 'Colorize',
    desc: 'Transform black-and-white photos into vibrant, true-to-life color with a neural colorization engine.',
    tag: 'teal',
  },
  {
    icon: 'wandSparkles',
    image: '/iiluk/tools/tool_enhance.png',
    title: 'Enhance',
    desc: 'One-tap HD quality — sharpen blurry shots and clean up noise with a real super-resolution engine.',
    tag: 'gold',
  },
  {
    icon: 'expand',
    image: '/iiluk/tools/tool_upscale.png',
    title: 'Upscale',
    desc: 'Boost resolution up to 4× while keeping detail crisp, entirely on your phone.',
    tag: 'teal',
  },
  {
    icon: 'scissors',
    image: '/iiluk/tools/tool_bgremover.png',
    title: 'Remove Background',
    desc: 'Cut out the background from a portrait, product or object with one tap.',
    tag: 'gold',
  },
  {
    icon: 'eraser',
    image: '/iiluk/tools/tool_earaser.png',
    title: 'Magic Eraser',
    desc: 'Paint over an object or watermark and it disappears — cleanly, without leaving artifacts. Works on PDF pages too.',
    tag: 'teal',
  },
  {
    icon: 'userGroup',
    image: '/iiluk/tools/tool_faceswap.png',
    title: 'Face Swap',
    desc: 'Paste a face from another photo — or a short video — with the same on-device precision as every other tool.',
    tag: 'gold',
  },
];

export type HeroSlide = { image: string; alt: string };

// One slide per tool that has real hero artwork — see public/iiluk/hero/.
// Magic Eraser has no dedicated hero illustration yet, so it's not in this list
// (it's still fully present in TOOLS above).
export const HERO_SLIDES: HeroSlide[] = [
  { image: '/iiluk/hero/restore.png', alt: 'Photo restoration before and after' },
  { image: '/iiluk/hero/colorize.png', alt: 'Black-and-white photo colorization' },
  { image: '/iiluk/hero/enhance.png', alt: 'One-tap photo enhancement' },
  { image: '/iiluk/hero/upscale.png', alt: '4x photo upscaling' },
  { image: '/iiluk/hero/bgRemover.png', alt: 'Background removal' },
  { image: '/iiluk/hero/faceSwap.png', alt: 'On-device face swap' },
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  { num: '01', title: 'Pick a photo', desc: 'From your gallery or camera — nothing is uploaded to start.' },
  { num: '02', title: 'Choose a tool', desc: 'Restore, colorize, enhance, upscale, erase or remove the background.' },
  { num: '03', title: 'Layer another', desc: 'Undo, redo, or apply a second effect to the same photo in one session.' },
  { num: '04', title: 'Save or share', desc: 'Export at full resolution, straight from your device.' },
];

export const PRIVACY_POINTS: string[] = [
  'Every model runs on your device — restoring, colorizing and erasing all happen locally',
  'Your photos are never uploaded to our servers',
  'Camera & photo access is used only for the file you choose to open',
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
      '3 uses per tool, per day',
      'Restore, colorize & enhance',
      'Watch a short ad for 12-hour Pro',
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
      'Unlimited restore, colorize & enhance',
      'Background & watermark removal',
      'PDF watermark removal',
      'Full-resolution export, no ads',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Do my photos ever leave my phone?',
    a: 'No. Every AI model — restoration, colorization, upscaling, background and watermark removal — runs entirely on your device. Nothing is uploaded to process a photo.',
  },
  {
    q: 'Does IILuk work offline?',
    a: 'Yes, once a tool’s model is downloaded (a one-time download, done from Settings or on first use), that tool works with no connection at all.',
  },
  {
    q: 'Can I use more than one tool on the same photo?',
    a: 'Yes. Photos open in a single editor — apply restore, then colorize, then enhance, with full undo/redo between steps, and export once you’re happy.',
  },
  {
    q: 'What’s the difference between Free and Pro?',
    a: 'Free gives you 3 uses per tool per day, or watch a short ad for 12 hours of unlimited Pro access. A Pro subscription or lifetime purchase removes the daily limits and ads entirely.',
  },
  {
    q: 'Can I remove watermarks from a PDF, not just a photo?',
    a: 'Yes — mark the stamp on any page and IILuk erases it using the same on-device inpainting engine as the photo eraser.',
  },
  {
    q: 'Do I keep my AI models if I reinstall the app?',
    a: 'Yes. Turn on “Keep models after uninstall” in Settings and pick a folder once — reinstalling and picking that same folder restores everything instantly, no re-download.',
  },
];

export const NAV_LINKS = [
  { label: 'Tools', href: '#tools' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;
