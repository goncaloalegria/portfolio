import { experience } from "@/lib/data";
import { Calendar } from "lucide-react";
// ATENÇÃO: Ajusta este import para onde guardaste o GlowingCard
import GlowingCard from "./GlowingCard"; 

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-2 scan-effect inline-block">
          Experiência
        </h2>
        <p className="text-muted mb-12">Percurso académico e profissional.</p>

        {/* Linha vertical da Timeline */}
        <div className="relative border-l-2 border-accent/20 ml-3 md:ml-4 space-y-10">
          
          {experience.map((xp, index) => (
            // Usamos group/timeline para não entrar em conflito com o 'group' do teu GlowingCard
            <div key={index} className="relative pl-8 md:pl-12 group/timeline">
              
              {/* Bolinha da Timeline - Acende quando passas o rato no bloco da experiência */}
              <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-[#0c1018] border-2 border-accent/30 transition-all duration-300 z-10 group-hover/timeline:border-accent group-hover/timeline:bg-accent group-hover/timeline:shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

              {/* A TUA COMPONENTE AQUI */}
              <GlowingCard>
                {/* O padding interno (p-6 md:p-8) fica nesta div de dentro, 
                    porque o teu GlowingCard usa o padding para a borda brilhante */}
                <div className="p-6 md:p-8">
                  
                  {/* Cabeçalho */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                    <div>
                      <h3 className="font-audiowide text-xl md:text-2xl text-text mb-1">
                        {xp.role}
                      </h3>
                      <p className="text-accent-2 font-semibold text-sm md:text-base">
                        {xp.place}
                      </p>
                    </div>
                    
                    {/* Badge da Data */}
                    <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-accent font-mono bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 whitespace-nowrap">
                      <Calendar size={14} />
                      {xp.date}
                    </span>
                  </div>

                  {/* Descrição */}
                  <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
                    {xp.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {xp.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 rounded-full border border-accent/20 bg-[#0c1018] text-xs text-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </GlowingCard>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}