import { describe, expect, it } from "vitest";
import { createInitialVisibilityMap, updateVisibilityMap, type VisibilityMap } from "./iconVisibility";
import type { MapIcon } from "../types/mapIcon";

const makeIcon = (overrides: Partial<MapIcon>): MapIcon => ({
  id: 1,
  row: 0,
  col: 0,
  type: "monster",
  visible: true,
  ...overrides,
});

describe("iconVisibility helpers", () => {
  describe("createInitialVisibilityMap", () => {
    it("defaults to true for visible icons and false when explicitly hidden", () => {
      const icons = [makeIcon({ id: 1 }), makeIcon({ id: 2, visible: false })];

      const result = createInitialVisibilityMap(icons);

      expect(result).toEqual<VisibilityMap>({ 1: true, 2: false });
    });
  });

  describe("updateVisibilityMap", () => {
    it("reveals icons listed in revealOnClickIds", () => {
      const current: VisibilityMap = { 1: true, 2: false, 3: false };
      const icon = makeIcon({ id: 1, revealOnClickIds: [2, 3] });

      const updated = updateVisibilityMap(current, icon);

      expect(updated).toEqual({ 1: true, 2: true, 3: true });
      expect(updated).not.toBe(current);
    });

    it("returns the same map when no reveal ids are present", () => {
      const current: VisibilityMap = { 1: true };
      const icon = makeIcon({ id: 1 });

      const updated = updateVisibilityMap(current, icon);

      expect(updated).toBe(current);
    });
  });
});
