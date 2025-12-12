import { describe, expect, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { applyQuestEntry, type QuestEngineState, useQuestEngine } from "./questEngine";
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
  102: {
    id: 102,
    title: "Show hidden hotspots",
    description: "",
    actions: [{ type: "revealHotspots" }],
  },
  103: {
    id: 103,
    title: "Action image panel",
    description: "",
    imageUrl: "/fallback.png",
    actions: [{ type: "openPanel", imageUrl: "/from-action.png" }],
  },
  104: {
    id: 104,
    title: "Context menu entry",
    description: "Shows a contextual menu instead of a panel",
    actions: [{ type: "openContextMenu" }],
  },
};

const baseState: QuestEngineState = {
  visibleById: { 1: true, 2: false },
  selectedEntryId: null,
  panelImageUrl: undefined,
};

describe("quest engine", () => {
  it("runs quest entry actions", () => {
    const next = applyQuestEntry(100, questEntriesById, baseState);

    expect(next.visibleById[2]).toBe(true);
    expect(next.selectedEntryId).toBe(100);
    expect(next.panelImageUrl).toBeUndefined();
  });

  it("reveals any hotspot icons when requested", () => {
    const next = applyQuestEntry(102, questEntriesById, baseState, { hotspotIconIds: [2] });

    expect(next.visibleById[2]).toBe(true);
  });

  it("uses the action image when opening a panel", () => {
    const next = applyQuestEntry(103, questEntriesById, baseState);

    expect(next.selectedEntryId).toBe(103);
    expect(next.panelImageUrl).toBe("/from-action.png");
  });

  it("opens a contextual menu without carrying panel images", () => {
    const next = applyQuestEntry(104, questEntriesById, baseState);

    expect(next.selectedEntryId).toBe(104);
    expect(next.panelImageUrl).toBeUndefined();
  });

  it("skips chain actions until the UI triggers them", () => {
    const next = applyQuestEntry(101, questEntriesById, baseState);

    expect(next).toBe(baseState);
    expect(next.visibleById[2]).toBe(false);
    expect(next.selectedEntryId).toBeNull();
  });

  it("auto-runs the quest's initial entry when a quest starts", async () => {
    const { result } = renderHook(() =>
      useQuestEngine(icons, questEntriesById, { initialEntryId: 100, hotspotIconIds: [2] })
    );

    await waitFor(() => {
      expect(result.current.selectedEntryId).toBe(100);
      expect(result.current.visibleById[2]).toBe(true);
    });
  });

  it("ignores falsy entry ids when runQuestEntry is called", () => {
    const { result } = renderHook(() => useQuestEngine(icons, questEntriesById));

    act(() => {
      result.current.runQuestEntry(null);
      result.current.runQuestEntry(undefined);
    });

    expect(result.current.selectedEntryId).toBeNull();
    expect(result.current.visibleById[2]).toBe(false);
  });

  it("resets state when the icon set changes", async () => {
    const { result, rerender } = renderHook(
      ({ icons, questEntriesById }) => useQuestEngine(icons, questEntriesById),
      { initialProps: { icons, questEntriesById } }
    );

    act(() => result.current.runQuestEntry(100));

    expect(result.current.selectedEntryId).toBe(100);
    expect(result.current.visibleById[2]).toBe(true);

    const nextIcons = [
      { id: 1, row: 0, col: 0, type: "start", visible: false },
      { id: 2, row: 0, col: 1, type: "monster", visible: false },
    ];

    rerender({ icons: nextIcons, questEntriesById });

    await waitFor(() => {
      expect(result.current.selectedEntryId).toBeNull();
      expect(result.current.visibleById[2]).toBe(false);
    });
  });
});
