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
  offers?: OfferItem[];
};

// ─── App registry ─────────────────────────────────────────────────────────────
// To add a new app: append one entry below. Every field is required except
// `offers` (omit if the app has no server-defined promotional offers yet).
// ──────────────────────────────────────────────────────────────────────────────
export const APPS: AppEntry[] = [
  {
    id: "muvees",
    name: "Muvees",
    prefix: "MV",
    fcmTopic: "all",
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
  { id: "femcareplus", name: "FemCarePlus", prefix: "FC", fcmTopic: "femcareplus_all" },
  { id: "subswatcher", name: "SubsWatcher", prefix: "SW", fcmTopic: "subswatcher_all" },
  { id: "inmeasure",   name: "InMeasure",   prefix: "IM", fcmTopic: "inmeasure_all"   },
  { id: "indocedit",   name: "IndocEdit",   prefix: "IE", fcmTopic: "indocedit_all"   },
];

export const DEFAULT_APP = APPS[0];

export function findApp(id: string): AppEntry | undefined {
  return APPS.find((a) => a.id === id);
}
