"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientAudioToggle } from "./AmbientAudioToggle";
import { useVideoModal } from "./VideoModal";

const SECTIONS = [
  { label: "01 / HISTORIA", href: "/#historia" },
  { label: "02 / ISLAS", href: "/#islas" },
  { label: "03 / METRICAS", href: "/#logros" },
  { label: "04 / OTROS", href: "/#otros-juegos" },
  { label: "05 / STAFF", href: "/#staff" },
  { label: "06 / PASARON", href: "/#pasaron" },
  { label: "07 / ARCHIVO", href: "/#galeria" },
  { label: "08 / MENSAJES", href: "/mensajes" },
  { label: "09 / CARTA", href: "/carta" },
];

export function HudTopBar() {
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Cerrar menú con Escape + bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
            TTON SURVIVOR TERMINAL
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
          href="/"
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

        {/* Desktop nav 01-09 */}
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
          {/* LORE button — siempre visible */}
          <button
            type="button"
            onClick={openLore}
            className="hud-text inline-flex items-center gap-1.5 px-3 py-1.5 border border-tton-phosphor/60 text-tton-phosphor hover:bg-tton-phosphor hover:text-tton-black transition-colors"
            data-cursor-hover
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">LORE</span>
          </button>
          {/* Hamburger — solo mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center p-2 border border-tton-amber/50 text-tton-amber hover:bg-tton-amber hover:text-tton-black transition-colors"
            data-cursor-hover
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[84px] z-[78] bg-tton-black/85 backdrop-blur-md md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-[84px] left-0 right-0 z-[79] bg-tton-black border-b-2 border-tton-amber/50 md:hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-1">
                {SECTIONS.map((s, i) => (
                  <motion.a
                    key={s.href}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.04 * i }}
                    className="hud-text text-tton-bone/85 hover:text-tton-amber hover:bg-tton-amber/5 active:bg-tton-amber/10 px-4 py-3 border-l-2 border-transparent hover:border-tton-amber transition-colors flex items-center justify-between"
                    data-cursor-hover
                  >
                    <span>{s.label}</span>
                    <span className="text-tton-amber/40 text-xs">↗</span>
                  </motion.a>
                ))}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 hud-text inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-tton-bone/30 text-tton-bone/70 hover:border-tton-amber hover:text-tton-amber transition-colors"
                  data-cursor-hover
                >
                  <X className="h-3.5 w-3.5" />
                  CERRAR
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
