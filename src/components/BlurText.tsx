"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  staggerMs?: number;
  triggerThreshold?: number;
}

/**
 * Reveals a string word-by-word with a 3-step blur-in keyframe.
 * Intersection-observer triggered (default 10% visibility).
 */
export function BlurText({
  text,
  className,
  staggerMs = 100,
  triggerThreshold = 0.1,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: triggerThreshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerThreshold]);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: (i * staggerMs) / 1000,
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
