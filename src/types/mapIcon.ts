type IconType = "start" | "monster" | "door" | "treasure" | "quest" | "eye" | "trap" | "bloque";

interface MapIcon {
  id: number;
  row: number; // 0-based
  col: number; // 0-based
  rowOffset?: number; // for edge icons, e.g., 0.5 for between rows
  colOffset?: number; // for edge icons, e.g., 0.5 for between cols
  widthCells?: number; // default 1
  heightCells?: number; // default 1
  type: IconType;
  imageUrl?: string;
  visible: boolean;
}

export type { IconType, MapIcon };
