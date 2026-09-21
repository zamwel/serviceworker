// Central content for the Loudable legal pages (Privacy, Terms, EULA).
// URLs here must stay in sync with lib/core/constants/app_constants.dart
// in the Flutter project — privacyPolicyUrl / termsOfServiceUrl / eulaUrl
// point at exactly this route tree (root = privacy, /tos/, /eula/).

export const APP = {
  name: 'Loudable',
  tagline: 'Documents to audiobooks',
  oneLiner: 'Turn any document into a studio-quality audiobook — entirely on your device.',
  packageId: 'com.stsl.codeink.loudable',
  basePath: '/privacies/loudable',
  email: 'deverloper.codeink.playconsole@gmail.com',
  company: 'Codeink Technologies',
  lastUpdated: 'September 21, 2026',
} as const;

export type TabId = 'privacy' | 'tos' | 'eula' | 'cookies' | 'refund';

export const TABS: { id: TabId; label: string; href: string }[] = [
  { id: 'privacy', label: 'Privacy Policy', href: APP.basePath },
  { id: 'tos', label: 'Terms of Service', href: `${APP.basePath}/tos` },
  { id: 'eula', label: 'EULA', href: `${APP.basePath}/eula` },
  { id: 'cookies', label: 'Cookie Policy', href: `${APP.basePath}/cookies` },
  { id: 'refund', label: 'Refund Policy', href: `${APP.basePath}/refund` },
];
