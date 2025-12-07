import type { MapIcon } from "../types/mapIcon";

export const MAP_ICONS: MapIcon[] = [
    { id: 1, row: 9, col: 12, type: "eye", visible: true },
    { id: 11, row: 7, col: 12, type: "stairs", visible: false,  widthCells: 2, heightCells: 2, rotationDeg: 90},
    { id: 12, row: 11, col: 12, type: "cupboard", visible: false, widthCells: 3, heightCells: 1, rotationDeg: 180},
    { id: 13, row: 8, col: 14, type: "fireplace", visible: false, widthCells: 3, heightCells: 1, rotationDeg: 90},
    { id: 14, row: 9, col: 9, rowOffset:0, colOffset:0.5, type: "door", visible: false, rotationDeg: 90 },

    { id: 2, row: 9, col: 9, type: "eye", visible: true, },
    { id: 21, row: 9, col: 1, type: "wall", visible: false,},
    { id: 22, row: 8, col: 9, type: "wall", visible: false,},
    { id: 23, row: 10, col: 9, type: "wall", visible: false,},
    { id: 24, row: 8, col: 3, rowOffset:0.5, colOffset:0, type: "door", visible: false, rotationDeg: 0 },
  // ...all other icons, including ones not tied to hotspots
];



