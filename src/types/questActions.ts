/**
 * Actions a quest entry can perform on the board state.
 * Extend this union as new behaviors are added.
 */
export type QuestAction =
  | { type: "reveal"; iconIds: number[] } // make listed icons visible
  | { type: "hide"; iconIds: number[] } // make listed icons hidden
  | { type: "toggle"; iconIds: number[] } // flip visibility
  | { type: "openPanel"; entryId?: number } // open a panel for the given entry (defaults to the current one)
  | { type: "chain"; entryId: number } // immediately process another quest entry
  | { type: "noop"; reason?: string }; // placeholder for content-only entries
