import { experience } from "@/lib/data";
import { Calendar } from "lucide-react";
import GlowingCard from "@/components/GlowingCard";
import DecryptTitle from "./DecryptTitle";

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 container mx-auto px-4">
      <div>
        <DecryptTitle text="Experiência" className="text-3xl md:text-4xl mb-2" />
      

        {/* Linha vertical da Timeline */}
        <div className="relative border-l-2 border-accent/20 ml-3 md:ml-4 space-y-10">
          {experience.map((xp, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group/timeline">
              {/* Bolinha da Timeline */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-bg border-2 border-accent/50 transition-all duration-300 z-10 group-hover/timeline:border-accent group-hover/timeline:bg-accent group-hover/timeline:shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

              <div className="glass-panel rounded-3xl p-1">
              <GlowingCard>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                    <div>
                      <h3 className="font-audiowide text-xl md:text-2xl text-text mb-1">
                        {xp.role}
                      </h3>
                      <p className="text-accent-2 font-semibold text-sm md:text-base">
                        {xp.place}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-accent font-mono bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 whitespace-nowrap">
                      <Calendar size={14} />
                      {xp.date}
                    </span>
                  </div>

                  <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
                    {xp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {xp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-accent/20 bg-bg/50 text-xs text-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowingCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}