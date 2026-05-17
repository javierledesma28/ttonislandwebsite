"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { PASARON, type PasaronEntry } from "./pasaron-data";

const ROLE_COLOR: Record<string, string> = {
  ADMIN: "text-tton-amber border-tton-amber/60",
  "ADMIN VALHEIM": "text-tton-amber border-tton-amber/60",
  MOD: "text-tton-phosphor border-tton-phosphor/60",
  "STAFF RP": "text-tton-phosphor border-tton-phosphor/60",
  INSTRUCTOR: "text-tton-rust border-tton-rust/60",
  "INSTRUCTOR RP": "text-tton-rust border-tton-rust/60",
  STREAMER: "text-purple-300 border-purple-300/50",
  SPONSOR: "text-yellow-300 border-yellow-300/50",
  DONADOR: "text-yellow-300 border-yellow-300/50",
  TÉCNICO: "text-cyan-300 border-cyan-300/50",
  STAFF: "text-tton-phosphor border-tton-phosphor/60",
};

export function PasaronPorTTON() {
  return (
    <section
      id="pasaron"
      className="relative bg-tton-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          fileNumber="008"
          kicker="PASARON POR TTON"
          classification="ARCHIVED"
          title={
            <>
              LOS QUE
              <br />
              ESTUVIERON.
            </>
          }
          intro={
            <>
              Sin esta gente, TTON no hubiera sido TTON. Admins, mods,
              sponsors, instructores, streamers — algunos siguen, otros se
              fueron, pero todos dejaron marca en estos cinco años. Una
              memoria justa para honrar a quien aportó.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PASARON.map((p, i) => (
            <PersonaCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonaCard({ p, index }: { p: PasaronEntry; index: number }) {
  const roleClass = ROLE_COLOR[p.role] || "text-tton-bone border-tton-bone/40";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
      className={`relative liquid-glass p-5 transition-transform hover:-translate-y-1 ${
        !p.inServer ? "opacity-90" : ""
      }`}
      data-cursor-hover
    >
      {/* Top: avatar + name */}
      <div className="flex items-start gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.avatarUrl}
          alt={p.display}
          width={48}
          height={48}
          className="rounded-full border border-tton-amber/30 shrink-0 grayscale-0"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-defused text-tton-bone text-xl leading-tight tracking-tight truncate">
            {p.display}
          </h3>
          {p.username && p.username.toLowerCase() !== p.display.toLowerCase() && (
            <p className="hud-text text-tton-amber/60 mt-0.5 truncate">
              @{p.username}
            </p>
          )}
        </div>
      </div>

      {/* Role + era */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`hud-text inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] ${roleClass}`}
        >
          {p.role}
        </span>
        <span className="hud-text text-tton-bone/50 text-[10px]">{p.era}</span>
        {!p.inServer && (
          <span
            className="hud-text inline-flex items-center gap-1 px-2 py-0.5 border border-tton-bone/30 text-tton-bone/50 text-[10px]"
            title="Ya no está en el servidor"
          >
            EX-MIEMBRO
          </span>
        )}
      </div>

      {/* Story */}
      <p className="text-sm text-tton-bone/85 font-body font-light leading-snug">
        {p.story}
      </p>
    </motion.article>
  );
}
