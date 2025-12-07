import React from "react";
import type { MapIcon } from "../types/mapIcon";

type OverlayIconCellProps = {
  icon: MapIcon;
  rows: number;
  cols: number;
  isVisible: boolean;
  isClickable: boolean;
  symbol?: string;
  onClick?: () => void;
};

export function OverlayIconCell({
  icon,
  rows,
  cols,
  isVisible,
  isClickable,
  symbol,
  onClick,
}: OverlayIconCellProps) {
  if (!isVisible) return null;

  const rowOffset = icon.rowOffset ?? 0;
  const colOffset = icon.colOffset ?? 0;
  const widthCells = icon.widthCells ?? 1;
  const heightCells = icon.heightCells ?? 1;
  const rotation = icon.rotationDeg ?? 0;
  const rotationStyle = rotation ? { transform: `rotate(${rotation}deg)`, transformOrigin: "50% 50%" } : undefined;

  const top = ((icon.row + rowOffset) / rows) * 100;
  const left = ((icon.col + colOffset) / cols) * 100;
  const width = (widthCells / cols) * 100;
  const height = (heightCells / rows) * 100;

  const showImage = !!icon.imageUrl;
  const showSymbol = !showImage && !!symbol;

  return (
    <div
      className={`hq-overlay-icon ${isClickable ? "hq-overlay-icon--clickable" : ""}`}
      style={{ top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%` }}
      onClick={isClickable ? onClick : undefined}
    >
      {showImage ? (
        <img className="hq-cell-image" src={icon.imageUrl} alt={icon.type} style={rotationStyle} />
      ) : (
        showSymbol && <span className="hq-multi-icon__symbol" style={rotationStyle}>{symbol}</span>
      )}
    </div>
  );
}
