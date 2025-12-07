import { describe, expect, it, vi } from "vitest";
import { buildQuestData } from "./buildQuestData";
import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";
import { MAP_ICONS as SOURCE_ICONS } from "./mapIcons";

// Provide a controlled icon list for the module under test.
vi.mock("./mapIcons", () => ({
  MAP_ICONS: [
    { id: 10, row: 0, col: 0, type: "start", visible: true },
    { id: 11, row: 0, col: 1, type: "monster", visible: false },
  ],
}));

const hotspot = (overrides: Partial<MapHotSpot> = {}): MapHotSpot => ({
  id: 1,
  questEntryId: 1,
  mapIconId: 10,
  clickable: true,
  openPanelOnClick: true,
  ...overrides,
});

const questEntries: QuestEntry[] = [{ id: 1, title: "Test Quest", description: "Desc", imageUrl: "img" }];
const quest = { initialEntryId: 1 };

describe("buildQuestData", () => {
  it("clones hotspots, icons, and builds helper maps", () => {
    const hotspots = [hotspot()];

    const result = buildQuestData(quest, hotspots, questEntries);

    expect(result.hotspots).toHaveLength(1);
    expect(result.hotspots[0]).not.toBe(hotspots[0]);
    expect(result.hotspots[0]).toEqual(hotspots[0]);

    expect(result.icons.map((i) => i.id)).toEqual([10, 11]);
    expect(result.icons[0]).not.toBe(SOURCE_ICONS[0]); // ensure clone, not reference

    expect(result.questEntriesById[1]).toEqual(questEntries[0]);
    expect(result.hotspotByIconId.get(10)?.id).toBe(1);
    expect(result.quest.initialEntryId).toBe(1);
  });

  it("leaves the source hotspot unmutated when result is changed", () => {
    const hs = hotspot();
    const result = buildQuestData(quest, [hs], questEntries);

    // mutate result hotspot to verify the original is unchanged
    result.hotspots[0].clickable = false;
    expect(hs.clickable).toBe(true);
  });

  it("clones icons so mutations do not leak back to source data", () => {
    const result = buildQuestData(quest, [hotspot()], questEntries);

    result.icons[0].row = 99;
    expect(SOURCE_ICONS[0].row).toBe(0);
  });
});
