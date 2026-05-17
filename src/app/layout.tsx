import type { Metadata } from "next";
import { Instrument_Serif, Barlow, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/CustomCursor";
import { HudTopBar } from "@/components/HudTopBar";
import { VideoModalProvider } from "@/components/VideoModal";
import { TEC1Drone } from "@/components/TEC1Drone";
import { FloatingMessageButton } from "@/components/FloatingMessageButton";

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

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// SCUM official font — display only
const defused = localFont({
  src: "../fonts/Defused.ttf",
  variable: "--font-defused",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.t-tonisland.com"),
  title: {
    default: "T-Ton Island — Comunidad SCUM en Español",
    template: "%s · T-Ton Island",
  },
  description:
    "TEC1 Surveillance Archive — T-Ton Island, comunidad SCUM en español. Desde agosto 2021 hasta mayo 2026: 5 años de historia, raids, eventos, lore y amistad.",
  openGraph: {
    title: "T-Ton Island — TEC1 Surveillance Archive",
    description:
      "5 años de comunidad. 7 meses #1 hablahispana. Top 12 del mundo. Transmisión cerrada hoy.",
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
      className={`${instrumentSerif.variable} ${barlow.variable} ${defused.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="scan-lines film-grain bg-tton-black text-tton-bone">
        <div className="crt-vignette" />
        <BootSequence />
        <CustomCursor />
        <VideoModalProvider>
          <HudTopBar />
          <SmoothScroll>{children}</SmoothScroll>
          <FloatingMessageButton />
          <TEC1Drone />
        </VideoModalProvider>
      </body>
    </html>
  );
}
