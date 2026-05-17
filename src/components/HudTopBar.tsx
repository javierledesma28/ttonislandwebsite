"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { AmbientAudioToggle } from "./AmbientAudioToggle";
import { useVideoModal } from "./VideoModal";

const SECTIONS = [
  { label: "01 / HISTORIA", href: "#historia" },
  { label: "02 / ISLAS", href: "#islas" },
  { label: "03 / METRICAS", href: "#logros" },
  { label: "04 / OTROS", href: "#otros-juegos" },
  { label: "05 / STAFF", href: "#staff" },
  { label: "06 / PASARON", href: "#pasaron" },
  { label: "07 / ARCHIVO", href: "#galeria" },
  { label: "08 / MENSAJES", href: "#mensajes" },
  { label: "09 / CARTA", href: "#carta" },
];

export function HudTopBar() {
  const [time, setTime] = useState("");
  const { open } = useVideoModal();

  const openLore = () =>
    open({
      src: "/videos/scum-comic-lore.mp4",
      tracks: [
        {
          src: "/videos/scum-comic-lore.es.vtt",
          srcLang: "es",
          label: "Español",
          default: true,
        },
        {
          src: "/videos/scum-comic-lore.en.vtt",
          srcLang: "en",
          label: "English",
        },
      ],
      title: "EL LORE DE SCUM",
      caption:
        "Audio movie del comic oficial de SCUM — narrado y voced por ItsLoafLord. La historia detrás del mundo donde vivimos cinco años.",
      classification: "DECLASSIFIED",
      fileLabel: "LORE-001 · SCUM COMIC · ARCHIVE",
    });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, "0");
      const m = String(now.getUTCMinutes()).padStart(2, "0");
      const s = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s} UTC`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[80] border-b border-tton-amber/30 bg-tton-black/85 backdrop-blur-md">
      {/* Top status strip */}
      <div className="flex items-center justify-between px-4 md:px-6 h-9 hud-text">
        {/* Left — REC + signature */}
        <div className="flex items-center gap-3 text-tton-amber/90">
          <span className="rec-dot" />
          <span className="text-tton-blood font-bold">REC</span>
          <span className="hidden sm:inline text-tton-amber/60">|</span>
          <span className="hidden sm:inline text-tton-bone/80">
            TTON SURVEILLANCE TERMINAL
          </span>
        </div>

        {/* Center — file indicator (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-3 text-tton-amber/70">
          <span>FILE ARCHIVE — 2021/2026</span>
          <span className="text-tton-amber/40">|</span>
          <span className="text-tton-blood">TRANSMISSION TERMINATED</span>
        </div>

        {/* Right — clock + member count + audio */}
        <div className="flex items-center gap-3 text-tton-bone/70">
          <span className="hidden lg:inline text-tton-phosphor">
            <span className="online-dot inline-block mr-1.5 align-middle" />
            1389 PRISONERS
          </span>
          <span className="hidden lg:inline text-tton-amber/40">|</span>
          <span className="tabular-nums text-tton-amber hidden sm:inline">
            {time || "00:00:00 UTC"}
          </span>
          <AmbientAudioToggle />
        </div>
      </div>

      {/* Nav strip */}
      <nav className="flex items-center justify-between px-4 md:px-6 h-12 border-t border-tton-amber/15">
        <a
          href="#inicio"
          className="flex items-center gap-3 group"
          data-cursor-hover
        >
          <Image
            src="/brand/tton-logo-animated.gif"
            alt="T-Ton Island"
            width={40}
            height={40}
            unoptimized
            className="object-contain group-hover:scale-110 transition-transform"
            priority
          />
          <span className="hidden sm:inline font-defused text-tton-bone text-base tracking-[0.2em] group-hover:text-tton-amber transition-colors">
            T-TON / ISLAND
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="hud-text text-tton-bone/70 hover:text-tton-amber transition-colors px-3 py-1.5"
              data-cursor-hover
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openLore}
            className="hud-text inline-flex items-center gap-1.5 px-3 py-1.5 border border-tton-phosphor/60 text-tton-phosphor hover:bg-tton-phosphor hover:text-tton-black transition-colors"
            data-cursor-hover
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LORE</span>
          </button>
          <a
            href="#mensajes"
            className="hud-text inline-flex items-center gap-1.5 px-3 py-1.5 border border-tton-amber text-tton-amber hover:bg-tton-amber hover:text-tton-black transition-colors"
            data-cursor-hover
          >
            <span className="hidden sm:inline">DEJAR MENSAJE</span>
            <span className="sm:hidden">MSG</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
