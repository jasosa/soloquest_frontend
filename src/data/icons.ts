import type { IconType, MapIcon} from "../types/mapIcon";
import { MAP_HOT_SPOTS } from "./mapHotSpots";

// const ICONS: MapIcon[] = [
//   { id: 1, row: 9, col: 12, type: "eye", visible: true, openPanelOnClick: true, clickable: true},
//   { id: 2, row: 9, col: 9, type: "eye",  visible: true, openPanelOnClick: true, revealOnClickIds: [4,5,6] },  
//   { id: 3, row: 8, col: 3, type: "eye",  visible: true, openPanelOnClick: true},
//   { id: 4, row: 9, col: 1, type: "bloque", visible: false, openPanelOnClick: false, imageUrl:"./icons/Bloque.png"},
//   { id: 5, row: 8, col: 9, type: "bloque", visible: false, openPanelOnClick: false, imageUrl:"./icons/Bloque.png" },
//   { id: 6, row: 10, col: 9, type: "bloque", visible: false, openPanelOnClick: false, imageUrl:"./icons/Bloque.png" },
//   { id: 7, row: 3, col: 10, rowOffset: 0.5, visible: true, type: "door" },     // between rows 3 and 4 at column 10
//   { id: 8, row: 8, col: 12,  colOffset: 0.5, visible: true, type: "door" }, 
//   { id: 9, row: 4, col: 2, widthCells: 2, heightCells: 2, type: "monster", visible: true, openPanelOnClick: true, imageUrl: "./icons/FH_2x2.png" }, // example 2x2 tile
// ];

const ICONS: MapIcon[] = MAP_HOT_SPOTS.flatMap((spot) => {
  const reveals = spot.revealedIcons ?? [];
  if (reveals.length) {
    spot.mapIcon.revealOnClickIds = reveals.map((r) => r.id);
  }
  return [spot.mapIcon, ...reveals];
});

const ICON_SYMBOL: Record<IconType, string> = {
  start: "🧭",
  monster: "👹",
  door: "🚪",
  treasure: "💎",
  quest: "❓",
  trap: "⚠️",
  eye: "👁‍🗨",
  bloque: "🧱",
};

export { ICONS, ICON_SYMBOL };
