import type { MapIcon } from "../types/mapIcon";

export type VisibilityMap = Record<number, boolean>;

export function createInitialVisibilityMap(icons: MapIcon[]): VisibilityMap {
  return icons.reduce<VisibilityMap>((acc, icon) => {
    acc[icon.id] = icon.visible !== false;
    return acc;
  }, {});
}
