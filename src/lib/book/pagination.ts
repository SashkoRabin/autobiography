import type { BookPageContent } from "@/types/book";

const TEXT_PAGE_CHARACTER_LIMIT = 360;

const splitLongWord = (word: string) => {
  const parts: string[] = [];

  for (
    let index = 0;
    index < word.length;
    index += TEXT_PAGE_CHARACTER_LIMIT
  ) {
    parts.push(
      word.slice(index, index + TEXT_PAGE_CHARACTER_LIMIT)
    );
  }

  return parts;
};

const splitBodyIntoPages = (body: string) => {
  const words = body.trim().split(/\s+/);
  const pages: string[] = [];
  let currentPage = "";

  words.forEach((word) => {
    if (word.length > TEXT_PAGE_CHARACTER_LIMIT) {
      if (currentPage) {
        pages.push(currentPage);
        currentPage = "";
      }

      pages.push(...splitLongWord(word));
      return;
    }

    const nextPage = currentPage
      ? `${currentPage} ${word}`
      : word;

    if (nextPage.length > TEXT_PAGE_CHARACTER_LIMIT) {
      pages.push(currentPage);
      currentPage = word;
      return;
    }

    currentPage = nextPage;
  });

  if (currentPage) {
    pages.push(currentPage);
  }

  return pages.length ? pages : [body];
};

export const paginateBookPages = (
  sourcePages: BookPageContent[]
) =>
  sourcePages.flatMap((page) => {
    if (!page.body || page.template === "contents") {
      return [page];
    }

    const bodyPages = splitBodyIntoPages(page.body);

    return bodyPages.map((body, index) => ({
      ...page,
      id:
        index === 0
          ? page.id
          : `${page.id}-continued-${index + 1}`,
      body,
    }));
  });
