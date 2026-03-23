// components/DecryptTitle.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*0123456789";

export default function DecryptTitle({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Só anima quando entra no ecrã e apenas uma vez
    if (!isInView || hasAnimated) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setHasAnimated(true);
      }

      // Velocidade da descodificação (quanto menor, mais demorado)
      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [text, isInView, hasAnimated]);

  // Se o rato passar por cima, refaz o efeito!
  const handleMouseEnter = () => {
    setHasAnimated(false);
  };

  return (
    <h2
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`font-audiowide text-accent scan-effect cursor-default ${className}`}
    >
      {displayText}
    </h2>
  );
}