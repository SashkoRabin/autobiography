"use client";

import {
  useEffect,
  useState,
} from "react";

import { Book } from "@/components/book/core/Book";

const MOBILE_BOOK_WIDTH = 600;
const MOBILE_BOOK_HEIGHT = 900;
const MOBILE_SCREEN_PADDING = 24;

const getMobileBookScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  const { innerWidth, innerHeight } = window;
  const isPhonePortrait =
    innerWidth < 768 && innerHeight > innerWidth;

  if (!isPhonePortrait) {
    return 1;
  }

  return Math.min(
    (innerWidth - MOBILE_SCREEN_PADDING) /
      MOBILE_BOOK_WIDTH,
    (innerHeight - MOBILE_SCREEN_PADDING) /
      MOBILE_BOOK_HEIGHT,
    1
  );
};

export default function HomePage() {
  const [mobileBookScale, setMobileBookScale] =
    useState(1);
  const [isPhonePortrait, setIsPhonePortrait] =
    useState(false);

  useEffect(() => {
    const updateBookViewport = () => {
      setMobileBookScale(getMobileBookScale());
      setIsPhonePortrait(
        window.innerWidth < 768 &&
          window.innerHeight > window.innerWidth
      );
    };

    updateBookViewport();
    window.addEventListener("resize", updateBookViewport);

    return () => {
      window.removeEventListener(
        "resize",
        updateBookViewport
      );
    };
  }, []);

  return (
    <main
      className="
        flex
        h-screen
        w-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#2b2118]
      "
    >
      <div
        className="book-phone-frame"
        style={{
          width: isPhonePortrait
            ? MOBILE_BOOK_WIDTH
            : undefined,
          height: isPhonePortrait
            ? MOBILE_BOOK_HEIGHT
            : undefined,
        }}
      >
        <div
          className="book-phone-rotator"
          style={{
            transform: isPhonePortrait
              ? `rotate(90deg) scale(${mobileBookScale})`
              : undefined,
          }}
        >
          <Book isMobile={isPhonePortrait} />
        </div>
      </div>
    </main>
  );
}
