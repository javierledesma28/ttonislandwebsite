"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[100svh] overflow-hidden bg-tton-black pt-24 pb-12"
    >
      {/* Background — dark gradient + radial */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,176,0,0.06) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(127,29,29,0.15) 0%, transparent 60%), #0a0a0a",
        }}
      />

      {/* Coordinate grid (subtle) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffb000 1px, transparent 1px), linear-gradient(to bottom, #ffb000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Logo watermark animado — sutil, detrás del contenido */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
        className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
      >
        <Image
          src="/brand/tton-logo-animated.gif"
          alt=""
          width={600}
          height={600}
          unoptimized
          className="w-[300px] h-[300px] md:w-[460px] md:h-[460px] lg:w-[620px] lg:h-[620px] object-contain"
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
          <span className="text-tton-bone/60">DATE: 16.05.2026</span>
        </motion.div>

        {/* Mega Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="font-defused text-tton-bone leading-[0.85] tracking-tight uppercase"
        >
          <span className="block text-7xl md:text-8xl lg:text-[10rem] glitch">
            T-TON
          </span>
          <span className="block text-7xl md:text-8xl lg:text-[10rem] text-tton-amber">
            ISLAND
          </span>
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
          <a
            href="https://youtu.be/ejLsYE6CEBE"
            target="_blank"
            rel="noopener noreferrer"
            className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-bone/30 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors"
            data-cursor-hover
          >
            <Play className="h-4 w-4 fill-current" />
            ¿QUÉ ES UN TETÓN?
          </a>
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
