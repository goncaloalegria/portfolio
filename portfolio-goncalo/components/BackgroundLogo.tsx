// components/BackgroundLogo.tsx (COMPLETO)
"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function BackgroundLogo() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2; // -1..1
      const y = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2; // -1..1
      mx.set(x);
      my.set(y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mx, my]);

  const parallaxX = useTransform(sx, (v: number) => v * 18);
  const parallaxY = useTransform(sy, (v: number) => v * 12);

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const x = parallaxX;
  const y = useTransform([parallaxY, floatY], (latest: number[]) => (latest[0] ?? 0) + (latest[1] ?? 0));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.20)_70%,rgba(0,0,0,0.48)_100%)]" />

      {/* cursor glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[560px] h-[560px] rounded-full blur-[90px] opacity-[0.12] bg-accent"
        style={{
          x: useTransform(sx, (v: number) => v * 140),
          y: useTransform(sy, (v: number) => v * 110),
        }}
      />

      {/* Logo main */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={reduceMotion ? undefined : { x, y, rotate, scale }}
      >
        <div className="relative">
          {/* base */}
          <div
            className="w-[min(760px,78vw)] h-[min(760px,78vw)] opacity-[0.075] bg-gradient-to-r from-accent to-accent-2"
            style={{
              mask: "url(/logopp.svg) no-repeat center / contain",
              WebkitMask: "url(/logopp.svg) no-repeat center / contain",
            }}
          />

          {/* glow ghost */}
          <div
            className="absolute inset-0 w-[min(760px,78vw)] h-[min(760px,78vw)] opacity-[0.09] blur-[10px] bg-gradient-to-r from-accent/80 to-accent-2/70"
            style={{
              transform: "translate(10px, 10px)",
              mask: "url(/logopp.svg) no-repeat center / contain",
              WebkitMask: "url(/logopp.svg) no-repeat center / contain",
            }}
          />
        </div>
      </motion.div>

      {/* scanlines suave */}
      <motion.div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 7px)",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPositionY: ["0px", "40px"],
                opacity: [0.08, 0.12, 0.08],
              }
        }
        transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* extra glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.10),transparent_55%)]" />
    </div>
  );
}