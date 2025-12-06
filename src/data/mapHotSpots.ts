import type { MapHotSpot } from "../types/mapHotSpots";

export const MAP_HOT_SPOTS: MapHotSpot[] = [
  {
    id: 1,
    clickable: true,
    openPanelOnClick: true,
    mapIcon: { id: 1, row: 9, col: 12, type: "eye", visible: true} ,
  },
  {
    id: 2,
    clickable: true,
    openPanelOnClick: true,
    mapIcon: { id: 2, row: 9, col: 9, type: "eye", visible: true, },
    revealedIcons: [
        { id: 4, row: 9, col: 1, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png"},
        { id: 5, row: 8, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
        { id: 6, row: 10, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
    ]
  },
  // ...rest
];
