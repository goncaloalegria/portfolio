// components/Contact.tsx
"use client";

import { Mail, Linkedin, FileText, Github, Instagram, Phone } from "lucide-react";
import { socialLinks } from "@/lib/data";
import DecryptTitle from "@/components/DecryptTitle";
import GlowingCard from "@/components/GlowingCard";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 container mx-auto px-4 mb-20">
      <DecryptTitle text="Contacto" className="text-3xl md:text-4xl mb-8" />

      <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8">
        
        {/* Cartão da Esquerda (Mensagem) envolto no GlowingCard */}
        <GlowingCard>
          <div className="p-8 h-full flex flex-col justify-center">
            <p className="text-lg text-muted mb-6">
                Queres falar sobre projetos, estágios ou colaboração? Manda mensagem.
            </p>
            <div className="flex gap-4">
                <a href="mailto:g.alegria.set@gmail.com" className="w-fit px-6 py-3 bg-accent/10 border border-accent/20 rounded-xl font-audiowide hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition flex items-center gap-2 text-text">
                    <Mail size={18} /> Enviar Email
                </a>
            </div>
          </div>
        </GlowingCard>

        {/* Cartão da Direita (Links Rápidos) envolto no GlowingCard */}
        <GlowingCard>
          <div className="p-8 h-full space-y-4">
            
            <div className="flex justify-between border-b border-accent/10 pb-2">
                <span className="text-muted flex items-center gap-2"><Mail size={16}/> Email</span>
                <span className="text-text text-sm md:text-base">g.alegria.set@gmail.com</span>
            </div>
            
            <div className="flex justify-between border-b border-accent/10 pb-2">
                <span className="text-muted flex items-center gap-2"><Phone size={16}/> Telemóvel</span>
                <span className="text-text text-sm md:text-base">+351 938 877 605</span>
            </div>

            <div className="flex justify-between border-b border-accent/10 pb-2">
                <span className="text-muted">Local</span>
                <span className="text-text text-sm md:text-base">Lisboa, PT</span>
            </div>
            
            {/* Redes Sociais com Hover Colorido */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-accent/10">
                <a 
                  href="https://github.com/goncaloalegria" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 rounded-xl bg-panel border border-accent/20 text-muted hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/goncaloalegria004/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 rounded-xl bg-panel border border-accent/20 text-muted hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-300 hover:-translate-y-1"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>

                <a 
                  href="https://www.instagram.com/goncalooalegria/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 rounded-xl bg-panel border border-accent/20 text-muted hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10 transition-all duration-300 hover:-translate-y-1"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>

                <a 
                  href={socialLinks.cv} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 rounded-xl bg-panel border border-accent/20 text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1" 
                  title="Download CV"
                >
                  <FileText size={20} />
                </a>
            </div>
          </div>
        </GlowingCard>

      </div>
    </section>
  );
}