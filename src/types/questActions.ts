/**
 * Actions a quest entry can perform on the board state.
 * Extend this union as new behaviors are added.
 */
export type QuestAction =
  | { type: "reveal"; iconIds: number[] } // make listed icons visible
  | { type: "hide"; iconIds: number[] } // make listed icons hidden
  | { type: "toggle"; iconIds: number[] } // flip visibility
  | { type: "openPanel"; entryId?: number; imageUrl?: string } // open a panel for the given entry (defaults to the current one)
  | { type: "openContextMenu"; entryId?: number } // open a contextual subentry menu near the hotspot
  | { type: "revealHotspots" } // reveal any hotspot icons that are currently hidden
  | { type: "chain"; entryId: number } // indicates a follow-up entry; UI triggers it (no auto-run)
  | { type: "noop"; reason?: string }; // placeholder for content-only entries
