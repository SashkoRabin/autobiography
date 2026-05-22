"use client";

import { motion } from "framer-motion";

import { getBookScene } from "@/lib/book/scene";
import {
  BOOK_EASE,
  COVER_TRANSITION_DURATION_SECONDS,
} from "@/lib/book/timing";
import { useBookStore } from "@/stores/book.store";

import { useBookKeyboard } from "@/hooks/useBookKeyboard";

import { BookCover } from "../cover/BookCover";
import { BookSpread } from "../pages/BookSpread";

type Props = {
  isMobile?: boolean;
};

export const Book = ({ isMobile = false }: Props) => {
  const {
    bookView,
    coverMotion,
  } = useBookStore();

  useBookKeyboard();

  const {
    isTransitioning,
    shouldShowSpread,
    width,
    coverSide,
  } = getBookScene({
    bookView,
    coverMotion,
  });

  const isOpeningBackCover =
    coverMotion === "openBack";

  return (
    <motion.div
      animate={{
        width,
      }}
      transition={{
        duration: 0.5,
        ease: BOOK_EASE,
      }}
      className="relative h-[600px]"
      style={{
        width,
      }}
    >
      <motion.div
        animate={{
          width: width - 20,
          opacity: isTransitioning
            ? 0.7
            : 1,
        }}
        transition={{
          duration: 0.5,
          ease: BOOK_EASE,
        }}
        className="
          absolute
          left-1/2
          top-0
          h-full
          -translate-x-1/2
          translate-y-6
          rounded-md
          bg-black/40
          blur-2xl
        "
        style={{
          width: width - 20,
        }}
      />

      <motion.div
        animate={{
          width: width - 10,
        }}
        transition={{
          duration: 0.5,
          ease: BOOK_EASE,
        }}
        className="
          absolute
          left-1/2
          top-0
          h-full
          -translate-x-1/2
          translate-y-3
          rounded-md
          bg-[#8e6f4d]
          opacity-50
        "
        style={{
          width: width - 10,
        }}
      />

      <motion.div
        animate={{
          width,
        }}
        transition={{
          duration: 0.5,
          ease: BOOK_EASE,
        }}
        className="
          relative
          h-full
          overflow-visible
          rounded-md
          shadow-[0_40px_80px_rgba(0,0,0,0.6)]
        "
        style={{
          width,
        }}
      >
        <motion.div
          animate={{
            opacity: shouldShowSpread ? 1 : 0,
          }}
          transition={{
            duration: 0.28,
            ease: BOOK_EASE,
          }}
          className="
            absolute
            inset-0
          "
          style={{
            visibility: shouldShowSpread
              ? "visible"
              : "hidden",
            pointerEvents: shouldShowSpread
              ? "auto"
              : "none",
          }}
        >
          <BookSpread />
        </motion.div>

        <motion.div
          animate={{
            opacity: isOpeningBackCover
              ? 0
              : shouldShowSpread
                ? 0
                : 1,
          }}
          transition={{
            duration: 0.28,
            ease: BOOK_EASE,
          }}
          className="
            absolute
            inset-0
          "
          style={{
            pointerEvents: shouldShowSpread
              ? "none"
              : "auto",
          }}
        >
          <BookCover
            key={`${coverSide}-${coverMotion ?? "rest"}`}
            side={coverSide}
            simpleTap={isMobile}
          />
        </motion.div>

        {isTransitioning && (
          <motion.div
            initial={{
              opacity: 0.62,
            }}
            animate={{
              opacity: [0.62, 0.78, 0],
            }}
            transition={{
              duration:
                COVER_TRANSITION_DURATION_SECONDS,
              times: [0, 0.45, 1],
              ease: BOOK_EASE,
            }}
            className="
              fixed
              inset-0
              z-[3000]
              bg-[#120d09]
              pointer-events-none
            "
          />
        )}
      </motion.div>
    </motion.div>
  );
};
