"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Iconic TEC1 surveillance drone — appears after the boot sequence,
 * patrols across the hero, then settles in a corner. Its CCTV camera
 * follows the cursor with delayed easing. Click → scan reveal panel.
 *
 * Drop a transparent PNG/JPG at /public/brand/tec1-drone.png to enable.
 */

const SRC = "/brand/tec1-drone.png";

const SCAN_DATA = [
  { label: "PRISIONERO", value: "0042" },
  { label: "ESTADO", value: "OBSERVANDO" },
  { label: "ZONA", value: "T-TON / ARCHIVE" },
  { label: "BCU LINK", value: "ESTABLE" },
  { label: "AMENAZA", value: "NINGUNA" },
];

export function TEC1Drone() {
  const [enabled, setEnabled] = useState(false);
  const [stage, setStage] = useState<"hidden" | "patrolling" | "idle" | "dismissed">("hidden");
  const [scanOpen, setScanOpen] = useState(false);

  // Cursor follow — the whole drone tilts slightly toward the cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 800], [12, -12]), {
    stiffness: 80,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1200], [-15, 15]), {
    stiffness: 80,
    damping: 20,
  });

  // The CCTV camera rotation (more reactive than the body)
  const camRot = useSpring(useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1200], [-25, 25]), {
    stiffness: 150,
    damping: 18,
  });

  useEffect(() => {
    // Only on fine pointer + after a delay to let boot sequence finish
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Check if user has dismissed it permanently
    if (sessionStorage.getItem("tton-drone-dismissed") === "1") return;

    setEnabled(true);
    const t1 = setTimeout(() => setStage("patrolling"), 4200); // after boot
    const t2 = setTimeout(() => setStage("idle"), 9500);       // after patrol
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, mouseX, mouseY]);

  const dismiss = () => {
    setStage("dismissed");
    try {
      sessionStorage.setItem("tton-drone-dismissed", "1");
    } catch {}
  };

  if (!enabled || stage === "hidden" || stage === "dismissed") return null;

  // Animation variants by stage
  const patrolling = stage === "patrolling";
  const idle = stage === "idle";

  return (
    <>
      {/* Drone body */}
      <motion.div
        className="fixed z-[70] pointer-events-none"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
        initial={{ x: "-25vw", y: "12vh", scale: 1.6, opacity: 0 }}
        animate={
          patrolling
            ? {
                x: ["-25vw", "30vw", "60vw"],
                y: ["12vh", "26vh", "18vh"],
                scale: [1.6, 1.3, 0.9],
                opacity: [0, 1, 1],
              }
            : idle
            ? {
                x: "calc(100vw - 200px)",
                y: "calc(100vh - 220px)",
                scale: 0.55,
                opacity: 0.95,
              }
            : { opacity: 0 }
        }
        transition={
          patrolling
            ? { duration: 5.3, ease: "easeInOut", times: [0, 0.5, 1] }
            : { duration: 1.3, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <motion.div
          animate={idle ? { y: [0, -6, 0] } : {}}
          transition={idle ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } : {}}
          className="relative"
        >
          <motion.div style={{ rotate: camRot }} className="origin-center">
            <Image
              src={SRC}
              alt="TEC1 Surveillance Drone"
              width={300}
              height={200}
              priority
              className="drop-shadow-[0_0_18px_rgba(255,176,0,0.18)] select-none"
              onError={(e) => {
                // Hide if asset is missing
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>

          {/* Patrol search beam */}
          {patrolling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 5.3, times: [0, 0.15, 0.85, 1] }}
              className="absolute left-1/2 top-full -translate-x-1/2 w-32 h-[60vh] origin-top pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,176,0,0.18) 0%, rgba(255,176,0,0.08) 40%, transparent 100%)",
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                filter: "blur(8px)",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Click target — invisible button over the drone in idle */}
      {idle && (
        <button
          type="button"
          onClick={() => setScanOpen((v) => !v)}
          data-cursor-hover
          aria-label="Activar drone TEC1"
          className="fixed z-[71] pointer-events-auto"
          style={{
            right: 20,
            bottom: 20,
            width: 170,
            height: 110,
            background: "transparent",
            cursor: "pointer",
          }}
        />
      )}

      {/* HUD scan panel — appears on click */}
      {idle && scanOpen && (
        <motion.div
          initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed z-[72] right-6 liquid-glass p-4 w-[260px]"
          style={{ bottom: 150 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="hud-text text-tton-amber inline-flex items-center gap-1.5">
              <span className="rec-dot" />
              SCAN COMPLETE
            </span>
            <button
              type="button"
              onClick={() => setScanOpen(false)}
              data-cursor-hover
              className="text-tton-bone/60 hover:text-tton-amber"
              aria-label="Cerrar scan"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {SCAN_DATA.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i }}
                className="flex items-baseline justify-between font-terminal text-[11px] uppercase tracking-[0.15em]"
              >
                <span className="text-tton-bone/60">{d.label}</span>
                <span className="text-tton-bone">{d.value}</span>
              </motion.div>
            ))}
          </div>
          <button
            type="button"
            onClick={dismiss}
            data-cursor-hover
            className="hud-text mt-3 w-full text-center inline-flex items-center justify-center gap-1 px-2 py-1.5 border border-tton-blood/40 text-tton-blood/80 hover:bg-tton-blood/10 transition-colors"
          >
            ALEJAR DRONE
          </button>
        </motion.div>
      )}
    </>
  );
}
