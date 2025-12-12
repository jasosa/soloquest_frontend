import { useCallback, useEffect, useState } from "react";
import type { QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";
import type { QuestAction } from "../types/questActions";
import { createInitialVisibilityMap, type VisibilityMap } from "./iconVisibility";

export type QuestEngineState = {
  visibleById: VisibilityMap;
  selectedEntryId: number | null;
  panelImageUrl?: string;
};

const initialState = (icons: MapIcon[]): QuestEngineState => ({
  visibleById: createInitialVisibilityMap(icons),
  selectedEntryId: null,
  panelImageUrl: undefined,
});

const updateVisibility = (
  visibleById: VisibilityMap,
  iconIds: number[],
  next: (current: boolean | undefined) => boolean
): VisibilityMap => {
  let changed = false;
  const updated: VisibilityMap = { ...visibleById };
  for (const id of iconIds) {
    const prev = visibleById[id];
    const nextVal = next(prev);
    if (prev !== nextVal) {
      changed = true;
      updated[id] = nextVal;
    }
  }
  return changed ? updated : visibleById;
};

const applyAction = (
  state: QuestEngineState,
  action: QuestAction,
  contextEntryId: number,
  questEntriesById: Record<number, QuestEntry>,
  hotspotIconIds: number[]
): QuestEngineState => {
  switch (action.type) {
    case "reveal":
      return {
        ...state,
        visibleById: updateVisibility(state.visibleById, action.iconIds, () => true),
      };
    case "hide":
      return {
        ...state,
        visibleById: updateVisibility(state.visibleById, action.iconIds, () => false),
      };
    case "toggle":
      return {
        ...state,
        visibleById: updateVisibility(state.visibleById, action.iconIds, (prev) => !prev),
      };
    case "revealHotspots":
      return {
        ...state,
        visibleById: updateVisibility(state.visibleById, hotspotIconIds, () => true),
      };
    case "openPanel": {
      const targetEntryId = action.entryId ?? contextEntryId;
      const entryImage = questEntriesById[targetEntryId]?.imageUrl;
      return {
        ...state,
        selectedEntryId: targetEntryId,
        panelImageUrl: action.imageUrl ?? entryImage,
      };
    }
    case "openContextMenu": {
      const targetEntryId = action.entryId ?? contextEntryId;
      return {
        ...state,
        selectedEntryId: targetEntryId,
        panelImageUrl: undefined,
      };
    }
    case "noop":
      return state;
    default:
      return state;
  }
};

function runEntry(
  entryId: number,
  questEntriesById: Record<number, QuestEntry>,
  state: QuestEngineState,
  visited: Set<number>,
  hotspotIconIds: number[]
): QuestEngineState {
  if (visited.has(entryId)) return state; // avoid cycles
  const entry = questEntriesById[entryId];
  if (!entry) return state;

  visited.add(entryId);
  const actions = entry.actions ?? [];

  let nextState = state;
  for (const action of actions) {
    if (action.type === "chain") {
      // Chains are now user-triggered via UI ("Next" button), so skip auto-run.
      continue;
    }
    nextState = applyAction(nextState, action, entryId, questEntriesById, hotspotIconIds);
  }
  return nextState;
}

export function applyQuestEntry(
  entryId: number,
  questEntriesById: Record<number, QuestEntry>,
  state: QuestEngineState,
  options?: { hotspotIconIds?: number[] }
): QuestEngineState {
  const hotspotIconIds = options?.hotspotIconIds ?? [];
  return runEntry(entryId, questEntriesById, state, new Set(), hotspotIconIds);
}

export function useQuestEngine(
  icons: MapIcon[],
  questEntriesById: Record<number, QuestEntry>,
  options?: { initialEntryId?: number; hotspotIconIds?: number[] }
) {
  const [state, setState] = useState<QuestEngineState>(() => initialState(icons));
  const initialEntryId = options?.initialEntryId;
  const hotspotIconIds = options?.hotspotIconIds ?? [];

  useEffect(() => {
    setState(initialState(icons));
  }, [icons]);

  useEffect(() => {
    if (!initialEntryId) return;
    console.log("initial", initialEntryId, questEntriesById[initialEntryId]);
    setState((prev) => applyQuestEntry(initialEntryId, questEntriesById, prev, { hotspotIconIds }));
  }, [initialEntryId, questEntriesById, icons, hotspotIconIds]);

  const runQuestEntry = useCallback(
    (entryId: number | null | undefined) => {
      if (!entryId) return;
      setState((prev) => applyQuestEntry(entryId, questEntriesById, prev, { hotspotIconIds }));
    },
    [questEntriesById, hotspotIconIds]
  );

  const isVisible = useCallback((iconId: number) => !!state.visibleById[iconId], [state.visibleById]);

  return { ...state, runQuestEntry, isVisible };
}
