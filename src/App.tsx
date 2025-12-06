import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import type { MapIcon } from "./types/mapIcon";
import { IconCell } from "./components/iconCell";
import { IconPanel } from "./components/iconPanel";
import { OverlayIconCell } from "./components/overlayIconCell";
import type { MapHotSpot } from "./types/mapHotSpots";
import { buildQuestData, type QuestData } from "./data/buildQuestData";
import { MAP_HOT_SPOTS } from "./data/mapHotSpots";
import { QUEST_ENTRIES } from "./data/questEntries";
import { ICON_SYMBOL } from "./data/icons";
import { useQuestEngine } from "./utils/questEngine";

const ROWS = 19;
const COLS = 26;

function App() {
  const questData = useMemo(() => buildQuestData(MAP_HOT_SPOTS, QUEST_ENTRIES), []);

  return (
    <div className="app-root">
      <div className="board-wrapper">
        <h1 className="board-title">HeroQuest Board</h1>
        <HeroQuestMap questData={questData} />
      </div>
    </div>
  );
}


function HeroQuestMap({ questData }: { questData: QuestData }) {
  const [panelHotspot, setPanelHotspot] = useState<MapHotSpot | null>(null);
  const { isVisible, runQuestEntry, selectedEntryId } = useQuestEngine(
    questData.icons,
    questData.questEntriesById
  );

  useEffect(() => {
    setPanelHotspot(null);
  }, [questData.icons]);

  const { gridItems, overlayItems } = useMemo(() => {
    return questData.icons.reduce(
      (buckets, icon) => {
        const isSingleCell = (icon.widthCells ?? 1) === 1 && (icon.heightCells ?? 1) === 1;
        const isAlignedToGrid = (icon.rowOffset ?? 0) === 0 && (icon.colOffset ?? 0) === 0;
        const bucket = isSingleCell && isAlignedToGrid ? "gridItems" : "overlayItems";
        buckets[bucket].push(icon);
        return buckets;
      },
      { gridItems: [] as MapIcon[], overlayItems: [] as MapIcon[] }
    );
  }, [questData.icons]);

  const selectedQuestEntry = selectedEntryId ? questData.questEntriesById[selectedEntryId] : null;

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
    questData.hotspots.forEach((h) => map.set(h.mapIcon.id, h));
    return map;
  }, [questData.hotspots]);

  const handleIconClick = (icon: MapIcon) => {
    const hs = hotspotByIconId.get(icon.id);
    if (!hs || hs.clickable === false) return;
    setPanelHotspot(hs);
    runQuestEntry(hs.questEntryId);
  };


  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${row}-${col}`;
      const icon = iconByPosition.get(key);
      const hotSpot = icon ? hotspotByIconId.get(icon.id) : null;
      const clickableHotSpot = !!hotSpot && hotSpot.clickable !== false; 
      const visibleIcon = !!icon && isVisible(icon.id);
      const symbol = icon ? ICON_SYMBOL[icon.type] : undefined;      

      cells.push(
        <IconCell
          key={key}
          icon={icon}
          isVisible={visibleIcon}
          isClickable={clickableHotSpot}
          symbol={symbol}          
          onClick={() => icon && visibleIcon && clickableHotSpot && handleIconClick(icon)}
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
                onClick={() => isClickable && visibleIcon && handleIconClick(icon)}
              />
            );
          })}
        </div>
      </div>

        {selectedQuestEntry && panelHotspot && (
        <IconPanel
          title={selectedQuestEntry.title}
          description={selectedQuestEntry.description}
          imageUrl={selectedQuestEntry.imageUrl}
          row={panelHotspot.mapIcon.row}
          col={panelHotspot.mapIcon.col}
          onClose={() => setPanelHotspot(null)}
        />
      )}
    </>
  );
}

export default App;
