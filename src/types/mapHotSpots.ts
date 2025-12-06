import type { MapIcon } from "./mapIcon";
import type { QuestAction } from "./questActions";

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
    actions?: QuestAction[];
}

export type { MapHotSpot, QuestEntry };
