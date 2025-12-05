import React, { useMemo, useState } from "react";
import "./App.css";
import type { MapIcon } from "./types/icon";
import { ICONS, ICON_SYMBOL } from "./data/icons";
import { useIconVisibility } from "./utils/iconVisibility";
import { IconCell } from "./components/iconCell";
import { IconPanel } from "./components/iconPanel";

const ROWS = 19;
const COLS = 26;

function App() {
  return (
    <div className="app-root">
      <div className="board-wrapper">
        <h1 className="board-title">HeroQuest Board</h1>
        <HeroQuestMap />
      </div>
    </div>
  );
}

function HeroQuestMap() {
  const [selectedIcon, setSelectedIcon] = useState<MapIcon | null>(null);
  const { isVisible, updateVisibility } = useIconVisibility(ICONS);

  const iconByPosition = useMemo(() => {
    const map = new Map<string, MapIcon>();
    for (const icon of ICONS) {
      map.set(`${icon.row}-${icon.col}`, icon);
    }
    return map;
  }, []);

  const handleIconClick = (icon: MapIcon) => {
    if (icon.openPanelOnClick == true) {
      setSelectedIcon(icon);
    }
     updateVisibility(icon);
  };

  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row}-${col}`;
      const icon = iconByPosition.get(key);
      const visible = !!icon && isVisible(icon.id);
      const symbol = icon ? ICON_SYMBOL[icon.type] : undefined;

      cells.push(
        <IconCell
          key={key}
          icon={icon}
          isVisible={visible}
          symbol={symbol}
           onClick={() => icon && visible && handleIconClick(icon)}
        />
      );
    }
  }

  return (
    <>
      <div className="hq-board">
        <div
          className="hq-grid"
          style={{
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
        >
          {cells}
        </div>
      </div>

      {selectedIcon && (
        <IconPanel icon={selectedIcon} onClose={() => setSelectedIcon(null)} />
      )}
    </>
  );
}

export default App;
