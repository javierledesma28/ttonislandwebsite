"use client";

import { motion } from "framer-motion";

interface JuegoServer {
  juego: string;
  nombre: string;
  emoji: string;
  era: string;
  tagline: string;
  bullets: string[];
  accentColor: string;
}

const SERVERS: JuegoServer[] = [
  {
    juego: "Valheim",
    nombre: "TTON Heim",
    emoji: "⚒️",
    era: "2023-2024",
    tagline: "Vikingos, jefes y un sentido de hogar.",
    bullets: [
      "Cazamos jefes (Eikthyr, El Sabio, Tuétano, Moder, Yagluth)",
      "Construimos asentamientos enteros desde cero",
      "Mapa custom con anuncios, sugerencias y staff dedicado",
      "Eventos de farmeo cooperativo en grupo grande",
    ],
    accentColor: "from-emerald-900/40 to-emerald-950/0",
  },
  {
    juego: "HumanitZ",
    nombre: "TTON Town",
    emoji: "🧟",
    era: "2025",
    tagline: "La ciudad que nació de las cenizas de Banana.",
    bullets: [
      "Liderada por un cronista de la vieja TTON",
      "Comunidad post-apocalíptica con comercio y eventos",
      "Servidor oficial con normativa propia",
      "Lore: los reconstruidores levantaron una ciudad entera con manos, recuerdos y deseo de vivir libres otra vez",
    ],
    accentColor: "from-stone-700/40 to-stone-950/0",
  },
  {
    juego: "DayZ",
    nombre: "Rescate en Livonia",
    emoji: "☢️",
    era: "2023-2024",
    tagline: "La fórmula del survival hardcore.",
    bullets: [
      "Mapa Livonia con normativa estricta y lore propio",
      "Sistema de inscripción + evidencias",
      "Eventos de extracción y rescate",
      "Canales de admin, staff y comunidad RP-friendly",
    ],
    accentColor: "from-blue-900/40 to-stone-950/0",
  },
];

export function OtrosJuegos() {
  return (
    <section
      id="otros-juegos"
      className="relative bg-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-20">
        <p className="text-sm font-body text-white/60 mb-6">// Otros mundos</p>
        <h2 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
          No solo SCUM
          <br />
          nos juntó.
        </h2>
        <p className="mt-8 text-white/70 font-body font-light max-w-2xl text-base md:text-lg leading-relaxed">
          Aunque SCUM fue el corazón, también nos animamos a más. Estos son los
          mundos que también fuimos en estos años — algunos cortos, otros que
          duraron meses. Todos dejaron historia.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVERS.map((s, i) => (
          <ServerCard key={s.nombre} server={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServerCard({ server, index }: { server: JuegoServer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative liquid-glass rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col overflow-hidden group cursor-pointer transition-transform hover:-translate-y-1"
      data-cursor-hover
    >
      {/* Subtle gradient backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${server.accentColor} opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-mono tracking-widest uppercase text-tton-rust mb-1">
            {server.era}
          </p>
          <p className="text-xs font-mono text-white/50 uppercase tracking-wider">
            {server.juego}
          </p>
        </div>
        <span className="text-4xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
          {server.emoji}
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="font-heading italic text-white text-4xl md:text-5xl leading-none tracking-[-1.5px]">
          {server.nombre}
        </h3>
        <p className="mt-3 text-white/90 font-body text-base leading-snug italic">
          &ldquo;{server.tagline}&rdquo;
        </p>
      </div>

      <ul className="relative mt-6 flex-1 space-y-2">
        {server.bullets.map((b, j) => (
          <li
            key={j}
            className="text-sm text-white/70 font-body font-light leading-snug pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-tton-rust"
          >
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
