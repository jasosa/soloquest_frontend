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
  hasChain?: boolean;
  onSelectSubEntry?: (id: number) => void;
  onNext?: () => void;
  onClose: () => void;
};

export function IconPanel({ showDebugInfo, title, description, imageUrl, row, col, subEntries, hasChain, onSelectSubEntry, onNext, onClose }: IconPanelProps) {
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
        {hasChain ? (
        console.log('Chain action'),
        <div className="subentry-actions">
          <button onClick={onNext}>Next</button>
        </div>
        ) : subEntries?.length ? (
          console.log('Subentry actions'),
          <div className="subentry-actions">
            {subEntries.map((sub) => (
              <button key={sub.id} onClick={() => onSelectSubEntry?.(sub.id)}>
                {sub.title}
              </button>
            ))}
          </div>
         ) : null}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
