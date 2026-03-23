import { experience, education } from "@/lib/data";
import { Calendar, GraduationCap, Briefcase } from "lucide-react";
import GlowingCard from "@/components/GlowingCard";
import DecryptTitle from "@/components/DecryptTitle";

type TimelineItem = {
  role: string;
  date: string;
  place: string;
  desc: string;
  tags: string[];
};

function TimelineSection({ title, icon, items }: { title: string; icon: React.ReactNode; items: TimelineItem[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
          {icon}
        </div>
        <h3 className="text-xl font-audiowide text-text">{title}</h3>
      </div>

      <div className="relative border-l-2 border-accent/20 ml-3 md:ml-4 space-y-10">
        {items.map((item, index) => (
          <div key={index} className="relative pl-8 md:pl-12 group/timeline">
            {/* Bolinha da Timeline */}
            <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-bg border-2 border-accent/50 transition-all duration-300 z-10 group-hover/timeline:border-accent group-hover/timeline:bg-accent group-hover/timeline:shadow-[0_0_15px_rgba(168,85,247,0.8)]" />

            <GlowingCard>
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-3">
                  <div>
                    <h3 className="font-audiowide text-xl md:text-2xl text-text mb-1">
                      {item.role}
                    </h3>
                    <p className="text-accent-2 font-semibold text-sm md:text-base">
                      {item.place}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-accent font-mono bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 whitespace-nowrap">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>

                <p className="text-muted leading-relaxed mb-6 text-sm md:text-base">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 container mx-auto px-4">
      <DecryptTitle text="Experiência" className="text-3xl md:text-4xl mb-2" />
      <p className="text-muted mb-12">Percurso profissional e académico.</p>

      <div className="space-y-16">
        <TimelineSection
          title="Experiência"
          icon={<Briefcase size={18} className="text-accent" />}
          items={experience}
        />

        <TimelineSection
          title="Educação"
          icon={<GraduationCap size={18} className="text-accent" />}
          items={education}
        />
      </div>
    </section>
  );
}