import type { Metadata } from "next";
import { Exo_2, Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import BackgroundLogo from "@/components/BackgroundLogo";

const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo", weight: ["400", "600", "800"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: "900" });

export const metadata: Metadata = {
  title: "Gonçalo Alegria | Engenharia Informática",
  description: "Portfólio",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${exo.variable} ${audiowide.variable} ${orbitron.variable} antialiased relative overflow-x-hidden`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <BackgroundLogo />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}