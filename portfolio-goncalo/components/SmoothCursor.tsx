"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: SpringConfig;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

function DefaultCursorSVG() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
    >
      <defs>
        <linearGradient id="cursor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7">
            <animate
              attributeName="stop-color"
              values="#a855f7;#00f2fe;#7c3aed;#a855f7"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#00f2fe">
            <animate
              attributeName="stop-color"
              values="#00f2fe;#7c3aed;#a855f7;#00f2fe"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        d="M2.532 2.066l5.2 14.4a1 1 0 001.9-.1l1.5-4.8 4.8-1.5a1 1 0 00.1-1.9l-14.4-5.2a.6.6 0 00-.7.1.6.6 0 00-.1.7l.7.3z"
        fill="url(#cursor-grad)"
        stroke="var(--color-text)"
        strokeOpacity="0.3"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SmoothCursor({
  cursor,
  springConfig = defaultSpringConfig,
}: SmoothCursorProps) {
  const reduceMotion = useReducedMotion();
  const isTouchDevice = useRef(false);
  const isVisible = useMotionValue(0);

  // Posição real do rato (atualizada instantaneamente, SEM re-renders)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Posição suavizada com spring physics
  const springX = useSpring(mouseX, { stiffness: 800, damping: 60, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 60, mass: 0.5 });

  // Velocidade para calcular rotação
  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);

  // Rotação baseada na direção do movimento
  const rotate = useTransform(
    [velocityX, velocityY],
    ([vx, vy]: number[]) => {
      if (Math.abs(vx) < 5 && Math.abs(vy) < 5) return 0;
      return Math.atan2(vy, vx) * (180 / Math.PI) + 135;;
    }
  );

  // Escala sutil baseada na velocidade (efeito de "squish")
  const speed = useTransform(
    [velocityX, velocityY],
    ([vx, vy]: number[]) => Math.min(Math.hypot(vx, vy) / 3000, 0.15)
  );
  const scaleX = useTransform(speed, (s: number) => 1 + s);
  const scaleY = useTransform(speed, (s: number) => 1 - s * 0.5);

  const handleMouseMove = useCallback(
  (e: MouseEvent) => {
    // Lê o zoom diretamente da CSS variable, mesmas condições que o globals.css
    let zoom = 1;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && CSS.supports("zoom", "1")) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--site-scale")
        .trim();
      zoom = parseFloat(raw) || 1;
    }

    mouseX.set(e.clientX / zoom);
    mouseY.set(e.clientY / zoom);

    if (isVisible.get() === 0) {
      isVisible.set(1);
    }
  },
  [mouseX, mouseY, isVisible]
);

  const handleMouseLeave = useCallback(() => {
    isVisible.set(0);
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => {
    isVisible.set(1);
  }, [isVisible]);

  useEffect(() => {
    // Deteta dispositivos touch — não mostrar cursor custom
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) {
      isTouchDevice.current = true;
      return;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Não renderizar em dispositivos touch ou se o user preferir movimento reduzido
  if (reduceMotion) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        rotate: rotate,
        scaleX: scaleX,
        scaleY: scaleY,
        opacity: isVisible,
        pointerEvents: "none",
        zIndex: 99999,
        // Traduz para que a ponta do cursor fique exatamente no ponto do rato
        translateX: "-4px",
        translateY: "-2px",
        willChange: "transform",
      }}
    >
      {cursor ?? <DefaultCursorSVG />}
    </motion.div>
  );
}