import type { MapHotSpot } from "../types/mapHotSpots";

export const MAP_HOT_SPOTS: MapHotSpot[] = [
  {
    id: 1,
    clickable: true,
    openPanelOnClick: true,
    mapIcon: { id: 1, row: 9, col: 12, type: "eye", visible: true} ,
    questEntryId: 101
  },
  {
    id: 2,
    clickable: true,
    openPanelOnClick: true,
    mapIcon: { id: 2, row: 9, col: 9, type: "eye", visible: true, },
    questEntryId: 102,
    revealedIcons: [
        { id: 21, row: 9, col: 1, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png"},
        { id: 22, row: 8, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
        { id: 23, row: 10, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
        { id: 24, row: 8, col: 3, rowOffset:0.5, colOffset:0, type: "door", visible: false, imageUrl:"./icons/Door.png" },
        
    ]
  },
  // ...rest
];
