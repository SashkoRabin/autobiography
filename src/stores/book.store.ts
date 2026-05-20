import { create } from "zustand";

type FlipDirection = "next" | "prev";

type BookStore = {
  currentSpread: number;

  flipDirection: FlipDirection;

  isFlipping: boolean;

  nextSpread: () => void;
  prevSpread: () => void;
};

const LAST_SPREAD = 2;

export const useBookStore = create<BookStore>((set, get) => ({
  currentSpread: -1,

  flipDirection: "next",

  isFlipping: false,

  nextSpread: () => {
    const { currentSpread, isFlipping } = get();

    if (isFlipping) return;

    if (currentSpread < LAST_SPREAD) {
      set({
        currentSpread: currentSpread + 1,
        flipDirection: "next",
        isFlipping: true,
      });

      setTimeout(() => {
        set({
          isFlipping: false,
        });
      }, 800);
    }
  },

  prevSpread: () => {
    const { currentSpread, isFlipping } = get();

    if (isFlipping) return;

    if (currentSpread > -1) {
      set({
        currentSpread: currentSpread - 1,
        flipDirection: "prev",
        isFlipping: true,
      });

      setTimeout(() => {
        set({
          isFlipping: false,
        });
      }, 800);
    }
  },
}));