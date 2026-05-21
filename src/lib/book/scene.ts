import type { BookView, CoverMotion } from "@/types/book";

type BookSceneInput = {
  bookView: BookView;
  coverMotion: CoverMotion;
};

export const getBookScene = ({
  bookView,
  coverMotion,
}: BookSceneInput) => {
  const isTransitioning = coverMotion !== null;

  const shouldShowSpread =
    bookView === "open" &&
    coverMotion !== "openBack" &&
    coverMotion !== "closeFront" &&
    coverMotion !== "closeBack" &&
    coverMotion !== "turnToFront";

  const shouldUseOpenSize =
    shouldShowSpread ||
    coverMotion === "openFront" ||
    coverMotion === "openBack";

  return {
    isTransitioning,
    shouldShowSpread,
    width: shouldUseOpenSize ? 900 : 450,
    coverSide:
      bookView === "backClosed" ||
      coverMotion === "openBack" ||
      coverMotion === "closeBack"
        ? ("back" as const)
        : ("front" as const),
  };
};
