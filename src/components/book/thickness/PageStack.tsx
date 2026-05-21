import { pages } from "@/content/registry/spreads";

import { useBookStore } from "@/stores/book.store";

type Props = {
  side: "left" | "right";
};

export const PageStack = ({
  side,
}: Props) => {
  const { currentSpread } = useBookStore();

  const totalPages = pages.length;

  const leftThickness =
    Math.max(0, currentSpread);

  const rightThickness =
    Math.max(
      0,
      totalPages - currentSpread - 1
    );

  const thickness =
    side === "left"
      ? leftThickness
      : rightThickness;

  const visibleThickness =
    Math.min(thickness, 12);

  if (visibleThickness === 0) {
    return null;
  }

  return (
    <div
      className={`
        absolute
        top-2
        ${
          side === "left"
            ? "left-0"
            : "right-0"
        }
        h-[96%]
        z-0
      `}
    >
      {Array.from({
        length: visibleThickness,
      }).map((_, i) => (
        <div
          key={i}
          className="
            absolute
            h-full
            w-4
            rounded-sm
            border
            border-[#b89f7a]
            bg-gradient-to-r
            from-[#b99e72]
            via-[#d9c59c]
            to-[#a98a5e]
          "
          style={{
            transform: `translateX(${
              side === "left"
                ? i * 1.05
                : -i * 1.05
            }px)`,

            opacity: 1 - i * 0.055,
          }}
        />
      ))}
    </div>
  );
};
