/**
 * Tokens HMAC firmados para acciones de moderación vía email.
 * Permite que un click en un link del email apruebe o rechace un
 * mensaje sin requerir login adicional. Usa AUTH_SECRET para firmar.
 */
import { createHmac, timingSafeEqual } from "crypto";

const ACTIONS = ["approve", "reject"] as const;
export type ModerationAction = (typeof ACTIONS)[number];

const EXPIRY_DAYS = 7;

function getSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET no está configurado");
  return s;
}

function b64urlEncode(s: string): string {
  return Buffer.from(s, "utf8").toString("base64url");
}

function b64urlDecode(s: string): string {
  return Buffer.from(s, "base64url").toString("utf8");
}

export function signModerationToken(
  messageId: string,
  action: ModerationAction
): string {
  const expiresAt = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ messageId, action, expiresAt });
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${b64urlEncode(payload)}.${sig}`;
}

export function verifyModerationToken(
  token: string
): { messageId: string; action: ModerationAction } | null {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;
    const payload = b64urlDecode(payloadB64);
    const expected = createHmac("sha256", getSecret())
      .update(payload)
      .digest("base64url");
    const sigBuf = Buffer.from(sig, "base64url");
    const expBuf = Buffer.from(expected, "base64url");
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;

    const parsed = JSON.parse(payload) as {
      messageId: string;
      action: ModerationAction;
      expiresAt: number;
    };
    if (!parsed.messageId || !ACTIONS.includes(parsed.action)) return null;
    if (Date.now() > parsed.expiresAt) return null;
    return { messageId: parsed.messageId, action: parsed.action };
  } catch {
    return null;
  }
}

export function getBaseUrl(): string {
  // Producción: usa NEXT_PUBLIC_BASE_URL
  // Dev: localhost:3000
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
}
