import type { Metadata } from "next";
import { Exo_2, Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo", weight: ["400", "600", "800"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: "900" });

export const metadata: Metadata = {
  title: "Gonçalo Alegria | Engenharia Informática",
  description: "Portfólio de Cybersecurity e AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${exo.variable} ${audiowide.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}