"use client";

import { useMemo, useState } from "react";
import { experience } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const items = useMemo(() => experience, []);

  return (
    <section id="experiencia" className="py-20 container mx-auto px-4 scroll-mt-24">
      <div className="flex items-end justify-between gap-4 mb-2">
        <h2 className="text-3xl md:text-4xl font-audiowide text-accent scan-effect">
          Experiência
        </h2>
        <div className="hidden sm:flex items-center gap-2 text-xs font-audiowide text-muted">
          <span className="px-3 py-1.5 rounded-full border border-accent/15 bg-panel/15">
            Percurso
          </span>
        </div>
      </div>

      <p className="text-muted mb-8">Percurso académico e profissional.</p>

      <div className="relative">
        {/* Linha timeline (estática, sem progresso) */}
        <div
          aria-hidden
          className="absolute left-[10px] top-2 bottom-2 w-[2px] rounded-full bg-accent/15"
        />
        <div
          aria-hidden
          className="absolute left-[9px] top-2 bottom-2 w-[4px] rounded-full blur-[10px] bg-accent/12"
        />

        <div className="space-y-4 pl-10">
          {items.map((xp, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.div
                key={`${xp.role}-${index}`}
                layout
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  aria-hidden
                  className={[
                    "absolute left-[-2px] top-6 w-5 h-5 rounded-full",
                    "bg-gradient-to-b from-accent to-accent-2",
                    "shadow-[0_0_18px_rgba(168,85,247,0.55)]",
                    "border border-accent/30",
                  ].join(" ")}
                />
                <div
                  aria-hidden
                  className="absolute left-[2px] top-[28px] w-3 h-3 rounded-full bg-bg/70 border border-accent/25"
                />

                <div
                  className={[
                    "relative overflow-hidden rounded-3xl border border-accent/15",
                    "bg-[linear-gradient(180deg,rgba(20,22,40,0.55),rgba(10,12,22,0.55))]",
                    "backdrop-blur-[10px]",
                    "shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
                    "hover:border-accent/30 transition",
                  ].join(" ")}
                >
                  {/* pattern + glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-55"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 0%, rgba(168,85,247,0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(124,58,237,0.10), transparent 55%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
                    }}
                  />

                  {/* Header clicável */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className={[
                      "relative w-full text-left p-5 md:p-6",
                      "flex items-start gap-4 justify-between",
                      "hover:bg-white/0 transition",
                      "focus:outline-none focus:ring-2 ring-accent",
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-3">
                        <h3 className="font-audiowide text-lg md:text-xl text-text">
                          {xp.role}
                        </h3>

                        <span className="inline-flex w-fit px-3 py-1 rounded-full text-[12px] font-mono text-accent/90 border border-accent/20 bg-accent/10">
                          {xp.date}
                        </span>
                      </div>

                      <p className="text-sm text-muted mt-2">{xp.place}</p>
                    </div>

                    <motion.div
                      aria-hidden
                      animate={reduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="shrink-0 mt-1 p-2.5 rounded-2xl border border-accent/15 bg-panel/20 hover:border-accent/30"
                    >
                      <ChevronDown size={18} className="text-text" />
                    </motion.div>
                  </button>

                  {/* Conteúdo expandido */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                        animate={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 1, height: "auto" }}
                        exit={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative px-5 md:px-6 pb-6"
                      >
                        <div
                          aria-hidden
                          className="absolute left-6 right-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                        />

                        <div className="pt-5">
                          <p className="text-muted/90 leading-relaxed mb-4">{xp.desc}</p>

                          <div className="flex flex-wrap gap-2">
                            {xp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-accent/20 bg-panel/30 text-xs text-text"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* sweep */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 opacity-60"
                        >
                          <div className="h-full w-full bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-xl translate-x-[260%] transition duration-[900ms]" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}