import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-audiowide text-accent mb-8 scan-effect">Skills</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="glass-panel p-4 rounded-xl">
            <div className="flex justify-between items-center mb-3 font-audiowide text-sm">
                <span>{skill.name}</span>
                <span className="text-muted text-xs">XP</span>
            </div>
            <div className="h-3 bg-panel rounded-full overflow-hidden border border-accent/10 relative">
                <div 
                    className="h-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
                    style={{ width: `${skill.level}%` }} 
                />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}