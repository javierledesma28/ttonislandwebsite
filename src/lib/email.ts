/**
 * Email helper — Microsoft Graph API (client credentials flow).
 *
 * Envía como feedback@t28.io vía la misma App Registration que usa AzureHub.
 *
 * Configuración esperada en .env:
 *   GRAPH_TENANT_ID     — Entra ID tenant GUID
 *   GRAPH_CLIENT_ID     — App Registration client ID
 *   GRAPH_CLIENT_SECRET — App Registration client secret VALUE
 *   GRAPH_SENDER_EMAIL  — feedback@t28.io (mailbox licenciado en el tenant)
 *
 * Si falta alguna, gracefully no-op con log (admin modera manualmente en /mensajes).
 */
import { signModerationToken, getBaseUrl } from "./moderation-token";

const ADMIN_EMAIL = "ledesmajavier@outlook.com";

interface CachedToken {
  value: string;
  expiresAt: number; // epoch ms
}
let cachedToken: CachedToken | null = null;

function getConfig() {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;
  const sender = process.env.GRAPH_SENDER_EMAIL;
  if (!tenantId || !clientId || !clientSecret || !sender) return null;
  return { tenantId, clientId, clientSecret, sender };
}

async function getAccessToken(cfg: NonNullable<ReturnType<typeof getConfig>>) {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.value;
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${cfg.tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: cfg.clientId,
        client_secret: cfg.clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Graph token error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = {
    value: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return cachedToken.value;
}


export interface NotifyPayload {
  messageId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}


export async function notifyNewMessageForApproval(p: NotifyPayload) {
  const cfg = getConfig();
  if (!cfg) {
    console.log(
      "[email] Graph no configurado — saltando envío. " +
        "Mensaje pendiente en /mensajes.",
      { id: p.messageId, author: p.authorName }
    );
    return { ok: false, reason: "no-graph-config" as const };
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

  try {
    const token = await getAccessToken(cfg);

    const res = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.sender)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          message: {
            subject: `TTON — Nueva transmisión pendiente: ${p.authorName}`,
            body: { contentType: "HTML", content: html },
            toRecipients: [
              {
                emailAddress: { address: ADMIN_EMAIL, name: "Javier Ledesma" },
              },
            ],
          },
          saveToSentItems: false,
        }),
      }
    );

    if (res.ok || res.status === 202) {
      return { ok: true as const };
    }

    const errBody = await res.text();
    console.error(`[email] Graph sendMail ${res.status}:`, errBody);
    return { ok: false as const, reason: "graph-error" as const, status: res.status };
  } catch (err) {
    console.error("[email] sendMail threw:", err);
    return { ok: false as const, reason: "exception" as const };
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
