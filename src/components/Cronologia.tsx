"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";

interface Hito {
  fecha: string;
  titulo: string;
  detalle: string;
  tipo?: "inicio" | "expansion" | "prestigio" | "evento" | "isla" | "staff" | "cierre" | "comunidad";
}

const HITOS: Hito[] = [
  {
    fecha: "28 Ago 2021",
    titulo: "Nace T-Ton Island",
    detalle: "Un experimento. 10% PVE / 90% PVP. Reinicio diario a las 5 AM Argentina. El día uno con tres personas en el Discord.",
    tipo: "inicio",
  },
  {
    fecha: "Sep 2021",
    titulo: "Aportamos a la traducción oficial",
    detalle: "Empezamos a colaborar con la traducción del juego al español junto con la comunidad hispana. Esto fue solo el comienzo.",
    tipo: "prestigio",
  },
  {
    fecha: "Mar 2022",
    titulo: "Llega el server EUROPA",
    detalle: "Abrimos [EUROPA] SCUM T-TON ESP HISPANO PVE/PVP — pasamos a tener servidores en dos continentes. La comunidad empezaba a no caber en uno solo.",
    tipo: "expansion",
  },
  {
    fecha: "14 Jun 2022",
    titulo: "Fusión LATAM + EUROPA",
    detalle: "Lanzamos [T-TON ISLAND] PVP - EVENTOS - HARD - PACK - ADMINS ON (LATAM/ESP). Una sola isla para todos los hispanohablantes del mundo.",
    tipo: "expansion",
  },
  {
    fecha: "2 Jul 2022",
    titulo: "Torneo de MMA — el primer gran evento",
    detalle: "Tuvo trailer, tuvo highlights, tuvo memes. Uno de los eventos más recordados de los primeros años. Quedó en YouTube para la posteridad.",
    tipo: "evento",
  },
  {
    fecha: "25 Jul 2022",
    titulo: "J@voc, Moderador SCUM en Español Oficial",
    detalle: "Gracias al embajador de hablahispana, J@voc es nombrado Moderador del canal oficial de SCUM en Español. Un sello de prestigio que pocos servers pueden mostrar.",
    tipo: "prestigio",
  },
  {
    fecha: "Sep 2022",
    titulo: "Empieza el primer sitio web TTON",
    detalle: "J@voc anuncia que está construyendo el sitio web de la comunidad. La identidad de TTON empezaba a tomar forma fuera del Discord.",
    tipo: "comunidad",
  },
  {
    fecha: "Oct 2022",
    titulo: "Xemaxote entra a La Administración",
    detalle: "Se suma como nuevo Moderador. La familia crece y la cámara audiovisual del server toma su lugar oficial.",
    tipo: "staff",
  },
  {
    fecha: "Nov 2022",
    titulo: "Era Biohazard — SCUM 0.8",
    detalle: "Wipe liviano de isla pero no de personaje. T-Ton Biohazard, una nueva edición acompañando la versión 0.8 del juego. Un nuevo capítulo técnico.",
    tipo: "isla",
  },
  {
    fecha: "Mar 2023",
    titulo: "Dos islas en simultáneo: Outfreak + Warfare",
    detalle: "Pivot histórico. La comunidad pasa a tener dos sabores en paralelo: Outfreak Island (pioneros) y Warfare Island (PVP puro). La era del multi-server arranca.",
    tipo: "isla",
  },
  {
    fecha: "Mar 2023",
    titulo: "Salón de la Fama",
    detalle: "Xemaxote inaugura el canal donde inmortalizamos los mejores momentos del server. Hoy es uno de los archivos visuales más ricos de TTON.",
    tipo: "comunidad",
  },
  {
    fecha: "Ago 2023",
    titulo: "TavitoPlays se suma al staff",
    detalle: "Llega como Mod aportando su gran experiencia en SCUM. La familia sigue creciendo.",
    tipo: "staff",
  },
  {
    fecha: "Nov 2023",
    titulo: "Nace TETONHEIM (Valheim)",
    detalle: "Sumamos un nuevo server fuera de SCUM: vikingos, jefes y construcción. T-Ton deja de ser solo SCUM y se vuelve una comunidad multi-juego.",
    tipo: "expansion",
  },
  {
    fecha: "Feb 2024",
    titulo: "Era Isla Banana en pleno auge",
    detalle: "Encuesta a la comunidad por los dos meses de Banana. Cientos de reacciones. La isla que nos dio identidad estaba en su mejor momento.",
    tipo: "isla",
  },
  {
    fecha: "Mar 2024",
    titulo: "Eventos icónicos en Banana",
    detalle: "Rutas moteras, misiones grupales, eventos coordinados con docenas de jugadores. La comunidad operando como una sola tribu.",
    tipo: "evento",
  },
  {
    fecha: "Ago 2024",
    titulo: "Llega Tremix (el Chino)",
    detalle: "El señor bananero se suma al staff. Mano derecha en otras épocas, regresa para acompañarnos en este tramo.",
    tipo: "staff",
  },
  {
    fecha: "Oct 2024",
    titulo: "Visita muy especial",
    detalle: "Un día especial para SCUM y para la comunidad. Tuvimos un saludo desde adentro de SCUM que nos llenó de orgullo.",
    tipo: "prestigio",
  },
  {
    fecha: "Abr 2025",
    titulo: "Cae Isla Banana → nace TTON Town",
    detalle: "Las cenizas de Banana dan vida a TTON Town en HumanitZ. Los reconstruidores levantaron una ciudad con manos, recuerdos y ganas de vivir libres otra vez.",
    tipo: "isla",
  },
  {
    fecha: "17 Jun 2025",
    titulo: "SCUM 1.0 + Proyecto VERMIS Fase Zero",
    detalle: "Llega la versión 1.0 del juego después de años de espera. Nosotros respondemos con un proyecto complejo: VERMIS — Vehículos, Entorno, Recursos, Misiones, Inteligencia, Supervivencia.",
    tipo: "isla",
  },
  {
    fecha: "22 Jun 2025",
    titulo: "Sitio web oficial t-tonisland.com",
    detalle: "Después de mucho trabajo, sale el portal de la comunidad: historia, lore, galería, info para nuevos. La identidad TTON afuera del Discord.",
    tipo: "comunidad",
  },
  {
    fecha: "20 Jul 2025",
    titulo: "Encuesta histórica de comunidad",
    detalle: "232 reacciones — récord absoluto. La comunidad votó cómo querían que evolucionara la isla. Decisiones tomadas por todos, no solo por el staff.",
    tipo: "comunidad",
  },
  {
    fecha: "Oct 2025",
    titulo: "VERMIS Fase 1: aplicación de IA",
    detalle: "Probamos llevar la isla más allá con inteligencia artificial. Helpers T, ecosistema vivo. Ambicioso. Posiblemente, los primeros en hablahispana en explorar este territorio.",
    tipo: "isla",
  },
  {
    fecha: "Dic 2025",
    titulo: "VERMIS Renacidos (Fase 2)",
    detalle: "HARD PVE. Sin loot regalado. Sin margen para errores. La experiencia SCUM más cruda de toda la historia del server.",
    tipo: "isla",
  },
  {
    fecha: "16 May 2026",
    titulo: "Cierre",
    detalle: "La vida tiene ciclos. Cerramos con la cabeza en alto y el corazón lleno. El Discord queda abierto, para lo que venga.",
    tipo: "cierre",
  },
];

const TIPO_COLOR: Record<string, string> = {
  inicio: "bg-tton-bone",
  expansion: "bg-tton-rust",
  prestigio: "bg-yellow-400",
  evento: "bg-tton-rust",
  isla: "bg-tton-military",
  staff: "bg-emerald-400",
  comunidad: "bg-sky-400",
  cierre: "bg-tton-blood ring-4 ring-tton-blood/30",
};

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
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          fileNumber="001"
          kicker="HISTORIA"
          classification="DECLASSIFIED"
          title={
            <>
              REGISTRO DE
              <br />
              TRANSMISIONES.
            </>
          }
          intro={
            <>
              No fue solo islas. Fueron eventos, ascensos, llegadas,
              despedidas, récords, alianzas, expansiones. Estos son los
              momentos que dejaron marca en estos años.
            </>
          }
        />
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

  return (
    <div
      className={`relative flex items-center mb-12 md:mb-16 ${
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
          className={`w-4 h-4 rounded-full ${TIPO_COLOR[hito.tipo || "inicio"]}`}
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
        <div className="liquid-glass rounded-2xl p-6 md:p-7 inline-block w-full">
          <p
            className={`text-xs font-mono uppercase tracking-widest mb-2 ${
              hito.tipo === "cierre" ? "text-tton-blood" : "text-tton-rust"
            }`}
          >
            {hito.fecha}
          </p>
          <h3 className="font-heading italic text-white text-2xl md:text-3xl leading-tight tracking-[-1px] mb-3">
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
