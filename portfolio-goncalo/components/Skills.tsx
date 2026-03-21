// components/Skills.tsx
"use client";

import { useMemo, useState } from "react";
import { skills } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
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
  if (["react", "next", "tailwind", "javascript", "web", "ui", "frontend"].some((k) => n.includes(k))) return "Frontend";
  if (["java", "sql", "python", "api", "backend", "server"].some((k) => n.includes(k))) return "Backend";
  if (["linux", "c", "sistemas", "operativos", "docker", "bash"].some((k) => n.includes(k))) return "Systems";
  if (["cyber", "seguran", "redes", "pentest", "ctf", "security"].some((k) => n.includes(k))) return "Security";
  if (["ai", "ml", "ia", "data"].some((k) => n.includes(k))) return "AI";
  return "Other";
}

const proofBySkill: Record<string, string[]> = {
  Linux: ["Labs de SO e tooling", "Ambientes dev e automação"],
  Cybersecurity: ["Labs de redes/segurança", "CTFs e fundamentos"],
  Java: ["Projetos académicos (POO)", "Aplicações e sistemas"],
  JavaScript: ["UI e interações", "Sites e dashboards"],
  SQL: ["Modelação e queries", "Projetos BD"],
  AI: ["Experiências e mini-modelos", "Exploração de conceitos IA"],
  C: ["Programação de baixo nível", "Sistemas e performance"],
  Web: ["Layouts responsivos", "Componentização e UX"],
};

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const groups = useMemo(() => {
    const order = ["Frontend", "Backend", "Systems", "Security", "AI", "Other"];
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

  return (
    <section id="skills" className="py-20 container mx-auto px-4 scroll-mt-24">
      <DecryptTitle text="Skills" className="text-3xl md:text-4xl mb-8" />

      <div className="glass-panel rounded-3xl p-5 md:p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {groups.map((g) => (
            <GlowingCard key={g.key} className="h-full">
              <div className="p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-audiowide text-sm text-text font-semibold">{g.key}</div>
                  <div className="text-[11px] text-text font-audiowide bg-accent/15 px-2.5 py-1 rounded-lg border border-accent/25">{g.items.length}</div>
                </div>

                <div className="flex flex-col gap-3">
                  {g.items.map((s) => {
                    const { rank, tone } = levelToRank(s.level);
                    const dim = active && active !== s.name ? "opacity-40" : "opacity-100";
                    const hot = active === s.name ? "border-accent/60 shadow-[0_0_22px_rgba(168,85,247,0.18)]" : "";

                    return (
                      <motion.button
                        key={s.name}
                        type="button"
                        onMouseEnter={() => setActive(s.name)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(s.name)}
                        onBlur={() => setActive(null)}
                        className={["text-left rounded-2xl border p-3 transition outline-none focus:ring-2 ring-accent", tone, hot, dim].join(" ")}
                        whileHover={reduceMotion ? undefined : { y: -2 }}
                        transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-audiowide text-[13px] text-text font-semibold truncate">{s.name}</div>
                            <div className="mt-1 text-[11px] text-text leading-relaxed">
                              {(proofBySkill[s.name] || ["Projeto/uso", "Projeto/uso"]).slice(0, 2).join(" · ")}
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="font-audiowide text-[12px] text-accent font-bold">{rank}</div>
                            <div className="font-audiowide text-[12px] text-text/80 mt-0.5 font-semibold">{s.level}%</div>
                          </div>
                        </div>
                        {/* Barra de progresso — altura fixa 4px para todas */}
                        <div className="mt-3 h-[4px] rounded-full overflow-hidden bg-accent/15">
                          <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${s.level}%` }} />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
}