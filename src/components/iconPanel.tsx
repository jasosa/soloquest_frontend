// src/components/IconPanel.tsx
import React from "react";
import type { MapIcon } from "../types/icon";

type IconPanelProps = {
  icon: MapIcon;
  onClose: () => void;
};

export function IconPanel({ icon, onClose }: IconPanelProps) {
  return (
    <div className="hq-modal-backdrop" onClick={onClose}>
      <div
        className="hq-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="icon-modal-title"
      >
        <h2 id="icon-modal-title">{icon.label}</h2>
        {icon.imageUrl && (
          <img
            src={icon.imageUrl}
            alt={icon.label}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "0.75rem" }}
          />
        )}
        <p>{icon.description}</p>
        <p>
          <strong>Position:</strong> row {icon.row}, col {icon.col}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
