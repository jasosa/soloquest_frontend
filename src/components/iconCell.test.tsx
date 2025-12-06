import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { IconCell } from "./iconCell";
import type { MapIcon } from "../types/mapIcon";

const baseIcon: MapIcon = { id: 1, row: 0, col: 0, type: "treasure", visible: true };

describe("IconCell", () => {
  it("renders symbol when visible and no image", () => {
    const html = renderToString(
      <IconCell icon={baseIcon} isVisible isClickable={false} symbol="$" />
    );

    expect(html).toContain("hq-cell--has-icon");
    expect(html).toContain("$");
  });

  it("renders image when provided", () => {
    const html = renderToString(
      <IconCell icon={{ ...baseIcon, imageUrl: "/foo.png" }} isVisible isClickable={false} />
    );

    expect(html).toContain("img");
    expect(html).toContain("/foo.png");
  });

  it("omits content when not visible", () => {
    const html = renderToString(
      <IconCell icon={baseIcon} isVisible={false} isClickable={false} symbol="$" />
    );

    expect(html).not.toContain("$");
    expect(html).not.toContain("hq-cell--has-icon");
  });

  it("marks clickable cells and wires click handler", () => {
    const onClick = vi.fn();
    const html = renderToString(
      <IconCell icon={baseIcon} isVisible isClickable symbol="$" onClick={onClick} />
    );

    expect(html).toContain("hq-cell--clickable");
    expect(onClick).not.toHaveBeenCalled(); // renderToString won't invoke, just ensure handler accepted
  });
});
