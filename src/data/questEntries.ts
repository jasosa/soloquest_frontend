import type { QuestEntry } from "../types/mapHotSpots";

export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: 101,
    title: "Habitación inicial",
    description: "Coloca las piezas indicadas en el tablero y coloca a los héroes en la escalera.",
    imageUrl: "/images/nb_1.JPG",
    actions: [
      { type: "openPanel" },
      //{ type: "reveal", iconIds: [11,12, 13, 14] },
    ],
    subEntries: [
      {   
        id: 1011, 
        title: "Revelar Trampas", 
        description: "No hay trampas en esta habitación",
        actions: [{ type: "openPanel" }] 
      },
    ]
  },
  {
    id: 102,
    title: "New Corridor",
    description: "...",
    imageUrl: "/images/nb_2.JPG",
    actions: [
      { type: "openPanel" },
      //{ type: "reveal", iconIds: [21, 22, 23, 24] },
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
