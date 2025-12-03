import React, { useMemo, useState } from "react";
import './App.css'

const ROWS = 19;
const COLS = 26;

interface MapIcon {
  id: number;
  row: number; // 0-based
  col: number; // 0-based
  label: string;
  description: string;
}

const ICONS: MapIcon[] = [
  { id: 1, row: 2, col: 5, label: "Treasure", description: "Placeholder: Treasure chest here." },
  { id: 2, row: 10, col: 12, label: "Monster", description: "Placeholder: Big scary monster." },
  { id: 3, row: 15, col: 20, label: "Door", description: "Placeholder: Secret door." },
];

function App() {

  return (
    <>     
      <div className="app-root">
        <div className="board-wrapper">
          <h1 className="board-title">HeroQuest Board</h1>
          <HeroQuestMap />
        </div>
      </div>
    </>
  )
}


function HeroQuestMap() {
  const [selectedIcon, setSelectedIcon] = useState<MapIcon | null>(null);
  // Quick lookup: "row-col" -> icon
  const iconByPosition = useMemo(() => {
    const map = new Map<string, MapIcon>();
    for (const icon of ICONS) {
      map.set(`${icon.row}-${icon.col}`, icon);
    }
    return map;
  }, []);

  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row}-${col}`;
      const icon = iconByPosition.get(key);
      const hasIcon = !!icon;

      cells.push(
        <div
          key={key}
          className={`hq-cell ${hasIcon ? "hq-cell--has-icon" : ""}`}
          onClick={() => {
            if (icon) {
              setSelectedIcon(icon);
            }
          }}
        >
          {hasIcon && (
            <span className="hq-cell-icon" title={icon!.label}>
              {/* Use emoji for now – you can swap for real icons later */}
              ⭐
            </span>
          )}
        </div>
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
        <div className="hq-modal-backdrop" onClick={() => setSelectedIcon(null)}>
          <div
            className="hq-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>{selectedIcon.label}</h2>
            <p>{selectedIcon.description}</p>
            <p>
              <strong>Position:</strong> row {selectedIcon.row}, col {selectedIcon.col}
            </p>
            <button onClick={() => setSelectedIcon(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}


export default App
