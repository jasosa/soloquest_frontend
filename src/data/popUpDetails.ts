
export type PopUpDetails = {
  title: string;
  content: string;
  imageUrl?: string;
};

export const POPUP_DETAILS: Record<number, PopUpDetails> = {
  1: {
    title: "Starting Room",
    content: "Heroes begin here.",
    imageUrl: "./images/nb_1.JPG", // or omit if none
  },
  2: {
    title: "New Corridor",
    content: "A newly revealed corridor. Proceed with caution.",
    imageUrl: "./images/nb_2.JPG",
  },
  3: {
    title: "Secret Door",
    content: "Hidden passageway behind the altar.",
  },
  4: {
    title: "Treasure Chest",
    content: "Contains gold and a potion.",
    imageUrl: "/images/treasure.png",
  },
  5: {
    title: "Quest Marker",
    content: "Story objective to investigate.",
  },
  6: {
    title: "Pit Trap",
    content: "Avoid or disarm to proceed.",
  },
};