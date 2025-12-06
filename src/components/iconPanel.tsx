// src/components/IconPanel.tsx

type IconPanelProps = {
  title: string;
  description: string;
  imageUrl?: string;
  row: number;
  col: number;
  onClose: () => void;
};

export function IconPanel({ title, description, imageUrl, row, col, onClose }: IconPanelProps) {
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
        <p>
          <strong>Position:</strong> row {row}, col {col}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
