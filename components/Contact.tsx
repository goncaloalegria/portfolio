// components/Contact.tsx
"use client";

import { Mail, Linkedin, FileText, Github, Instagram, Phone, MapPin } from "lucide-react";
import { socialLinks } from "@/lib/data";
import DecryptTitle from "@/components/DecryptTitle";
import GlowingCard from "@/components/GlowingCard";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 container mx-auto px-4 mb-20">
      <DecryptTitle text="Contacto" className="text-3xl md:text-4xl mb-8" />

      <div className="glass-panel rounded-3xl p-5 md:p-7">
  <GlowingCard>
        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-start">

            {/* Coluna 1 — Headline */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm font-audiowide text-green-500">Disponível</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-audiowide text-text mb-3">
                Vamos conversar?
              </h3>

              <p className="text-text/80 text-lg leading-relaxed">
                Aberto a oportunidades, colaborações ou simplesmente trocar ideias.
              </p>

              <div className="flex gap-3 flex-wrap mt-6">
                <a
                  href="mailto:g.alegria.set@gmail.com"
                  className="px-6 py-3 bg-accent/15 border border-accent/30 rounded-xl font-audiowide hover:bg-accent/25 transition flex items-center gap-2 text-text"
                >
                  <Mail size={18} /> Email
                </a>
                <a
                  href={socialLinks.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-panel/50 border border-accent/15 rounded-xl font-audiowide hover:bg-panel/70 transition flex items-center gap-2 text-text"
                >
                  <FileText size={18} /> CV
                </a>
              </div>
            </div>

            {/* Separador vertical */}
            <div className="hidden md:block w-px self-stretch bg-accent/15" />

            {/* Coluna 2 — Info + Redes */}
            <div className="flex flex-col justify-between h-full gap-6">
              <div className="space-y-4">
                <a href="mailto:g.alegria.set@gmail.com" className="flex items-center gap-3 text-text/80 hover:text-accent transition">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                    <Mail size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted uppercase tracking-wider font-audiowide">Email</div>
                    <div className="text-sm text-text">g.alegria.set@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+351938877605" className="flex items-center gap-3 text-text/80 hover:text-accent transition">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                    <Phone size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted uppercase tracking-wider font-audiowide">Telemóvel</div>
                    <div className="text-sm text-text">+351 938 877 605</div>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 grid place-items-center shrink-0">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted uppercase tracking-wider font-audiowide">Local</div>
                    <div className="text-sm text-text">Lisboa, PT</div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex gap-3 pt-4 border-t border-accent/15">
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel border border-accent/25 text-text/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1" title="GitHub">
                  <Github size={20} />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel border border-accent/25 text-text/70 hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-300 hover:-translate-y-1" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel border border-accent/25 text-text/70 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10 transition-all duration-300 hover:-translate-y-1" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href={socialLinks.cv} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel border border-accent/25 text-text/70 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1" title="Download CV">
                  <FileText size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </GlowingCard>
      </div>
    </section>
  );
}