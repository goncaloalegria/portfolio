// app/layout.tsx
import type { Metadata } from "next";
import { Exo_2, Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import BackgroundLogo from "@/components/BackgroundLogo";
import AiOrb from "@/components/AiOrb"; 
import SmoothCursor from "@/components/SmoothCursor";
import TracingBeam from "@/components/TracingBeam";
import FloatingCode from "@/components/FloatingCode";
import StarsBackground from "@/components/StarsBackground";
import LoadingScreen from "@/components/LoadingScreen";

// 1. Declaração das Fontes (isto é o que estava em falta!)
const exo = Exo_2({ subsets: ["latin"], variable: "--font-exo", weight: ["400", "600", "800"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", weight: "900" });

// 2. Metadata do Site


export const metadata: Metadata = {
  metadataBase: new URL("https://goncaloalegria.vercel.app"), 
  title: "Gonçalo Alegria",
  description: "Portefólio de Gonçalo Alegria. Estudante de Engenharia Informática apaixonado por Cibersegurança, Inteligência Artificial e Desenvolvimento Web.",
  keywords: ["Gonçalo Alegria", "Cibersegurança", "Inteligência Artificial", "Engenharia Informática", "Portefólio", "Desenvolvedor", "Portugal"],
  // Adicionei o teu link principal de contacto como URL do autor
  authors: [{ name: "Gonçalo Alegria", url: "https://www.linkedin.com/in/goncaloalegria004/" }],
  
  // METADADOS PARA PARTILHA (LinkedIn, Discord, Facebook, etc.)
  openGraph: {
    title: "Gonçalo Alegria | Cibersegurança & IA",
    description: "Conhece o meu percurso em Engenharia Informática, projetos e foco em construir o futuro da IA e Segurança.",
    url: "https://goncaloalegria.vercel.app", 
    siteName: "Portefólio - Gonçalo Alegria",
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Preview do Portefólio de Gonçalo Alegria",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },

 icons: {
    icon: "/favicon.svg", // O Next.js sabe que isto significa "procura na pasta public"
  },
};

// 3. Estrutura Principal
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${exo.variable} ${audiowide.variable} ${orbitron.variable} antialiased relative overflow-x-hidden`}
      >

        
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          
          <LoadingScreen />
          <SmoothCursor />
          
          {/* Motor Visual */}
          
          <BackgroundLogo />
          <AiOrb />  
          <TracingBeam />
<FloatingCode />
<StarsBackground />
          {/* Conteúdo do Site */}
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}