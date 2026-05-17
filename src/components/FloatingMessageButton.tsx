"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus } from "lucide-react";

/**
 * Floating Action Button — "DEJAR MENSAJE"
 * Persistente bottom-right. Se auto-oculta cuando ya estás en /mensajes.
 */
export function FloatingMessageButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/mensajes")) return null;

  return (
    <AnimatePresence>
      <motion.a
        href="/mensajes"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="hud-text fixed bottom-5 left-5 md:bottom-8 md:left-8 z-[75] inline-flex items-center gap-2 px-4 py-3 md:px-5 md:py-3.5 bg-tton-amber text-tton-black hover:bg-tton-rust hover:text-tton-bone border-2 border-tton-amber hover:border-tton-rust transition-colors shadow-[0_0_24px_rgba(255,176,0,0.35)]"
        data-cursor-hover
        aria-label="Dejar un mensaje"
      >
        <MessageSquarePlus className="h-4 w-4 md:h-5 md:w-5" />
        <span className="hidden sm:inline font-bold tracking-[0.15em] text-xs md:text-sm">
          DEJAR MENSAJE
        </span>
      </motion.a>
    </AnimatePresence>
  );
}
