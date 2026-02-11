"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun, Globe } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center px-6 transition-all duration-300 ${scrolled ? "bg-[#0c1018]/80 backdrop-blur-lg border-b border-accent/30 shadow-lg" : "bg-transparent"}`}>
      
      {/* Logo */}
      <Link href="#home" className="group">
        <div className="w-[170px] h-[38px] bg-gradient-to-r from-accent to-accent-2 transition-all group-hover:shadow-[0_0_14px_rgba(168,85,247,0.5)]" 
             style={{ mask: "url(/logopp.svg) no-repeat center / contain", WebkitMask: "url(/logopp.svg) no-repeat center / contain" }} 
        />
      </Link>

      {/* Nome ao Centro (Scroll Reveal) */}
      <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 transform ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <span className="font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2 uppercase font-bold text-xl hidden md:block">
            Gonçalo Alegria
        </span>
      </div>

      <nav className="ml-auto flex gap-3 items-center">
        <button className="w-10 h-10 grid place-items-center rounded-xl bg-panel/30 border border-accent/20 hover:border-accent/50 hover:-translate-y-1 transition text-text">
            <Globe size={20} />
        </button>
        <button 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-16 h-10 relative rounded-full border border-accent/30 bg-panel/30 transition hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
            <div className={`absolute top-1 left-1 w-7 h-7 rounded-full bg-gradient-to-b from-accent to-accent-2 shadow-md flex items-center justify-center transition-transform duration-300 ${theme === "light" ? "translate-x-6" : "translate-x-0"}`}>
                {theme === "light" ? <Sun size={14} className="text-white" /> : <Moon size={14} className="text-white" />}
            </div>
        </button>
      </nav>
    </header>
  );
}