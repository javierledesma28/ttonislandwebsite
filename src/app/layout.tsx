import type { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.t-tonisland.com"),
  title: {
    default: "T-Ton Island — Comunidad SCUM en Español",
    template: "%s · T-Ton Island",
  },
  description:
    "T-Ton Island fue una comunidad de SCUM y juegos de supervivencia en español. Desde agosto 2021 hasta mayo 2026: 5 años de historia, raids, eventos, lore y amistad.",
  openGraph: {
    title: "T-Ton Island — Comunidad SCUM en Español",
    description:
      "5 años de comunidad. 7 meses #1 hablahispana. Top 12 del mundo. Una historia que se cierra hoy.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${barlow.variable} antialiased`}
    >
      <body className="bg-black text-tton-bone">
        <BootSequence />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
