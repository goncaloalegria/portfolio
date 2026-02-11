"use client";
import { useEffect, useState, useRef } from "react";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const buffer = useRef("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignorar inputs
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-6);
      
      if (buffer.current === "kachow") {
        setActive(true);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
        }
        setTimeout(() => {
            setActive(false);
            buffer.current = "";
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/kachow.mp3" preload="auto" />
      {active && (
        <div className="fixed top-1/2 left-0 w-full h-[10px] z-[9999] pointer-events-none animate-bolt">
            <div className="w-[300px] h-full bg-gradient-to-r from-red-500 to-yellow-400 shadow-[0_0_30px_#ff0000] translate-x-[-100%]" 
                 style={{ animation: 'boltFly 0.6s linear forwards' }} 
            />
            <style jsx>{`
                @keyframes boltFly {
                    0% { transform: translateX(-100%); opacity: 1; }
                    50% { transform: translateX(50vw); opacity: 1; }
                    100% { transform: translateX(120vw); opacity: 0; }
                }
            `}</style>
        </div>
      )}
    </>
  );
}