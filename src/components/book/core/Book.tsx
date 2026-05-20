"use client";

import { motion } from "framer-motion";

import { useBookStore } from "@/stores/book.store";

import { useBookKeyboard } from "@/hooks/useBookKeyboard";

import { BookCover } from "../cover/BookCover";
import { BookSpread } from "../pages/BookSpread";
import { BookShell } from "./BookShell";

export const Book = () => {
  const { currentSpread } = useBookStore();

  useBookKeyboard();

  return (
    <motion.div
      className="relative"
      style={{
        perspective: 3000,
      }}
      whileHover={{
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <BookShell>
        {currentSpread === -1 ? (
          <BookCover />
        ) : (
          <BookSpread spreadIndex={currentSpread} />
        )}
      </BookShell>
    </motion.div>
  );
};