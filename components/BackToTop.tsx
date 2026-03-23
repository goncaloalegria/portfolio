"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function BackToTop() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setShow((window.scrollY || 0) > 280);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Voltar ao topo"
          className={[
            "fixed bottom-5 right-5 z-[300]",
            "w-12 h-12 rounded-2xl",
            "border border-accent/25 bg-panel/35 backdrop-blur",
            "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
            "hover:border-accent/45 hover:bg-panel/45",
            "focus:outline-none focus:ring-2 ring-accent",
          ].join(" ")}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.20),transparent_55%)]"
          />
          <span className="relative grid place-items-center w-full h-full">
            <ArrowUp size={18} className="text-text" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}