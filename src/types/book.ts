export type FlipDirection = "next" | "prev";

export type HoveredCorner = "left" | "right" | null;

export type BookView = "frontClosed" | "open" | "backClosed";

export type CoverMotion =
  | "openFront"
  | "closeFront"
  | "openBack"
  | "closeBack"
  | "turnToFront"
  | null;

export type BookPageContent = {
  id: string;
  chapterId: string;
  template?: "text" | "contents";
  title: string;
  body?: string;
};

export type BookChapter = {
  id: string;
  title: string;
  startPageIndex: number;
};
