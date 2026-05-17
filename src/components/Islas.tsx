"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

interface Isla {
  nombre: string;
  era: string;
  descripcion: string;
  color: string;
  emoji: string;
}

const ISLAS: Isla[] = [
  {
    nombre: "Outfreak",
    era: "2023",
    descripcion: "Los pioneros. Donde empezó a sonar el nombre TTON.",
    color: "from-stone-800 to-stone-950",
    emoji: "🏴‍☠️",
  },
  {
    nombre: "Warfare",
    era: "2023",
    descripcion: "El fuego del PVP en su máxima expresión.",
    color: "from-orange-900 to-red-950",
    emoji: "⚔️",
  },
  {
    nombre: "Esperanza",
    era: "2023",
    descripcion: "El nombre lo dice todo. Un respiro entre el caos.",
    color: "from-amber-800 to-stone-950",
    emoji: "🌅",
  },
  {
    nombre: "Ponzoña",
    era: "2024",
    descripcion: "La más bardera. La más temida. Pura adrenalina.",
    color: "from-emerald-900 to-stone-950",
    emoji: "☠️",
  },
  {
    nombre: "Banana",
    era: "2024",
    descripcion: "La que nos dio la identidad. La que nos hizo familia.",
    color: "from-yellow-700 to-amber-950",
    emoji: "🍌",
  },
  {
    nombre: "Brava",
    era: "2025",
    descripcion: "La última de la vieja era. Salida con todo.",
    color: "from-red-900 to-stone-950",
    emoji: "🌪️",
  },
  {
    nombre: "VERMIS",
    era: "2025-2026",
    descripcion: "Fase Zero · Fase 1 · Renacidos. Nuestro salto a otra dimensión: con IA, con un servidor VIVO.",
    color: "from-tton-rust to-tton-blood",
    emoji: "🔥",
  },
];

export function Islas() {
  return (
    <section
      id="islas"
      className="relative bg-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          fileNumber="002"
          kicker="ISLAS"
          classification="ARCHIVED"
          title={
            <>
              SIETE CAPÍTULOS.
              <br />
              UNA HISTORIA.
            </>
          }
          intro={
            <>
              SCUM se juega en una isla — vos sos el prisionero. Nosotros,
              al construir distintas <strong className="text-tton-amber font-semibold">ediciones</strong> y
              <strong className="text-tton-amber font-semibold"> experiencias</strong> sobre ese mundo, dejamos
              que la comunidad las bautizara con su propio nombre:{" "}
              <em className="text-tton-bone">isla Outfreak, isla Banana, isla Ponzoña…</em>{" "}
              Cada una tuvo su sabor, su gente, su locura, sus cicatrices.
              Algunas duraron meses, otras un año. Todas dejaron marca.
            </>
          }
        />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ISLAS.map((isla, i) => (
          <IslaCard key={isla.nombre} isla={isla} index={i} />
        ))}
      </div>
    </section>
  );
}

function IslaCard({ isla, index }: { isla: Isla; index: number }) {
  const isLast = isla.nombre === "VERMIS";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
      className={`relative liquid-glass rounded-2xl p-6 md:p-8 min-h-[280px] flex flex-col justify-between overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1 ${
        isLast ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
      }`}
      data-cursor-hover
    >
      {/* Gradient backdrop revealed on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${isla.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`}
      />

      {/* Era chip */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-defused tracking-[0.25em] uppercase text-tton-rust">
          {isla.era}
        </span>
        <span className="text-4xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
          {isla.emoji}
        </span>
      </div>

      {/* Title + description */}
      <div className="relative">
        <h3 className="font-heading italic text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-[-2px]">
          {isla.nombre}
        </h3>
        <p className="mt-4 text-sm md:text-base text-white/80 font-body font-light leading-snug max-w-[34ch]">
          {isla.descripcion}
        </p>
      </div>
    </motion.div>
  );
}
