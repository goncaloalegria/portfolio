// components/Skills.tsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { skills } from "@/lib/data";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import DecryptTitle from "@/components/DecryptTitle";
import GlowingCard from "@/components/GlowingCard";

type Skill = (typeof skills)[number];

function levelToRank(level: number) {
  if (level >= 85) return { rank: "S", tone: "border-accent/50 bg-accent/15" };
  if (level >= 75) return { rank: "A", tone: "border-accent/35 bg-accent/10" };
  if (level >= 60) return { rank: "B", tone: "border-accent/25 bg-accent/5" };
  return { rank: "C", tone: "border-accent/20 bg-panel/20" };
}

function categorize(name: string) {
  const n = name.toLowerCase();
  if (["react", "next", "tailwind", "javascript", "web", "html", "css", "frontend"].some((k) => n.includes(k))) return "Frontend";
  if (["java", "kotlin", "sql", "python", "api", "backend", "server"].some((k) => n.includes(k))) return "Backend";
  if (["linux", "c/", "c++", "docker", "bash", "sistemas"].some((k) => n.includes(k))) return "Systems";
  if (["git", "github"].some((k) => n.includes(k))) return "Tools";
  if (["cyber", "seguran", "redes", "pentest", "ctf", "security"].some((k) => n.includes(k))) return "Security";
  if (["ai", "ml", "ia", "data"].some((k) => n.includes(k))) return "AI";
  return "Other";
}

/* ── Counter animado ── */
function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, inView]);

  return <>{count}%</>;
}

/* ── Barra de progresso animada ── */
function AnimatedBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="mt-3 h-[4px] rounded-full overflow-hidden bg-accent/15">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        initial={{ width: "0%" }}
        animate={inView ? { width: `${level}%` } : { width: "0%" }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
    </div>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const groups = useMemo(() => {
    const order = ["Frontend", "Backend", "Systems", "Tools", "Security", "AI", "Other"];
    const map = new Map<string, Skill[]>();

    for (const s of skills) {
      const key = categorize(s.name);
      map.set(key, [...(map.get(key) || []), s]);
    }

    for (const k of map.keys()) {
      map.set(k, (map.get(k) || []).slice().sort((a, b) => b.level - a.level));
    }

    return order.filter((k) => (map.get(k) || []).length > 0).map((k) => ({ key: k, items: map.get(k)! }));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const toggleExpand = (name: string) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  return (
    <section id="skills" className="py-20 container mx-auto px-4 scroll-mt-24" ref={sectionRef}>
      <DecryptTitle text="Skills" className="text-3xl md:text-4xl mb-8" />

      <div className="glass-panel rounded-3xl p-5 md:p-7">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
          variants={reduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {groups.map((g) => (
            <motion.div key={g.key} variants={reduceMotion ? undefined : cardVariants}>
              <GlowingCard className="h-full">
                <div className="p-5 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-audiowide text-sm text-text font-semibold">{g.key}</div>
                    <div className="text-[11px] text-text font-audiowide bg-accent/15 px-2.5 py-1 rounded-lg border border-accent/25">
                      {g.items.length}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {g.items.map((s) => {
                      const { rank, tone } = levelToRank(s.level);
                      const isExpanded = expanded === s.name;
                      const dim = active && active !== s.name && !isExpanded ? "opacity-40" : "opacity-100";
                      const hot = active === s.name || isExpanded ? "border-accent/60 shadow-[0_0_22px_rgba(168,85,247,0.18)]" : "";

                      return (
                        <motion.button
                          key={s.name}
                          type="button"
                          onClick={() => toggleExpand(s.name)}
                          onMouseEnter={() => setActive(s.name)}
                          onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive(s.name)}
                          onBlur={() => setActive(null)}
                          className={["text-left rounded-2xl border p-3 transition outline-none focus:ring-2 ring-accent", tone, hot, dim].join(" ")}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          transition={{ type: "spring", stiffness: 320, damping: 24 }}
                          layout
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <div className="font-audiowide text-[13px] text-text font-semibold truncate">{s.name}</div>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="shrink-0"
                                >
                                  <ChevronDown size={12} className="text-accent/50" />
                                </motion.div>
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="font-audiowide text-[12px] text-accent font-bold">{rank}</div>
                              <div className="font-audiowide text-[12px] text-text/80 mt-0.5 font-semibold">
                                <AnimatedCounter value={s.level} inView={isInView} />
                              </div>
                            </div>
                          </div>

                          <AnimatedBar level={s.level} inView={isInView} />

                          {/* Descrição expansível */}
                          <AnimatePresence>
                            {isExpanded && s.desc && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="mt-3 pt-3 border-t border-accent/15 text-[12px] text-muted leading-relaxed">
                                  {s.desc}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}