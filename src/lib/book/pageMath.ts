import type { FlipDirection } from "@/types/book";

type VisiblePageIndexesInput = {
  currentSpread: number;
  activeFlipSpread: number | null;
  flipDirection: FlipDirection;
  pageCount: number;
};

export const AUTHOR_PAGE_INDEX = -1;

export const CLOSED_BOOK_INDEX = -1;

export const getLastSpreadIndex = (pageCount: number) =>
  Math.max(0, pageCount - 1);

export const clampPageIndex = (
  index: number,
  pageCount: number
) => Math.max(0, Math.min(getLastSpreadIndex(pageCount), index));

export const getNextSpreadIndex = (
  currentSpread: number,
  pageCount: number
) => clampPageIndex(currentSpread + 2, pageCount);

export const getPrevSpreadIndex = (currentSpread: number) =>
  Math.max(0, currentSpread - 2);

export const getSpreadIndexForPage = (
  pageIndex: number,
  pageCount: number
) => {
  const lastSpread = getLastSpreadIndex(pageCount);

  if (pageIndex <= 0) {
    return 0;
  }

  const spreadIndex =
    pageIndex % 2 === 0 ? pageIndex : pageIndex + 1;

  return Math.min(lastSpread, spreadIndex);
};

export const getVisiblePageIndexes = ({
  currentSpread,
  activeFlipSpread,
  flipDirection,
  pageCount,
}: VisiblePageIndexesInput) => {
  const isFlippingNext =
    activeFlipSpread !== null && flipDirection === "next";

  const isFlippingPrev =
    activeFlipSpread !== null && flipDirection === "prev";

  return {
    leftIndex: isFlippingPrev
      ? currentSpread - 3
      : currentSpread - 1,

    rightIndex: isFlippingNext
      ? clampPageIndex(currentSpread + 2, pageCount)
      : currentSpread,
  };
};

export const getSheetPageIndexes = (
  activeFlipSpread: number,
  flipDirection: FlipDirection
) => ({
  frontIndex: activeFlipSpread,
  backIndex:
    flipDirection === "next"
      ? activeFlipSpread + 1
      : activeFlipSpread - 1,
});

export const getPrintedPageNumber = (pageIndex: number) =>
  pageIndex >= 0 ? pageIndex + 1 : undefined;

export const canDragPage = (
  direction: FlipDirection,
  currentSpread: number,
  pageCount: number
) =>
  direction === "next"
    ? currentSpread >= 0 &&
      currentSpread < getLastSpreadIndex(pageCount)
    : currentSpread > 0;
