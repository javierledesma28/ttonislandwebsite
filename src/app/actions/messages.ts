"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_LEN = 500;
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 message per user per hour

export interface SubmitMessageResult {
  ok: boolean;
  error?: string;
  messageId?: string;
}

export async function submitMessage(formData: FormData): Promise<SubmitMessageResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: "Necesitás iniciar sesión con Discord para dejar tu transmisión." };
  }

  const raw = formData.get("content");
  if (typeof raw !== "string") {
    return { ok: false, error: "Formato inválido." };
  }
  const content = raw.trim();
  if (content.length < 3) {
    return { ok: false, error: "El mensaje es demasiado corto." };
  }
  if (content.length > MAX_LEN) {
    return { ok: false, error: `Máximo ${MAX_LEN} caracteres.` };
  }

  // Rate limit — based on last message timestamp
  const last = await prisma.message.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });
  if (last) {
    const elapsed = Date.now() - last.createdAt.getTime();
    if (elapsed < RATE_LIMIT_MS) {
      const mins = Math.ceil((RATE_LIMIT_MS - elapsed) / 60000);
      return {
        ok: false,
        error: `Esperá ${mins} minuto${mins === 1 ? "" : "s"} antes de mandar otra transmisión.`,
      };
    }
  }

  // Fetch the user for the snapshot fields
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, image: true, isStaff: true },
  });
  if (!user) {
    return { ok: false, error: "Usuario no encontrado." };
  }

  const created = await prisma.message.create({
    data: {
      userId: session.user.id,
      content,
      authorName: user.name || "Anónimo",
      authorAvatar: user.image,
      isHighlighted: user.isStaff,
    },
  });

  revalidatePath("/");
  return { ok: true, messageId: created.id };
}

export async function hideMessage(messageId: string): Promise<SubmitMessageResult> {
  const session = await auth();
  // @ts-expect-error custom field
  if (!session?.user?.isAdmin) {
    return { ok: false, error: "Solo admins pueden moderar." };
  }
  await prisma.message.update({
    where: { id: messageId },
    data: { isHidden: true },
  });
  revalidatePath("/");
  return { ok: true };
}

export async function unhideMessage(messageId: string): Promise<SubmitMessageResult> {
  const session = await auth();
  // @ts-expect-error custom field
  if (!session?.user?.isAdmin) {
    return { ok: false, error: "Solo admins pueden moderar." };
  }
  await prisma.message.update({
    where: { id: messageId },
    data: { isHidden: false },
  });
  revalidatePath("/");
  return { ok: true };
}

export async function deleteMessage(messageId: string): Promise<SubmitMessageResult> {
  const session = await auth();
  // @ts-expect-error custom field
  if (!session?.user?.isAdmin) {
    return { ok: false, error: "Solo admins pueden eliminar." };
  }
  await prisma.message.delete({ where: { id: messageId } });
  revalidatePath("/");
  return { ok: true };
}

/** Fetch messages (visible by default; admins also see hidden ones for moderation). */
export async function getMessages(opts: { includeHidden?: boolean } = {}) {
  const where = opts.includeHidden ? {} : { isHidden: false };
  const messages = await prisma.message.findMany({
    where,
    orderBy: [{ isHighlighted: "desc" }, { createdAt: "desc" }],
    take: 100,
    select: {
      id: true,
      content: true,
      createdAt: true,
      authorName: true,
      authorAvatar: true,
      isHighlighted: true,
      isHidden: true,
      userId: true,
    },
  });
  return messages;
}
