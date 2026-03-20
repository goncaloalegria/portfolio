// components/GlowingCard.tsx
"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export default function GlowingCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative group overflow-hidden rounded-2xl p-[1px] ${className}`}>
      {/* Borda estática base */}
      <div className="absolute inset-0 bg-accent/15 rounded-2xl transition-colors group-hover:bg-accent/30" />

      {/* Luz rotativa unificada (AGORA À PROVA DE BALA PARA CARTÕES COMPRIDOS) */}
      {!reduceMotion && (
        <div className="absolute top-1/2 left-1/2 h-[3000px] w-[3000px] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_50%,#00f2fe_80%,var(--color-accent)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Miolo do cartão */}
      <div className="relative h-full w-full rounded-[15px] bg-panel/95 backdrop-blur-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}