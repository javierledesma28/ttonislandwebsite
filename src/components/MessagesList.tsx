"use client";

import { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, EyeOff, Trash2 } from "lucide-react";
import { deleteMessage, hideMessage, unhideMessage } from "@/app/actions/messages";

interface MessageItem {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string;
  authorAvatar: string | null;
  isHighlighted: boolean;
  isHidden: boolean;
  userId: string;
}

const REL = new Intl.RelativeTimeFormat("es-AR", { numeric: "auto" });
const ABS = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function relativeTime(d: Date) {
  const diffMs = d.getTime() - Date.now();
  const diffMin = Math.round(diffMs / 60000);
  if (Math.abs(diffMin) < 60) return REL.format(diffMin, "minute");
  const diffH = Math.round(diffMin / 60);
  if (Math.abs(diffH) < 24) return REL.format(diffH, "hour");
  const diffD = Math.round(diffH / 24);
  return REL.format(diffD, "day");
}

export function MessagesList({
  messages,
  isAdmin,
}: {
  messages: MessageItem[];
  isAdmin: boolean;
}) {
  if (messages.length === 0) {
    return (
      <div className="liquid-glass p-8 text-center">
        <p className="hud-text text-tton-amber/70 mb-2">// SIN TRANSMISIONES TODAVÍA</p>
        <p className="text-tton-bone/70 font-body">
          Sé el primero en dejar tu firma en TTON.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((m, i) => (
          <MessageCard key={m.id} m={m} index={i} isAdmin={isAdmin} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

function MessageCard({
  m,
  index,
  isAdmin,
}: {
  m: MessageItem;
  index: number;
  isAdmin: boolean;
}) {
  const [pending, startTransition] = useTransition();

  const handleHide = () =>
    startTransition(async () => {
      if (m.isHidden) await unhideMessage(m.id);
      else await hideMessage(m.id);
    });

  const handleDelete = () =>
    startTransition(async () => {
      if (!confirm("¿Eliminar este mensaje? No se puede deshacer.")) return;
      await deleteMessage(m.id);
    });

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className={`relative liquid-glass p-4 md:p-5 ${
        m.isHighlighted ? "border-l-2 !border-l-tton-amber" : ""
      } ${m.isHidden ? "opacity-50" : ""}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          {m.authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.authorAvatar}
              alt={m.authorName}
              width={32}
              height={32}
              className="rounded-full border border-tton-amber/30 shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-tton-ash border border-tton-amber/30 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="font-body text-tton-bone font-medium truncate inline-flex items-center gap-2">
              {m.authorName}
              {m.isHighlighted && (
                <Pin className="h-3 w-3 text-tton-amber inline" aria-label="staff" />
              )}
              {m.isHidden && (
                <EyeOff className="h-3 w-3 text-tton-blood inline" aria-label="oculto" />
              )}
            </div>
            <p
              className="hud-text text-tton-amber/60 mt-0.5"
              title={ABS.format(m.createdAt)}
            >
              {relativeTime(new Date(m.createdAt))} · {ABS.format(new Date(m.createdAt))}
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleHide}
              disabled={pending}
              data-cursor-hover
              className="hud-text px-2 py-1 text-[10px] border border-tton-bone/30 text-tton-bone/70 hover:border-tton-amber hover:text-tton-amber transition-colors"
              aria-label={m.isHidden ? "Mostrar" : "Ocultar"}
              title={m.isHidden ? "Mostrar" : "Ocultar"}
            >
              <EyeOff className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              data-cursor-hover
              className="hud-text px-2 py-1 text-[10px] border border-tton-blood/40 text-tton-blood/80 hover:bg-tton-blood/10 transition-colors"
              aria-label="Eliminar"
              title="Eliminar"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
      {/* Body */}
      <p className="text-tton-bone/95 font-body leading-relaxed whitespace-pre-wrap break-words">
        {m.content}
      </p>
    </motion.li>
  );
}
