"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center gap-6"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo animada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-[120px] h-[120px] bg-gradient-to-r from-accent to-accent-2"
            style={{
              mask: "url(/logopp.svg) no-repeat center / contain",
              WebkitMask: "url(/logopp.svg) no-repeat center / contain",
            }}
          />

          {/* Nome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-orbitron text-accent text-lg tracking-[0.25em] uppercase"
          >
            Gonçalo Alegria
          </motion.div>

          {/* Barra de loading */}
          <div className="w-48 h-[2px] bg-accent/10 rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}