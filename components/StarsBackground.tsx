"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface StarsBackgroundProps {
  starCount?: number;
  speed?: number;
  factor?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  speed: number;
}

export default function StarsBackground({
  starCount = 160,
  speed = 40,
  factor = 0.05,
  className = "",
}: StarsBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const getZoom = useCallback(() => {
    let zoom = 1;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && CSS.supports("zoom", "1")) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--site-scale")
        .trim();
      zoom = parseFloat(raw) || 1;
    }
    return zoom;
  }, []);

  const createStars = useCallback(
    (w: number, h: number) => {
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 2.2 + 0.4,
          baseOpacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 0.6 + 0.15,
        });
      }
      starsRef.current = stars;
    },
    [starCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const zoom = getZoom();
      canvas.width = window.innerWidth / zoom;
      canvas.height = window.innerHeight / zoom;
      createStars(canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const zoom = getZoom();
      const x = (e.clientX / zoom / canvas.width - 0.5) * 2;
      const y = (e.clientY / zoom / canvas.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let time = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      time += 0.01;

      ctx.clearRect(0, 0, w, h);

      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-accent")
          .trim() || "#a855f7";

      const mx = springX.get() * factor * speed * 8;
      const my = springY.get() * factor * speed * 8;

      for (const star of starsRef.current) {
        // Mover para cima
        star.y -= star.speed * (speed / 50);

        // Reset quando sai por cima — reaparece em baixo
        if (star.y < -5) {
          star.y = h + 5;
          star.x = Math.random() * w;
        }

        // Posição com parallax do rato (estrelas maiores movem mais)
        const parallax = star.size / 2.5;
        const px = star.x + mx * parallax;
        const py = star.y + my * parallax;

        // Skip se fora do canvas
        if (px < -10 || px > w + 10) continue;

        // Opacidade com twinkle subtil
        const twinkle = Math.sin(time * 2 + star.x * 0.01 + star.y * 0.01) * 0.2 + 0.8;
        const alpha = star.baseOpacity * twinkle;

        // Estrela
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow nas maiores
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = alpha * 0.08;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reduceMotion, createStars, factor, speed, mouseX, mouseY, springX, springY, getZoom]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[1] pointer-events-none ${className}`}
    />
  );
}