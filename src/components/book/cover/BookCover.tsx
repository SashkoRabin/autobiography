"use client";

import {
  useRef,
  type MouseEvent,
  type PointerEvent,
} from "react";

import { useBookStore } from "@/stores/book.store";

type Props = {
  side?: "front" | "back" | "inside";
  interactive?: boolean;
  simpleTap?: boolean;
};

export const BookCover = ({
  side = "front",
  interactive = true,
  simpleTap = false,
}: Props) => {
  const lastPointerActionAt = useRef(0);

  const {
    nextSpread,
    prevSpread,
  } = useBookStore();

  const isFront = side === "front";
  const isBack = side === "back";

  const handleCoverAction = (
    event:
      | PointerEvent<HTMLDivElement>
      | MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const isLeftHalf =
      event.clientX < rect.left + rect.width / 2;

    if (simpleTap) {
      if (isFront) {
        nextSpread();
      } else if (isBack) {
        prevSpread();
      }

      return;
    }

    if ((isFront || isBack) && isLeftHalf) {
      prevSpread();
    } else {
      nextSpread();
    }
  };

  const shouldIgnoreSyntheticMouse = () =>
    performance.now() - lastPointerActionAt.current <
    400;

  return (
    <div
      onPointerDown={
        interactive
          ? (event) => {
              lastPointerActionAt.current =
                performance.now();
              handleCoverAction(event);
            }
          : undefined
      }
      onMouseDown={
        interactive
          ? (event) => {
              if (shouldIgnoreSyntheticMouse()) {
                return;
              }

              lastPointerActionAt.current =
                performance.now();
              handleCoverAction(event);
            }
          : undefined
      }
      onClick={
        interactive && simpleTap
          ? (event) => {
              if (shouldIgnoreSyntheticMouse()) {
                return;
              }

              handleCoverAction(event);
            }
          : undefined
      }
      className={`
        relative
        w-full
        h-full
        ${interactive ? "cursor-pointer" : ""}
        overflow-hidden
        rounded-r-md
        rounded-l-sm
        ${
          isBack
            ? "bg-[#3d2a20]"
            : side === "inside"
              ? "bg-[#6a5038]"
              : "bg-[#4a3326]"
        }
        select-none
        transition-transform
        duration-300
        ${interactive ? "hover:scale-[1.01]" : ""}
      `}
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      {/* spine */}
      <div
        className={`
          absolute
          ${isBack ? "right-0" : "left-0"}
          top-0
          h-full
          w-8
          bg-[#2d1d15]
        `}
      />

      {/* cover texture */}
      <div
        className="
          absolute
          inset-0
          opacity-10
          bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)]
          bg-[size:12px_12px]
        "
      />

      {/* lighting */}
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

      {isFront && (
        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            flex-col
            items-center
            justify-center
            text-[#d9c7a3]
          "
        >
          <h1
            className="
              px-8
              text-center
              text-5xl
              leading-tight
              font-serif
              tracking-wide
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
      )}

      {isBack && (
        <div
          className="
            absolute
            inset-10
            rounded-sm
            border
            border-[#8d6b4a]/50
          "
        />
      )}
    </div>
  );
};
