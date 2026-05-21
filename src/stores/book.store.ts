import { create } from "zustand";

import { pages } from "@/content/registry/spreads";
import {
  CONTENT_NAVIGATION_FLIP_DURATION_MS,
  COVER_TRANSITION_DURATION_MS,
  PAGE_FLIP_DURATION_MS,
} from "@/lib/book/timing";
import {
  CLOSED_BOOK_INDEX,
  getLastSpreadIndex,
  getNextSpreadIndex,
  getPrevSpreadIndex,
  getSpreadIndexForPage,
} from "@/lib/book/pageMath";
import type {
  BookView,
  CoverMotion,
  FlipDirection,
  HoveredCorner,
} from "@/types/book";

type BookStore = {
  bookView: BookView;

  coverMotion: CoverMotion;

  currentSpread: number;

  flipDirection: FlipDirection;

  isFlipping: boolean;

  isDragging: boolean;

  hoveredCorner: HoveredCorner;

  pageVelocity: number;

  flipDurationMs: number;

  dragProgress: number;

  activeFlipSpread: number | null;

  nextSpread: () => void;
  prevSpread: () => void;
  goToPage: (pageIndex: number) => void;
  startDrag: (
    direction: FlipDirection
  ) => void;
  updateDrag: (
    progress: number,
    velocity: number
  ) => void;
  finishDrag: (
    shouldComplete: boolean
  ) => void;
  setHoveredCorner: (
    corner: HoveredCorner
  ) => void;
};

const LAST_SPREAD = getLastSpreadIndex(pages.length);

const PAGE_TURN_PAUSE_MS = 70;
const CONTENT_NAVIGATION_PAUSE_MS =
  PAGE_TURN_PAUSE_MS / 2;

const finishFlipAfterMotion = (
  set: (
    state: Partial<BookStore>
  ) => void,
  nextState: Partial<BookStore> = {},
  duration = PAGE_FLIP_DURATION_MS
) => {
  window.setTimeout(() => {
    set({
      ...nextState,
      isFlipping: false,
      isDragging: false,
      dragProgress: 0,
      pageVelocity: 0,
      activeFlipSpread: null,
      coverMotion: null,
    });
  }, duration);
};

const animatePageByPage = (
  set: (
    state: Partial<BookStore>
  ) => void,
  get: () => BookStore,
  targetSpread: number
) => {
  const { currentSpread } = get();

  if (currentSpread === targetSpread) {
    set({
      isFlipping: false,
      isDragging: false,
      dragProgress: 0,
      pageVelocity: 0,
      activeFlipSpread: null,
    });

    return;
  }

  const direction =
    targetSpread > currentSpread
      ? "next"
      : "prev";

  const nextSpread =
    direction === "next"
      ? getNextSpreadIndex(
          currentSpread,
          pages.length
        )
      : getPrevSpreadIndex(currentSpread);

  set({
    flipDirection: direction,
    isFlipping: true,
    isDragging: false,
    dragProgress: 1,
    pageVelocity: 0,
    flipDurationMs:
      CONTENT_NAVIGATION_FLIP_DURATION_MS,
    activeFlipSpread:
      direction === "next"
        ? currentSpread
        : currentSpread - 1,
  });

  window.setTimeout(() => {
    set({
      currentSpread: nextSpread,
      dragProgress: 0,
      pageVelocity: 0,
      activeFlipSpread: null,
    });

    window.setTimeout(() => {
      animatePageByPage(
        set,
        get,
        targetSpread
      );
    }, CONTENT_NAVIGATION_PAUSE_MS);
  }, CONTENT_NAVIGATION_FLIP_DURATION_MS);
};

export const useBookStore =
  create<BookStore>((set, get) => ({
    currentSpread: CLOSED_BOOK_INDEX,

    bookView: "frontClosed",

    coverMotion: null,

    flipDirection: "next",

    isFlipping: false,

    isDragging: false,

    hoveredCorner: null,

    pageVelocity: 0,

    flipDurationMs: PAGE_FLIP_DURATION_MS,

    dragProgress: 0,

    activeFlipSpread: null,

    nextSpread: () => {
      const {
        bookView,
        currentSpread,
        isFlipping,
        isDragging,
      } = get();

      if (isFlipping || isDragging) return;

      if (bookView === "frontClosed") {
        set({
          bookView: "open",
          coverMotion: "openFront",
          flipDirection: "next",
          isFlipping: true,
          currentSpread: 0,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(
          set,
          {},
          COVER_TRANSITION_DURATION_MS
        );

        return;
      }

      if (bookView === "backClosed") {
        set({
          coverMotion: "turnToFront",
          flipDirection: "next",
          isFlipping: true,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(
          set,
          {
            bookView: "frontClosed",
            currentSpread: CLOSED_BOOK_INDEX,
          },
          COVER_TRANSITION_DURATION_MS
        );

        return;
      }

      if (currentSpread < LAST_SPREAD) {
        set({
          flipDirection: "next",
          isFlipping: true,
          dragProgress: 1,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
          activeFlipSpread: currentSpread,
        });

        finishFlipAfterMotion(set, {
          currentSpread: getNextSpreadIndex(
            currentSpread,
            pages.length
          ),
        });

        return;
      }

      if (currentSpread === LAST_SPREAD) {
        set({
          coverMotion: "closeBack",
          flipDirection: "next",
          isFlipping: true,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(
          set,
          {
            bookView: "backClosed",
          },
          COVER_TRANSITION_DURATION_MS
        );
      }
    },

    prevSpread: () => {
      const {
        bookView,
        currentSpread,
        isFlipping,
        isDragging,
      } = get();

      if (isFlipping || isDragging) return;

      if (bookView === "frontClosed") {
        set({
          coverMotion: "turnToFront",
          flipDirection: "prev",
          isFlipping: true,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(
          set,
          {
            bookView: "backClosed",
            currentSpread: LAST_SPREAD,
          },
          COVER_TRANSITION_DURATION_MS
        );

        return;
      }

      if (bookView === "backClosed") {
        set({
          coverMotion: "openBack",
          currentSpread: LAST_SPREAD,
          flipDirection: "prev",
          isFlipping: true,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(
          set,
          {
            bookView: "open",
          },
          COVER_TRANSITION_DURATION_MS
        );

        return;
      }

      if (bookView === "open") {
        if (currentSpread === 0) {
          set({
            coverMotion: "closeFront",
            flipDirection: "prev",
            isFlipping: true,
            flipDurationMs: PAGE_FLIP_DURATION_MS,
          });

          finishFlipAfterMotion(
            set,
            {
              bookView: "frontClosed",
              currentSpread: CLOSED_BOOK_INDEX,
            },
            COVER_TRANSITION_DURATION_MS
          );

          return;
        }

        set({
          flipDirection: "prev",
          isFlipping: true,
          dragProgress: 1,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
          activeFlipSpread:
            currentSpread - 1,
        });

        finishFlipAfterMotion(set, {
          currentSpread: getPrevSpreadIndex(currentSpread),
        });
      }
    },

    goToPage: (pageIndex) => {
      const {
        bookView,
        currentSpread,
        isFlipping,
        isDragging,
      } = get();

      if (
        bookView !== "open" ||
        isFlipping ||
        isDragging
      ) return;

      const targetSpread =
        getSpreadIndexForPage(
          pageIndex,
          pages.length
        );

      if (targetSpread === currentSpread) return;

      animatePageByPage(
        set,
        get,
        targetSpread
      );
    },

    startDrag: (direction) => {
      const {
        bookView,
        currentSpread,
        isFlipping,
      } = get();

      if (
        isFlipping ||
        bookView !== "open"
      ) return;

      if (
        direction === "next" &&
        currentSpread >= 0 &&
        currentSpread < LAST_SPREAD
      ) {
        set({
          flipDirection: "next",
          isDragging: true,
          dragProgress: 0,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
          activeFlipSpread:
            currentSpread,
          pageVelocity: 0,
        });
      }

      if (
        direction === "prev" &&
        currentSpread > 0
      ) {
        set({
          flipDirection: "prev",
          isDragging: true,
          dragProgress: 0,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
          activeFlipSpread:
            currentSpread - 1,
          pageVelocity: 0,
        });
      }
    },

    updateDrag: (
      progress,
      velocity
    ) => {
      const { isDragging } = get();

      if (!isDragging) return;

      set({
        dragProgress: Math.max(
          0,
          Math.min(1, progress)
        ),
        pageVelocity: velocity,
      });
    },

    finishDrag: (
      shouldComplete
    ) => {
      const {
        currentSpread,
        flipDirection,
        isDragging,
      } = get();

      if (!isDragging) return;

      if (shouldComplete) {
        const nextSpread =
          flipDirection === "next"
            ? getNextSpreadIndex(
                currentSpread,
                pages.length
              )
            : getPrevSpreadIndex(currentSpread);

        set({
          isDragging: false,
          isFlipping: true,
          dragProgress: 1,
          flipDurationMs: PAGE_FLIP_DURATION_MS,
        });

        finishFlipAfterMotion(set, {
          currentSpread: nextSpread,
        });

        return;
      }

      set({
        isDragging: false,
        isFlipping: true,
        dragProgress: 0,
        flipDurationMs: PAGE_FLIP_DURATION_MS,
      });

      finishFlipAfterMotion(set);
    },

    setHoveredCorner: (corner) => {
      set({
        hoveredCorner: corner,
      });
    },
  }));
