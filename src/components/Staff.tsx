"use client";

import { motion } from "framer-motion";
import { Crown, ShieldCheck, Gavel, Video } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

interface Miembro {
  nombre: string;
  alias?: string;
  rol: string;
  roleIcon: React.ReactNode;
  resumen: string;
  destacado: string;
  redes?: { label: string; url: string }[];
  highlight?: boolean;
}

const STAFF: Miembro[] = [
  {
    nombre: "J@voc",
    rol: "Owner",
    roleIcon: <Crown className="h-4 w-4" />,
    resumen:
      "El loco que en agosto de 2021 montó un server porque le gustaba el juego, no había nada en español a la altura, y porque acababa de sufrir admin abuse en un raid importante que le hizo querer hacer las cosas distinto. Cuatro años nueve meses después, esto es lo que se construyó entre todos.",
    destacado:
      "Fundador y MOD de Scum en Español Oficial — Hablahispana.",
    redes: [
      { label: "Instagram", url: "https://www.instagram.com/scum_tton/" },
      { label: "Twitch", url: "https://www.twitch.tv/ttonisland" },
    ],
    highlight: true,
  },
  {
    nombre: "Perro Karateka",
    alias: "Xemaxote",
    rol: "Admin · Audiovisual · Ideas de Islas",
    roleIcon: <Video className="h-4 w-4" />,
    resumen:
      "La cámara, el ojo y la voz audiovisual de TTON. Cada video, cada trailer, cada highlight del server lleva su firma. Pero además: las últimas islas también llevan su huella creativa — fue el cerebro detrás de muchas de las ideas que dieron forma a las ediciones más recientes. El trailer 'Qué es un tetón' es suyo.",
    destacado:
      "Salón de la Fama · Trailers oficiales · Ideas de las últimas ediciones · Highlights de eventos.",
    redes: [
      { label: "YouTube", url: "https://www.youtube.com/@Xemaxote" },
      { label: "TikTok", url: "https://www.tiktok.com/@xemaxote" },
      { label: "Instagram", url: "https://www.instagram.com/xemaxote/" },
    ],
  },
  {
    nombre: "Tavo Montenegro",
    alias: "Tavito · TavoRyuichi",
    rol: "Mod",
    roleIcon: <ShieldCheck className="h-4 w-4" />,
    resumen:
      "La cabeza fría cuando todo se prendía fuego. Su trabajo de moderación y ese cariño con la comunidad sostuvieron una cantidad de momentos que ni te imaginás. Y por si tu memoria flaquea: ¿te acordás del Sr. Banhour? Ese personaje legendario también era él — Tavito le dio voz, presencia y ese aire entre divertido y temible que lo volvió parte del folklore TTON.",
    destacado: "Moderación · Cariño comunitario · Eventos · Sr. Banhour.",
    redes: [
      { label: "YouTube", url: "https://www.youtube.com/@TavoRyuichi" },
    ],
  },
  {
    nombre: "Martín Lusa",
    rol: "Mod · Mano firme",
    roleIcon: <Gavel className="h-4 w-4" />,
    resumen:
      "Cuando hizo falta poner orden, fue de lejos el de la mano más firme del staff. El que tomó las decisiones difíciles cuando el momento lo exigía y no se corrió. Pero también el que vio cosas que nadie veía: aportó ideas claves para más de una edición y estuvo en los detalles. Silencio cuando tocaba, mano dura cuando hizo falta.",
    destacado: "Mano dura cuando se necesitó · Decisiones difíciles · Ideas de edición · Detalles.",
  },
];

export function Staff() {
  return (
    <section
      id="staff"
      className="relative bg-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          fileNumber="005"
          kicker="PERSONAL"
          classification="ACTIVE"
          title={
            <>
              EL EQUIPO
              <br />
              DEL CIERRE.
            </>
          }
          intro={
            <>
              Esta despedida no la firmo solo. Estos son los que se bancaron
              el último tramo: gente que está cuando hay que estar, que se
              levantó a horas imposibles, que dio la cara hasta el último día.
            </>
          }
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {STAFF.map((m, i) => (
          <StaffCard key={m.nombre} m={m} index={i} />
        ))}
      </div>
    </section>
  );
}

function StaffCard({ m, index }: { m: Miembro; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      className={`relative liquid-glass rounded-2xl p-6 md:p-10 group overflow-hidden transition-transform hover:-translate-y-1 ${
        m.highlight ? "lg:col-span-2" : ""
      }`}
      data-cursor-hover
    >
      {/* Subtle dual-radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(217,119,6,0.10) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(127,29,29,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Top row — role + initials avatar */}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 liquid-glass rounded-full">
            <span className="text-tton-rust">{m.roleIcon}</span>
            <span className="text-xs font-defused tracking-[0.2em] uppercase text-white/90">
              {m.rol}
            </span>
          </div>
        </div>
        <Avatar nombre={m.nombre} highlight={m.highlight} />
      </div>

      {/* Name + alias */}
      <div className="relative mt-6">
        <h3
          className={`font-heading italic text-white leading-none tracking-[-2px] ${
            m.highlight ? "text-6xl md:text-7xl" : "text-5xl md:text-6xl"
          }`}
        >
          {m.nombre}
        </h3>
        {m.alias && (
          <p className="mt-2 font-mono text-sm text-tton-rust uppercase tracking-widest">
            @{m.alias}
          </p>
        )}
      </div>

      {/* Description */}
      <p
        className={`relative mt-6 text-white/85 font-body font-light leading-relaxed ${
          m.highlight ? "text-lg max-w-3xl" : "text-base max-w-[42ch]"
        }`}
      >
        {m.resumen}
      </p>

      {/* Highlights chip */}
      <div className="relative mt-6 inline-block">
        <p className="text-xs font-body text-white/60 uppercase tracking-widest mb-2">
          // Destacado
        </p>
        <p className="text-sm text-white font-body font-medium leading-snug">
          {m.destacado}
        </p>
      </div>

      {/* Redes */}
      {m.redes && m.redes.length > 0 && (
        <div className="relative mt-6 flex flex-wrap gap-2">
          {m.redes.map((r) => (
            <a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-3 py-1 text-xs font-body text-white/90 hover:text-white hover:scale-105 transition-transform"
            >
              {r.label} ↗
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

function Avatar({ nombre, highlight }: { nombre: string; highlight?: boolean }) {
  // Two-letter initials, italic serif
  const initials = nombre
    .replace(/[^a-zA-Z @]/g, "")
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`liquid-glass-strong rounded-full flex items-center justify-center shrink-0 ${
        highlight ? "w-20 h-20 md:w-24 md:h-24" : "w-16 h-16 md:w-20 md:h-20"
      }`}
    >
      <span
        className={`font-heading italic text-white leading-none ${
          highlight ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
        }`}
      >
        {initials || "T"}
      </span>
    </div>
  );
}
