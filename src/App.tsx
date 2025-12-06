import React, { useMemo, useState } from "react";
import "./App.css";
import type { MapIcon } from "./types/mapIcon";
import { ICONS, ICON_SYMBOL } from "./data/icons";
import { POPUP_DETAILS } from "./data/popUpDetails";
import { useIconVisibility } from "./utils/iconVisibility";
import { IconCell } from "./components/iconCell";
import { IconPanel } from "./components/iconPanel";
import { OverlayIconCell } from "./components/overlayIconCell";
import type { MapHotSpot } from "./types/mapHotSpots";
import { MAP_HOT_SPOTS } from "./data/mapHotSpots";

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
  const [selectedHotspotId, setSelectedHotspotId] = useState<number | null>(null);
  const { isVisible, updateVisibility } = useIconVisibility(ICONS);

  // Split data: simple on-cell icons vs. overlay icons (offsets or multi-cell)
  const gridItems = useMemo(
    () =>
      ICONS.filter(
        (it) =>
          (it.widthCells ?? 1) === 1 &&
          (it.heightCells ?? 1) === 1 &&
          (it.rowOffset ?? 0) === 0 &&
          (it.colOffset ?? 0) === 0
      ),
    []
  );
  const overlayItems = useMemo(
    () => ICONS.filter((it) => !gridItems.includes(it)),
    [gridItems]
  );

    const selectedHotspot = useMemo(
    () => MAP_HOT_SPOTS.find((hs) => hs.id === selectedHotspotId) ?? null,
    [selectedHotspotId]
  );

  // Fast lookup for grid cells
  const iconByPosition = useMemo(() => {
    const map = new Map<string, MapIcon>();
    for (const icon of gridItems) {
      map.set(`${icon.row}-${icon.col}`, icon);
    }
    return map;
  }, [gridItems]);

  // Map hotspot by icon ID for reveal logic
  const hotspotByIconId = useMemo(() => {
  const map = new Map<number, MapHotSpot>();
  MAP_HOT_SPOTS.forEach(h => map.set(h.mapIcon.id, h));
  return map;
}, []);

  const handleIconClick = (icon: MapIcon) => {
    const hs = hotspotByIconId.get(icon.id);
     if (hs?.openPanelOnClick) setSelectedHotspotId(hs.id);
     updateVisibility(icon);
  };

  
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row}-${col}`;
      const icon = iconByPosition.get(key);
      const hotSpot = icon ? hotspotByIconId.get(icon.id) : null;
      const clickableHotSpot = !!hotSpot && hotSpot.clickable !== false; 
      const visibleIcon = !!icon && isVisible(icon.id);
      //const clickable = !!icon && visible && icon.clickable !== false;
      const symbol = icon ? ICON_SYMBOL[icon.type] : undefined;      

      cells.push(
        <IconCell
          key={key}
          icon={icon}
          isVisible={visibleIcon}
          isClickable={clickableHotSpot}
          symbol={symbol}          
          onClick={() => icon && visibleIcon && handleIconClick(icon)}
        />
      );
    }     
  }

 
  const detail = selectedHotspotId ? POPUP_DETAILS[selectedHotspotId] : null;
  const selectedIcon = selectedHotspot?.mapIcon;
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
        
        <div className="hq-overlay">          
          {overlayItems.map((icon) => {

            const hs = hotspotByIconId.get(icon.id);
            const visibleIcon = isVisible(icon.id);
            const isClickable = !!hs && hs.clickable !== false;
            
            const symbol = ICON_SYMBOL[icon.type];
            return (
              <OverlayIconCell
                key={icon.id}
                icon={icon}
                rows={ROWS}
                cols={COLS}
                isVisible={visibleIcon}
                isClickable={isClickable}
                symbol={symbol}
                onClick={() => isClickable && handleIconClick(icon)}
              />
            );
          })}
        </div>
      </div>

        {selectedIcon && detail && (
        <IconPanel
          title={detail.title}
          description={detail.content}
          imageUrl={detail.imageUrl}
          row={selectedIcon.row}
          col={selectedIcon.col}
          onClose={() => setSelectedHotspotId(null)}
        />
      )}
    </>
  );
}

export default App;
