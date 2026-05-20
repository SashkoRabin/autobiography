type Props = {
  side: "left" | "right";
  title: string;
};

export const BookPage = ({
  side,
  title,
}: Props) => {
  return (
    <div
      className="
        relative
        w-1/2
        h-full
        bg-[#d8c7a1]
        border border-[#b89f7a]
        overflow-hidden
        z-20
      "
      style={{
        borderRadius:
          side === "left"
            ? "6px 0 0 6px"
            : "0 6px 6px 0",
      }}
    >
      {/* paper gradient */}
      <div
        className="
          absolute
          inset-0
          opacity-40
          pointer-events-none
          bg-gradient-to-br
          from-[#f3e7c9]
          to-[#cdb58d]
        "
      />

      {/* page lighting */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/5
          via-transparent
          to-black/10
          pointer-events-none
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

      {/* inner shadow */}
      {side === "left" && (
        <div
          className="
            absolute
            right-0
            top-0
            w-10
            h-full
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
            w-10
            h-full
            bg-black/10
            blur-xl
          "
        />
      )}

      {/* content */}
      <div className="relative z-10 p-10">
        <h2
          className="
            text-5xl
            font-serif
            text-[#3b2b1f]
          "
        >
          {title}
        </h2>
      </div>
    </div>
  );
};