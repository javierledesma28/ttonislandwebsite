"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Survival/SCUM-style reticle cursor following the mouse.
 * Hidden on touch devices. Hovering interactive elements expands the reticle.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only on devices with fine pointer (mouse)
    const matches = window.matchMedia("(pointer: fine)").matches;
    if (!matches) return;
    setEnabled(true);

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest("a, button, [data-cursor-hover]") !== null)
      ) {
        setHovering(true);
      }
    };
    const handleLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest("a, button, [data-cursor-hover]") !== null)
      ) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring (laggy, springy) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[200] mix-blend-difference"
        style={{
          width: hovering ? 60 : 32,
          height: hovering ? 60 : 32,
          transition: "width 200ms ease, height 200ms ease",
        }}
      >
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <circle
            cx="30"
            cy="30"
            r="14"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
          <line x1="30" y1="6" x2="30" y2="14" stroke="white" strokeWidth="1" />
          <line x1="30" y1="46" x2="30" y2="54" stroke="white" strokeWidth="1" />
          <line x1="6" y1="30" x2="14" y2="30" stroke="white" strokeWidth="1" />
          <line x1="46" y1="30" x2="54" y2="30" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      {/* Inner dot (instant) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[201] w-1 h-1 bg-tton-rust rounded-full mix-blend-difference"
      />
      <style jsx global>{`
        @media (pointer: fine) {
          html,
          body,
          a,
          button {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
