"use client";

import { useEffect } from "react";

import { useBookStore } from "@/stores/book.store";

export const useBookKeyboard = () => {
  const { nextSpread, prevSpread } = useBookStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSpread();
      }

      if (e.key === "ArrowLeft") {
        prevSpread();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSpread, prevSpread]);
};