// Central content for the Loudable marketing site (Section 0.5 of the blueprint).
// FEATURES mirrors Section 0.3 "Feature Inventory — Mobile App" verbatim so the
// landing grid, the app's onboarding showcase and paywall checklist stay in sync.
// If a feature is added, renamed or removed there, update it here too.

export const BRAND = {
  name: 'Loudable',
  tagline: 'Documents to audiobooks',
  oneLiner: 'Turn any document into a studio-quality audiobook — entirely on your device.',
  positioning: 'The private audiobook studio in your pocket',
  packageId: 'com.stsl.codeink.loudable',
  company: 'Codeink Technologies',
  supportEmail: 'support@loudable.app',
  siteUrl: 'https://serviceworker-two.vercel.app/loudable',
  origin: 'https://serviceworker-two.vercel.app',
  basePath: '/loudable',
  legalBasePath: '/privacies/loudable',
  // Not live yet — see LOUDABLE_APP_BLUEPRINT.md Section 0.11 open items.
  playStoreUrl: '',
} as const;

export type Feature = { id: string; title: string; desc: string; tier: 'free' | 'pro'; icon: string };

export const FEATURE_GROUPS: { label: string; features: Feature[] }[] = [
  {
    label: 'Import & understanding',
    features: [
      { id: 'document_import', title: 'Universal Document Import', desc: 'Bring in PDF, DOCX, EPUB, TXT, Markdown, RTF and images. Loudable reads the structure, not just the characters.', tier: 'free', icon: 'fileStack' },
      { id: 'camera_scan', title: 'Camera Scan', desc: 'Photograph printed pages and Loudable straightens, de-shadows and reads them aloud. Books, letters, contracts, whiteboards.', tier: 'free', icon: 'camera' },
      { id: 'on_device_ocr', title: 'On-Device OCR', desc: 'Scanned and image-only PDFs are recognised locally. No page ever uploads to a server.', tier: 'free', icon: 'scanText' },
      { id: 'layout_intelligence', title: 'Layout Intelligence', desc: 'Understands columns, headers, footers, footnotes, tables and captions — so narration follows real reading order.', tier: 'free', icon: 'layoutGrid' },
      { id: 'chapter_detection', title: 'Automatic Chapters', desc: 'Detects headings and section breaks and builds a real chapter list you can navigate, bookmark and resume.', tier: 'free', icon: 'listOrdered' },
    ],
  },
  {
    label: 'Voice & audio',
    features: [
      { id: 'neural_voices', title: 'Neural Voices', desc: 'Natural on-device narration that breathes at commas and stops at full stops. Not the system robot voice.', tier: 'free', icon: 'audioLines' },
      { id: 'premium_voice_library', title: 'Premium Voice Library', desc: 'Studio-grade narrators across accents and languages, downloadable and switchable mid-book.', tier: 'pro', icon: 'mic' },
      { id: 'pronunciation_control', title: 'Pronunciation Control', desc: 'Teach Loudable your names, acronyms, drug names, case citations and technical terms once — it remembers everywhere.', tier: 'pro', icon: 'spellCheck' },
      { id: 'audio_playback', title: 'Full Audiobook Player', desc: 'Chapters, bookmarks, 0.5x–3x speed, sleep timer, background play, lock screen, headphone and car controls.', tier: 'free', icon: 'headphones' },
      { id: 'listening_memory', title: 'Listening Memory', desc: 'Every document remembers its exact position, down to the sentence, across restarts and devices.', tier: 'free', icon: 'bookMarked' },
    ],
  },
  {
    label: 'Intelligence',
    features: [
      { id: 'translation', title: 'Offline Translation', desc: 'Read a foreign-language document in your own language. Translation runs on the device — the document never leaves it.', tier: 'pro', icon: 'languages' },
      { id: 'summarisation', title: 'Summaries & Key Points', desc: 'Get a spoken executive summary before you commit to the full document, or a per-chapter recap after.', tier: 'pro', icon: 'fileText' },
      { id: 'semantic_search', title: 'Search Inside Everything', desc: 'Find any phrase across your whole library and jump straight to that moment in the audio.', tier: 'free', icon: 'search' },
      { id: 'notes_highlights', title: 'Notes & Highlights', desc: 'Mark a passage while listening. Loudable keeps the text, the timestamp and your note together.', tier: 'free', icon: 'highlighter' },
    ],
  },
  {
    label: 'Library & output',
    features: [
      { id: 'collections', title: 'Collections', desc: 'Group documents into projects, matters, courses or reading lists.', tier: 'free', icon: 'layers' },
      { id: 'discover_catalog', title: 'Discover', desc: 'Seed your library from tens of thousands of public-domain books and human-narrated classics.', tier: 'free', icon: 'compass' },
      { id: 'batch_conversion', title: 'Batch Conversion', desc: 'Queue an entire folder overnight. Loudable converts while you sleep and charges.', tier: 'pro', icon: 'listChecks' },
      { id: 'audio_export', title: 'Audio Export', desc: 'Export finished audiobooks as M4B with chapter markers, or MP3 per chapter, for any player you like.', tier: 'pro', icon: 'fileOutput' },
      { id: 'unlimited_length', title: 'Unlimited Document Length', desc: 'Thousand-page technical manuals, full theses, complete case files. No page ceiling.', tier: 'pro', icon: 'infinity' },
    ],
  },
];

export const TRUST_POINTS: string[] = [
  'Every model runs on your device — parsing, OCR, narration, translation and summaries all happen locally',
  'Your documents are never uploaded to our servers, even to work',
  'Verifiable, not just promised — turn on airplane mode and convert a document; it works exactly the same',
  'Pro removes ads entirely, and Pro users never see one in the first place',
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  { num: '01', title: 'Bring in a document', desc: 'A file, a scan, a shared link, or a book from Discover — Loudable reads its actual structure.' },
  { num: '02', title: 'Choose a voice', desc: 'Pick a narrator, a speed, and a language — translate it on the way if you need to.' },
  { num: '03', title: 'Convert on-device', desc: 'Parsing, OCR and narration run locally. Queue it and lock your phone — it keeps going.' },
  { num: '04', title: 'Listen anywhere', desc: 'Chapters, bookmarks, sleep timer and car controls, exactly like any audiobook.' },
];

export type Plan = { name: string; price: string; cadence: string; highlight?: boolean; features: string[] };

export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: [
      '3 audiobook conversions per day',
      'Documents up to 40 pages per conversion',
      '2 standard voices',
      'Full player: chapters, bookmarks, background play',
    ],
  },
  {
    name: 'Pro',
    price: 'Monthly · annual · lifetime',
    cadence: '7-day free trial on annual',
    highlight: true,
    features: [
      'Unlimited conversions, no daily cap, no length limit',
      'The full premium voice library, in every supported language',
      'Offline translation and AI summaries',
      'M4B/MP3 export, overnight batch conversion, no ads ever',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: 'Do my documents ever leave my phone?', a: 'No. Parsing, OCR, layout recovery, narration, translation and summarisation all run on your device. Nothing is uploaded to process a document — you can verify this yourself in airplane mode.' },
  { q: 'What file types can I import?', a: 'PDF, DOCX, EPUB, TXT, Markdown and RTF, plus scanned or photographed pages via the camera. Loudable recovers real reading order — columns, footnotes and tables included — not just raw text.' },
  { q: 'What’s the difference between Free and Pro?', a: 'Free gives you 3 conversions a day on documents up to 40 pages, with 2 voices. Pro removes every limit, adds the full voice library, offline translation, AI summaries, export and batch conversion, and removes ads entirely.' },
  { q: 'Does Loudable work offline?', a: 'Yes. Once a voice model is downloaded, conversion and playback need no connection at all. Only Discover’s catalog browsing and account/billing features need network access.' },
  { q: 'Can I translate a document into another language?', a: 'Yes — Pro includes offline translation into 20 languages, so you can listen to a document in a language other than the one it was written in.' },
  { q: 'Where does Discover’s catalog come from?', a: 'Discover indexes tens of thousands of public-domain books and human-narrated classics, so you can seed your library even before you’ve imported your first document.' },
];

export const NAV_LINKS = [
  { label: 'Features', href: `${BRAND.basePath}/features` },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: `${BRAND.basePath}/support` },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: `${BRAND.basePath}/features` },
    { label: 'How it works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Download', href: `${BRAND.basePath}/download` },
    { label: 'Redeem a code', href: `${BRAND.basePath}/offers` },
  ],
  company: [
    { label: 'About', href: `${BRAND.basePath}/about` },
    { label: 'Contact', href: `${BRAND.basePath}/contact` },
    { label: 'Support', href: `${BRAND.basePath}/support` },
  ],
  legal: [
    { label: 'Privacy Policy', href: BRAND.legalBasePath },
    { label: 'Terms of Service', href: `${BRAND.legalBasePath}/tos` },
    { label: 'EULA', href: `${BRAND.legalBasePath}/eula` },
    { label: 'Cookie Policy', href: `${BRAND.legalBasePath}/cookies` },
    { label: 'Refund Policy', href: `${BRAND.legalBasePath}/refund` },
  ],
};

export const REQUIREMENTS = {
  android: {
    label: 'Android',
    status: 'Launching first',
    version: 'Android 7.0 (API 24) or later',
    ram: '3 GB RAM minimum — devices below this get a lighter model set automatically, never a crash',
    arch: 'arm64-v8a, armeabi-v7a and x86_64 (emulator)',
  },
  ios: {
    label: 'iOS',
    status: 'Planned for v1.1',
    version: 'iOS 14.0 or later',
  },
} as const;

export type SupportCategory = { label: string; items: Faq[] };

export const SUPPORT_FAQS: SupportCategory[] = [
  {
    label: 'Getting started',
    items: [
      { q: 'What file types can I import?', a: 'PDF, DOCX, EPUB, TXT, Markdown and RTF, plus photographed or scanned pages via the camera. Loudable recovers real reading order — columns, footnotes and tables included.' },
      { q: 'How long does a conversion take?', a: 'It depends on document length and your device, but playback starts progressively — you can start listening to the first chapter while the rest keeps converting in the background.' },
      { q: 'Can I use more than one tool on the same document?', a: 'Yes. Documents open in a single view — narrate, translate, and summarise the same document without starting over.' },
    ],
  },
  {
    label: 'Voices & narration',
    items: [
      { q: 'How do I change the narration voice?', a: 'Open a document’s conversion settings, or go to Settings > Voice Library to browse and download additional voices, including premium ones on Pro.' },
      { q: 'Do voices need to be downloaded first?', a: 'Yes, each voice is a one-time download. Once downloaded, it works fully offline for every future conversion.' },
      { q: 'Can Loudable pronounce names and acronyms correctly?', a: 'Pro’s pronunciation dictionary lets you teach Loudable a name, acronym or technical term once, in Settings > Pronunciation — it’s remembered across every document from then on.' },
    ],
  },
  {
    label: 'Billing & Pro',
    items: [
      { q: 'How do I restore a purchase?', a: 'Pro is tied to your Google Play account. Reinstalling or switching devices with the same account restores it automatically; if it doesn’t, use “Restore purchase” in Settings.' },
      { q: 'How do I cancel my subscription?', a: 'Subscriptions are managed entirely through Google Play — open Play Store > Subscriptions to change or cancel. Loudable never handles your billing details directly.' },
      { q: 'Is there a free way to try Pro?', a: 'The annual plan includes a 7-day free trial, and you can also unlock 12 hours of Pro at a time by watching a short set of rewarded ads from onboarding or the paywall.' },
    ],
  },
  {
    label: 'Troubleshooting',
    items: [
      { q: 'A conversion seems stuck.', a: 'Large or heavily scanned documents can take longer on older hardware. If it’s been unusually long, cancel the conversion from the document’s detail page and retry — this rebuilds the pipeline from a clean state.' },
      { q: 'OCR quality is poor on a scanned page.', a: 'Straighten the page and ensure even lighting before scanning — Loudable de-shadows automatically, but heavy glare or a curled page still hurts recognition. Re-scanning usually resolves it.' },
      { q: 'I deleted a document by accident.', a: 'Check Settings > Recycle Bin — deleted documents are kept there for a period before being permanently removed, and can be restored from there.' },
    ],
  },
];

export type OfferFaq = Faq;

export const OFFER_HIGHLIGHTS: string[] = [
  'Open the app and go to the Offers screen, or tap “Redeem a code” from Settings',
  'Enter your code — Pro benefits unlock automatically once it verifies',
  'No code yet? Watch a short set of rewarded ads from onboarding or the paywall for 12 hours of Pro instead',
];

export const OFFER_FAQS: OfferFaq[] = [
  { q: 'Where do I get a promo code?', a: 'Codes are occasionally issued through Codeink Technologies’ own channels and partner promotions. There’s no need to search for one — the app works fully on the free tier without one.' },
  { q: 'Do codes expire?', a: 'Yes, each code has its own validity window. If a code doesn’t redeem, it may have expired or already been used.' },
  { q: 'Does redeeming a code require an account?', a: 'No. Redemption uses an anonymous device identifier, not an account — it’s the same privacy-first approach as the rest of the app.' },
];
