"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const FADE_MS = 600;
const STORAGE_KEY = "tton-audio-on";

/**
 * Ambient audio toggle button.
 * - Off by default (browser autoplay policy).
 * - Click to toggle play/pause.
 * - Smooth volume fade in/out via rAF.
 * - Persists preference in localStorage (but still requires a click to start).
 * - Loops forever, mutes when tab hidden to save resources.
 */
export function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRafRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeTo = (target: number, durationMs = FADE_MS) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRafRef.current !== null) cancelAnimationFrame(fadeRafRef.current);
    const start = audio.volume;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(tick);
      } else {
        fadeRafRef.current = null;
        if (target === 0) audio.pause();
      }
    };
    fadeRafRef.current = requestAnimationFrame(tick);
  };

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      fadeTo(0);
      setIsPlaying(false);
      try {
        localStorage.setItem(STORAGE_KEY, "0");
      } catch {}
    } else {
      try {
        audio.volume = 0;
        await audio.play();
        fadeTo(1);
        setIsPlaying(true);
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {}
      } catch (err) {
        console.warn("Audio play blocked:", err);
      }
    }
  };

  // Pause when tab hidden, resume if it was playing
  useEffect(() => {
    const onVis = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden && !audio.paused) {
        audio.pause();
      } else if (!document.hidden && isPlaying && audio.paused) {
        audio.volume = 0;
        audio.play().catch(() => {});
        fadeTo(1);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isPlaying]);

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (fadeRafRef.current !== null) cancelAnimationFrame(fadeRafRef.current);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient-loop.mp3"
        loop
        preload="none"
      />
      <button
        type="button"
        onClick={handleToggle}
        data-cursor-hover
        aria-label={isPlaying ? "Silenciar audio ambient" : "Activar audio ambient"}
        title={isPlaying ? "Silenciar — Black Strobe / I'm A Man" : "Activar audio — Black Strobe / I'm A Man"}
        className="hud-text inline-flex items-center gap-1.5 px-2.5 py-1 border border-tton-amber/40 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors group"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-3.5 w-3.5 text-tton-amber animate-pulse" />
            <span className="hidden md:inline text-tton-amber">SND</span>
          </>
        ) : (
          <>
            <VolumeX className="h-3.5 w-3.5" />
            <span className="hidden md:inline">MUTE</span>
          </>
        )}
      </button>
    </>
  );
}
