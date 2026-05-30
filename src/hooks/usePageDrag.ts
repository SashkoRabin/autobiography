"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";

import { canDragPage } from "@/lib/book/pageMath";
import type { FlipDirection } from "@/types/book";

type DragMeta = {
  direction: FlipDirection;
  startPosition: number;
  moved: boolean;
  lastProgress: number;
  lastTime: number;
};

type UsePageDragInput = {
  containerRef: RefObject<HTMLDivElement | null>;
  currentSpread: number;
  isMobile?: boolean;
  pageCount: number;
  nextSpread: () => void;
  prevSpread: () => void;
  startDrag: (direction: FlipDirection) => void;
  updateDrag: (
    progress: number,
    velocity: number
  ) => void;
  finishDrag: (shouldComplete: boolean) => void;
  getMotionState: () => {
    dragProgress: number;
    pageVelocity: number;
  };
};

export const usePageDrag = ({
  containerRef,
  currentSpread,
  isMobile = false,
  pageCount,
  nextSpread,
  prevSpread,
  startDrag,
  updateDrag,
  finishDrag,
  getMotionState,
}: UsePageDragInput) => {
  const dragRef = useRef<DragMeta | null>(null);

  const getPageWidth = () => {
    const rect =
      containerRef.current?.getBoundingClientRect();

    return rect
      ? isMobile
        ? rect.height / 2
        : rect.width / 2
      : 450;
  };

  const beginDragAt = (
    direction: FlipDirection,
    position: number
  ) => {
    if (dragRef.current) return;

    if (
      !canDragPage(
        direction,
        currentSpread,
        pageCount
      )
    ) {
      if (direction === "next") {
        nextSpread();
      } else {
        prevSpread();
      }

      return;
    }

    dragRef.current = {
      direction,
      startPosition: position,
      moved: false,
      lastProgress: 0,
      lastTime: performance.now(),
    };

    startDrag(direction);
  };

  const updateDragAt = (position: number) => {
    const drag = dragRef.current;

    if (!drag) return;

    const pageWidth = getPageWidth();

    const rawProgress =
      drag.direction === "next"
        ? (drag.startPosition - position) / pageWidth
        : (position - drag.startPosition) / pageWidth;

    const progress = Math.max(
      0,
      Math.min(1, rawProgress)
    );

    if (progress > 0.02) {
      drag.moved = true;
    }

    const now = performance.now();
    const deltaTime = Math.max(
      16,
      now - drag.lastTime
    );

    const velocity =
      ((progress - drag.lastProgress) / deltaTime) *
      1000;

    drag.lastProgress = progress;
    drag.lastTime = now;

    updateDrag(progress, velocity);
  };

  const endDragAt = () => {
    const drag = dragRef.current;

    if (!drag) return;

    const { dragProgress, pageVelocity } =
      getMotionState();

    const shouldComplete =
      !drag.moved ||
      dragProgress > 0.45 ||
      pageVelocity > 0.85;

    dragRef.current = null;

    finishDrag(shouldComplete);
  };

  const beginPageDrag = (
    direction: FlipDirection,
    event:
      | PointerEvent<HTMLDivElement>
      | MouseEvent<HTMLDivElement>
  ) => {
    if ("pointerId" in event) {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    }

    beginDragAt(
      direction,
      isMobile ? event.clientY : event.clientX
    );
  };

  const updatePageDrag = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    updateDragAt(
      isMobile ? event.clientY : event.clientX
    );
  };

  const endPageDrag = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    endDragAt();
  };

  useEffect(() => {
    const handleMouseMove = (
      event: globalThis.MouseEvent
    ) => {
      updateDragAt(
        isMobile ? event.clientY : event.clientX
      );
    };

    const handleTouchMove = (
      event: globalThis.TouchEvent
    ) => {
      const touch = event.touches[0];

      if (touch) {
        updateDragAt(
          isMobile ? touch.clientY : touch.clientX
        );
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );
    window.addEventListener("mouseup", endDragAt);
    window.addEventListener(
      "touchmove",
      handleTouchMove,
      { passive: true }
    );
    window.addEventListener("touchend", endDragAt);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      window.removeEventListener(
        "mouseup",
        endDragAt
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );
      window.removeEventListener(
        "touchend",
        endDragAt
      );
    };
  });

  return {
    beginPageDrag,
    updatePageDrag,
    endPageDrag,
  };
};
