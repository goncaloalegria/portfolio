"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function TracingBeam() {
  const reduceMotion = useReducedMotion();
  const [trackH, setTrackH] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const update = () => setTrackH(window.innerHeight - 60);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 50 });
  const beamH = useTransform(smoothProgress, [0, 1], [0, trackH]);

  if (reduceMotion || trackH === 0) return null;

  return (
    <div
      className="fixed top-[30px] right-[6px] z-[100] pointer-events-none hidden md:flex flex-col items-center"
      style={{ height: trackH }}
    >
      {/* Dot topo */}
      <div className="w-2.5 h-2.5 rounded-full bg-accent border border-accent/60 shadow-[0_0_8px_rgba(168,85,247,0.5)] shrink-0" />

      {/* Track + Beam */}
      <div className="relative w-[3px] flex-1 mt-1 rounded-full overflow-hidden bg-accent/10">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: beamH,
            background: "linear-gradient(to bottom, #a855f7, #00f2fe, #7c3aed)",
            boxShadow: "0 0 8px rgba(168,85,247,0.4), 0 0 20px rgba(0,242,254,0.2)",
          }}
        />
      </div>
    </div>
  );
}