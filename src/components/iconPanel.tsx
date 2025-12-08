// src/components/IconPanel.tsx

import type { QuestEntry } from "../types/mapHotSpots";

type IconPanelProps = {
  showDebugInfo?: boolean;
  title: string;
  description: string;
  imageUrl?: string;
  row: number;
  col: number;
  subEntries?: QuestEntry[];
  onSelectSubEntry?: (id: number) => void;
  onClose: () => void;
};

export function IconPanel({ showDebugInfo, title, description, imageUrl, row, col, subEntries, onSelectSubEntry, onClose }: IconPanelProps) {
  return (
    <div className="hq-modal-backdrop" onClick={onClose}>
      <div
        className="hq-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="icon-modal-title"
      >
        <h2 id="icon-modal-title">{title}</h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "0.75rem" }}
          />
        )}
        <p>{description}</p>
        
        {showDebugInfo && (
          <p>
            <strong>Position:</strong> row {row}, col {col}
          </p>
        )}
        {subEntries?.length ? (
          <div className="subentry-actions">
            {subEntries.map((sub) => (
              <button key={sub.id} onClick={() => onSelectSubEntry?.(sub.id)}>
                {sub.title}
              </button>
            ))}
          </div>
         ) : null}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
