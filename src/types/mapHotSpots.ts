import type { QuestAction } from "./questActions";

interface MapHotSpot {
    id: number;
    mapIconId: number;
    clickable?: boolean;
    openPanelOnClick?: boolean;
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
