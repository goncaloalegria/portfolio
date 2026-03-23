"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import CommandPalette, { type PaletteAction } from "@/components/CommandPalette";
import { socialLinks } from "@/lib/data";
import AnimatedThemeToggler from "@/components/AnimatedThemeToggler";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const lastFocusRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled((window.scrollY || 0) > 64);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const mod = e.ctrlKey || e.metaKey;

      if (mod && isK) {
        e.preventDefault();
        if (!paletteOpen) lastFocusRef.current = document.activeElement as HTMLElement;
        setPaletteOpen((v) => !v);
      }

      if (e.key === "Escape" && paletteOpen) setPaletteOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  useEffect(() => {
    if (!paletteOpen && lastFocusRef.current) {
      lastFocusRef.current.focus?.();
      lastFocusRef.current = null;
    }
  }, [paletteOpen]);

  const actions: PaletteAction[] = useMemo(() => {
    const go = (id: string) => () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setPaletteOpen(false);
    };

    const open = (url: string) => () => {
      window.open(url, "_blank", "noreferrer");
      setPaletteOpen(false);
    };

    const copy = (text: string) => async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // ignore
      }
      setPaletteOpen(false);
    };

    return [
      { label: "Ir para: Home", keywords: "home topo", run: go("home"), hint: "Enter" },
      { label: "Ir para: Sobre", keywords: "sobre about", run: go("sobre"), hint: "Enter" },
      { label: "Ir para: Experiência", keywords: "experiencia percurso", run: go("experiencia"), hint: "Enter" },
      { label: "Ir para: Skills", keywords: "skills tech", run: go("skills"), hint: "Enter" },
      { label: "Ir para: Projetos", keywords: "projetos portfolio", run: go("portfolio"), hint: "Enter" },
      { label: "Ir para: Contacto", keywords: "contacto email", run: go("contacto"), hint: "Enter" },
      { label: "Abrir GitHub", keywords: "github repo codigo", run: open(socialLinks.github), hint: "↗" },
      { label: "Abrir LinkedIn", keywords: "linkedin perfil emprego", run: open(socialLinks.linkedin), hint: "↗" },
      { label: "Abrir Instagram", keywords: "instagram fotos social", run: open(socialLinks.instagram ?? ""), hint: "↗" },
      { label: "Ligar / WhatsApp", keywords: "telefone telemovel ligar numero", run: open(socialLinks.phone ?? ""), hint: "↗" },
      { label: "Copiar Email", keywords: "email copiar", run: copy(socialLinks.email), hint: "⌘C" },
    ];
  }, []);

  const shellInlineStyle: React.CSSProperties = scrolled
    ? {
        width: "min(1120px, calc(100% - 1.25rem))",
        marginTop: "0.5rem",
        height: "52px",
        borderRadius: "18px",
      }
    : {
        width: "100%",
        marginTop: "0rem",
        height: "60px",
        borderRadius: "0px",
      };

  const shellClass = scrolled
    ? "glass-panel backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] border border-accent/15"
    : "bg-transparent border border-transparent";

  const innerPad = scrolled ? "px-3 md:px-6" : "px-3 md:px-8";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          ref={shellRef}
          style={shellInlineStyle}
          className={[
            "mx-auto relative overflow-hidden",
            "transition-[width,height,margin-top,border-radius,background-color,border-color,box-shadow] duration-500 ease-out",
            shellClass,
          ].join(" ")}
        >
          <div className={`h-full ${innerPad} flex items-center justify-between gap-2 sm:gap-3 relative`}>
            {/* Logo — menor em mobile */}
            <Link href="#home" className="group shrink-0" onClick={() => setPaletteOpen(false)}>
              <div
                className="w-[110px] sm:w-[140px] md:w-[160px] h-[28px] sm:h-[32px] md:h-[36px] bg-gradient-to-r from-accent to-accent-2 transition-all group-hover:shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                style={{
                  mask: "url(/logopp.svg) no-repeat center / contain",
                  WebkitMask: "url(/logopp.svg) no-repeat center / contain",
                }}
              />
            </Link>

            {/* Nome (só em desktop quando desces) */}
            <div
              className={[
                "absolute left-1/2 -translate-x-1/2 hidden md:flex items-center",
                "transition-all duration-500",
                scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
              ].join(" ")}
            >
              <span className="font-orbitron uppercase tracking-[0.20em] text-[16px] md:text-[19px] text-accent">
                Gonçalo Alegria
              </span>
            </div>

            {/* Ações direita */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              {/* Pesquisa desktop */}
              <button
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir pesquisa (Ctrl+K)"
                className="hidden sm:flex items-center gap-2 h-9 md:h-10 px-3 rounded-2xl bg-panel/25 border border-accent/15 hover:border-accent/35 hover:bg-panel/35 transition text-text"
              >
                <Search size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="text-xs font-audiowide text-muted">Ctrl K</span>
              </button>

              {/* Pesquisa mobile */}
              <button
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir pesquisa"
                className="sm:hidden w-9 h-9 grid place-items-center rounded-xl bg-panel/25 border border-accent/15 hover:border-accent/35 hover:bg-panel/35 transition text-text"
              >
                <Search size={16} />
              </button>

              {/* Theme Toggler */}
              <AnimatedThemeToggler className="w-9 h-9 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
    </>
  );
}