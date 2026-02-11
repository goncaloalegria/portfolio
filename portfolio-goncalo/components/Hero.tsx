import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-20 grid place-items-center relative overflow-hidden px-4">
      <div className="container mx-auto grid md:grid-cols-[1.15fr_.85fr] gap-8 items-center relative z-10">
        
        <div className="text-left text-center md:text-left">
          <h1 className="glitch text-5xl md:text-7xl font-orbitron font-black text-accent mb-4 uppercase">
            Gonçalo Alegria
          </h1>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto md:mx-0">
            Estudante de <strong className="text-text">Engenharia Informática</strong>.
          </p>
          
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <a href="#sobre" className="px-6 py-3 rounded-xl border border-accent/30 hover:bg-accent/10 transition font-audiowide text-text">
              Sobre
            </a>
            <a href="#portfolio" className="px-6 py-3 rounded-xl bg-accent/20 border border-accent/30 text-text hover:shadow-[0_0_22px_rgba(168,85,247,0.25)] transition font-audiowide hover:-translate-y-1">
              Ver Projetos
            </a>
            <a href="#contacto" className="px-6 py-3 rounded-xl border border-transparent hover:text-accent transition font-audiowide">
              Contacto
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-[280px] md:w-[420px] aspect-square rounded-3xl overflow-hidden border border-accent/20 shadow-[0_14px_50px_rgba(0,0,0,0.5)] bg-panel/30">
            {/* Efeito Glow atrás da foto */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay" />
            <Image 
              src="/perfil.jpeg" 
              alt="Gonçalo Alegria" 
              fill 
              className="object-cover hover:scale-105 transition duration-500 filter brightness-90 contrast-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}