import { Hero } from "@/components/Hero";
import { Cronologia } from "@/components/Cronologia";
import { Islas } from "@/components/Islas";
import { Logros } from "@/components/Logros";

export default function Home() {
  return (
    <main className="bg-black text-tton-bone">
      <Hero />
      <Cronologia />
      <Islas />
      <Logros />
    </main>
  );
}
