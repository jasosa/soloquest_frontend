import { describe, expect, it } from "vitest";
import { applyQuestEntry, type QuestEngineState } from "./questEngine";
import type { QuestEntry } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";

const icons: MapIcon[] = [
  { id: 1, row: 0, col: 0, type: "start", visible: true },
  { id: 2, row: 0, col: 1, type: "monster", visible: false },
];

const questEntriesById: Record<number, QuestEntry> = {
  100: {
    id: 100,
    title: "Reveal monster",
    description: "",
    actions: [
      { type: "reveal", iconIds: [2] },
      { type: "openPanel" },
    ],
  },
  101: {
    id: 101,
    title: "Chain test",
    description: "",
    actions: [{ type: "chain", entryId: 100 }],
  },
};

const baseState: QuestEngineState = {
  visibleById: { 1: true, 2: false },
  selectedEntryId: null,
};

describe("quest engine", () => {
  it("runs quest entry actions", () => {
    const next = applyQuestEntry(100, questEntriesById, baseState);

    expect(next.visibleById[2]).toBe(true);
    expect(next.selectedEntryId).toBe(100);
  });

  it("chains quest entries", () => {
    const next = applyQuestEntry(101, questEntriesById, baseState);

    expect(next.visibleById[2]).toBe(true);
    expect(next.selectedEntryId).toBe(100); // chained entry opened the panel
  });
});
