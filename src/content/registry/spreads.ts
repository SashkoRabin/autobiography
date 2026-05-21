import type { BookPageContent } from "@/types/book";

import { paginateBookPages } from "@/lib/book/pagination";

const sourceAuthorPage: BookPageContent = {
  id: "author-history",
  chapterId: "history",
  title: "History",
  body:
    "Тут предистория...",
};

const authorPages = paginateBookPages([sourceAuthorPage]);
const authorContinuationPages = authorPages.slice(1);

const sourcePages: BookPageContent[] = [
  {
    id: "contents-1",
    chapterId: "contents",
    template: "contents",
    title: "Contents",
    body:
      "",
  },

  ...authorContinuationPages,

  {
    id: "introduction-1",
    chapterId: "introduction",
    title: "Introduction",
    body:
      "Обо мне...",
  },

  {
    id: "skills-1",
    chapterId: "skills",
    title: "Skills",
    body:
      "Мои скиллы...",
  },

  {
    id: "projects-1",
    chapterId: "projects",
    title: "Projects",
    body:
      "Про мои проекты...",
  },

  {
    id: "contact-1",
    chapterId: "contact",
    title: "Contact",
    body:
      "Контактная информация...",
  },
];

export const pages = paginateBookPages(sourcePages);

export const authorPage = authorPages[0];

export const spreads = pages;
