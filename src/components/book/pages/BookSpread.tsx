"use client";

import {
  useRef,
} from "react";

import {
  authorPage,
  pages,
} from "@/content/registry/spreads";
import {
  AUTHOR_PAGE_INDEX,
  getPrintedPageNumber,
  getVisiblePageIndexes,
} from "@/lib/book/pageMath";

import { usePageDrag } from "@/hooks/usePageDrag";
import { useBookStore } from "@/stores/book.store";

import { BookPage } from "./BookPage";
import { BookPageSheet } from "./BookPageSheet";

import { PageStack } from "../thickness/PageStack";

type Props = {
  isMobile?: boolean;
};

export const BookSpread = ({
  isMobile = false,
}: Props) => {
  const {
    currentSpread,
    nextSpread,
    prevSpread,
    startDrag,
    updateDrag,
    finishDrag,
    setHoveredCorner,
    flipDirection,
    activeFlipSpread,
  } = useBookStore();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const {
    beginPageDrag,
    updatePageDrag,
    endPageDrag,
  } = usePageDrag({
    containerRef,
    currentSpread,
    isMobile,
    pageCount: pages.length,
    nextSpread,
    prevSpread,
    startDrag,
    updateDrag,
    finishDrag,
    getMotionState: () => {
      const {
        dragProgress,
        pageVelocity,
      } = useBookStore.getState();

      return {
        dragProgress,
        pageVelocity,
      };
    },
  });

  const {
    leftIndex: baseLeftIndex,
    rightIndex: baseRightIndex,
  } = getVisiblePageIndexes({
    currentSpread,
    activeFlipSpread,
    flipDirection,
    pageCount: pages.length,
  });

  const leftPage =
    baseLeftIndex === AUTHOR_PAGE_INDEX
      ? authorPage
      : pages[baseLeftIndex] ?? null;

  const rightPage =
    pages[baseRightIndex] ?? null;

  return (
    <div
      ref={containerRef}
      className="
        relative
        w-full
        h-full
        bg-[#cdb58d]
        overflow-visible
      "
    >
      {/* page stacks */}
      <PageStack side="left" />

      <PageStack side="right" />

      {/* visible spread */}
      <div
        className="
          absolute
          inset-0
          z-20
          flex
        "
      >
        <BookPage
          side="left"
          title={leftPage?.title ?? ""}
          body={leftPage?.body}
          template={leftPage?.template}
          imageSrc={leftPage?.imageSrc}
          pageNumber={
            leftPage
              ? getPrintedPageNumber(baseLeftIndex)
              : undefined
          }
        />

        <BookPage
          side="right"
          title={rightPage?.title ?? ""}
          body={rightPage?.body}
          template={rightPage?.template}
          imageSrc={rightPage?.imageSrc}
          pageNumber={
            rightPage
              ? getPrintedPageNumber(baseRightIndex)
              : undefined
          }
        />
      </div>

      <BookPageSheet isMobile={isMobile} />

      {/* navigation */}
      <div
        onPointerDown={(event) =>
          beginPageDrag("prev", event)
        }
        onMouseDown={(event) =>
          beginPageDrag("prev", event)
        }
        onPointerMove={updatePageDrag}
        onPointerUp={endPageDrag}
        onPointerCancel={endPageDrag}
        onPointerEnter={() =>
          setHoveredCorner("left")
        }
        onPointerLeave={() =>
          setHoveredCorner(null)
        }
        className="
          absolute
          left-0
          top-0
          w-24
          h-full
          z-[2000]
          cursor-grab
          active:cursor-grabbing
        "
      />

      <div
        onPointerDown={(event) =>
          beginPageDrag("next", event)
        }
        onMouseDown={(event) =>
          beginPageDrag("next", event)
        }
        onPointerMove={updatePageDrag}
        onPointerUp={endPageDrag}
        onPointerCancel={endPageDrag}
        onPointerEnter={() =>
          setHoveredCorner("right")
        }
        onPointerLeave={() =>
          setHoveredCorner(null)
        }
        className="
          absolute
          right-0
          top-0
          w-24
          h-full
          z-[2000]
          cursor-grab
          active:cursor-grabbing
        "
      />
    </div>
  );
};
