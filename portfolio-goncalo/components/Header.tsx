"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Globe, Moon, Search, Sun } from "lucide-react";
import CommandPalette, { type PaletteAction } from "@/components/CommandPalette";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY || 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(100, Math.max(0, (y / max) * 100));

      setScrolled(y > 64);
      setProgress(p);
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

      { label: "Abrir GitHub", keywords: "github repo", run: open("#"), hint: "↗" },
      { label: "Abrir LinkedIn", keywords: "linkedin perfil", run: open("#"), hint: "↗" },
      { label: "Download CV", keywords: "cv curriculo", run: open("/cv.pdf"), hint: "↗" },
      { label: "Copiar Email", keywords: "email copiar", run: copy("g.alegria.set@gmail.com"), hint: "⌘C" },

      {
        label: mounted && theme === "light" ? "Mudar para Dark" : "Mudar para Light",
        keywords: "tema dark light",
        run: () => {
          setTheme(mounted && theme === "light" ? "dark" : "light");
          setPaletteOpen(false);
        },
        hint: "Enter",
      },
    ];
  }, [mounted, theme, setTheme]);

  const isLight = mounted && theme === "light";

  const shellInlineStyle: React.CSSProperties = scrolled
    ? {
        width: "min(1120px, calc(100% - 1.25rem))",
        marginTop: "0.75rem",
        height: "64px",
        borderRadius: "24px",
      }
    : {
        width: "100%",
        marginTop: "0rem",
        height: "72px",
        borderRadius: "0px",
      };

  const shellClass = scrolled
    ? "glass-panel shadow-[0_18px_60px_rgba(0,0,0,0.45)] border border-accent/15"
    : "bg-transparent border border-transparent";

  const innerPad = scrolled ? "px-4 md:px-6" : "px-4 md:px-8";

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
          {/* PROGRESS BAR (mesmo elemento): topo full width -> escorre para dentro da pill */}
          <div
            aria-hidden
            className={[
              "pointer-events-none absolute overflow-hidden transition-all duration-500 ease-out",
              scrolled
                ? "left-6 right-6 bottom-2 top-auto h-[1px] rounded-full opacity-100"
                : "left-0 right-0 top-0 bottom-auto h-[2px] rounded-none opacity-80",
            ].join(" ")}
          >
            <div className="absolute inset-0 bg-accent/10" />
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-accent to-accent-2"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute left-0 top-0 bottom-0 blur-[10px] bg-accent/35"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={`h-full ${innerPad} flex items-center justify-between gap-3 relative`}>
            {/* Logo */}
            <Link href="#home" className="group shrink-0" onClick={() => setPaletteOpen(false)}>
              <div
                className="w-[160px] h-[36px] bg-gradient-to-r from-accent to-accent-2 transition-all group-hover:shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                style={{
                  mask: "url(/logopp.svg) no-repeat center / contain",
                  WebkitMask: "url(/logopp.svg) no-repeat center / contain",
                }}
              />
            </Link>

            {/* Nome (só quando desces) */}
            <div
              className={[
                "absolute left-1/2 -translate-x-1/2 hidden md:flex items-center",
                "transition-all duration-500",
                scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
              ].join(" ")}
            >
              <span className="font-orbitron uppercase tracking-[0.20em] text-[16px] md:text-[17px] text-accent">
                Gonçalo Alegria
              </span>
            </div>

            {/* Ações direita */}
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir pesquisa (Ctrl+K)"
                className="hidden sm:flex items-center gap-2 h-10 px-3 rounded-2xl bg-panel/25 border border-accent/15 hover:border-accent/35 hover:bg-panel/35 transition text-text"
              >
                <Search size={18} />
                <span className="text-xs font-audiowide text-muted">Ctrl K</span>
              </button>

              <button
                onClick={() => setPaletteOpen(true)}
                aria-label="Abrir pesquisa"
                className="sm:hidden w-10 h-10 grid place-items-center rounded-2xl bg-panel/25 border border-accent/15 hover:border-accent/35 hover:bg-panel/35 transition text-text"
              >
                <Search size={18} />
              </button>

              <button
                aria-label="Idioma"
                className="w-10 h-10 grid place-items-center rounded-2xl bg-panel/25 border border-accent/15 hover:border-accent/35 hover:bg-panel/35 transition text-text"
              >
                <Globe size={18} />
              </button>

              <button
                onClick={() => setTheme(isLight ? "dark" : "light")}
                aria-label="Alternar tema"
                className="w-16 h-10 relative rounded-full border border-accent/20 bg-panel/25 hover:bg-panel/35 transition hover:shadow-[0_0_15px_rgba(168,85,247,0.18)]"
              >
                <div
                  className={[
                    "absolute top-1 left-1 w-7 h-7 rounded-full",
                    "bg-gradient-to-b from-accent to-accent-2 shadow-md",
                    "flex items-center justify-center",
                    "transition-transform duration-300",
                    isLight ? "translate-x-6" : "translate-x-0",
                  ].join(" ")}
                >
                  {isLight ? <Sun size={14} className="text-white" /> : <Moon size={14} className="text-white" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
    </>
  );
}