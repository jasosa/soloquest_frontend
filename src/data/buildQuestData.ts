import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";
import { buildIconsFromHotspots } from "./buildIcons";

export type QuestData = {
  hotspots: MapHotSpot[];
  questEntriesById: Record<number, QuestEntry>;
  icons: MapIcon[];
  hotspotByIconId: Map<number, MapHotSpot>;
};

export function buildQuestData(hotspots: MapHotSpot[], questEntries: QuestEntry[]): QuestData {
    const hotspotClones = hotspots.map((hs) => ({
        ...hs,
        mapIcon: { ...hs.mapIcon },
        revealedIcons: hs.revealedIcons?.map((icon) => ({ ...icon })),
    }));

    const icons = buildIconsFromHotspots(hotspotClones);

    const questEntriesById = questEntries.reduce<Record<number, QuestEntry>>((acc, entry) => {
        acc[entry.id] = entry;
        return acc;
    }, {});

    const hotspotByIconId = hotspotClones.reduce<Map<number, MapHotSpot>>((acc, hs) => {
        acc.set(hs.mapIcon.id, hs);
        return acc;
    }, new Map());

    return { hotspots: hotspotClones, questEntriesById, icons, hotspotByIconId };
}   
