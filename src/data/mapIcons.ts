import type { IconType, MapIcon } from "../types/mapIcon";

export const MAP_ICONS: MapIcon[] = [
    { id: 1, row: 9, col: 12, type: "eye", visible: true },
    { id: 2, row: 9, col: 9, type: "eye", visible: true, },
    { id: 21, row: 9, col: 1, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png"},
    { id: 22, row: 8, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
    { id: 23, row: 10, col: 9, type: "bloque", visible: false, imageUrl:"./icons/Bloque.png" },
    { id: 24, row: 8, col: 3, rowOffset:0.5, colOffset:0, type: "door", visible: false, imageUrl:"./icons/Door.png", rotationDeg: 90 },
  // ...all other icons, including ones not tied to hotspots
];

export const ICON_SYMBOL: Record<IconType, string> = {
  start: "🧭",
  monster: "👹",
  door: "🚪",
  treasure: "💎",
  quest: "❓",
  trap: "⚠️",
  eye: "👁‍🗨",
  bloque: "🧱",
};

