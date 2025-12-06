import type { QuestEntry } from "../types/mapHotSpots";

export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: 101,
    title: "Starting Room",
    description: "...",
    imageUrl: "/images/nb_1.JPG",
    actions: [{ type: "openPanel" }],
  },
  {
    id: 102,
    title: "New Corridor",
    description: "...",
    imageUrl: "/images/nb_2.JPG",
    actions: [
      { type: "openPanel" },
      { type: "reveal", iconIds: [4, 5, 6] },
    ],
  },
  // ...
];


export const QUEST_ENTRY_BY_ID: Record<number, QuestEntry> = QUEST_ENTRIES.reduce(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {} as Record<number, QuestEntry>
);
