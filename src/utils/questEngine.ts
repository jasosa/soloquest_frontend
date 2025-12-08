import { useCallback, useEffect, useState } from "react";
import type { QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";
import type { QuestAction } from "../types/questActions";
import { createInitialVisibilityMap, type VisibilityMap } from "./iconVisibility";

export type QuestEngineState = {
  visibleById: VisibilityMap;
  selectedEntryId: number | null;
};

const initialState = (icons: MapIcon[]): QuestEngineState => ({
  visibleById: createInitialVisibilityMap(icons),
  selectedEntryId: null,
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
  contextEntryId: number
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
    case "openPanel":
      return { ...state, selectedEntryId: action.entryId ?? contextEntryId };
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
  visited: Set<number>
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
    nextState = applyAction(nextState, action, entryId);
  }
  return nextState;
}

export function applyQuestEntry(
  entryId: number,
  questEntriesById: Record<number, QuestEntry>,
  state: QuestEngineState
): QuestEngineState {
  return runEntry(entryId, questEntriesById, state, new Set());
}

export function useQuestEngine(
  icons: MapIcon[],
  questEntriesById: Record<number, QuestEntry>,
  initialEntryId?: number
) {
  const [state, setState] = useState<QuestEngineState>(() => initialState(icons));

  useEffect(() => {
    setState(initialState(icons));
  }, [icons]);

  useEffect(() => {
    if (!initialEntryId) return;
    console.log("initial", initialEntryId, questEntriesById[initialEntryId]);
    setState((prev) => applyQuestEntry(initialEntryId, questEntriesById, prev));
  }, [initialEntryId, questEntriesById, icons]);

  const runQuestEntry = useCallback(
    (entryId: number | null | undefined) => {
      if (!entryId) return;
      setState((prev) => applyQuestEntry(entryId, questEntriesById, prev));
    },
    [questEntriesById]
  );

  const isVisible = useCallback((iconId: number) => !!state.visibleById[iconId], [state.visibleById]);

  return { ...state, runQuestEntry, isVisible };
}
