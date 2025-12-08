import { describe, expect, it } from "vitest";
import { buildQuestData } from "./buildQuestData";
import type { Quest } from "../types/quest";
import type { MapHotSpot, QuestEntry } from "../types/mapHotSpots";

const quest: Quest = {
  id: 999,
  name: "Unit Test Quest",
  intro: "Intro text",
  initialEntryId: 10,
};

const hotspots: MapHotSpot[] = [
  { id: 1, mapIconId: 2, questEntryId: 10 },
];

const questEntries: QuestEntry[] = [
  {
    id: 10,
    title: "Reveal",
    description: "Reveal an icon",
    actions: [{ type: "reveal", iconIds: [2] }],
  },
];

describe("buildQuestData", () => {
  it("builds lookups and clones hotspots", () => {
    const result = buildQuestData(quest, hotspots, questEntries);

    expect(result.hotspots).toHaveLength(1);
    expect(result.hotspots[0]).not.toBe(hotspots[0]);
    expect(result.hotspotByIconId.get(2)?.questEntryId).toBe(10);
    expect(result.questEntriesById[10].title).toBe("Reveal");
    expect(result.quest).toBe(quest);
  });

  it("applies fallback images for icons without an explicit image", () => {
    const result = buildQuestData(quest, hotspots, questEntries);
    const eyeIcon = result.icons.find((icon) => icon.id === 2);

    expect(eyeIcon?.imageUrl).toBe("/icons/Eye.png");
  });
});
