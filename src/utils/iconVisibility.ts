import { useState, useCallback } from "react";
import type { MapIcon } from "../types/icon";

export type VisibilityMap = Record<number, boolean>;

export function createInitialVisibilityMap(icons: MapIcon[]): VisibilityMap {
  return icons.reduce<VisibilityMap>((acc, icon) => {
    acc[icon.id] = icon.visible !== false;
    return acc;
  }, {});
}

export function updateVisibilityMap(current: VisibilityMap, icon: MapIcon): VisibilityMap {
  // Only revealing icons for now; extend here if you add hide rules.
  if (!icon.revealOnClickIds?.length) {
    return current;
  }

  const next = { ...current };
  icon.revealOnClickIds.forEach((id) => {
    next[id] = true;
  });
  return next;
}

export function useIconVisibility(icons: MapIcon[]) {
  const [visibleById, setVisibleById] = useState<VisibilityMap>(() => createInitialVisibilityMap(icons));

  const updateVisibility = useCallback((icon: MapIcon) => {
    setVisibleById((prev) => updateVisibilityMap(prev, icon));
  }, []);

  const isVisible = useCallback(
    (iconId: number) => !!visibleById[iconId],
    [visibleById]
  );

  return { visibleById, isVisible, updateVisibility };
}
