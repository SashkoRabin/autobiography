type Props = {
  side: "left" | "right";
};

export const PageStack = ({ side }: Props) => {
  return (
    <div
      className={`
        absolute
        top-2
        ${side === "left" ? "left-0" : "right-0"}
        w-6
        h-[96%]
        z-0
      `}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="
            absolute
            h-full
            w-full
            bg-[#cbb38a]
            border border-[#b89f7a]
            rounded-sm
          "
          style={{
            transform: `translateX(${
              side === "left"
                ? i * 1
                : -i * 1
            }px)`,
            opacity: 1 - i * 0.04,
          }}
        />
      ))}
    </div>
  );
};