"use client";
import { useState, useRef, useEffect } from "react";

type HistoryLine = {
  id: number;
  type: "command" | "response" | "error";
  text: React.ReactNode;
};

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");

  const initialMessage = (
    <div className="text-[#00f2fe] leading-relaxed">
      <span className="text-accent">✨ AI_AGENT:</span> Profile system loaded.<br/><br/>
      <span className="text-text">Gonçalo Alegria</span> · Estudante de Engenharia Informática<br/>
      Presidente do NEDI · Equipa de Comunicação do DEISI<br/>
      Universidade Lusófona de Lisboa<br/><br/>
      <span className="text-muted">Interesse em</span> <span className="text-accent">Cibersegurança</span> <span className="text-muted">e</span> <span className="text-accent">Inteligência Artificial</span><br/>
      <span className="text-muted">Motivado pela aprendizagem contínua e projetos com impacto real.</span>
    </div>
  );

  const initialHint = (
    <span className="text-yellow-400">💡 Escreve &apos;help&apos; para explorar.</span>
  );

  const [history, setHistory] = useState<HistoryLine[]>([
    { id: 1, type: "response", text: initialMessage },
    { id: 2, type: "response", text: initialHint },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const focusTerminal = () => inputRef.current?.focus();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="text-muted leading-relaxed">
            Comandos disponíveis:<br/><br/>
            <span className="text-[#00f2fe]">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Quem sou eu<br/>
            <span className="text-[#00f2fe]">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Competências técnicas<br/>
            <span className="text-[#00f2fe]">softskills</span>&nbsp;— Competências pessoais<br/>
            <span className="text-[#00f2fe]">xp</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Experiência profissional<br/>
            <span className="text-[#00f2fe]">edu</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Formação académica<br/>
            <span className="text-[#00f2fe]">langs</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Idiomas<br/>
            <span className="text-[#00f2fe]">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;— Contactos e redes<br/>
            <span className="text-[#00f2fe]">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Limpar o ecrã<br/>
            <span className="text-[#00f2fe]">sudo</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Modo administrador<br/><br/>
            <span className="text-yellow-400">velocidade</span>&nbsp;&nbsp;— 🤫 Easter Egg
          </div>
        );
        break;
      case "whoami":
  response = (
    <div className="text-[#00f2fe] leading-relaxed">
      <span className="text-text font-bold">Gonçalo Alegria</span><br/><br/>
      <span className="text-muted">Estudante de Engenharia Informática na Universidade Lusófona, com interesse em Cibersegurança e Inteligência Artificial. Atualmente Presidente do NEDI e membro da equipa de comunicação do DEISI, onde trabalho para aproximar estudantes do mercado tecnológico.</span><br/><br/>
      <span className="text-muted">Gosto de explorar diferentes áreas da tecnologia e de transformar o que aprendo em projetos concretos. Nos tempos livres, desenvolvo websites — como este portefólio — para continuar a evoluir.</span><br/><br/>
      <span className="text-muted">Acredito que liderança, curiosidade e consistência são as melhores ferramentas que tenho.</span>
    </div>
  );
  break;
      case "skills":
        response = (
          <div className="text-[#00f2fe] leading-relaxed">
            <span className="text-text font-bold">Technical Skills</span><br/><br/>
            » Java/Kotlin&nbsp;&nbsp;&nbsp;&nbsp;████████░░ 75%<br/>
            » Linux&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███████░░░ 72%<br/>
            » Web (HTML/CSS)&nbsp;███████░░░ 72%<br/>
            » Git/GitHub&nbsp;&nbsp;&nbsp;&nbsp;███████░░░ 70%<br/>
            » C/C++&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████░░░░ 68%<br/>
            » React/Next.js&nbsp;██████░░░░ 65%<br/>
            » SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████░░░░ 65%<br/>
            » Python&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██████░░░░ 60%<br/>
            » Docker&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;█████░░░░░ 55%
          </div>
        );
        break;
      case "softskills":
        response = (
          <div className="text-[#00f2fe] leading-relaxed">
            <span className="text-text font-bold">Soft Skills</span><br/><br/>
            ✦ Liderança e Networking<br/>
            ✦ Comunicação Eficaz<br/>
            ✦ Proatividade e Iniciativa<br/>
            ✦ Resolução de Problemas<br/>
            ✦ Trabalho em Equipa<br/>
            ✦ Atenção ao Detalhe
          </div>
        );
        break;
      case "xp":
  response = (
    <div className="text-muted leading-relaxed">
      <span className="text-text font-bold">Experiência</span><br/><br/>
      <span className="text-[#00f2fe]">Jul 2025 — Presente</span><br/>
      Presidente do NEDI · Universidade Lusófona<br/>
      <span className="text-muted text-[12px]">Liderança de equipas, organização de eventos, networking</span><br/><br/>
      <span className="text-[#00f2fe]">Nov 2025 — Presente</span><br/>
      Equipa de Comunicação · DEISI · Universidade Lusófona<br/>
      <span className="text-muted text-[12px]">Comunicação e divulgação de iniciativas do departamento</span><br/><br/>
      <span className="text-[#00f2fe]">Nov 2025</span><br/>
      Voluntário · Web Summit 2025 · Lisboa<br/>
      <span className="text-muted text-[12px]">Apoio operacional, networking internacional, contacto com startups e speakers</span><br/><br/>
      <span className="text-[#00f2fe]">Jan 2023 — Presente</span><br/>
      Aprendiz Estruturas Metálicas · SetBaguinox<br/>
      <span className="text-muted text-[12px]">Fabrico, montagem, instalação, faturação</span><br/><br/>
      <span className="text-[#00f2fe]">Ago 2024 — Set 2024</span><br/>
      Candidato a Piloto · Força Aérea Portuguesa<br/>
      <span className="text-muted text-[12px]">5h de voo, provas físicas/psicotécnicas aprovadas</span>
    </div>
  );
  break;
case "edu":
  response = (
    <div className="text-muted leading-relaxed">
      <span className="text-text font-bold">Formação</span><br/><br/>
      <span className="text-[#00f2fe]">Set 2024 — Jun 2027</span><br/>
      Licenciatura em Engenharia Informática · Universidade Lusófona<br/>
      <span className="text-muted text-[12px]">Foco em Cibersegurança e AI · Programação, sistemas, redes, BD</span><br/><br/>
      <span className="text-[#00f2fe]">Set 2020 — Jun 2023</span><br/>
      Ciências e Tecnologias · Esc. Sec. Lima de Freitas, Setúbal<br/>
      <span className="text-muted text-[12px]">Média final de 15.1 valores · Matemática, Física, Química</span>
    </div>
  );
  break;
      case "langs":
        response = (
          <div className="text-[#00f2fe] leading-relaxed">
            <span className="text-text font-bold">Idiomas</span><br/><br/>
            🇵🇹 Português — Nativo<br/>
            🇬🇧 Inglês — Profissional
          </div>
        );
        break;
      case "contact":
        response = (
          <div className="text-[#00f2fe] leading-relaxed">
            <span className="text-text font-bold">Contactos</span><br/><br/>
            📧 g.alegria.set@gmail.com<br/>
            📱 +351 938 877 605<br/>
            💼 linkedin.com/in/goncaloalegria004<br/>
            🐙 github.com/goncaloalegria<br/>
            📍 Setúbal/Lisboa, Portugal
          </div>
        );
        break;
      case "sudo":
        response = <span className="text-red-500">⛔ Access Denied. Este incidente será reportado.</span>;
        break;
      case "velocidade":
        response = (
          <span className="text-yellow-400">
            ⚡ Queres ver magia? Clica fora do terminal (no fundo do site) e escreve &quot;kachow&quot; no teu teclado!
          </span>
        );
        break;
      case "clear":
        setHistory([
          { id: Date.now(), type: "response", text: initialMessfage },
          { id: Date.now() + 1, type: "response", text: initialHint },
        ]);
        return;
      default:
        response = <span className="text-red-400">Comando não reconhecido: {cleanCmd}. Escreve &quot;help&quot;.</span>;
    }

    setHistory(prev => [
      ...prev,
      { id: Date.now(), type: "command", text: cmd },
      { id: Date.now() + 1, type: "response", text: response }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim() !== "") {
        handleCommand(input);
      }
      setInput("");
    }
  };

  return (
    <div className="relative w-full h-[480px] bg-[#080a10] rounded-[15px] font-mono text-sm md:text-base cursor-text overflow-hidden border border-transparent">
      
      {/* Barra de Topo */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#101829] px-4 flex gap-2 items-center border-b border-accent/20 z-20">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>

      {/* Corpo */}
      <div
        ref={scrollContainerRef}
        onClick={focusTerminal}
        className="absolute top-12 left-0 right-0 bottom-0 p-5 overflow-y-auto custom-scrollbar z-10 block"
      >
        {history.map((line) => (
          <div key={line.id} className="mb-3">
            {line.type === "command" && (
              <div className="flex gap-2 text-white">
                <span className="text-accent">$</span>
                <span>{line.text}</span>
              </div>
            )}
            {line.type !== "command" && (
              <div className="whitespace-pre-line leading-relaxed">{line.text}</div>
            )}
          </div>
        ))}

        <div className="flex gap-2 text-white items-center mt-2 pb-4">
          <span className="text-accent animate-pulse">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-muted/30 caret-accent"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}