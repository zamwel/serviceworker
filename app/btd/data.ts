// Central content for the Bet of the Day (BTD) marketing site.
// Single source of truth so landing, features, about, support, and legal stay in sync.

export const BRAND = {
  name: 'Bet of the Day',
  shortName: 'BTD',
  tagline: 'Daily AI Football Predictions & Deep Analytics',
  oneLiner: 'Daily high-confidence AI football predictions, expected goals (xG) metrics, winning streak tracking, and smart match breakdowns for top leagues worldwide.',
  positioning: 'The data-driven edge in sports analytics',
  packageId: 'com.stsl.codeink.btd',
  company: 'Codeink Technologies',
  supportEmail: 'support@codeinktechnologies.com',
  siteUrl: 'https://serviceworker-two.vercel.app/btd',
  origin: 'https://serviceworker-two.vercel.app',
  basePath: '/btd',
  legalBasePath: '/privacies/btd',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.stsl.codeink.btd',
  fcmTopic: 'btd_all',
} as const;

export type Feature = {
  id: string;
  title: string;
  desc: string;
  tier: 'free' | 'pro';
  icon: string;
};

export const FEATURE_GROUPS: { label: string; features: Feature[] }[] = [
  {
    label: 'AI & Predictive Intelligence',
    features: [
      {
        id: 'smart_predictions',
        title: 'Smart AI Match Engine',
        desc: 'Multi-factor algorithm evaluating head-to-head records, recent form, injury reports, and home/away advantages to generate high-confidence outcomes (1X2, Over/Under, BTTS).',
        tier: 'free',
        icon: 'brain',
      },
      {
        id: 'xg_analytics',
        title: 'Expected Goals (xG) Models',
        desc: 'Advanced offensive and defensive goal probability models. See beyond basic match scores to understand team shot quality and performance variance.',
        tier: 'free',
        icon: 'gauge',
      },
      {
        id: 'vip_pro_picks',
        title: 'VIP High-Yield Selections',
        desc: 'Exclusive high-yield accumulator insights and weighted value bets curated by our highest-confidence mathematical thresholds.',
        tier: 'pro',
        icon: 'sparkles',
      },
      {
        id: 'streak_tracker',
        title: 'Winning Streak & Audit Log',
        desc: '100% transparent historical verification. Audit our historical prediction logs, hit rates, and winning streaks with zero hidden records.',
        tier: 'free',
        icon: 'trendingUp',
      },
    ],
  },
  {
    label: 'Match Center & Live Data',
    features: [
      {
        id: 'live_scores',
        title: 'Real-Time Match Center',
        desc: 'Live scores, match timers, real-time status badges, and second-by-second updates for scheduled and ongoing football fixtures.',
        tier: 'free',
        icon: 'activity',
      },
      {
        id: 'head_to_head',
        title: 'Comprehensive H2H History',
        desc: 'Deep head-to-head records across past seasons, goal differentials, average cards, and tactical matchup histories.',
        tier: 'free',
        icon: 'swords',
      },
      {
        id: 'league_coverage',
        title: 'Global League Coverage',
        desc: 'Premier League, UEFA Champions League, LaLiga, Serie A, Bundesliga, Ligue 1, Brasileirão, Europa League, and over 40 global leagues.',
        tier: 'free',
        icon: 'trophy',
      },
      {
        id: 'daily_free_unlocks',
        title: 'Daily Free Match Discovery',
        desc: 'Enjoy free daily unlock slots that refresh with every matchday, letting you test our AI analysis completely free before going Pro.',
        tier: 'free',
        icon: 'unlock',
      },
    ],
  },
  {
    label: 'Experience & Customization',
    features: [
      {
        id: 'push_alerts',
        title: 'Instant Matchday Push Alerts',
        desc: 'Receive immediate notifications as soon as daily AI predictions drop, matches kick off, or verified winning streaks update.',
        tier: 'free',
        icon: 'bell',
      },
      {
        id: 'theme_customization',
        title: 'Dynamic Accent Theme Engine',
        desc: 'Customize the entire UI with custom accent colors, sleek OLED dark mode, or crisp light theme without distracting borders.',
        tier: 'free',
        icon: 'palette',
      },
      {
        id: 'promo_codes',
        title: 'Promo & Community Drops',
        desc: 'Redeem promotional voucher codes and community giveaways to claim VIP PRO access directly inside the app.',
        tier: 'free',
        icon: 'ticket',
      },
      {
        id: 'ad_free',
        title: 'Completely Ad-Free Experience',
        desc: 'VIP Pro subscribers enjoy an ad-free interface with instant access to every prediction without video interstitials or banners.',
        tier: 'pro',
        icon: 'shieldCheck',
      },
    ],
  },
];

export const TRUST_POINTS: string[] = [
  'Auditable track record — every past prediction is archived and verified in our public analytics streak log',
  'Mathematical rigor — models driven by Poisson goal distributions, expected goals (xG), and 10+ seasons of team metrics',
  'Responsible analytics — built for research, entertainment, and disciplined sports enthusiasts with zero inflated claims',
  'Private & respectful — no betting account linking, no banking details captured, and full control over push notifications',
];

export type Step = { num: string; title: string; desc: string };

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Explore Today\'s Fixtures',
    desc: 'Browse daily scheduled fixtures across the Premier League, Champions League, LaLiga, and 40+ global competitions.',
  },
  {
    num: '02',
    title: 'Review AI Probability Models',
    desc: 'Examine data-backed predictions (1X2, Over/Under 2.5, BTTS), confidence scores, and expected goals (xG) metrics.',
  },
  {
    num: '03',
    title: 'Unlock Expert Analysis',
    desc: 'Use your free daily unlocks or upgrade to VIP PRO for unlimited, ad-free access to all high-yield predictions.',
  },
  {
    num: '04',
    title: 'Track Live Results & Streaks',
    desc: 'Follow live scores in real time and verify our accuracy across past winning streaks with full historical logs.',
  },
];

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: 'Free Discovery',
    price: '$0',
    cadence: 'free forever',
    features: [
      '2 free expert match unlocks every matchday',
      'Full access to all scheduled league fixtures',
      'Basic head-to-head and form analysis',
      'Real-time live scores and match timers',
      'Access to winning streak audit log',
    ],
  },
  {
    name: 'VIP Annual',
    price: '$29.99',
    cadence: 'billed annually (save 50%)',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited match unlocks across all leagues',
      'Full Expected Goals (xG) offensive & defensive breakdown',
      'Exclusive VIP accumulator & high-yield selections',
      'Completely ad-free experience',
      'Priority matchday push notifications',
      'Early access to updated model weights',
    ],
  },
  {
    name: 'VIP Monthly',
    price: '$4.99',
    cadence: 'billed monthly · cancel anytime',
    features: [
      'Unlimited match unlocks for 30 days',
      'Full xG and probability breakdowns',
      'Exclusive VIP high-yield recommendations',
      'Completely ad-free experience',
      'Instant cancellation via Google Play',
    ],
  },
  {
    name: 'VIP Lifetime',
    price: '$59.99',
    cadence: 'one-time payment · forever access',
    badge: 'Best Value',
    features: [
      'Lifetime unlimited access to all features',
      'Every future update and new league included',
      'All AI prediction model enhancements',
      'Zero subscriptions, zero recurring fees',
      'Premium VIP customer support',
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'How does the BTD AI prediction engine work?',
    a: 'Our models analyze thousands of historical matches, expected goals (xG), attacking and defensive efficiencies, player absences, and home/away splits. Using probability distributions, the system calculates the statistical likelihood for outcomes such as Match Winner (1X2), Over/Under 2.5 goals, and Both Teams to Score.',
  },
  {
    q: 'Can I use Bet of the Day for free?',
    a: 'Yes! Bet of the Day provides daily free unlock slots that refresh every day. You can review scheduled fixtures, live scores, team form, and unlock featured daily matches completely free without entering any payment information.',
  },
  {
    q: 'Are prediction winning streaks audited and verified?',
    a: 'Yes. Transparency is our core philosophy. The Advanced Analytics section in the app records every finished match, whether the prediction hit or missed, with the exact score and prediction type. We never delete or modify past outcomes.',
  },
  {
    q: 'What leagues are covered in the app?',
    a: 'We cover over 40 top competitions worldwide, including the English Premier League, UEFA Champions League, UEFA Europa League, Spanish LaLiga, Italian Serie A, German Bundesliga, French Ligue 1, Brazilian Série A, and top cup competitions.',
  },
  {
    q: 'How do I cancel or manage my VIP subscription?',
    a: 'All subscriptions are handled securely through Google Play Billing. You can manage or cancel your subscription at any time directly in your Google Play Store account settings under Subscriptions.',
  },
  {
    q: 'Is Bet of the Day a bookmaker or sportsbook?',
    a: 'No. Bet of the Day is an analytical tool and informational platform designed for football statistics, expected goals modeling, and sports research. We do not accept bets or handle gambling funds. We advocate responsible and disciplined engagement with sports data.',
  },
];

export const NAV_LINKS = [
  { label: 'Features', href: `${BRAND.basePath}/features` },
  { label: 'How It Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support', href: `${BRAND.basePath}/support` },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: `${BRAND.basePath}/features` },
    { label: 'How It Works', href: `${BRAND.basePath}#how` },
    { label: 'Pricing Plans', href: `${BRAND.basePath}#pricing` },
    { label: 'Download App', href: `${BRAND.basePath}/download` },
    { label: 'Offers & Promos', href: `${BRAND.basePath}/offers` },
  ],
  company: [
    { label: 'About BTD', href: `${BRAND.basePath}/about` },
    { label: 'Contact Us', href: `${BRAND.basePath}/contact` },
    { label: 'Support Center', href: `${BRAND.basePath}/support` },
  ],
  legal: [
    { label: 'Privacy Policy', href: BRAND.legalBasePath },
    { label: 'Terms of Service', href: `${BRAND.legalBasePath}/tos` },
    { label: 'EULA', href: `${BRAND.legalBasePath}/eula` },
    { label: 'Cookie Policy', href: `${BRAND.legalBasePath}/cookies` },
    { label: 'Refund Policy', href: `${BRAND.legalBasePath}/refund` },
  ],
};

export const STATS = [
  { value: '83.4%', label: 'Smart Win Rate', sub: 'High-confidence picks' },
  { value: '40+', label: 'Global Leagues', sub: 'EPL, UCL, LaLiga & more' },
  { value: '150k+', label: 'Matches Analyzed', sub: 'Continuous model training' },
  { value: '2 Free', label: 'Daily Unlocks', sub: 'Refreshed every matchday' },
];

export const REQUIREMENTS = {
  android: {
    label: 'Android',
    status: 'Live on Google Play',
    version: 'Android 7.0 (API 24) or later',
    ram: '2 GB RAM minimum',
    arch: 'arm64-v8a, armeabi-v7a, x86_64',
  },
  ios: {
    label: 'iOS',
    status: 'Coming Soon',
    version: 'iOS 14.0 or later',
  },
} as const;

export type SupportCategory = { label: string; items: Faq[] };

export const SUPPORT_FAQS: SupportCategory[] = [
  {
    label: 'Predictions & Analytics',
    items: [
      {
        q: 'How often are match predictions updated?',
        a: 'Predictions are generated each morning for the day\'s fixtures as lineups, injury reports, and match conditions crystallize, typically 6–12 hours prior to kickoff.',
      },
      {
        q: 'What does Expected Goals (xG) mean?',
        a: 'Expected Goals measures the quality of a scoring chance by calculating the probability that a shot from a given position with specific pitch context results in a goal.',
      },
      {
        q: 'What do the confidence badges indicate?',
        a: 'Confidence badges (Safe, Value, Risky) represent the algorithmic alignment between our statistical projection and the bookmaker odds.',
      },
    ],
  },
  {
    label: 'Subscriptions & VIP Access',
    items: [
      {
        q: 'How do I restore my purchase on a new phone?',
        a: 'Open Settings inside the Bet of the Day app and tap Restore Purchases. RevenueCat and Google Play will automatically detect and reactivate your entitlement.',
      },
      {
        q: 'Can I redeem a promotional voucher code?',
        a: 'Yes. Head to Settings > Offers & Promo Codes, type your code into the redemption box, and tap Claim to instantly unlock VIP access.',
      },
      {
        q: 'What is the refund policy?',
        a: 'Purchases are fulfilled by Google Play. If you purchased by mistake, you can request a refund directly through the Google Play Store Order History within 48 hours.',
      },
    ],
  },
];
