import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-2 scan-effect">Experiência</h2>
      <p className="text-muted mb-8">Percurso académico e profissional.</p>

      <div className="space-y-6">
        {experience.map((xp, index) => (
          <div key={index} className="grid grid-cols-[20px_1fr] gap-4">
            <div className="relative">
                <div className="w-4 h-4 rounded-full bg-gradient-to-b from-accent to-accent-2 shadow-[0_0_15px_rgba(168,85,247,0.5)] mt-2" />
                {index !== experience.length - 1 && <div className="absolute top-6 left-2 w-[2px] h-full bg-accent/20" />}
            </div>
            
            <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h3 className="font-audiowide text-xl text-text">{xp.role}</h3>
                    <span className="text-sm text-accent/80 font-mono">{xp.date}</span>
                </div>
                <p className="text-sm text-muted mb-3">{xp.place}</p>
                <p className="text-muted/90 leading-relaxed mb-4">{xp.desc}</p>
                <div className="flex flex-wrap gap-2">
                    {xp.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full border border-accent/20 bg-panel/50 text-xs text-text">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}