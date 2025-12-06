import { describe, expect, it } from "vitest";
import { buildIconsFromHotspots } from "./buildIcons";
import type { MapHotSpot } from "../types/mapHotSpots";

describe("buildIconsFromHotspots", () => {
  const baseHotspot: MapHotSpot = {
    id: 1,
    questEntryId: 101,
    mapIcon: { id: 1, row: 0, col: 0, type: "eye", visible: true },
  };

  it("returns the hotspot icon plus all revealed icons with revealOnClickIds wired", () => {
    const hotspots: MapHotSpot[] = [
      {
        ...baseHotspot,
        revealedIcons: [{ id: 2, row: 0, col: 1, type: "monster", visible: false }],
      },
    ];

    const result = buildIconsFromHotspots(hotspots);

    expect(result).toHaveLength(2);
    const hotspotIcon = result.find((icon) => icon.id === 1);
    const revealedIcon = result.find((icon) => icon.id === 2);

    expect(hotspotIcon?.revealOnClickIds).toEqual([2]);
    expect(revealedIcon).toBeDefined();
  });

  it("does not mutate the original hotspot or revealed icon objects", () => {
    const hotspots: MapHotSpot[] = [
      {
        ...baseHotspot,
        revealedIcons: [{ id: 3, row: 2, col: 2, type: "treasure", visible: false }],
      },
    ];
    const originalMapIcon = hotspots[0].mapIcon;
    const originalRevealed = hotspots[0].revealedIcons?.[0];

    const result = buildIconsFromHotspots(hotspots);
    const builtHotspotIcon = result.find((icon) => icon.id === originalMapIcon.id);
    const builtRevealed = result.find((icon) => icon.id === originalRevealed?.id);

    expect(originalMapIcon).not.toHaveProperty("revealOnClickIds");
    expect(builtHotspotIcon).not.toBe(originalMapIcon);
    expect(builtRevealed).not.toBe(originalRevealed);
  });

  it("omits revealOnClickIds when no icons are revealed", () => {
    const hotspots: MapHotSpot[] = [{ ...baseHotspot, id: 2, mapIcon: { ...baseHotspot.mapIcon, id: 5 } }];

    const [icon] = buildIconsFromHotspots(hotspots);

    expect(icon.revealOnClickIds).toBeUndefined();
  });
});
