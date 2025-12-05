type IconType = "start" | "monster" | "door" | "treasure" | "quest" | "eye" | "trap";

interface MapIcon {
  id: number;
  row: number; // 0-based
  col: number; // 0-based
  type: IconType;
  label: string;
  description: string;  
  visible: boolean;
  revealOnClickIds?: number[]; // IDs of icons to reveal when clicked
  openPanelOnClick?: boolean;
  imageUrl?: string;
}

export type { IconType, MapIcon };
