import { Carta } from "@/components/Carta";

export const metadata = {
  title: "Carta de Despedida",
  description:
    "La carta de despedida final de J@voc a la comunidad T-Ton Island.",
};

export default function CartaPage() {
  return (
    <main className="bg-tton-black text-tton-bone min-h-screen pt-24">
      <Carta />
    </main>
  );
}
