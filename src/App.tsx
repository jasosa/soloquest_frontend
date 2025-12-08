import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { IconCell } from "./components/iconCell";
import { IconPanel } from "./components/iconPanel";
import { OverlayIconCell } from "./components/overlayIconCell";

import type { MapIcon } from "./types/mapIcon";
import type { MapHotSpot } from "./types/mapHotSpots";

import { buildQuestData, type QuestData } from "./data/buildQuestData";
import { useQuestEngine } from "./utils/questEngine";
import { MAP_HOT_SPOTS } from "./data/mapHotSpots";
import { QUEST_ENTRIES } from "./data/questEntries";
import { ACTIVE_QUEST } from "./data/quest";

const ROWS = 19;
const COLS = 26;
const showDebug = import.meta.env.VITE_DEBUG_PANEL === "true";

function App() {
  const questData = useMemo(
    () => buildQuestData(ACTIVE_QUEST, MAP_HOT_SPOTS, QUEST_ENTRIES),
    []
  );

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
  const [showIntro, setShowIntro] = useState(true);
  const [questStarted, setQuestStarted] = useState(false);
  const [parentEntryId, setParentEntryId] = useState<number | null>(null);
  const [consumedChains, setConsumedChains] = useState<Record<number, boolean>>({});
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
    questData.hotspots.forEach((h) => map.set(h.mapIconId, h));
    return map;
  }, [questData.hotspots]);

  const iconById = useMemo(() => {
    const map = new Map<number, MapIcon>();
    questData.icons.forEach((icon) => map.set(icon.id, icon));
    return map;
  }, [questData.icons]);

  const initialHotspot = useMemo(
    () => questData.hotspots.find((hs) => hs.questEntryId === questData.quest.initialEntryId) ?? null,
    [questData.hotspots, questData.quest.initialEntryId]
  );

  const handleStartQuest = () => {
    if (questStarted) return;
    setQuestStarted(true);
    setShowIntro(false);
    runQuestEntry(questData.quest.initialEntryId);
    if (initialHotspot) {
      setPanelHotspot(initialHotspot);
    }
  };

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

      cells.push(
        <IconCell
          key={key}
          icon={icon}
          isVisible={visibleIcon}
          isClickable={clickableHotSpot}
          onClick={() => icon && visibleIcon && clickableHotSpot && handleIconClick(icon)}
        />
      );
    }     
  }

  const selectedQuestEntry = selectedEntryId ? questData.questEntriesById[selectedEntryId] : null;
  const resolvedSubEntries =
  (selectedQuestEntry?.subEntries ?? [])
    .map((id) => questData.questEntriesById[id])
    .filter(Boolean);
  const chainAction = selectedQuestEntry?.actions?.find(a => a.type === "chain");
  const shouldShowChainNext =!!chainAction && !!selectedQuestEntry && !consumedChains[selectedQuestEntry.id];

  return (
    <>
    {showIntro && (
      <div className="quest-intro">
        <div className="quest-intro__card">
          <h2>{questData.quest.name}</h2>
          <p className="quest-intro__body">{questData.quest.intro}</p>
          <div className="quest-intro__actions">
            <button onClick={() => setShowIntro(false)}>Back</button>
            <button className="primary" onClick={handleStartQuest}>Start Quest</button>
          </div>
        </div>
      </div>
    )}     
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
            
            return (
              <OverlayIconCell
                key={icon.id}
                icon={icon}
                rows={ROWS}
                cols={COLS}
                isVisible={visibleIcon}
                isClickable={isClickable}
                onClick={() => isClickable && visibleIcon && handleIconClick(icon)}
              />
            );
          })}
        </div>
      </div>

        {selectedQuestEntry && panelHotspot && (
          
        <IconPanel
          showDebugInfo={showDebug}
          title={selectedQuestEntry.title}
          description={selectedQuestEntry.description}
          imageUrl={selectedQuestEntry.imageUrl}
          row={iconById.get(panelHotspot.mapIconId)?.row ?? 0}
          col={iconById.get(panelHotspot.mapIconId)?.col ?? 0}
          subEntries={!shouldShowChainNext ? resolvedSubEntries : undefined}
          hasChain={shouldShowChainNext}
          onSelectSubEntry={(id) => {
            //setPanelHotspot(null); // optional: close current panel
            setParentEntryId(selectedQuestEntry?.id ?? null);
            runQuestEntry(id);
            setPanelHotspot(hotspotByIconId.get(iconById.get(panelHotspot.mapIconId)?.id ?? 0) ?? null);
          }}
          onNext={() => {
            if (!chainAction || !selectedQuestEntry) return;
            setConsumedChains((prev) => ({ ...prev, [selectedQuestEntry.id]: true }));
            setParentEntryId(selectedQuestEntry.id);
            runQuestEntry(chainAction.entryId);
            //setPanelHotspot(panelHotspot)
          }}
          onClose={() =>{
            if (parentEntryId) {
              runQuestEntry(parentEntryId);
              setParentEntryId(null);
              setPanelHotspot(panelHotspot)              
            }
            else{
              setPanelHotspot(null);
            }
          }} 
        />
      )}
    </>
  );
}

export default App;
