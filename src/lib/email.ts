/**
 * Email helper — SMTP via Office 365 (t28.io) usando Nodemailer.
 *
 * Configuración esperada en .env:
 *   SMTP_HOST=smtp.office365.com
 *   SMTP_PORT=587
 *   SMTP_USER=tu-email@t28.io
 *   SMTP_PASSWORD=app-password
 *   SMTP_FROM="TTON Despedida <tu-email@t28.io>"
 *
 * Si SMTP_PASSWORD o SMTP_USER no están seteados, gracefully no-op
 * con log a consola (el admin puede moderar manualmente en /mensajes).
 */
import nodemailer, { type Transporter } from "nodemailer";
import { signModerationToken, getBaseUrl } from "./moderation-token";

const ADMIN_EMAIL = "ledesmajavier@outlook.com";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port: port ? parseInt(port, 10) : 587,
    secure: port === "465",
    auth: { user, pass },
    // Office 365 requiere TLS moderno; nodemailer lo maneja por default.
    requireTLS: true,
    tls: { ciphers: "TLSv1.2" },
  });
  return cachedTransporter;
}


export interface NotifyPayload {
  messageId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}


export async function notifyNewMessageForApproval(p: NotifyPayload) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log(
      "[email] SMTP no configurado — saltando envío. " +
        "Mensaje pendiente en /mensajes.",
      { id: p.messageId, author: p.authorName }
    );
    return { ok: false, reason: "no-smtp-config" as const };
  }

  const baseUrl = getBaseUrl();
  const approveToken = signModerationToken(p.messageId, "approve");
  const rejectToken = signModerationToken(p.messageId, "reject");
  const approveUrl = `${baseUrl}/api/moderate?token=${approveToken}`;
  const rejectUrl = `${baseUrl}/api/moderate?token=${rejectToken}`;
  const manualUrl = `${baseUrl}/mensajes`;

  const fmtDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(p.createdAt);

  const html = buildEmailHtml({
    authorName: p.authorName,
    content: p.content,
    createdAt: fmtDate,
    approveUrl,
    rejectUrl,
    manualUrl,
  });

  const from =
    process.env.SMTP_FROM ||
    `TTON Despedida <${process.env.SMTP_USER}>`;

  try {
    const info = await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      subject: `TTON — Nueva transmisión pendiente: ${p.authorName}`,
      html,
      text:
        `Nueva transmisión pendiente de aprobación.\n\n` +
        `De: ${p.authorName}\nCuándo: ${fmtDate}\n\n` +
        `Mensaje:\n${p.content}\n\n` +
        `Aprobar: ${approveUrl}\nRechazar: ${rejectUrl}\n\n` +
        `O moderar manualmente: ${manualUrl}`,
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    console.error("[email] sendMail threw:", err);
    return { ok: false, reason: "exception" as const };
  }
}


function buildEmailHtml(opts: {
  authorName: string;
  content: string;
  createdAt: string;
  approveUrl: string;
  rejectUrl: string;
  manualUrl: string;
}): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>TTON — Transmisión pendiente</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Helvetica,Arial,sans-serif;color:#f5f5f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0a0a;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#0f0f0f;border:1px solid rgba(255,176,0,0.25);">
          <tr>
            <td style="padding:24px 28px;border-bottom:1px solid rgba(255,176,0,0.2);">
              <p style="margin:0;color:#ffb000;font-family:'Courier New',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;">
                ● REC — TTON SURVIVOR TERMINAL
              </p>
              <h1 style="margin:8px 0 0;color:#f5f5f0;font-size:18px;font-weight:600;">
                Nueva transmisión pendiente
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <p style="margin:0 0 6px;color:#ffb000;font-family:'Courier New',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;">// FROM</p>
              <p style="margin:0 0 16px;color:#f5f5f0;font-size:16px;font-weight:600;">
                ${escape(opts.authorName)}
              </p>
              <p style="margin:0 0 6px;color:#ffb000;font-family:'Courier New',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;">// CUÁNDO</p>
              <p style="margin:0 0 20px;color:#f5f5f0;opacity:.8;font-size:13px;">
                ${escape(opts.createdAt)}
              </p>
              <p style="margin:0 0 6px;color:#ffb000;font-family:'Courier New',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;">// MENSAJE</p>
              <blockquote style="margin:0 0 24px;padding:14px 18px;border-left:3px solid #ffb000;background:rgba(255,176,0,0.04);color:#f5f5f0;font-size:15px;line-height:1.6;white-space:pre-wrap;">
                ${escape(opts.content)}
              </blockquote>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="${opts.approveUrl}" style="display:inline-block;background:#ffb000;color:#0a0a0a;padding:13px 22px;text-decoration:none;font-family:'Courier New',monospace;font-weight:700;letter-spacing:.15em;font-size:12px;text-transform:uppercase;border:2px solid #ffb000;">
                      ✓ APROBAR
                    </a>
                  </td>
                  <td>
                    <a href="${opts.rejectUrl}" style="display:inline-block;background:transparent;color:#7f1d1d;padding:13px 22px;text-decoration:none;font-family:'Courier New',monospace;font-weight:700;letter-spacing:.15em;font-size:12px;text-transform:uppercase;border:2px solid #7f1d1d;">
                      ✕ RECHAZAR
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;border-top:1px solid rgba(255,176,0,0.15);background:#0a0a0a;">
              <p style="margin:0;color:#f5f5f0;opacity:.55;font-size:11px;line-height:1.6;">
                Estos links expiran en 7 días. También podés moderar manualmente en
                <a href="${opts.manualUrl}" style="color:#ffb000;text-decoration:none;">/mensajes</a>.
              </p>
              <p style="margin:8px 0 0;color:#ffb000;opacity:.6;font-family:'Courier New',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;">
                // TRANSMISSION TERMINATED — ARCHIVE
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
