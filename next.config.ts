import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empaqueta solo lo necesario para correr (sin devDeps ni dist innecesario).
  // El Dockerfile copia .next/standalone, .next/static y public.
  output: "standalone",
};

export default nextConfig;
