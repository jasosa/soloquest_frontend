import type { QuestEntry } from "../types/mapHotSpots";

export const QUEST_ENTRIES: QuestEntry[] = [
  {
    id: 101,
    title: "Habitación inicial",
    description: "Coloca las piezas indicadas en el tablero y coloca a los héroes en la escalera.",
    actions: [
      { type: "openPanel", imageUrl: "/images/nb_1.JPG" },
      { type: "chain", entryId: 1013 },
      //{ type: "reveal", iconIds: [11,12, 13, 14] },
    ],
    subEntries: [1011],
  },
  {
    id: 102,
    title: "Pasillo",
    description: "...",
    actions: [
      { type: "openPanel", imageUrl: "/images/nb_2.JPG" },      
      //{ type: "reveal", iconIds: [21, 22, 23, 24] },
    ],
    subEntries: [1012],
  },
  {
    id: 103,
    title: "Habitación",
    description: "2 Goblins y una mesa",
    actions: [
      { type: "openPanel", imageUrl: "/images/nb_3.JPG" },      
      //{ type: "reveal", iconIds: [21, 22, 23, 24] },
    ],
    subEntries: [1011],
  },
  {
    id: 104,
    title: "Habitación",
    description: "Habitación vacía",
    actions: [
      { type: "openPanel", imageUrl: "/images/nb_room_4_traps_hidden.png" },      
      { type: "reveal", iconIds: [5] },
    ],
    subEntries: [1014],
  },
   {
    id: 105,
    title: "Peligro",
    description: "",
    actions: [
      { type: "openContextMenu" },      
      { type: "reveal", iconIds: [5] },
    ],
    subEntries: [1016],
  },
  {   
    id: 1011, 
    title: "Buscar trampas", 
    description: "No hay trampas en esta habitación",
    actions: [{ type: "openPanel" }] 
  },
  {   
    id: 1012, 
    title: "Buscar Trampas", 
    description: "No hay trampas en esta sección del pasillo",
    actions: [{ type: "openPanel" }] 
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
    id: 1014, 
    title: "Buscar Trampas", 
    description: "Encuentras una trampa!",
    actions: [{ type: "openPanel", imageUrl: "/images/nb_room_4_traps_revealed.png" }] 
  },
   {   
    id: 1016, 
    title: "Revelar trampa", 
    description: "Encuentras una trampa!",
    actions: [{ type: "openPanel", imageUrl: "/images/nb_room_4_traps_revealed.png" }] 
  },
];


export const QUEST_ENTRY_BY_ID: Record<number, QuestEntry> = QUEST_ENTRIES.reduce(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {} as Record<number, QuestEntry>
);
