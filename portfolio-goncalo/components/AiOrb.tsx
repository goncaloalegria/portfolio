// components/AiOrb.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AiOrb() {
  const reduceMotion = useReducedMotion();

  // Se o utilizador preferir movimento reduzido, mostramos apenas uma aura estática
  if (reduceMotion) {
    return (
      <div className="fixed top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] z-0 pointer-events-none" />
    );
  }

  return (
    <div aria-hidden="true" className="fixed top-[10%] right-[-5%] md:right-[5%] w-[350px] md:w-[600px] aspect-square pointer-events-none z-0 mix-blend-screen opacity-50">
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.4, 0.7, 0.4, 0.4],
          rotate: [0, 45, -45, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full bg-gradient-to-tr from-accent via-[#00f2fe] to-transparent blur-[80px] md:blur-[130px] rounded-full"
      />
    </div>
  );
}