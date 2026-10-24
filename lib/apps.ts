export type OfferItem = {
  id: string;
  title: string;
  description: string;
  type: "lifetime" | "subscription" | "credits";
  durationDays?: number;
  price: number;
  currency: string;
  isFree: boolean;
  badge?: string;
  actionUrl?: string;
};

export type AppEntry = {
  id: string;
  name: string;
  prefix: string;
  fcmTopic: string;
  packageName?: string;
  firebaseAppId?: string;
  channelId?: string;
  offers?: OfferItem[];
};

// ─── App registry ─────────────────────────────────────────────────────────────
// To add a new app: append one entry below. Every field is required except
// `offers` (omit if the app has no server-defined promotional offers yet).
// `packageName` restricts push notifications on the client device so that
// notifications sent to a shared topic (e.g. "all") are only delivered to
// the intended app and never leak to other apps in the same Firebase project.
// ──────────────────────────────────────────────────────────────────────────────
export const APPS: AppEntry[] = [
  {
    id: "muvees",
    name: "Muvees",
    prefix: "MV",
    fcmTopic: "all",
    packageName: "com.codeink.stsl.muvees",
    firebaseAppId: "1:1083709001383:android:ce7fab718977e78da4d582",
    channelId: "muvees_broadcasts",
    offers: [
      // Example — uncomment and customise to show a card in the Flutter app:
      // {
      //   id: "muvees-launch-2025",
      //   title: "Launch Special",
      //   description: "Redeem a promo code for free lifetime Pro access.",
      //   type: "lifetime",
      //   price: 0,
      //   currency: "USD",
      //   isFree: true,
      //   badge: "LIMITED",
      // },
    ],
  },
  {
    id: "femcareplus",
    name: "FemCarePlus",
    prefix: "FC",
    fcmTopic: "femcareplus_all",
    packageName: "com.codeink.technologes.sanitarypad",
    firebaseAppId: "1:1083709001383:android:17cbdc92721b025fa4d582",
    channelId: "femcareplus_broadcasts",
  },
  {
    id: "btd",
    name: "BetOfTheDay",
    prefix: "BTD",
    fcmTopic: "btd_all",
    packageName: "com.stsl.codeink.btd",
    firebaseAppId: "1:1083709001383:android:1f6cfd2fd891a35aa4d582",
    channelId: "btd_broadcasts",
  },
  {
    id: "loudable",
    name: "Loudable",
    prefix: "LOU",
    fcmTopic: "loudable_all",
    packageName: "com.stsl.codeink.loudable",
    firebaseAppId: "1:1083709001383:android:2efdb59dd44d6491a4d582",
    channelId: "loudable_broadcasts",
  },
  {
    id: "indocedit",
    name: "IndocEdit",
    prefix: "IE",
    fcmTopic: "indocedit_all",
    packageName: "com.stsl.codeink.indocedit",
    firebaseAppId: "1:1083709001383:android:cc82200fc6d64dc1a4d582",
    channelId: "indocedit_broadcasts",
  },
  {
    id: "iiluk",
    name: "IILuk",
    prefix: "IL",
    fcmTopic: "all_iiluk",
    packageName: "com.stsl.codeink.iiluk",
    firebaseAppId: "1:1083709001383:android:eb6389319aef6755a4d582",
    channelId: "iiluk_broadcasts",
  },
  {
    id: "subswatcher",
    name: "SubsWatcher",
    prefix: "SW",
    fcmTopic: "subswatcher_all",
    packageName: "com.codeink.stsl.subswatcher",
    channelId: "subswatcher_broadcasts",
  },
  {
    id: "inmeasure",
    name: "InMeasure",
    prefix: "IM",
    fcmTopic: "inmeasure_all",
    packageName: "com.codeink.stsl.inmeasure",
    channelId: "inmeasure_broadcasts",
  },
  {
    id: "secretcodes",
    name: "SecretCodes",
    prefix: "SC",
    fcmTopic: "secretcodes_all",
    packageName: "com.stsl.codeink.secretcodes",
    channelId: "secretcodes_broadcasts",
  },
  {
    id: "moviewalls",
    name: "MovieWalls",
    prefix: "MW",
    fcmTopic: "moviewalls_all",
    packageName: "com.codeink.stsl.movie_posters",
    channelId: "moviewalls_broadcasts",
  },
  {
    id: "inwebedit",
    name: "InWebEdit",
    prefix: "IWE",
    fcmTopic: "inwebedit_all",
    packageName: "com.abelarai.inwebedit",
    channelId: "inwebedit_broadcasts",
  },
];

export const DEFAULT_APP = APPS[0];

export function findApp(id: string): AppEntry | undefined {
  return APPS.find((a) => a.id === id);
}

export function getAppPackageName(id: string): string | undefined {
  return findApp(id)?.packageName;
}

export function getAppChannelId(id: string): string {
  const app = findApp(id);
  return app?.channelId || `${id}_broadcasts`;
}
