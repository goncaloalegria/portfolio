"use client";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export default function About() {
  const [text, setText] = useState("");
  const fullText = "$ whoami\nGonçalo Alegria\n$ focus\n[+] Cybersecurity\n[+] AI\n$ status\nAccess Granted ✅";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sobre" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-8 scan-effect">Sobre Mim</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl">
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

        <div className="bg-[#080a10]/80 border border-accent/20 rounded-2xl p-6 font-mono text-accent shadow-inner relative overflow-hidden min-h-[200px]">
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="whitespace-pre-line text-sm md:text-base">
            {text}<span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}