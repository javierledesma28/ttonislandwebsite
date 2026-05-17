"use client";

import { useState, useTransition } from "react";
import { submitMessage } from "@/app/actions/messages";
import { ArrowUpRight } from "lucide-react";

const MAX = 500;

export function MessageForm() {
  const [content, setContent] = useState("");
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const remaining = MAX - content.length;

  function handleSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const res = await submitMessage(formData);
      if (res.ok) {
        setFeedback({ ok: true, msg: "TRANSMISIÓN REGISTRADA." });
        setContent("");
      } else {
        setFeedback({ ok: false, msg: res.error || "Error inesperado." });
      }
    });
  }

  return (
    <form action={handleSubmit} className="liquid-glass p-5 md:p-6">
      <label htmlFor="msg-content" className="hud-text text-tton-amber/80 mb-3 block">
        // TYPE YOUR TRANSMISSION
      </label>
      <textarea
        id="msg-content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        maxLength={MAX}
        placeholder="Tu memoria, tu agradecimiento, tu firma. Lo que TTON fue para vos en estos años..."
        className="w-full bg-tton-ash/40 border border-tton-amber/30 focus:border-tton-amber outline-none text-tton-bone font-body text-base p-4 leading-relaxed resize-y placeholder:text-tton-bone/30 transition-colors"
        required
        data-cursor-hover
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="hud-text text-tton-bone/60">
          {remaining >= 0 ? (
            <span>
              {remaining} <span className="text-tton-amber/60">CHARS RESTANTES</span>
            </span>
          ) : (
            <span className="text-tton-blood">SOBREPASA EL LÍMITE</span>
          )}
        </div>
        <button
          type="submit"
          disabled={pending || content.trim().length < 3 || content.length > MAX}
          className="hud-text inline-flex items-center gap-2 px-5 py-2.5 border-2 border-tton-amber bg-tton-amber text-tton-black hover:bg-tton-rust hover:border-tton-rust disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          data-cursor-hover
        >
          {pending ? "TRANSMITIENDO..." : "TRANSMITIR"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
      {feedback && (
        <div
          role="status"
          className={`mt-4 hud-text px-3 py-2 inline-flex items-center gap-2 border ${
            feedback.ok
              ? "text-tton-phosphor border-tton-phosphor/40"
              : "text-tton-blood border-tton-blood/50"
          }`}
        >
          <span className={feedback.ok ? "online-dot" : "rec-dot"} />
          {feedback.msg}
        </div>
      )}
    </form>
  );
}
