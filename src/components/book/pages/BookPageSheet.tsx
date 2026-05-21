"use client";

import { motion } from "framer-motion";

import { pages } from "@/content/registry/spreads";
import {
  getPrintedPageNumber,
  getSheetPageIndexes,
} from "@/lib/book/pageMath";
import {
  BOOK_EASE,
} from "@/lib/book/timing";

import { useBookStore } from "@/stores/book.store";

import { BookPage } from "./BookPage";

const getPage = (index: number) =>
  pages[index] ?? null;

export const BookPageSheet = () => {
  const {
    flipDirection,
    isDragging,
    dragProgress,
    activeFlipSpread,
    flipDurationMs,
  } = useBookStore();

  if (activeFlipSpread === null) {
    return null;
  }

  const isNext =
    flipDirection === "next";

  const { frontIndex, backIndex } =
    getSheetPageIndexes(
      activeFlipSpread,
      flipDirection
    );

  const frontPage = getPage(frontIndex);
  const backPage = getPage(backIndex);

  const rotation = isNext
    ? -180 * dragProgress
    : 180 * dragProgress;

  return (
    <motion.div
      animate={{
        rotateY: rotation,
        rotateX: 0,
        y: 0,
      }}
      transition={{
        duration: isDragging
          ? 0
          : flipDurationMs / 1000,
        ease: BOOK_EASE,
      }}
      style={{
        transformOrigin: isNext
          ? "left center"
          : "right center",
        transformStyle: "preserve-3d",
        willChange: "transform",
        zIndex: 1500,
        boxShadow:
          "0px 35px 80px rgba(0,0,0,0.32)",
      }}
      className={`
        absolute
        top-0
        h-full
        w-1/2
        ${isNext ? "left-1/2" : "left-0"}
      `}
    >
      <div
        className="
          absolute
          inset-0
        "
        style={{
          backfaceVisibility: "hidden",
        }}
      >
        <BookPage
          fill
          side={isNext ? "right" : "left"}
          title={frontPage?.title ?? ""}
          body={frontPage?.body}
          template={frontPage?.template}
          imageSrc={frontPage?.imageSrc}
          pageNumber={
            frontPage
              ? getPrintedPageNumber(frontIndex)
              : undefined
          }
        />
      </div>

      <div
        className="
          absolute
          inset-0
        "
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      >
        <BookPage
          fill
          side={isNext ? "left" : "right"}
          title={backPage?.title ?? ""}
          body={backPage?.body}
          template={backPage?.template}
          imageSrc={backPage?.imageSrc}
          pageNumber={
            backPage
              ? getPrintedPageNumber(backIndex)
              : undefined
          }
        />
      </div>

      <div
        className={`
          absolute
          top-0
          h-full
          w-[7px]
          pointer-events-none
          ${
            isNext
              ? "left-0"
              : "right-0"
          }
          bg-gradient-to-r
          from-[#8d7658]/45
          via-[#f3e7c9]
          to-[#b09468]/55
          shadow-[0_0_12px_rgba(64,43,25,0.28)]
        `}
        style={{
          transform: "translateZ(1px)",
        }}
      />

      <motion.div
        animate={{
          opacity:
            0.12 +
            Math.sin(
              dragProgress * Math.PI
            ) *
              0.3,
        }}
        transition={{
          duration: isDragging
            ? 0
            : 0.35,
        }}
        className="
          absolute
          inset-0
          bg-black
          pointer-events-none
        "
      />
    </motion.div>
  );
};
