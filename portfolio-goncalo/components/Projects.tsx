// components/Projects.tsx (COMPLETO)
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Github, Layers, Code2, ShoppingCart, Building2 } from "lucide-react";

type Project = (typeof projects)[number];

function FeaturedCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-accent/15 bg-panel/10 hover:border-accent/30 hover:-translate-y-1 transition focus:outline-none focus:ring-2 ring-accent"
    >
      <Image
        src={p.cover}
        alt={p.title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-[0.78]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute left-4 right-4 bottom-3">
        <div className="font-audiowide text-[15px] text-white drop-shadow">{p.title}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.languages.slice(0, 3).map((l) => (
            <span
              key={l}
              className="px-2.5 py-1 text-[11px] text-white/85 border border-white/10 bg-white/5 rounded-full"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Tile({
  p,
  onOpen,
  dim,
}: {
  p: Project;
  onOpen: () => void;
  dim?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hoverAnim = reduceMotion || dim ? undefined : { y: -2 };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={[
        "group relative w-full h-full overflow-hidden bg-[#070913] focus:outline-none focus:ring-2 ring-accent",
        dim ? "opacity-35 saturate-75" : "opacity-100",
      ].join(" ")}
      whileHover={hoverAnim}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Image
        src={p.cover}
        alt={p.title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition duration-700 group-hover:scale-[1.02] group-hover:brightness-[0.82]"
      />

      {/* overlay “normal” */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

      {/* overlay extra para DIM (escurecer o que não pertence) */}
      {dim && <div className="absolute inset-0 bg-black/30 pointer-events-none" />}

      <div className="absolute left-4 right-4 bottom-3">
        <div className="font-audiowide text-[13px] md:text-[14px] text-white drop-shadow">
          {p.title}
        </div>
      </div>
    </motion.button>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Categorias (para o filtro):
 * - Se no data.ts adicionares `type: "Web Apps"` ou `types: ["Web Apps","Enterprise"]`, ele usa isso.
 * - Se não existir, tenta inferir pelas `languages`.
 */
function getTypes(p: any): string[] {
  if (Array.isArray(p?.types) && p.types.length) return p.types;
  if (typeof p?.type === "string" && p.type) return [p.type];
  if (typeof p?.category === "string" && p.category) return [p.category];

  const langs = (p?.languages ?? []).map((x: string) => String(x).toLowerCase());
  const has = (s: string) => langs.some((l: string) => l.includes(s.toLowerCase()));

  const out: string[] = [];

  // Web Apps
  if (has("react") || has("next") || has("tailwind") || has("typescript") || has("javascript") || has("html") || has("css") || has("web")) {
    out.push("Web Apps");
  }

  // eCommerce
  if (has("ecommerce") || has("shop") || has("stripe") || has("cart")) {
    out.push("eCommerce");
  }

  // Enterprise
  if (has("enterprise") || has("kubernetes") || has("docker") || has("microservices") || has("ci/cd")) {
    out.push("Enterprise");
  }

  if (out.length === 0) out.push("Other");
  return Array.from(new Set(out));
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  const { featured, rest } = useMemo(() => {
    const f = projects.filter((p) => (p as any).featured).slice(0, 3);
    const ids = new Set(f.map((p) => p.id));
    const r = projects.filter((p) => !ids.has(p.id));
    return { featured: f, rest: r };
  }, []);

  // --- FILTRO (só para os regulares) ---
  const allTypes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of rest) {
      for (const t of getTypes(p)) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return counts;
  }, [rest]);

  const filterOptions = useMemo(() => {
    const preferred = ["Web Apps", "eCommerce", "Enterprise", "Other"];
    const presentPreferred = preferred.filter((t) => allTypes.has(t));
    const extra = Array.from(allTypes.keys()).filter((t) => !preferred.includes(t));
    return ["All", ...presentPreferred, ...extra];
  }, [allTypes]);

  const [active, setActive] = useState<string>("All");

  const isMatch = (p: Project) => {
    if (active === "All") return true;
    return getTypes(p).includes(active);
  };

  const blocks = useMemo(() => chunk(rest, 8), [rest]);

  useEffect(() => {
    if (!selected) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected]);

  // Puzzle por bloco (3 colunas com mesma largura, alturas variam)
  const TEMPLATE_AREAS =
    `"a b c"
     "d b f"
     "d e f"
     "g e h"` as const;

  const slots = ["a", "b", "c", "d", "f", "e", "g", "h"] as const;

  const iconFor = (key: string) => {
    switch (key) {
      case "All":
        return <Layers size={16} className="opacity-90" />;
      case "Web Apps":
        return <Code2 size={16} className="opacity-90" />;
      case "eCommerce":
        return <ShoppingCart size={16} className="opacity-90" />;
      case "Enterprise":
        return <Building2 size={16} className="opacity-90" />;
      default:
        return <Layers size={16} className="opacity-90" />;
    }
  };

  return (
    <section id="portfolio" className="py-20 container mx-auto px-4 scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-audiowide text-accent scan-effect">Projetos</h2>
        <p className="text-muted mt-2">Destaques e uma galeria “puzzle”.</p>
      </div>

      {/* 3 destacados (não são afetados pelo filtro) */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((p) => (
            <FeaturedCard key={p.id} p={p} onOpen={() => setSelected(p)} />
          ))}
        </div>
      )}

      {/* Barra de filtro (apenas para regulares) */}
      <div className="mb-6">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-panel/30 p-2">
          {filterOptions.map((opt) => {
            const activeBtn = active === opt;
            const label = opt === "All" ? "Tudo" : opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => setActive(opt)}
                aria-pressed={activeBtn}
                className={[
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  "border",
                  activeBtn
                    ? "bg-accent/15 border-accent/30 text-text"
                    : "bg-transparent border-transparent text-muted hover:text-text hover:bg-white/5 hover:border-white/10",
                ].join(" ")}
              >
                {iconFor(opt)}
                <span className="font-audiowide">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE: lista simples */}
      <div className="grid gap-4 md:hidden">
        {rest.map((p) => (
          <div key={p.id} className="aspect-video bg-white/10 p-[2px]">
            <div className="h-full">
              <Tile p={p} onOpen={() => setSelected(p)} dim={!isMatch(p)} />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: puzzle em blocos */}
      <div className="hidden md:grid gap-6">
        {blocks.map((b, bi) => (
          <div key={bi} className="bg-white/10 p-[2px]">
            <div
              className="grid grid-cols-3 gap-[2px] bg-white/10
                         grid-rows-[repeat(4,150px)]
                         lg:grid-rows-[repeat(4,170px)]
                         xl:grid-rows-[repeat(4,185px)]"
              style={{ gridTemplateAreas: TEMPLATE_AREAS }}
            >
              {slots.map((area, idx) => {
                const p = b[idx];
                if (!p) return <div key={area} style={{ gridArea: area }} className="bg-[#070913]" />;

                return (
                  <div key={p.id} style={{ gridArea: area }}>
                    <Tile p={p} onOpen={() => setSelected(p)} dim={!isMatch(p)} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-sm"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-6"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={() => setSelected(null)}
            >
              <div
                className="bg-[#080a10] border border-accent/20 rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row md:min-h-[560px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 bg-panel/60 rounded-lg hover:bg-accent/20 transition"
                  aria-label="Fechar"
                >
                  <X className="text-white" />
                </button>

                <div className="w-full md:w-3/5 h-[360px] md:h-auto relative bg-black/50">
                  <Image src={selected.demo} alt={selected.title} fill className="object-contain" />
                </div>

                <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col">
                  <h3 className="text-3xl md:text-4xl font-audiowide text-white mb-4">
                    {selected.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-6">{selected.description}</p>

                  <div className="mb-auto">
                    <h4 className="font-audiowide text-sm text-accent mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.languages.map((l) => (
                        <span
                          key={l}
                          className="px-3 py-1 rounded-full border border-accent/20 bg-panel text-xs text-text"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-accent/10">
                    <a
                      href={selected.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 font-audiowide bg-accent/10 border border-accent/30 hover:bg-accent/20 transition text-text rounded-xl"
                    >
                      <Github size={18} /> Repositório
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}