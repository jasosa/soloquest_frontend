import type { MapHotSpot } from "../types/mapHotSpots";
import type { MapIcon } from "../types/mapIcon";

/**
 * Derives the flat list of icons for a quest without mutating the source hotspots.
 * Copies any revealed icons so callers can safely reuse the same hotspot data elsewhere.
 */
export function buildIconsFromHotspots(hotspots: MapHotSpot[]): MapIcon[] {
  return hotspots.flatMap((spot) => {
    // Clone revealed icons to avoid leaking mutations to the data file.
    const revealedIcons = (spot.revealedIcons ?? []).map((icon) => ({ ...icon }));

    return [{ ...spot.mapIcon }, ...revealedIcons];
  });
}
