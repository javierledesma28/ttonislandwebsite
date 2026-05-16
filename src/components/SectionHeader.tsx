"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  fileNumber: string; // "001", "002"...
  kicker: string;     // "HISTORIA"
  title: React.ReactNode;
  intro?: React.ReactNode;
  classification?: "DECLASSIFIED" | "ACTIVE" | "ARCHIVED" | "TERMINATED";
}

const CLASSIFICATION_COLOR: Record<string, string> = {
  DECLASSIFIED: "text-tton-phosphor border-tton-phosphor",
  ACTIVE: "text-tton-amber border-tton-amber",
  ARCHIVED: "text-tton-bone/60 border-tton-bone/40",
  TERMINATED: "text-tton-blood border-tton-blood",
};

export function SectionHeader({
  fileNumber,
  kicker,
  title,
  intro,
  classification = "DECLASSIFIED",
}: SectionHeaderProps) {
  return (
    <div className="mb-20 md:mb-24 max-w-5xl">
      {/* File label row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-3 mb-8 font-terminal text-xs tracking-[0.2em] uppercase"
      >
        <span className="text-tton-amber/60">// FILE</span>
        <span className="text-tton-amber font-bold">{fileNumber}</span>
        <span className="text-tton-amber/30">━━</span>
        <span className="text-tton-bone font-defused tracking-[0.3em] text-sm">{kicker}</span>
        <span
          className={`ml-auto md:ml-4 inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] ${CLASSIFICATION_COLOR[classification]}`}
        >
          {classification === "TERMINATED" && <span className="rec-dot" />}
          {classification === "ACTIVE" && <span className="online-dot" />}
          {classification}
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-defused text-tton-bone text-5xl md:text-7xl lg:text-[7rem] leading-[0.85] tracking-tight uppercase"
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-tton-bone/70 font-body font-light max-w-2xl text-base md:text-lg leading-relaxed border-l-2 border-tton-amber pl-5"
        >
          {intro}
        </motion.div>
      )}
    </div>
  );
}
