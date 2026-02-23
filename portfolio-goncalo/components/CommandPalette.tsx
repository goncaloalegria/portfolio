"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

export type PaletteAction = {
  label: string;
  keywords?: string;
  hint?: string;
  run: () => void;
};

export default function CommandPalette({
  open,
  onClose,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return actions;
    return actions.filter((a) => {
      const hay = `${a.label} ${a.keywords ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, actions]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const a = filtered[active];
        if (a) a.run();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-24"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl rounded-3xl border border-accent/20 bg-bg/80 shadow-[0_30px_120px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* top bar */}
        <div className="p-3 border-b border-accent/15 bg-panel/20">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl border border-accent/15 bg-bg/40">
            <Search size={18} className="text-muted" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              placeholder="Pesquisar… (ex: projetos, skills, email)"
              className="w-full bg-transparent outline-none text-text placeholder:text-muted font-audiowide text-sm"
            />
            <span className="text-[11px] text-muted font-audiowide border border-accent/15 rounded-lg px-2 py-1">
              Esc
            </span>
          </div>
        </div>

        {/* list */}
        <div className="max-h-[60vh] overflow-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-muted font-audiowide text-sm">Sem resultados.</div>
          ) : (
            <ul className="p-2">
              {filtered.map((a, i) => {
                const isActive = i === active;
                return (
                  <li key={`${a.label}-${i}`}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => a.run()}
                      className={[
                        "w-full text-left px-4 py-3 rounded-2xl transition",
                        "border border-transparent",
                        isActive
                          ? "bg-accent/15 border-accent/30 shadow-[0_0_22px_rgba(168,85,247,0.18)]"
                          : "hover:bg-panel/25 hover:border-accent/15",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-audiowide text-sm text-text">{a.label}</span>
                        {a.hint ? (
                          <span className="text-[11px] text-muted font-audiowide border border-accent/15 rounded-lg px-2 py-1">
                            {a.hint}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* footer */}
        <div className="p-3 border-t border-accent/15 bg-panel/10 flex items-center justify-between text-[11px] text-muted font-audiowide">
          <span>↑ ↓ navegar</span>
          <span>Enter selecionar</span>
        </div>
      </div>
    </div>
  );
}