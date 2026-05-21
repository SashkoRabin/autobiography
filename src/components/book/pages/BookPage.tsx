import { BookContents } from "../navigation/BookContents";

type Props = {
  side: "left" | "right";
  title: string;
  body?: string;
  template?: "text" | "contents";
  pageNumber?: number;
  fill?: boolean;
  showContent?: boolean;
};

export const BookPage = ({
  side,
  title,
  body,
  template = "text",
  pageNumber,
  fill = false,
  showContent = true,
}: Props) => {
  return (
    <div
      className={`
        relative
        ${fill ? "w-full" : "w-1/2"}
        h-full
        overflow-hidden
        border
        border-[#b89f7a]
        bg-[#d8c7a1]
        z-20
      `}
      style={{
        borderRadius:
          side === "left"
            ? "6px 0 0 6px"
            : "0 6px 6px 0",

        transform: fill
          ? "translateZ(0)"
          : side === "left"
            ? "perspective(1000px) rotateY(0.55deg)"
            : "perspective(1000px) rotateY(-0.55deg)",

        backfaceVisibility: "hidden",
      }}
    >
      {/* paper base gradient */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-40
          bg-gradient-to-br
          from-[#f3e7c9]
          to-[#cdb58d]
        "
      />

      {/* lighting */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-gradient-to-r
          from-black/5
          via-transparent
          to-black/10
        "
      />

      {/* paper noise */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          mix-blend-multiply
          bg-[radial-gradient(circle,_black_1px,_transparent_1px)]
          bg-[size:8px_8px]
        "
      />

      {/* page edge */}
      {side === "left" && (
        <div
          className="
            absolute
            top-0
            right-0
            w-[6px]
            h-full
            pointer-events-none
            bg-gradient-to-r
            from-transparent
            via-[#f6ebcf]/80
            to-[#8a7354]/40
            shadow-[inset_-2px_0_3px_rgba(77,53,31,0.18)]
          "
        />
      )}

      {side === "right" && (
        <div
          className="
            absolute
            top-0
            left-0
            w-[6px]
            h-full
            pointer-events-none
            bg-gradient-to-r
            from-[#8a7354]/35
            via-[#f6ebcf]/70
            to-transparent
            shadow-[inset_2px_0_3px_rgba(77,53,31,0.16)]
          "
        />
      )}

      {/* inner shadow */}
      {side === "left" && (
        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-10
            bg-black/10
            blur-xl
          "
        />
      )}

      {side === "right" && (
        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-10
            bg-black/10
            blur-xl
          "
        />
      )}

      {/* vignette */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-gradient-to-br
          from-transparent
          via-transparent
          to-black/10
        "
      />

      {/* fake paper imperfections */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          mix-blend-multiply
          bg-[radial-gradient(circle_at_20%_30%,_#000000_1px,_transparent_2px)]
          bg-[size:24px_24px]
        "
      />

      {/* content */}
      <div className="relative z-10 p-10">
        {showContent && title && (
          <>
            <h2
              className="
                text-5xl
                font-serif
                text-[#3b2b1f]
              "
            >
              {title}
            </h2>

            {template === "contents" ? (
              <BookContents />
            ) : body ? (
              <p
                className="
                  mt-8
                  max-w-[28ch]
                  font-serif
                  text-xl
                  leading-8
                  text-[#4a3828]/80
                "
              >
                {body}
              </p>
            ) : null}
          </>
        )}
      </div>

      {showContent && pageNumber && (
        <div
          className={`
            absolute
            bottom-5
            z-10
            font-serif
            text-sm
            text-[#5a4734]/70
            ${
              side === "left"
                ? "left-10"
                : "right-10"
            }
          `}
        >
          {pageNumber}
        </div>
      )}
    </div>
  );
};
