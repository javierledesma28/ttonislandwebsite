"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, Clock, Globe2 } from "lucide-react";
import { HeroBackground, type BackgroundVariant } from "./HeroBackground";
import { BlurText } from "./BlurText";

/**
 * Cambiá la prop variant en <HeroBackground /> abajo para probar:
 *   "embers"   → partículas/brasas sutiles + vignette (DEFAULT, sobrio)
 *   "gradient" → radiales de óxido + sangre estáticos
 *   "void"     → negro absoluto, ningún efecto
 *   "video"    → trailer VERMIS de fondo (la versión anterior)
 */
const BG_VARIANT: BackgroundVariant = "embers";

const fadeUp = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Swappable background */}
      <HeroBackground variant={BG_VARIANT} />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between">
          <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center">
            <span className="font-defused text-white text-2xl leading-none tracking-tight">
              T
            </span>
          </div>
          <div className="hidden md:flex liquid-glass px-1.5 py-1.5 rounded-full items-center gap-1">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Historia", href: "#historia" },
              { label: "Islas", href: "#islas" },
              { label: "Logros", href: "#logros" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#mensajes"
              className="bg-white text-black px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1 whitespace-nowrap hover:bg-tton-bone transition-colors"
            >
              Dejá tu mensaje
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="w-12 h-12" aria-hidden />
        </nav>

        {/* Center content */}
        <div
          id="inicio"
          className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 min-h-screen"
        >
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.4 }}
            className="liquid-glass rounded-full inline-flex items-center gap-2 pr-3 mb-6"
          >
            <span className="bg-white text-black px-3 py-1 text-sm font-defused rounded-full tracking-[0.2em]">
              CIERRE
            </span>
            <span className="text-sm text-white/90 font-body">
              T-Ton Island se despide · 16 de Mayo 2026
            </span>
          </motion.div>

          <BlurText
            text="Cinco años que no se borran"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-3xl text-center tracking-[-4px]"
          />

          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.8 }}
            className="mt-6 text-sm md:text-base text-white max-w-2xl text-center font-body font-light leading-relaxed"
          >
            La comunidad SCUM en español que empezó en agosto de 2021 cierra hoy
            su última edición. Pasamos por seis islas, tocamos el Top 12 mundial
            y vivimos miles de historias. Esta es la nuestra.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            <a
              href="#carta"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white inline-flex items-center gap-2 hover:scale-105 transition-transform"
            >
              Leer la carta
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="https://youtu.be/ejLsYE6CEBE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white inline-flex items-center gap-2 hover:text-tton-rust transition-colors font-body text-sm"
            >
              <Play className="h-4 w-4 fill-current" />
              ¿Qué es un tetón?
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 1.3 }}
            className="flex items-stretch gap-4 mt-12 flex-wrap justify-center"
          >
            <StatCard
              icon={<Clock className="h-7 w-7" strokeWidth={1.5} />}
              value="4 años 9 meses"
              label="De comunidad y supervivencia"
            />
            <StatCard
              icon={<Globe2 className="h-7 w-7" strokeWidth={1.5} />}
              value="Top #12"
              label="A nivel mundial"
            />
          </motion.div>

          {/* Partners / islands strip */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 1.4 }}
            className="flex flex-col items-center gap-4 mt-16"
          >
            <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
              Las islas que fuimos
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-2 max-w-4xl">
              {[
                "Outfreak",
                "Warfare",
                "Esperanza",
                "Ponzoña",
                "Banana",
                "Brava",
                "VERMIS",
              ].map((isla) => (
                <span
                  key={isla}
                  className="font-heading italic text-white text-2xl md:text-3xl tracking-tight"
                >
                  {isla}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
      <div className="text-white">{icon}</div>
      <div className="text-4xl tracking-[-1px] leading-none mt-3 font-heading italic text-white">
        {value}
      </div>
      <div className="text-xs text-white font-body font-light mt-2">
        {label}
      </div>
    </div>
  );
}
