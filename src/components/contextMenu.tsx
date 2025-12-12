import type { QuestEntry } from "../types/mapHotSpots";

type ContextMenuProps = {
  title: string;
  description?: string;
  position: { top: string; left: string };
  subEntries?: QuestEntry[];
  onSelectSubEntry?: (id: number) => void;
  onClose: () => void;
};

export function ContextMenu({ title, description, position, subEntries, onSelectSubEntry, onClose }: ContextMenuProps) {
  return (
    <div className="hq-context-menu-layer">
      <div className="hq-context-menu" style={position}>
        <header className="hq-context-menu__header">
          <div>
            <p className="hq-context-menu__eyebrow">Acción</p>
            <h3 className="hq-context-menu__title">{title}</h3>
          </div>
          <button className="hq-context-menu__close" onClick={onClose} aria-label="Cerrar menú contextual">
            ×
          </button>
        </header>
        {description && <p className="hq-context-menu__description">{description}</p>}
        {subEntries?.length ? (
          <div className="hq-context-menu__list">
            {subEntries.map((sub) => (
              <button key={sub.id} className="hq-context-menu__item" onClick={() => onSelectSubEntry?.(sub.id)}>
                <span className="hq-context-menu__item-title">{sub.title}</span>
                {sub.description && <span className="hq-context-menu__item-desc">{sub.description}</span>}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
