import type { QuestEntry } from "../types/mapHotSpots";

export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: 101,
    title: "Habitación inicial",
    description: "Coloca las piezas indicadas en el tablero y coloca a los héroes en la escalera.",
    imageUrl: "/images/nb_1.JPG",
    actions: [
      { type: "openPanel" },
      { type: "chain", entryId: 1013 },
      //{ type: "reveal", iconIds: [11,12, 13, 14] },
    ],
    subEntries: [1011],
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
    subEntries: [1012],
  },
  { 
    id: 1013, 
    title: "Puerta Bloqueada", 
    description: "Tomará demasiado tiempo romper esa puerta cerrada con fuerza bruta. Tal vez podáis encontrar otraforma de abrirla",
    actions: [
      { type: "openPanel" },
    ]
  },
  {   
    id: 1011, 
    title: "Revelar Trampas", 
    description: "No hay trampas en esta habitación",
    actions: [{ type: "openPanel" }] 
  },
    {   
    id: 1012, 
    title: "Revelar Trampas", 
    description: "No hay trampas en esta sección del pasillo",
    actions: [{ type: "openPanel" }] 
  },
];


export const QUEST_ENTRY_BY_ID: Record<number, QuestEntry> = QUEST_ENTRIES.reduce(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {} as Record<number, QuestEntry>
);
