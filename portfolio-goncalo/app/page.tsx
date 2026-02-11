import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import EasterEgg from "@/components/EasterEgg";

export default function Home() {
  return (
    <main className="relative selection:bg-accent selection:text-white">
      <EasterEgg />
      <Header />
      
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />

      <footer className="py-8 text-center text-muted font-audiowide border-t border-accent/10 bg-[#080a10]/50">
        <p>Player 1: <span className="text-accent">Gonçalo Alegria</span></p>
        <p className="text-sm opacity-60 mt-1">feito com código e café ☕</p>
      </footer>
    </main>
  );
}