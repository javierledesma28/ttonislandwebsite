import { Mensajes } from "@/components/Mensajes";

export const metadata = {
  title: "Mensajes",
  description:
    "Mensajes de la comunidad T-Ton Island — transmisiones de los Tetones a la despedida.",
};

export default function MensajesPage() {
  return (
    <main className="bg-tton-black text-tton-bone min-h-screen pt-24">
      <Mensajes />
    </main>
  );
}
