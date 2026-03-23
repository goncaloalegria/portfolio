"use client";

import { Sparkles } from "lucide-react";
import DecryptTitle from "@/components/DecryptTitle";
import GlowingCard from "@/components/GlowingCard";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function About() {
  return (
    <section id="sobre" className="py-20 container mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <DecryptTitle text="Sobre Mim" className="text-3xl md:text-4xl" />
        <Sparkles className="text-[#00f2fe] w-6 h-6 animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Cartão de Texto */}
        <GlowingCard>
          <div className="p-6 md:p-8 h-full">
            <p className="text-lg leading-relaxed mb-4 text-muted">
              Gosto de construir coisas que funcionem, perceber o “porquê” por trás dos sistemas e
              transformar problemas em soluções claras. O meu foco atual está em cibersegurança e
              inteligência artificial.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted">
              <li>Projetos práticos (web, sistemas, jogos e automação)</li>
              <li>Trabalho em equipa e organização (liderança em grupos)</li>
              <li>Curiosidade constante: aprender, testar, iterar</li>
            </ul>
          </div>
        </GlowingCard>

        {/* Cartão de Terminal (Cyber + AI) Interativo */}
        <GlowingCard>
          {/* Removemos o padding daqui para a barra do terminal encostar aos cantos do GlowingCard */}
          <div className="h-full flex flex-col">
            <InteractiveTerminal />
          </div>
        </GlowingCard>
      </div>
    </section>
  );
}