export type AppEntry = {
  id: string;
  name: string;
  prefix: string;
  fcmTopic: string;
};

export const APPS: AppEntry[] = [
  { id: "muvees",      name: "Muvees",      prefix: "MV", fcmTopic: "all" },
  { id: "femcareplus", name: "FemCarePlus", prefix: "FC", fcmTopic: "femcareplus_all" },
  { id: "subswatcher", name: "SubsWatcher", prefix: "SW", fcmTopic: "subswatcher_all" },
  { id: "inmeasure",   name: "InMeasure",   prefix: "IM", fcmTopic: "inmeasure_all" },
  { id: "indocedit",   name: "IndocEdit",   prefix: "IE", fcmTopic: "indocedit_all" },
];

export const DEFAULT_APP = APPS[0];

export function findApp(id: string): AppEntry | undefined {
  return APPS.find((a) => a.id === id);
}
