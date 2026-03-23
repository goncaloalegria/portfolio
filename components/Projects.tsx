// components/Projects.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { projects } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Github } from "lucide-react";
import DecryptTitle from "@/components/DecryptTitle";
import Tilt3D, { TiltItem } from "@/components/Tilt3D";

type Project = (typeof projects)[number];

function ProjectCard3D({
  p,
  onOpen,
  priority = false,
}: {
  p: Project;
  onOpen: () => void;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Tilt3D intensity={14}>
      <motion.button
        layoutId={reduceMotion ? undefined : `project-container-${p.id}`}
        type="button"
        onClick={onOpen}
        className="group relative aspect-video w-full rounded-2xl text-left focus:outline-none focus:ring-2 ring-accent"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
          <div className="absolute inset-0 bg-accent/15 transition-colors group-hover:bg-accent/30" />
          {!reduceMotion && (
            <div className="absolute top-1/2 left-1/2 h-[3000px] w-[3000px] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_50%,#00f2fe_80%,var(--color-accent)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
        </div>

        <div className="absolute inset-[1px] rounded-[15px] overflow-hidden z-10">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-[1.06] group-hover:brightness-[0.65]"
            priority={priority}
          />
          {!reduceMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                animate={{ translateY: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent shadow-[0_0_10px_#00f2fe]"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        <div className="absolute left-5 right-5 bottom-4 z-30" style={{ transformStyle: "preserve-3d" }}>
          <TiltItem z={60}>
            <motion.div layoutId={reduceMotion ? undefined : `project-title-${p.id}`} className="font-audiowide text-[17px] text-white drop-shadow-lg mb-2">
              {p.title}
            </motion.div>
          </TiltItem>
          <TiltItem z={45}>
            <p className="text-[12px] text-white/90 line-clamp-1 mb-2 drop-shadow-lg">{p.description}</p>
          </TiltItem>
          <TiltItem z={50}>
            <div className="flex flex-wrap gap-2">
              {p.languages.slice(0, 4).map((l) => (
                <span key={l} className="px-2.5 py-1 text-[10px] text-white/90 border border-white/25 bg-black/30 rounded-full backdrop-blur-sm uppercase tracking-wider">{l}</span>
              ))}
            </div>
          </TiltItem>
        </div>
      </motion.button>
    </Tilt3D>
  );
}

function getTypes(p: any): string[] {
  const langs = (p?.languages ?? []).map((x: string) => String(x).toLowerCase());
  const has = (s: string) => langs.some((l: string) => l.includes(s.toLowerCase()));
  const out: string[] = [];
  if (has("react") || has("next") || has("tailwind") || has("javascript") || has("web")) out.push("Web");
  if (has("c") || has("linux") || has("bash") || has("sistemas")) out.push("Systems");
  if (has("ai") || has("python")) out.push("AI");
  if (out.length === 0) out.push("Other");
  return Array.from(new Set(out));
}

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { featured, rest } = useMemo(() => {
    const f = projects.filter((p) => (p as any).featured).slice(0, 3);
    const ids = new Set(f.map((p) => p.id));
    const r = projects.filter((p) => !ids.has(p.id));
    return { featured: f, rest: r };
  }, []);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    rest.forEach((p) => getTypes(p).forEach((t) => cats.add(t)));
    return ["All", ...Array.from(cats)];
  }, [rest]);

  const filteredRest = useMemo(() => {
    if (activeTab === "All") return rest;
    return rest.filter((p) => getTypes(p).includes(activeTab));
  }, [activeTab, rest]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [selected]);

  return (
    <section id="portfolio" className="py-20 container mx-auto px-4 scroll-mt-24 ">
      <div className="mb-8">
        <DecryptTitle text="Projetos" className="text-3xl md:text-4xl mb-10" />
        <h3 className="text-xl font-audiowide text-text">Destaques</h3>
      </div>

      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featured.map((p) => (
            <ProjectCard3D key={p.id} p={p} onOpen={() => setSelected(p)} priority />
          ))}
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-audiowide text-text">Arquivo de Projetos</h3>
        <div className="inline-flex flex-wrap gap-2 p-1.5 bg-panel/30 border border-accent/15 rounded-2xl w-fit">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-xl text-sm font-audiowide transition-all ${activeTab === cat ? "bg-accent/20 text-text border border-accent/40 shadow-sm" : "text-muted hover:text-text border border-transparent hover:bg-accent/5"}`}>{cat}</button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRest.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }} transition={{ duration: 0.3 }}>
              <ProjectCard3D p={p} onOpen={() => setSelected(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <>
              <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-md" style={{ zIndex: 9998 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} />
              <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pointer-events-none" style={{ zIndex: 9999 }}>
                <motion.div layoutId={reduceMotion ? undefined : `project-container-${selected.id}`} className="bg-bg border border-accent/20 rounded-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row md:min-h-[560px] pointer-events-auto" style={{ zIndex: 9999 }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 p-2.5 bg-panel/60 backdrop-blur-md rounded-lg hover:bg-accent/20 transition border border-accent/10 hover:border-accent/40"><X className="text-text" /></button>
                  <div className="w-full md:w-3/5 h-[360px] md:h-auto relative bg-black/50 overflow-hidden">
                    <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="w-full h-full relative">
                      <Image src={selected.demo} alt={selected.title} fill className="object-cover md:object-contain" />
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="w-full md:w-2/5 p-6 md:p-10 flex flex-col">
                    <motion.h3 layoutId={reduceMotion ? undefined : `project-title-${selected.id}`} className="text-3xl md:text-4xl font-audiowide text-text mb-4">{selected.title}</motion.h3>
                    <p className="text-muted leading-relaxed mb-6">{selected.description}</p>
                    <div className="mb-auto">
                      <h4 className="font-audiowide text-sm text-accent mb-3">Tecnologias</h4>
                      <div className="flex flex-wrap gap-2">
                        {selected.languages.map((l) => (<span key={l} className="px-3 py-1.5 rounded-full border border-accent/20 bg-panel/50 text-xs text-text">{l}</span>))}
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-accent/10">
                      <a href={selected.repoUrl} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 py-3.5 font-audiowide bg-accent/10 border border-accent/30 hover:bg-accent/20 transition text-text rounded-xl"><Github size={18} /> Repositório</a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>, document.body
      )}
    </section>
  );
}