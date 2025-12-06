import { describe, expect, it } from "vitest";
import { buildQuestData } from "./buildQuestData";
import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";

const hotspot = (overrides: Partial<MapHotSpot> = {}): MapHotSpot => ({
  id: 1,
  questEntryId: 1,
  mapIcon: { id: 10, row: 0, col: 0, type: "start", visible: true },
  revealedIcons: [{ id: 11, row: 0, col: 1, type: "monster", visible: false }],
  ...overrides,
});

const questEntries: QuestEntry[] = [{ id: 1, title: "Test Quest", description: "Desc", imageUrl: "img" }];

describe("buildQuestData", () => {
  it("clones hotspots and builds helper maps", () => {
    const hotspots = [hotspot()];

    const result = buildQuestData(hotspots, questEntries);

    expect(result.hotspots).toHaveLength(1);
    expect(result.hotspots[0]).not.toBe(hotspots[0]);
    expect(result.hotspots[0].mapIcon).not.toBe(hotspots[0].mapIcon);
    expect(result.hotspots[0].revealedIcons?.[0]).not.toBe(hotspots[0].revealedIcons?.[0]);
    expect(result.icons.map((i) => i.id)).toEqual([10, 11]);
    expect(result.questEntriesById[1]).toEqual(questEntries[0]);
    expect(result.hotspotByIconId.get(10)?.id).toBe(1);
  });

  it("handles empty revealedIcons arrays", () => {
    const hs = hotspot({ revealedIcons: undefined });

    const result = buildQuestData([hs], questEntries);

    expect(result.icons.map((i) => i.id)).toEqual([hs.mapIcon.id]);
  });
});
