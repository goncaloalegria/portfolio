import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EasterEgg from "@/components/EasterEgg";
import BackToTop from "@/components/BackToTop";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  return (
    <main className="relative selection:bg-accent selection:text-white">
      <EasterEgg />
      <Header />

      <SectionReveal delay={0.1}>
        <Hero />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <About />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Experience />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Skills />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Projects />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Contact />
      </SectionReveal>

      <footer className="border-t border-accent/10 bg-bg/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Logo + Nome */}
            <div className="flex items-center gap-3">
              <div
                className="w-[32px] h-[32px] bg-gradient-to-r from-accent to-accent-2 shrink-0"
                style={{
                  mask: "url(/logopp.svg) no-repeat center / contain",
                  WebkitMask: "url(/logopp.svg) no-repeat center / contain",
                }}
              />
              <div>
                <div className="font-audiowide text-sm text-text">Gonçalo Alegria</div>
                <div className="text-xs text-muted">Engenharia Informática</div>
              </div>
            </div>

            {/* Links rápidos */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-audiowide text-muted">
              <a href="#home" className="hover:text-accent transition">Home</a>
              <a href="#sobre" className="hover:text-accent transition">Sobre</a>
              <a href="#experiencia" className="hover:text-accent transition">Experiência</a>
              <a href="#skills" className="hover:text-accent transition">Skills</a>
              <a href="#portfolio" className="hover:text-accent transition">Projetos</a>
              <a href="#contacto" className="hover:text-accent transition">Contacto</a>
            </div>

            {/* Copyright */}
            <div className="text-xs text-muted text-right">
              <p>© {new Date().getFullYear()} Gonçalo Alegria</p>
              <p className="mt-1 opacity-60">feito com código e café ☕</p>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}