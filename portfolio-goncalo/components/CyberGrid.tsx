// components/CyberGrid.tsx
"use client";

import { useReducedMotion } from "framer-motion";

export default function CyberGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-end justify-center opacity-40"
      style={{ perspective: "600px" }}
    >
      <div 
        className="w-[200vw] h-[55vh]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168,85,247,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168,85,247,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transformOrigin: "bottom center",
          // Desvanece suavemente desde o horizonte (topo) até ao ecrã (baixo)
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 100%)",
          animation: reduceMotion ? "none" : "grid-forward 1.5s linear infinite",
        }}
      />
      <style>{`
        @keyframes grid-forward {
          0% { transform: rotateX(80deg) translateY(0); }
          /* O translateY tem de ser igual ao tamanho do quadrado (60px) para o loop ser perfeito */
          100% { transform: rotateX(80deg) translateY(60px); } 
        }
      `}</style>
    </div>
  );
}