import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { IconPanel } from "./iconPanel";

describe("IconPanel", () => {
  const props = {
    title: "Treasure Room",
    description: "Find the gold.",
    imageUrl: "/treasure.png",
    row: 1,
    col: 2,
    onClose: vi.fn(),
  };

  it("renders title, description, image and position", () => {
    const html = renderToString(<IconPanel {...props} />);
    const normalized = html.replace(/<!--.*?-->/g, ""); // strip React comment boundaries

    expect(normalized).toContain(props.title);
    expect(normalized).toContain(props.description);
    expect(normalized).toContain(props.imageUrl);
    expect(normalized).toContain("row 1, col 2");
  });

  it("omits image when not provided", () => {
    const html = renderToString(<IconPanel {...props} imageUrl={undefined} />);

    expect(html).not.toContain("img");
  });
});
