"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Logro {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  titulo: string;
  subtitulo: string;
  decimales?: number;
}

const LOGROS: Logro[] = [
  {
    valor: 7,
    sufijo: " meses",
    titulo: "#1 Hablahispana",
    subtitulo: "Consecutivos en la cima de los servers en español",
  },
  {
    valor: 12,
    prefijo: "Top #",
    titulo: "Del mundo entero",
    subtitulo: "Récord histórico en los rankings globales",
  },
  {
    valor: 5,
    titulo: "Servers en simultáneo",
    subtitulo: "Llegamos a sostener cinco mundos a la vez",
  },
  {
    valor: 1389,
    titulo: "Tetones",
    subtitulo: "Miembros vivos al momento del cierre",
  },
];

export function Logros() {
  return (
    <section
      id="logros"
      className="relative bg-black py-32 md:py-48 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <p className="text-sm font-defused text-tton-rust/80 mb-6 tracking-[0.3em] uppercase">// Los números</p>
          <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            No nos guardamos nada.
          </h2>
          <p className="mt-8 text-white/70 font-body font-light max-w-2xl text-base md:text-lg leading-relaxed">
            Lo que construimos juntos no es chiste. Sin marketing, sin pauta:
            a fuerza de comunidad, cariño y noches sin dormir.
          </p>
        </div>

        {/* Counters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOGROS.map((logro, i) => (
            <Counter key={i} logro={logro} index={i} />
          ))}
        </div>

        {/* Extras row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          <ExtraCard
            label="// PRESTIGIO"
            title="Jugadores Beta Tester"
            description="Por TTON pasaron Beta Testers del propio juego. Un sello que pocos servers en habla hispana pueden mostrar."
          />
          <ExtraCard
            label="// LEGADO"
            title="Traducción oficial al español"
            description="Aportamos a la traducción del juego al español desde 2021, junto con la comunidad hispana de SCUM."
          />
          <ExtraCard
            label="// PRINCIPIO"
            title="No pay to win — siempre"
            description="Mantuvimos el espíritu del EULA de SCUM desde antes de que existiera formalmente. Cuando se oficializó, seguimos con el mismo principio: jugar limpio, ganar por ganas y no por billetera."
          />
        </div>
      </div>
    </section>
  );
}

function Counter({ logro, index }: { logro: Logro; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    logro.decimales ? v.toFixed(logro.decimales) : Math.floor(v).toLocaleString("es-AR")
  );
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayed(v));
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, logro.valor, {
        duration: 2,
        ease: "easeOut",
        delay: index * 0.15,
      });
      return () => controls.stop();
    }
  }, [inView, logro.valor, motionValue, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="liquid-glass rounded-2xl p-6 md:p-8"
    >
      <div className="font-heading italic text-white text-6xl md:text-7xl lg:text-8xl leading-none tracking-[-3px]">
        {logro.prefijo}
        <span>{displayed}</span>
        {logro.sufijo}
      </div>
      <div className="mt-5">
        <p className="font-body text-white font-medium text-base md:text-lg">
          {logro.titulo}
        </p>
        <p className="mt-1 font-body text-white/60 text-xs md:text-sm leading-snug">
          {logro.subtitulo}
        </p>
      </div>
    </motion.div>
  );
}

function ExtraCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="liquid-glass rounded-2xl p-6 md:p-8"
    >
      <p className="text-xs font-defused tracking-[0.3em] text-tton-rust uppercase">{label}</p>
      <h4 className="mt-3 font-heading italic text-white text-3xl md:text-4xl leading-none tracking-[-1px]">
        {title}
      </h4>
      <p className="mt-3 text-sm text-white/80 font-body font-light leading-snug">
        {description}
      </p>
    </motion.div>
  );
}
