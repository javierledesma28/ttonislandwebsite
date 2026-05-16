"use client";

import { useEffect, useRef } from "react";
import { FadingVideo } from "./FadingVideo";

export type BackgroundVariant = "embers" | "void" | "gradient" | "video";

interface HeroBackgroundProps {
  variant?: BackgroundVariant;
  videoSrc?: string;
}

/**
 * Swappable Hero background. Default = "embers" (sober, ambient).
 * Change variant prop in Hero.tsx to compare.
 */
export function HeroBackground({
  variant = "embers",
  videoSrc = "/videos/vermis-trailer.mp4",
}: HeroBackgroundProps) {
  if (variant === "video") {
    return (
      <FadingVideo
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    );
  }

  if (variant === "void") {
    return <div className="absolute inset-0 bg-black z-0" />;
  }

  if (variant === "gradient") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-tton-ash to-black" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(217,119,6,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(127,29,29,0.18) 0%, transparent 55%)",
          }}
        />
      </div>
    );
  }

  // Default: embers (subtle floating particles + vignette)
  return <EmbersBackground />;
}

function EmbersBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      life: number;
      maxLife: number;
      hue: number;
    }

    const embers: Ember[] = [];
    const TARGET_COUNT = Math.min(60, Math.floor((width * height) / 30000));

    const spawn = (): Ember => ({
      x: Math.random() * width,
      y: height + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.3 - Math.random() * 0.6,
      r: 0.4 + Math.random() * 1.5,
      life: 0,
      maxLife: 400 + Math.random() * 400,
      hue: 20 + Math.random() * 25, // 20–45 = orange/amber
    });

    for (let i = 0; i < TARGET_COUNT; i++) {
      const e = spawn();
      e.y = Math.random() * height;
      e.life = Math.random() * e.maxLife;
      embers.push(e);
    }

    let rafId = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // subtle vignette
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.vy -= 0.0005; // slow upward drift
        e.life++;

        const lifeProgress = e.life / e.maxLife;
        const alpha =
          lifeProgress < 0.15
            ? lifeProgress / 0.15
            : lifeProgress > 0.85
            ? (1 - lifeProgress) / 0.15
            : 1;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 90%, 55%, ${alpha * 0.7})`;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();

        // small glow
        ctx.beginPath();
        ctx.fillStyle = `hsla(${e.hue}, 90%, 60%, ${alpha * 0.1})`;
        ctx.arc(e.x, e.y, e.r * 3, 0, Math.PI * 2);
        ctx.fill();

        if (e.life > e.maxLife || e.y < -20) {
          embers[i] = spawn();
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(127,29,29,0.18) 0%, transparent 50%), linear-gradient(to bottom, #000 0%, #0a0a0a 100%)",
        }}
      />
      {/* Ember particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
