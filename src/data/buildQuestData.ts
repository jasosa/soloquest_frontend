import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";
import type { Quest } from "../types/quest";
import { ICON_IMAGE_BY_TYPE } from "./mapIconImage";
import { MAP_ICONS } from "./mapIcons";

export type QuestData = {
  hotspots: MapHotSpot[];
  questEntriesById: Record<number, QuestEntry>;
  icons: MapIcon[];
  hotspotByIconId: Map<number, MapHotSpot>;
  quest: Quest;
};

export function buildQuestData(
  quest: Quest,
  hotspots: MapHotSpot[],
  questEntries: QuestEntry[]
): QuestData {
  const hotspotClones = hotspots.map((hs) => ({ ...hs }));

  // clone icons from the centralized list so they’re not mutated
  const icons = MAP_ICONS.map((icon) => {
    const imageUrl = icon.imageUrl ?? ICON_IMAGE_BY_TYPE[icon.type];
    return {...icon, imageUrl};
  });
  
 const questEntriesById = questEntries.reduce<Record<number, QuestEntry>>((acc, entry) => {
  const add = (e: QuestEntry) => {
    acc[e.id] = e;
    e.subEntries?.forEach(add);
  };
  add(entry);
  return acc;
}, {});

  const hotspotByIconId = hotspotClones.reduce<Map<number, MapHotSpot>>((acc, hs) => {
    acc.set(hs.mapIconId, hs);
    return acc;
  }, new Map());

  return { hotspots: hotspotClones, questEntriesById, icons, hotspotByIconId, quest };
}
