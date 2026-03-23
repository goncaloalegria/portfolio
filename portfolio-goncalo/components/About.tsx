"use client";

import { Sparkles } from "lucide-react";
import DecryptTitle from "@/components/DecryptTitle";
import GlowingCard from "@/components/GlowingCard";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function About() {
  return (
    <section id="sobre" className="py-20 container mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <DecryptTitle text="Sobre Mim" className="text-3xl md:text-4xl" />
        <Sparkles className="text-[#00f2fe] w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-3xl mx-auto">
        <GlowingCard>
          <div className="h-full flex flex-col">
            <InteractiveTerminal />
          </div>
        </GlowingCard>
      </div>
    </section>
  );
}