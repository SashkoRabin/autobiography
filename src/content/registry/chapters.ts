import { pages } from "./spreads";

import type { BookChapter } from "@/types/book";

const chapterTitles: Record<string, string> = {
  contents: "Contents",
  introduction: "Introduction",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
};

export const chapters: BookChapter[] = Object.entries(
  chapterTitles
).map(([id, title]) => {
  const startPageIndex = pages.findIndex(
    (page) => page.chapterId === id
  );

  return {
    id,
    title,
    startPageIndex,
  };
});

export const bookContents = chapters.filter(
  (chapter) => chapter.id !== "contents"
);

