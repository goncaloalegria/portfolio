"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedThemeToggler({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // Fallback para browsers sem View Transitions API
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      return;
    }

    // Coordenadas do clique (compensar zoom)
    let zoom = 1;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && CSS.supports("zoom", "1")) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--site-scale")
        .trim();
      zoom = parseFloat(raw) || 1;
    }

    const x = e.clientX / zoom;
    const y = e.clientY / zoom;

    // Raio do círculo para cobrir o viewport inteiro
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth / zoom - x),
      Math.max(y, window.innerHeight / zoom - y)
    );

    // Inicia a View Transition
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    // Quando pronto, anima o clip-path
    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-2xl bg-panel/25 border border-accent/15 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className={`
        relative w-10 h-10 rounded-2xl overflow-hidden
        bg-panel/25 border border-accent/15
        hover:border-accent/35 hover:bg-panel/35
        transition-colors duration-300
        focus:outline-none focus:ring-2 ring-accent
        ${className}
      `}
    >
      <div className="relative w-full h-full grid place-items-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}