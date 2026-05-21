import type { BookPageContent } from "@/types/book";

const TEXT_PAGE_CHARACTER_LIMIT = 450;
const SKILLS_PAGE_CHARACTER_LIMIT = 350;
const INTRODUCTION_PAGE_CHARACTER_LIMIT = 350;

const normalizeParagraphBreaks = (body: string) =>
  body.replace(/\\n/g, "\n");

const splitLongWord = (
  word: string,
  characterLimit: number
) => {
  const parts: string[] = [];

  for (
    let index = 0;
    index < word.length;
    index += characterLimit
  ) {
    parts.push(
      word.slice(index, index + characterLimit)
    );
  }

  return parts;
};

const splitBodyIntoPages = (
  body: string,
  firstPageCharacterLimit = TEXT_PAGE_CHARACTER_LIMIT,
  nextPageCharacterLimit = firstPageCharacterLimit
) => {
  const normalizedBody =
    normalizeParagraphBreaks(body).trim();

  const paragraphs = normalizedBody
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const pages: string[] = [];

  let currentPage = "";

  const pushCurrentPage = () => {
    if (!currentPage.trim()) return;

    pages.push(currentPage.trim());

    currentPage = "";
  };

  const getCurrentPageLimit = () =>
    pages.length === 0
      ? firstPageCharacterLimit
      : nextPageCharacterLimit;

  paragraphs.forEach((paragraph) => {
    const characterLimit =
      getCurrentPageLimit();

    const paragraphWithSpacing =
      currentPage.length === 0
        ? paragraph
        : `\n\n${paragraph}`;

    if (
      currentPage.length +
        paragraphWithSpacing.length >
      characterLimit
    ) {
      pushCurrentPage();

      currentPage = paragraph;
    } else {
      currentPage += paragraphWithSpacing;
    }
  });

  pushCurrentPage();

  return pages.length
    ? pages
    : [body];
};

const calculateNextPageCharacterLimit = (page: BookPageContent, characterLimit: number) => {
  if (page.template === "introduction") return TEXT_PAGE_CHARACTER_LIMIT;
  if (page.template === "skills") return SKILLS_PAGE_CHARACTER_LIMIT;
  return characterLimit
}

export const paginateBookPages = (
  sourcePages: BookPageContent[]
) =>
  sourcePages.flatMap((page) => {
    if (!page.body || page.template === "contents") {
      return [page];
    }

    const characterLimit =
      page.template === "introduction"
        ? INTRODUCTION_PAGE_CHARACTER_LIMIT
        : TEXT_PAGE_CHARACTER_LIMIT;

    const nextPageCharacterLimit = calculateNextPageCharacterLimit(page, characterLimit);

    const bodyPages = splitBodyIntoPages(
      page.body,
      characterLimit,
      nextPageCharacterLimit
    );

    return bodyPages.map((body, index) => ({
      ...page,
      template:
        index === 0 ? page.template : "text",
      imageSrc:
        index === 0 ? page.imageSrc : undefined,
      id:
        index === 0
          ? page.id
          : `${page.id}-continued-${index + 1}`,
      body,
    }));
  });
