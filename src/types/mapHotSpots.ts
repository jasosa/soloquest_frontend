import type { MapIcon } from "./mapIcon";

interface MapHotSpot {
    id: number;
    mapIcon: MapIcon;
    clickable?: boolean;
    openPanelOnClick?: boolean;
    revealedIcons?: MapIcon[];
    questEntryId: number
}

interface QuestEntry {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    subEntries?: QuestEntry[];
}

export type { MapHotSpot, QuestEntry };