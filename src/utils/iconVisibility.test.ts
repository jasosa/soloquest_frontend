import { describe, expect, it } from "vitest";
import { createInitialVisibilityMap, type VisibilityMap } from "./iconVisibility";
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
  it("defaults to true for visible icons and false when explicitly hidden", () => {
    const icons = [makeIcon({ id: 1 }), makeIcon({ id: 2, visible: false })];

    const result = createInitialVisibilityMap(icons);

    expect(result).toEqual<VisibilityMap>({ 1: true, 2: false });
  });
});
