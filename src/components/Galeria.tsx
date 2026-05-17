"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import {
  GALLERY_ITEMS,
  CATEGORY_LABEL,
  type GalleryCategory,
  type GalleryItem,
} from "./gallery-data";
import { cn } from "@/lib/utils";

type FilterKey = "todos" | GalleryCategory;

export function Galeria() {
  const [filter, setFilter] = useState<FilterKey>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === filter);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + filtered.length) % filtered.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <section
      id="galeria"
      className="relative bg-tton-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          fileNumber="006"
          kicker="ARCHIVO VISUAL"
          classification="DECLASSIFIED"
          title={
            <>
              MEMORIAS
              <br />
              RECUPERADAS.
            </>
          }
          intro={
            <>
              Cinco años condensados en fotogramas: banners de los primeros
              días, lore de la isla, eventos de comunidad, momentos roleplay.
              Cada archivo recuperado del Drive oficial de J@voc.
            </>
          }
        />

        {/* Filter strip */}
        <div className="flex flex-wrap items-center gap-2 mt-12 mb-10">
          <span className="hud-text text-tton-amber/60 mr-2">
            // FILTRAR
          </span>
          {(Object.keys(CATEGORY_LABEL) as FilterKey[]).map((key) => {
            const count =
              key === "todos"
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                data-cursor-hover
                className={cn(
                  "hud-text inline-flex items-center gap-2 px-3 py-1.5 border transition-colors",
                  filter === key
                    ? "border-tton-amber bg-tton-amber text-tton-black"
                    : "border-tton-bone/30 text-tton-bone/70 hover:border-tton-amber hover:text-tton-amber"
                )}
              >
                {CATEGORY_LABEL[key]}
                <span className="text-[10px] opacity-70 tabular-nums">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.filename}
                item={item}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex(
                (i) =>
                  i === null ? null : (i - 1 + filtered.length) % filtered.length
              )
            }
            onNext={() =>
              setLightboxIndex(
                (i) => (i === null ? null : (i + 1) % filtered.length)
              )
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.6) }}
      onClick={onClick}
      data-cursor-hover
      className="block w-full mb-4 break-inside-avoid group text-left"
    >
      <div className="relative liquid-glass overflow-hidden">
        {/* Image */}
        <div className="relative">
          <Image
            src={`/gallery/${item.filename}`}
            alt={item.caption}
            width={800}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
          />
          {/* Top overlay — file label */}
          <div className="absolute inset-x-0 top-0 p-3 bg-gradient-to-b from-tton-black/80 to-transparent">
            <p className="hud-text text-tton-amber/90 text-[10px]">
              // FRAME {String(index + 1).padStart(4, "0")} ━━ {item.year}
            </p>
          </div>
          {/* Bottom overlay — caption (revealed on hover) */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-tton-black via-tton-black/90 to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-xs text-tton-bone font-body leading-snug">
              {item.caption}
            </p>
            <p className="mt-1 hud-text text-tton-amber text-[10px]">
              CAT: {item.category.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[150] bg-tton-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      {/* Top file label */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-terminal text-xs uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2 text-tton-amber">
          <span className="rec-dot" />
          <span>// FRAME {String(index + 1).padStart(4, "0")}</span>
          <span className="text-tton-amber/40">━━</span>
          <span className="text-tton-bone/80">
            {item.year} · {item.category.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-tton-amber/40">━━</span>
          <span className="hidden sm:inline text-tton-bone/60">
            {index + 1} / {items.length}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          data-cursor-hover
          className="hud-text inline-flex items-center gap-1.5 px-3 py-1 border border-tton-bone/40 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-3.5 w-3.5" />
          ESC
        </button>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        data-cursor-hover
        className="absolute left-2 md:left-6 z-10 p-3 border border-tton-bone/30 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        data-cursor-hover
        className="absolute right-2 md:right-6 z-10 p-3 border border-tton-bone/30 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Image + caption (stop propagation to avoid closing on click) */}
      <motion.div
        key={item.filename}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full"
      >
        <div className="relative bracket-frame">
          <Image
            src={`/gallery/${item.filename}`}
            alt={item.caption}
            width={1600}
            height={1200}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-auto max-h-[75vh] object-contain"
            priority
          />
        </div>
        <div className="mt-4 p-4 liquid-glass">
          <p className="text-tton-bone font-body text-sm md:text-base leading-relaxed">
            {item.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
