"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Hito {
  fecha: string;
  titulo: string;
  detalle: string;
  tipo?: "milestone" | "evento" | "isla" | "cierre";
}

const HITOS: Hito[] = [
  {
    fecha: "Ago 2021",
    titulo: "Nace T-Ton Island",
    detalle: "Un experimento. 10% PVE / 90% PVP. Reinicio diario a las 5 AM Argentina.",
    tipo: "milestone",
  },
  {
    fecha: "Sep 2021",
    titulo: "Aportamos a la traducción oficial",
    detalle: "Empezamos a colaborar con la traducción del juego al español. Esto fue solo el comienzo.",
    tipo: "milestone",
  },
  {
    fecha: "Jul 2022",
    titulo: "Torneo de MMA",
    detalle: "Uno de los eventos más épicos. Hasta tuvo trailer y video de highlights en YouTube.",
    tipo: "evento",
  },
  {
    fecha: "Mar 2023",
    titulo: "Salón de la Fama",
    detalle: "Xemaxote inaugura el canal donde inmortalizamos los mejores momentos del server.",
    tipo: "milestone",
  },
  {
    fecha: "2023-2024",
    titulo: "La era de las islas",
    detalle: "Outfreak, Warfare, Esperanza, Ponzoña, Banana, Brava. Cada una con su sabor, su gente, su locura.",
    tipo: "isla",
  },
  {
    fecha: "Abr 2025",
    titulo: "Cae Isla Banana → nace TTON Town",
    detalle: "Las cenizas de Banana dan vida a TTON Town (HumanitZ). La historia continúa.",
    tipo: "isla",
  },
  {
    fecha: "Jun 2025",
    titulo: "SCUM 1.0 + Proyecto VERMIS Fase Zero",
    detalle: "Llega la versión 1.0 del juego. Nosotros lanzamos un proyecto complejo, cambiante, lleno de desafíos.",
    tipo: "milestone",
  },
  {
    fecha: "Oct 2025",
    titulo: "VERMIS Fase 1: aplicación de IA",
    detalle: "Probamos llevar la isla más allá con inteligencia artificial. Helpers T, ecosistema vivo. Ambicioso.",
    tipo: "milestone",
  },
  {
    fecha: "Dic 2025",
    titulo: "VERMIS Renacidos (Fase 2)",
    detalle: "HARD PVE. Sin loot regalado. Sin margen para errores. La experiencia SCUM más cruda.",
    tipo: "milestone",
  },
  {
    fecha: "16 May 2026",
    titulo: "Cierre",
    detalle: "La vida tiene ciclos. Cerramos con la cabeza en alto y el corazón lleno.",
    tipo: "cierre",
  },
];

export function Cronologia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="historia"
      ref={containerRef}
      className="relative bg-black py-32 md:py-48 px-6 md:px-16"
    >
      {/* Section header */}
      <div className="max-w-5xl mx-auto mb-24">
        <p className="text-sm font-body text-white/60 mb-6">// Historia</p>
        <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
          Cuatro años,
          <br />
          nueve meses,
          <br />
          mil historias.
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
        {/* Animated foreground line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-tton-rust via-tton-rust to-tton-blood -translate-x-1/2"
        />

        {HITOS.map((hito, i) => (
          <HitoBlock key={i} hito={hito} index={i} />
        ))}
      </div>
    </section>
  );
}

function HitoBlock({ hito, index }: { hito: Hito; index: number }) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-16 md:mb-24 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
      >
        <div
          className={`w-4 h-4 rounded-full ${
            hito.tipo === "cierre"
              ? "bg-tton-blood ring-4 ring-tton-blood/30"
              : hito.tipo === "evento"
              ? "bg-tton-rust"
              : hito.tipo === "isla"
              ? "bg-tton-military"
              : "bg-tton-bone"
          }`}
        />
      </motion.div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`pl-16 md:pl-0 w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
        }`}
      >
        <div className="liquid-glass rounded-2xl p-6 md:p-8 inline-block w-full">
          <p
            className={`text-xs font-mono uppercase tracking-widest mb-2 ${
              hito.tipo === "cierre" ? "text-tton-blood" : "text-tton-rust"
            }`}
          >
            {hito.fecha}
          </p>
          <h3 className="font-heading italic text-white text-3xl md:text-4xl leading-none tracking-[-1px] mb-3">
            {hito.titulo}
          </h3>
          <p className="text-sm md:text-base text-white/80 font-body font-light leading-relaxed">
            {hito.detalle}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
