"use client";

import { motion } from "framer-motion";

type Props = {
  direction: "next" | "prev";
  children: React.ReactNode;
};

export const FlippingPage = ({
  direction,
  children,
}: Props) => {
  return (
    <motion.div
      initial={{
        rotateX: 2,
        rotateY:
          direction === "next"
            ? -180
            : 180,
        opacity: 0.7,
      }}
      animate={{
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        transformOrigin:
          direction === "next"
            ? "left center"
            : "right center",
      }}
      className="
        absolute
        inset-0
      "
    >
      {children}

      {/* flip shadow */}
      <div
        className="
          absolute
          inset-0
          bg-black/10
          pointer-events-none
        "
      />
    </motion.div>
  );
};