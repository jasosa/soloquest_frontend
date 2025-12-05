import type { IconType} from "../types/icon";
import type { MapIcon } from "../types/icon";
import nb_1 from "../assets/icons/nb_1.jpg";
import nb_2 from "../assets/icons/nb_2.jpg";
import nb_3 from "../assets/icons/nb_3.jpg";

const ICONS: MapIcon[] = [
  { id: 1, row: 9, col: 12, type: "eye", label: "Starting Room", description: "Heroes begin here.", visible: true, openPanelOnClick: true, imageUrl: nb_1 },
  { id: 2, row: 9, col: 9, type: "eye", label: "New Corridor", description: "", visible: true, openPanelOnClick: true, imageUrl: nb_2 },
  { id: 3, row: 8, col: 3, type: "eye", label: "New Room", description: "Goblins! These Green-skinned creatures are small and quick...", visible: true, openPanelOnClick: true,imageUrl: nb_3},
  { id: 4, row: 6, col: 8, type: "treasure", label: "Treasure Chest", description: "Contains gold and a potion.", visible: false, openPanelOnClick: false, imageUrl: "https://via.placeholder.com/360x200?text=Treasure+Chest" },
  { id: 5, row: 4, col: 18, type: "quest", label: "Quest Marker", description: "Story objective to investigate.", visible: false, openPanelOnClick: false },
  { id: 6, row: 12, col: 6, type: "trap", label: "Pit Trap", description: "Avoid or disarm to proceed.", visible: true, openPanelOnClick: true },
];

const ICON_SYMBOL: Record<IconType, string> = {
  start: "🧭",
  monster: "👹",
  door: "🚪",
  treasure: "💎",
  quest: "❓",
  trap: "⚠️",
  eye: "👁‍🗨",
};

export { ICONS, ICON_SYMBOL };
