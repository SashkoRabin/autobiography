"use client";

import { bookContents } from "@/content/registry/chapters";
import { getPrintedPageNumber } from "@/lib/book/pageMath";
import { useBookStore } from "@/stores/book.store";

export const BookContents = () => {
  const goToPage = useBookStore(
    (state) => state.goToPage
  );

  return (
    <nav
      aria-label="Book contents"
      className="
        mt-8
        max-w-[32ch]
        font-serif
      "
    >
      <ol className="space-y-4">
        {bookContents.map((chapter) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() =>
                goToPage(chapter.startPageIndex)
              }
              className="
                group
                grid
                w-full
                grid-cols-[auto_1fr_auto]
                items-end
                gap-3
                text-left
                text-[#4a3828]/85
                transition-colors
                hover:text-[#2f2118]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#7b5a37]
              "
            >
              <span
                className="
                  text-xl
                  leading-none
                "
              >
                {chapter.title}
              </span>

              <span
                className="
                  mb-1
                  border-b
                  border-dotted
                  border-[#7b5a37]/35
                  transition-colors
                  group-hover:border-[#7b5a37]/70
                "
              />

              <span
                className="
                  text-sm
                  leading-none
                  text-[#5a4734]/75
                "
              >
                {getPrintedPageNumber(
                  chapter.startPageIndex
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

