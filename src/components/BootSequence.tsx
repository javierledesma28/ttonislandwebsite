"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "T-TON ISLAND SECURITY BOOT v4.9", delay: 0 },
  { text: "INITIALIZING PRISONER #0042...", delay: 350 },
  { text: "GPS UPLINK............ [OK]", delay: 700 },
  { text: "BCU INTEGRITY......... [OK]", delay: 950 },
  { text: "TEC1 SUPERVISOR....... [OK]", delay: 1200 },
  { text: "ISLAND CONNECTION..... [OK]", delay: 1450 },
  { text: "COMMUNITY DATA........ [LOADING 5 YEARS OF HISTORY]", delay: 1700 },
  { text: "", delay: 2050 },
  { text: "> WELCOME HOME, T-TON.", delay: 2200, highlight: true },
];

export function BootSequence() {
  const [done, setDone] = useState(false);
  const [linesShown, setLinesShown] = useState(0);

  useEffect(() => {
    // If user has already seen this in this session, skip
    if (sessionStorage.getItem("tton-booted") === "1") {
      setDone(true);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setLinesShown(i + 1), line.delay));
    });
    const finish = setTimeout(() => {
      sessionStorage.setItem("tton-booted", "1");
      setDone(true);
    }, 3500);
    timers.push(finish);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-start justify-center px-8 md:px-16 lg:px-24"
        >
          {/* Subtle scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
            }}
          />
          {/* CRT flicker vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          <div className="relative font-mono text-sm md:text-base max-w-2xl">
            {BOOT_LINES.slice(0, linesShown).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={
                  line.highlight
                    ? "text-tton-rust mt-3 text-xl md:text-2xl font-heading italic tracking-wide"
                    : "text-tton-bone/80 leading-relaxed"
                }
              >
                {line.text || " "}
                {i === linesShown - 1 && !line.highlight && (
                  <span className="inline-block w-2 h-4 ml-1 bg-tton-bone/80 animate-pulse align-middle" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
