"use client";
import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { X, Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-8 scan-effect">Projetos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="group relative aspect-video rounded-2xl overflow-hidden border border-accent/10 bg-panel hover:-translate-y-2 transition duration-300 focus:outline-none focus:ring-2 ring-accent"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="font-audiowide text-xl text-white drop-shadow-lg">{project.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-[#080a10] border border-accent/20 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 p-2 bg-panel/50 rounded-lg hover:bg-accent/20 transition">
                <X className="text-white" />
            </button>

            <div className="w-full md:w-2/3 h-[300px] md:h-auto relative bg-black/50">
                <Image src={selected.demo} alt={selected.title} fill className="object-contain" />
            </div>

            <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col">
                <h3 className="text-3xl font-audiowide text-white mb-4">{selected.title}</h3>
                <p className="text-muted leading-relaxed mb-6">{selected.description}</p>
                
                <div className="mb-auto">
                    <h4 className="font-audiowide text-sm text-accent mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                        {selected.languages.map(l => (
                            <span key={l} className="px-3 py-1 rounded-full border border-accent/20 bg-panel text-xs text-text">{l}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-accent/10 flex gap-3">
                    <a href={selected.repoUrl} target="_blank" className="flex-1 btn bg-accent/10 border border-accent/30 hover:bg-accent/20 text-center py-3 rounded-xl font-audiowide flex items-center justify-center gap-2 transition">
                        <Github size={18} /> Repositório
                    </a>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}