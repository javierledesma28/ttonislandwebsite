import { Hero } from "@/components/Hero";
import { Cronologia } from "@/components/Cronologia";
import { Islas } from "@/components/Islas";
import { Logros } from "@/components/Logros";
import { OtrosJuegos } from "@/components/OtrosJuegos";
import { Staff } from "@/components/Staff";
import { Galeria } from "@/components/Galeria";
import { Mensajes } from "@/components/Mensajes";
import { PasaronPorTTON } from "@/components/PasaronPorTTON";

export default function Home() {
  return (
    <main className="bg-tton-black text-tton-bone">
      <Hero />
      <Cronologia />
      <Islas />
      <Logros />
      <OtrosJuegos />
      <Staff />
      <PasaronPorTTON />
      <Galeria />
      <Mensajes />
    </main>
  );
}
