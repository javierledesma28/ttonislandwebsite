"use client";

import { useEffect, useRef } from "react";

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
}

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before end

/**
 * Looping background video with rAF-driven crossfade.
 * Resumes each fade from current opacity (no jump).
 */
export function FadingVideo({ src, className, style, poster }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cancelRaf = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const fadeTo = (target: number, durationMs: number = FADE_MS) => {
      cancelRaf();
      const start = parseFloat(video.style.opacity || "0");
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / durationMs);
        const value = start + (target - start) * t;
        video.style.opacity = String(value);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleLoaded = () => {
      video.style.opacity = "0";
      void video.play().catch(() => {});
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      if (fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining > 0 && remaining <= FADE_OUT_LEAD) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelRaf();
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
