import type { MapIcon } from "../types/mapIcon";

type IconCellProps = {
  icon?: MapIcon | null;
  isVisible: boolean;
  symbol?: string;
  isClickable: boolean;
  onClick?: () => void;
};

export function IconCell({ icon, isVisible, isClickable, symbol, onClick }: IconCellProps) {
  const rotation = icon?.rotationDeg ?? 0;
  const rotationStyle = rotation ? { transform: `rotate(${rotation}deg)`, transformOrigin: "50% 50%" } : undefined;
  const showImage = !!icon?.imageUrl && isVisible;
  const showSymbol = !!symbol && isVisible && !showImage;

  return (
     <div
      className={`hq-cell ${isVisible ? "hq-cell--has-icon" : ""} ${isClickable ? "hq-cell--clickable" : ""}`}
      onClick={isClickable ? onClick : undefined}
    >
      {showImage && (
        <img className="hq-cell-image" src={icon!.imageUrl} style={rotationStyle}
        />
      )}
      {showSymbol && (
        <span className="hq-cell-icon" style={rotationStyle} >
          {symbol}
        </span>
      )}
    </div>
  );
}
