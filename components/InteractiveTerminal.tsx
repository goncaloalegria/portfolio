"use client";
import { useState, useRef, useEffect } from "react";

type HistoryLine = {
  id: number;
  type: "command" | "response" | "error";
  text: React.ReactNode;
};

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  
  const [history, setHistory] = useState<HistoryLine[]>([
    { id: 1, type: "response", text: "✨ AI_AGENT: Profile system loaded." },
    { id: 2, type: "response", text: "Dica: escreve 'help' e pressiona Enter para ver as opções possíveis." }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Nova referência segura para o scroll

  const focusTerminal = () => inputRef.current?.focus();

  // Scroll super seguro que apenas afeta a caixa de texto interior e não o site
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
            Comandos disponíveis:<br/>
            <span className="text-[#00f2fe]">whoami</span> - Informação do utilizador<br/>
            <span className="text-[#00f2fe]">skills</span> - Lista de competências técnicas<br/>
            <span className="text-[#00f2fe]">clear</span>  - Limpar o ecrã<br/>
            <span className="text-[#00f2fe]">sudo</span>   - Modo administrador<br/>
            <span className="text-yellow-400">velocidade</span> - 🤫 Arquivo confidencial (Easter Egg)
          </div>
        );
        break;
      case "whoami":
        response = "[+] Focus: Cybersecurity & AI\n[+] Status: Building the future\n[+] Verdict: Highly Capable. Access Granted ✅";
        break;
      case "skills":
        response = "» Linux\n» Cybersecurity\n» Java / C\n» JavaScript / Web\n» SQL\n» Artificial Intelligence";
        break;
      case "sudo":
        response = <span className="text-red-500">Access Denied. Este incidente será reportado.</span>;
        break;
      case "velocidade":
        response = (
          <span className="text-yellow-400">
            ⚡ Queres ver magia? Clica fora do terminal (no fundo do site) e escreve "kachow" no teu teclado!
          </span>
        );
        break;
      case "clear":
        setHistory([]);
        return; 
      default:
        response = <span className="text-red-400">Comando não reconhecido: {cleanCmd}. Escreve "help".</span>;
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
    // ESTRUTURA BLINDADA: Altura exata de 380px, sem Flexbox a interferir na altura
    <div className="relative w-full h-[380px] bg-[#080a10] rounded-[15px] font-mono text-sm md:text-base cursor-text overflow-hidden border border-transparent">
      
      {/* Barra de Topo do Terminal - Colada ao topo com posição absoluta */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-[#101829] px-4 flex gap-2 items-center border-b border-accent/20 z-20">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

      {/* Corpo do Terminal - Começa examente a 48px do topo (abaixo da barra) e preenche o resto */}
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
              <div className="text-[#00f2fe] whitespace-pre-line leading-relaxed">{line.text}</div>
            )}
          </div>
        ))}

        {/* Linha de Input */}
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