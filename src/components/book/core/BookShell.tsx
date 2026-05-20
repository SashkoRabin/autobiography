import { ReactNode } from "react";

import { BookSpine } from "./BookSpine";

type Props = {
  children: ReactNode;
};

export const BookShell = ({ children }: Props) => {
  return (
    <div
      className="
        relative
        w-[900px]
        h-[600px]
      "
    >
      {/* bottom shadow */}
      <div
        className="
          absolute
          inset-0
          translate-y-6
          scale-[0.98]
          rounded-md
          bg-black/40
          blur-2xl
        "
      />

      {/* book depth */}
      <div
        className="
          absolute
          inset-0
          translate-y-3
          rounded-md
          bg-[#8e6f4d]
          opacity-50
        "
      />

      {/* main book */}
      <div
        className="
          relative
          w-full
          h-full
          rounded-md
          overflow-hidden
          shadow-[0_40px_80px_rgba(0,0,0,0.6)]
        "
      >
        <BookSpine />

        {children}
      </div>
    </div>
  );
};