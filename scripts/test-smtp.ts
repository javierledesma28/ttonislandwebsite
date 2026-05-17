/**
 * Script de prueba de SMTP — envía un email real al admin.
 * Uso: cd sitio_nuevo && npx tsx scripts/test-smtp.ts
 */
import "dotenv/config";
import { notifyNewMessageForApproval } from "../src/lib/email";

async function main() {
  console.log("Configuración detectada:");
  console.log(`  SMTP_HOST = ${process.env.SMTP_HOST}`);
  console.log(`  SMTP_PORT = ${process.env.SMTP_PORT}`);
  console.log(`  SMTP_USER = ${process.env.SMTP_USER}`);
  console.log(`  SMTP_PASS = ${process.env.SMTP_PASSWORD ? "✓ (oculto, " + process.env.SMTP_PASSWORD.length + " chars)" : "✗ vacío"}`);
  console.log(`  SMTP_FROM = ${process.env.SMTP_FROM}`);
  console.log("");

  if (!process.env.SMTP_PASSWORD) {
    console.error("ERROR: SMTP_PASSWORD no está seteado en .env");
    process.exit(1);
  }

  console.log("Enviando email de prueba...");
  const result = await notifyNewMessageForApproval({
    messageId: "test-" + Date.now(),
    authorName: "Test SMTP",
    content:
      "Este es un email de prueba para verificar que la configuración SMTP con t28.io / Office 365 está funcionando correctamente. Si lo estás leyendo, todo va bien.",
    createdAt: new Date(),
  });

  console.log("\nResultado:", JSON.stringify(result, null, 2));

  if (result.ok) {
    console.log("\n✓ Email enviado correctamente.");
    console.log(`  Revisá tu inbox en ledesmajavier@outlook.com`);
  } else {
    console.error(`\n✗ FALLÓ: ${result.reason}`);
  }
}

main().catch((e) => {
  console.error("Excepción no manejada:", e);
  process.exit(1);
});
