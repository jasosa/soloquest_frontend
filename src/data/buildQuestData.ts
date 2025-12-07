import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";
import { MAP_ICONS } from "./mapIcons";

export type QuestData = {
  hotspots: MapHotSpot[];
  questEntriesById: Record<number, QuestEntry>;
  icons: MapIcon[];
  hotspotByIconId: Map<number, MapHotSpot>;
};

export function buildQuestData(hotspots: MapHotSpot[], questEntries: QuestEntry[]): QuestData {
    const hotspotClones = hotspots.map((hs) => ({ ...hs}));

     // clone icons from the centralized list so they’re not mutated
    const icons = MAP_ICONS.map((icon) => ({ ...icon }));

    const questEntriesById = questEntries.reduce<Record<number, QuestEntry>>((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
    }, {});

    const hotspotByIconId = hotspotClones.reduce<Map<number, MapHotSpot>>((acc, hs) => {
        acc.set(hs.mapIconId, hs);
        return acc;
    }, new Map());

    return { hotspots: hotspotClones, questEntriesById, icons, hotspotByIconId };
}   
