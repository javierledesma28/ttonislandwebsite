"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { PASARON, AMIGOS, type PasaronEntry, type AmigoEntry } from "./pasaron-data";

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
  PERSONAJE: "text-tton-rust border-tton-rust/60",
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

        {/* ─────────────────────────────────────
            AMIGOS QUE TTON ME DEJÓ — sección personal del owner
            ───────────────────────────────────── */}
        <div className="mt-28 md:mt-32">
          <div className="mb-10 max-w-3xl">
            <p className="hud-text text-tton-rust mb-4 inline-flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 fill-current" />
              MENCIONES PERSONALES DE J@VOC
            </p>
            <h3 className="font-defused text-tton-bone text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase">
              Amigos que
              <br />
              TTON me dejo.
            </h3>
            <p className="mt-6 text-tton-bone/70 font-body font-light text-base md:text-lg leading-relaxed border-l-2 border-tton-rust pl-5">
              Más allá de los roles, los rangos y las islas — TTON me regaló
              amistades que ya no se borran. Quería dejarlas acá, en un lugar
              propio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AMIGOS.map((a, i) => (
              <AmigoCard key={a.id} a={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AmigoCard({ a, index }: { a: AmigoEntry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="relative liquid-glass p-6 md:p-7 overflow-hidden group transition-transform hover:-translate-y-1"
      data-cursor-hover
    >
      {/* Warm radial backdrop on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(217,119,6,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(127,29,29,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex items-start gap-4 mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.avatarUrl}
          alt={a.display}
          width={64}
          height={64}
          loading="lazy"
          className="rounded-full border-2 border-tton-rust/40 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="font-defused text-tton-bone text-2xl leading-tight tracking-tight">
            {a.display}
          </h4>
          {a.username && a.username.toLowerCase() !== a.display.toLowerCase() && (
            <p className="hud-text text-tton-amber/60 mt-0.5 truncate">
              @{a.username}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="hud-text inline-flex items-center gap-1 px-2 py-0.5 border border-tton-rust text-tton-rust text-[10px]">
              <Heart className="h-2.5 w-2.5 fill-current" />
              {a.highlight}
            </span>
            {!a.inServer && (
              <span
                className="hud-text inline-flex items-center gap-1 px-2 py-0.5 border border-tton-bone/30 text-tton-bone/50 text-[10px]"
                title="Ya no está en el servidor"
              >
                EX-MIEMBRO
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="relative text-tton-bone/90 font-body leading-relaxed text-sm md:text-base">
        {a.story}
      </p>
    </motion.article>
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
