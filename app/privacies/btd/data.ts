export const APP = {
  name: 'Bet of the Day',
  tagline: 'Daily AI Football Predictions',
  oneLiner: 'Daily high-confidence AI football predictions, expected goals (xG) metrics, and smart match breakdowns.',
  packageId: 'com.stsl.codeink.btd',
  basePath: '/privacies/btd',
  email: 'support@codeinktechnologies.com',
  company: 'Codeink Technologies',
  lastUpdated: 'September 17, 2026',
} as const;

export type TabId = 'privacy' | 'tos' | 'eula' | 'cookies' | 'refund';

export const TABS: { id: TabId; label: string; href: string }[] = [
  { id: 'privacy', label: 'Privacy Policy', href: APP.basePath },
  { id: 'tos', label: 'Terms of Service', href: ${APP.basePath}/tos },
  { id: 'eula', label: 'EULA', href: ${APP.basePath}/eula },
  { id: 'cookies', label: 'Cookie Policy', href: ${APP.basePath}/cookies },
  { id: 'refund', label: 'Refund Policy', href: ${APP.basePath}/refund },
];
