"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useVideoModal } from "./VideoModal";
import { FadingVideo } from "./FadingVideo";

export function Hero() {
  const { open } = useVideoModal();

  const openVermisTrailer = () =>
    open({
      src: "/videos/vermis-trailer.mp4",
      title: "QUE ES UN TETON?",
      caption:
        "Trailer oficial del Proyecto VERMIS — dirigido y editado por Perro Karateka (Xemaxote).",
      classification: "DECLASSIFIED",
      fileLabel: "VID-002 · VERMIS · TRAILER",
    });

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[100svh] overflow-hidden bg-tton-black pt-24 pb-12"
    >
      {/* Background — video VERMIS al fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-tton-black">
        <FadingVideo
          src="/videos/vermis-trailer.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay para legibilidad del texto sobre el video */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.85) 100%), radial-gradient(ellipse at 50% 30%, rgba(255,176,0,0.05) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(127,29,29,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Coordinate grid (subtle, encima del video pero detrás del contenido) */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffb000 1px, transparent 1px), linear-gradient(to bottom, #ffb000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Logo watermark animado — alineado horizontalmente con el título */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.22, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
        className="absolute right-4 md:right-10 lg:right-16 top-24 md:top-32 lg:top-36 z-[3] pointer-events-none"
      >
        <Image
          src="/brand/tton-logo-animated.gif"
          alt=""
          width={500}
          height={500}
          unoptimized
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[420px] lg:h-[420px] object-contain"
          priority
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Status strip below HUD */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-terminal text-xs uppercase tracking-[0.2em] text-tton-amber/70 mb-6 flex flex-wrap items-center gap-2"
        >
          <span className="text-tton-bone/60">// ARCHIVE</span>
          <span className="text-tton-amber">CASE-2021-0042</span>
          <span className="text-tton-amber/30">━━</span>
          <span className="text-tton-blood">TRANSMISSION TERMINATED</span>
          <span className="text-tton-amber/30">━━</span>
          <span className="text-tton-bone/60">DATE: 17.05.2026</span>
        </motion.div>

        {/* Mega Title — heartbeat pulse on hover */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          whileHover="beat"
          className="font-defused text-tton-bone leading-[0.85] tracking-tight uppercase inline-block origin-left cursor-default"
          data-cursor-hover
          variants={{
            beat: {
              scale: [1, 1.005, 1, 1.008, 1],
              transition: {
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.18, 0.36, 0.54, 1],
              },
            },
          }}
        >
          <motion.span
            className="block text-7xl md:text-8xl lg:text-[10rem] glitch"
          >
            T-TON
          </motion.span>
          <motion.span
            className="block text-7xl md:text-8xl lg:text-[10rem] text-tton-amber"
            variants={{
              beat: {
                filter: [
                  "drop-shadow(0 0 0px rgba(255,176,0,0))",
                  "drop-shadow(0 0 8px rgba(255,176,0,0.2))",
                  "drop-shadow(0 0 0px rgba(255,176,0,0))",
                ],
                transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              },
            }}
          >
            ISLAND
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-2xl"
        >
          <p className="font-terminal text-tton-amber text-sm uppercase tracking-[0.2em] mb-3">
            // CLASSIFIED ARCHIVE — TEC1 SURVEILLANCE
          </p>
          <p className="text-tton-bone/85 font-body text-base md:text-lg leading-relaxed border-l-2 border-tton-amber pl-5">
            La comunidad SCUM en español más grande de hablahispana entre 2021
            y 2026. Cinco años de raids, eventos, lore, amistad. Top #1 por 7
            meses consecutivos. Top 12 mundial. Estos son los archivos
            desclasificados del cierre.
          </p>
        </motion.div>

        {/* Action row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#carta"
            className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-amber bg-tton-amber text-tton-black hover:bg-tton-rust hover:border-tton-rust transition-colors"
            data-cursor-hover
          >
            ACCEDER A LA CARTA
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openVermisTrailer}
            className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-bone/30 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors group relative overflow-hidden"
            data-cursor-hover
          >
            {/* Hover glitch flash */}
            <span className="absolute inset-0 bg-tton-amber/0 group-hover:bg-tton-amber/10 transition-colors pointer-events-none" />
            {/* Inline REC dot reveal on hover */}
            <span className="rec-dot opacity-0 group-hover:opacity-100 transition-opacity" />
            <Play className="h-4 w-4 fill-current group-hover:hidden" />
            <span className="group-hover:hidden">¿QUÉ ES UN TETÓN?</span>
            <span className="hidden group-hover:inline glitch">VER TRANSMISIÓN</span>
          </button>
        </motion.div>

        {/* Stat readouts row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <StatReadout label="UPTIME" value="4y 9m" hint="OPERACIÓN ACTIVA" />
          <StatReadout label="RANK GLOBAL" value="TOP 12" hint="RÉCORD MUNDIAL" />
          <StatReadout label="HABLAHISPANA" value="7 MESES" hint="CONSECUTIVOS EN TOP 1" />
          <StatReadout label="MIEMBROS" value="1389" hint="PRISIONEROS REGISTRADOS" />
        </motion.div>

        {/* Caution stripe + tag — bottom band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-14"
        >
          <div className="caution-stripe h-2 mb-4" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-terminal text-xs uppercase tracking-[0.2em] text-tton-bone/60">
            <span className="text-tton-amber">// ISLAS REGISTRADAS</span>
            {["OUTFREAK", "WARFARE", "ESPERANZA", "PONZOÑA", "BANANA", "BRAVA", "VERMIS"].map((isla) => (
              <span key={isla} className="text-tton-bone hover:text-tton-amber transition-colors">
                {isla}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatReadout({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border-l-2 border-tton-amber/60 pl-4 py-2">
      <p className="font-terminal text-xs uppercase tracking-[0.2em] text-tton-amber/70">
        {label}
      </p>
      <p className="mt-1 font-defused text-3xl md:text-4xl text-tton-bone leading-none tabular-nums">
        {value}
      </p>
      <p className="mt-2 font-terminal text-[10px] uppercase tracking-[0.15em] text-tton-bone/50">
        {hint}
      </p>
    </div>
  );
}
