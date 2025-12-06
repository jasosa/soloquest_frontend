import React from "react";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { OverlayIconCell } from "./overlayIconCell";
import type { MapIcon } from "../types/mapIcon";

const makeIcon = (overrides: Partial<MapIcon> = {}): MapIcon => ({
  id: 99,
  row: 2,
  col: 3,
  widthCells: 2,
  heightCells: 1,
  type: "door",
  visible: true,
  ...overrides,
});

describe("OverlayIconCell", () => {
  it("returns null when not visible", () => {
    const html = renderToString(
      <OverlayIconCell icon={makeIcon()} rows={10} cols={10} isVisible={false} isClickable={false} />
    );

    expect(html).toBe("");
  });

  it("renders with computed positioning and symbol", () => {
    const html = renderToString(
      <OverlayIconCell icon={makeIcon()} rows={20} cols={20} isVisible isClickable={false} symbol="D" />
    );

    expect(html).toContain("hq-overlay-icon");
    expect(html).toContain("top:10%");
    expect(html).toContain("left:15%");
    expect(html).toContain("width:10%");
    expect(html).toContain("height:5%");
    expect(html).toContain("D");
  });

  it("prefers image over symbol", () => {
    const html = renderToString(
      <OverlayIconCell
        icon={makeIcon({ imageUrl: "/door.png" })}
        rows={10}
        cols={10}
        isVisible
        isClickable
        symbol="D"
      />
    );

    expect(html).toContain("/door.png");
    expect(html).not.toContain(">D<");
  });
});
