export const BookSpine = () => {
  return (
    <div
      className="
        absolute
        left-1/2
        top-0
        -translate-x-1/2
        h-full
        w-[2px]
        bg-black/10
        z-10
      "
    >
      {/* center glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          -translate-x-1/2
          w-8
          h-full
          bg-black/10
          blur-xl
        "
      />
    </div>
  );
};