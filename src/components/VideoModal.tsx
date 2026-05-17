"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoPayload {
  youtubeId: string;
  title: string;
  caption?: string;
  classification?: "DECLASSIFIED" | "ACTIVE" | "ARCHIVED" | "TERMINATED" | "CLASSIFIED";
  fileLabel?: string;
}

interface VideoModalContextValue {
  open: (payload: VideoPayload) => void;
  close: () => void;
}

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used inside VideoModalProvider");
  return ctx;
}

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<VideoPayload | null>(null);
  const pausedAudioRef = useRef<HTMLAudioElement[]>([]);

  const open = useCallback((p: VideoPayload) => setPayload(p), []);
  const close = useCallback(() => setPayload(null), []);

  // Pause all ambient audio while open, resume on close
  useEffect(() => {
    if (payload) {
      const playing: HTMLAudioElement[] = [];
      document.querySelectorAll("audio").forEach((a) => {
        if (!a.paused) {
          playing.push(a);
          a.pause();
        }
      });
      pausedAudioRef.current = playing;
      document.body.style.overflow = "hidden";
    } else {
      pausedAudioRef.current.forEach((a) => {
        a.play().catch(() => {});
      });
      pausedAudioRef.current = [];
      document.body.style.overflow = "";
    }
  }, [payload]);

  // ESC to close
  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [payload, close]);

  return (
    <VideoModalContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {payload && <VideoOverlay payload={payload} onClose={close} />}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}

function VideoOverlay({
  payload,
  onClose,
}: {
  payload: VideoPayload;
  onClose: () => void;
}) {
  const [recTime, setRecTime] = useState("00:00");

  useEffect(() => {
    const start = performance.now();
    const update = () => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
      const ss = String(elapsed % 60).padStart(2, "0");
      setRecTime(`${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const classification = payload.classification || "CLASSIFIED";
  const fileLabel = payload.fileLabel || "VID-FEED-0001";

  // YouTube nocookie embed with autoplay
  const src = `https://www.youtube-nocookie.com/embed/${payload.youtubeId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[180] bg-tton-black/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
    >
      {/* TOP HUD bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none"
      >
        <div className="hud-text flex flex-wrap items-center gap-3">
          <span className="rec-dot" />
          <span className="text-tton-blood font-bold">INCOMING TRANSMISSION</span>
          <span className="text-tton-amber/40 hidden sm:inline">━━</span>
          <span className="text-tton-amber hidden sm:inline">{fileLabel}</span>
          <span className="text-tton-amber/40 hidden md:inline">━━</span>
          <span
            className={`hidden md:inline border px-2 py-0.5 text-[10px] ${
              classification === "CLASSIFIED"
                ? "text-tton-amber border-tton-amber"
                : "text-tton-phosphor border-tton-phosphor"
            }`}
          >
            {classification}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          data-cursor-hover
          aria-label="Cerrar"
          className="pointer-events-auto hud-text inline-flex items-center gap-1.5 px-3 py-1 border border-tton-bone/40 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors bg-tton-black/60"
        >
          <X className="h-3.5 w-3.5" />
          ESC
        </button>
      </motion.div>

      {/* Video frame */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        {/* Title strip above the video */}
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-defused text-tton-bone text-3xl md:text-4xl uppercase leading-none tracking-tight">
            {payload.title}
          </h3>
          <div className="hud-text text-tton-amber/80 tabular-nums">
            <span className="text-tton-bone/60">REC </span>
            {recTime}
          </div>
        </div>

        {/* Bracket-framed video */}
        <div className="bracket-frame !p-0 relative">
          <div className="relative aspect-video bg-tton-black border border-tton-amber/40 overflow-hidden">
            <iframe
              src={src}
              title={payload.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            {/* Scanlines overlay on the video itself */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
          </div>
        </div>

        {/* Bottom caption + source */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 hud-text text-tton-bone/70">
          {payload.caption ? (
            <span className="text-tton-bone/85 font-body normal-case tracking-normal text-sm max-w-[60ch]">
              {payload.caption}
            </span>
          ) : (
            <span />
          )}
          <span className="text-tton-amber/70">
            SOURCE: youtube.com / {payload.youtubeId}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
