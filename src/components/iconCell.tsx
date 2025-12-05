import React from "react";
import type { MapIcon } from "../types/icon";

type IconCellProps = {
  icon?: MapIcon | null;
  isVisible: boolean;
  symbol?: string;
  onClick?: () => void;
};

export function IconCell({ icon, isVisible, symbol, onClick }: IconCellProps) {
  const clickable = !!icon && isVisible;

  return (
    <div
      className={`hq-cell ${clickable ? "hq-cell--has-icon" : ""}`}
      onClick={clickable ? onClick : undefined}
    >
      {clickable && symbol && (
        <span className="hq-cell-icon" title={icon!.label} aria-label={icon!.label}>
          {symbol}
        </span>
      )}
    </div>
  );
}