"use client";

import { spreads } from "@/content/registry/spreads";

import { useBookStore } from "@/stores/book.store";

import { BookPage } from "./BookPage";

import { PageStack } from "../thickness/PageStack";
import { FlippingPage } from "../flipping/FlippingPage";

type Props = {
  spreadIndex: number;
};

export const BookSpread = ({
  spreadIndex,
}: Props) => {
  const spread = spreads[spreadIndex];

  const {
    nextSpread,
    prevSpread,
    flipDirection,
  } = useBookStore();

  if (!spread) return null;

  return (
    <FlippingPage direction={flipDirection}>
      <div
        className="
          relative
          flex
          w-full
          h-full
          bg-[#cdb58d]
        "
      >
        {/* click zones */}
        <div
          onClick={prevSpread}
          className="
            absolute
            left-0
            top-0
            w-1/2
            h-full
            z-30
            cursor-pointer
          "
        />

        <div
          onClick={nextSpread}
          className="
            absolute
            right-0
            top-0
            w-1/2
            h-full
            z-30
            cursor-pointer
          "
        />

        {/* page stacks */}
        <PageStack side="left" />

        <PageStack side="right" />

        {/* pages */}
        <BookPage
          side="left"
          title={spread.left.title}
        />

        <BookPage
          side="right"
          title={spread.right.title}
        />
      </div>
    </FlippingPage>
  );
};