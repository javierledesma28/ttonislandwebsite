import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyModerationToken } from "@/lib/moderation-token";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return renderPage({
      ok: false,
      title: "Token inválido",
      body: "No se recibió el token de moderación. Si llegaste acá desde un email, intenta de nuevo.",
    });
  }

  const verified = verifyModerationToken(token);
  if (!verified) {
    return renderPage({
      ok: false,
      title: "Token inválido o expirado",
      body: "Este link de moderación no es válido o ya expiró (los links duran 7 días). Podés moderar manualmente en /mensajes.",
    });
  }

  try {
    const message = await prisma.message.findUnique({
      where: { id: verified.messageId },
      select: { id: true, content: true, authorName: true, isHidden: true },
    });

    if (!message) {
      return renderPage({
        ok: false,
        title: "Mensaje no encontrado",
        body: "Este mensaje ya no existe — quizá fue eliminado.",
      });
    }

    if (verified.action === "approve") {
      await prisma.message.update({
        where: { id: message.id },
        data: { isHidden: false },
      });
      return renderPage({
        ok: true,
        title: "✓ Mensaje aprobado",
        body: `Listo. La transmisión de "${message.authorName}" ahora es visible en /mensajes.`,
        action: "approve",
        snippet: message.content,
      });
    } else {
      // reject — lo dejamos oculto + lo marcamos (en el futuro podríamos
      // borrarlo, pero por ahora simplemente queda hidden)
      await prisma.message.update({
        where: { id: message.id },
        data: { isHidden: true },
      });
      return renderPage({
        ok: true,
        title: "✕ Mensaje rechazado",
        body: `La transmisión de "${message.authorName}" queda oculta. Podés cambiar de opinión en /mensajes.`,
        action: "reject",
        snippet: message.content,
      });
    }
  } catch (err) {
    console.error("[moderate] error:", err);
    return renderPage({
      ok: false,
      title: "Error inesperado",
      body: "Algo salió mal al procesar la moderación. Probá manualmente en /mensajes.",
    });
  }
}


function renderPage(opts: {
  ok: boolean;
  title: string;
  body: string;
  action?: "approve" | "reject";
  snippet?: string;
}) {
  const accent =
    opts.action === "approve"
      ? "#00ff41"
      : opts.action === "reject"
      ? "#7f1d1d"
      : opts.ok
      ? "#ffb000"
      : "#7f1d1d";
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const snippetHtml = opts.snippet
    ? `<blockquote style="margin:24px 0;padding:14px 18px;border-left:3px solid ${accent};background:rgba(255,255,255,0.03);font-size:14px;line-height:1.6;white-space:pre-wrap;color:#f5f5f0;">${esc(opts.snippet)}</blockquote>`
    : "";

  const html = `<!doctype html>
<html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)} — TTON</title>
<style>
  body { margin:0; padding:0; background:#0a0a0a; color:#f5f5f0; font-family:Helvetica,Arial,sans-serif; min-height:100vh; }
  .wrap { max-width:560px; margin:60px auto; padding:32px; border:1px solid rgba(255,176,0,0.25); }
  h1 { font-size:24px; margin:0 0 16px; color:${accent}; }
  p { font-size:15px; line-height:1.6; opacity:.88; }
  a { color:#ffb000; text-decoration:none; }
  a:hover { text-decoration:underline; }
  .kicker { font-family:'Courier New',monospace; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:#ffb000; opacity:.7; margin:0 0 16px; }
  .actions { margin-top:32px; padding-top:20px; border-top:1px solid rgba(255,176,0,0.15); display:flex; gap:12px; flex-wrap:wrap; }
  .btn { display:inline-block; padding:10px 18px; font-family:'Courier New',monospace; font-size:11px; letter-spacing:.18em; text-transform:uppercase; border:1px solid #ffb000; color:#ffb000; }
</style>
</head><body>
<div class="wrap">
  <p class="kicker">// TTON SURVIVOR TERMINAL</p>
  <h1>${esc(opts.title)}</h1>
  <p>${esc(opts.body)}</p>
  ${snippetHtml}
  <div class="actions">
    <a class="btn" href="/mensajes">Ver mensajes</a>
    <a class="btn" href="/">Volver a la home</a>
  </div>
</div>
</body></html>`;

  return new NextResponse(html, {
    status: opts.ok ? 200 : 400,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
