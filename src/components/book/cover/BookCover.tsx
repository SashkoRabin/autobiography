"use client";

import { motion } from "framer-motion";

import { useBookStore } from "@/stores/book.store";

export const BookCover = () => {
  const { nextSpread } = useBookStore();

  return (
    <motion.div
      onClick={nextSpread}
      initial={{
        rotateY: 0,
      }}
      animate={{
        rotateY: 0,
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative
        w-full
        h-full
        bg-[#4a3326]
        rounded-r-md
        rounded-l-sm
        shadow-2xl
        cursor-pointer
        overflow-hidden
        select-none
      "
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
      }}
    >
      {/* left spine */}
      <div className="absolute left-0 top-0 w-6 h-full bg-[#2d1d15]" />

      {/* texture */}
      <div
        className="
          absolute
          inset-0
          opacity-10
          bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)]
          bg-[size:12px_12px]
        "
      />

      {/* vignette */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-transparent
          via-transparent
          to-black/30
        "
      />

      {/* title */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          w-full
          h-full
          text-[#d9c7a3]
        "
      >
        <h1
          className="
            text-5xl
            font-serif
            tracking-wide
            text-center
            leading-tight
            px-8
          "
        >
          The Story of
          <br />
          Merkulov Oleksandr
        </h1>

        <p
          className="
            mt-8
            text-sm
            uppercase
            tracking-[0.4em]
          "
        >
          Interactive Resume
        </p>
      </div>
    </motion.div>
  );
};