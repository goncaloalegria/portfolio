"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  // Valores para o efeito 3D
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Molas para suavizar o movimento
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transforma as coordenadas do rato em graus de rotação (-15 a 15 graus)
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Transforma as coordenadas para mover o brilho (reflexo)
  const glareX = useTransform(springX, [0, 1], [-100, 200]);
  const glareY = useTransform(springY, [0, 1], [-100, 200]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos / width);
    mouseY.set(mouseYPos / height);
  };

  const handleMouseLeave = () => {
    // Volta ao centro quando o rato sai
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-24 md:pt-28 grid place-items-center relative overflow-hidden px-4"
    >
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1.15fr_.85fr] gap-10 items-center relative z-10">
        
        {/* Texto da Esquerda */}
        <div className="text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glitch font-orbitron font-black text-accent mb-4 uppercase leading-[0.95] tracking-[0.06em] text-[clamp(2.4rem,5.2vw,4.9rem)]"
          >
            Gonçalo Alegria
          </motion.h1>

          <motion.p 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  className="text-lg sm:text-xl text-text/80 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
>
  Construo o meu futuro entre <span className="text-accent font-semibold">código</span>, <span className="text-accent font-semibold">liderança</span> e <span className="text-accent font-semibold">vontade de aprender</span>.
</motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex gap-3 sm:gap-4 flex-wrap justify-center md:justify-start items-center"
          >
            {/* Botão 1: Sobre */}
<a href="#sobre" className="relative group px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-accent/30 bg-panel/50 hover:border-accent/80 transition-all duration-300 font-audiowide text-sm sm:text-base text-text overflow-hidden">
  <span className="relative z-10">Sobre</span>
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
</a>

{/* Botão 2: Ver Projetos */}
<a href="#portfolio" className="relative group px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-accent/20 border border-accent/50 text-text hover:bg-accent/30 hover:-translate-y-1 transition-all duration-300 font-audiowide text-sm sm:text-base overflow-hidden">
  <span className="relative z-10">Ver Projetos</span>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-accent/10 transition-opacity duration-300" />
</a>

{/* Botão 3: Contacto */}
<a href="#contacto" className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-muted hover:text-accent transition-all duration-300 font-audiowide text-sm sm:text-base flex items-center gap-2 group">
  Contacto
  <span className="w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-4 rounded-full" />
</a>
          </motion.div>
        </div>

        {/* Imagem 3D da Direita (INTACTA!) */}
        <div className="flex justify-center md:justify-end perspective-[1000px]">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[240px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-square rounded-3xl cursor-pointer"
          >
            {/* O Cartão em si */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-accent/30 shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-panel/30">
              
              {/* Filtro Cyberpunk Base */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 via-transparent to-accent-2/10 mix-blend-overlay z-10" />
              
              <Image
                src="/perfil.jpeg"
                alt="Gonçalo Alegria"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
                className="object-cover transition-transform duration-700 filter brightness-90 contrast-110"
                priority
              />

              {/* Reflexo Dinâmico (Glare) */}
              <motion.div
                style={{ x: glareX, y: glareY }}
                className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_50%)] pointer-events-none z-20 mix-blend-screen"
              />
            </div>

            {/* Sombra 3D Flutuante (por baixo do cartão) */}
            <motion.div 
              style={{ translateZ: -50 }}
              className="absolute -inset-4 bg-accent/20 blur-[40px] rounded-3xl -z-10 opacity-50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}