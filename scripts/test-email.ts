/**
 * Script de prueba de Microsoft Graph sendMail — envía un email real al admin.
 * Uso: cd sitio_nuevo && npx tsx scripts/test-smtp.ts
 *
 * Requisitos en .env:
 *   GRAPH_TENANT_ID
 *   GRAPH_CLIENT_ID
 *   GRAPH_CLIENT_SECRET
 *   GRAPH_SENDER_EMAIL (default: feedback@t28.io)
 */
import "dotenv/config";
import { notifyNewMessageForApproval } from "../src/lib/email";

async function main() {
  console.log("Configuración detectada:");
  console.log(`  GRAPH_TENANT_ID     = ${process.env.GRAPH_TENANT_ID ?? "✗ vacío"}`);
  console.log(`  GRAPH_CLIENT_ID     = ${process.env.GRAPH_CLIENT_ID ?? "✗ vacío"}`);
  console.log(
    `  GRAPH_CLIENT_SECRET = ${
      process.env.GRAPH_CLIENT_SECRET
        ? "✓ (oculto, " + process.env.GRAPH_CLIENT_SECRET.length + " chars)"
        : "✗ vacío"
    }`
  );
  console.log(`  GRAPH_SENDER_EMAIL  = ${process.env.GRAPH_SENDER_EMAIL ?? "✗ vacío"}`);
  console.log("");

  const missing = (
    [
      "GRAPH_TENANT_ID",
      "GRAPH_CLIENT_ID",
      "GRAPH_CLIENT_SECRET",
      "GRAPH_SENDER_EMAIL",
    ] as const
  ).filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`ERROR: faltan vars en .env → ${missing.join(", ")}`);
    process.exit(1);
  }

  console.log("Enviando email de prueba vía Microsoft Graph...");
  const result = await notifyNewMessageForApproval({
    messageId: "test-" + Date.now(),
    authorName: "Test Graph",
    content:
      "Este es un email de prueba para verificar que la App Registration con permiso Mail.Send está enviando desde feedback@t28.io vía Graph API. Si lo estás leyendo, todo va bien.",
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
