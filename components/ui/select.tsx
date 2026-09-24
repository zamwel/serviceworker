"use client";

import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
  hint?: string;
};

/**
 * Custom dropdown — replaces the native <select>. The browser's own option
 * sheet can't be restyled, so this renders its own floating listbox and
 * keeps the trigger's chevron clear of the edge (pr-10, not pr-4).
 */
export function Select({
  value,
  onChange,
  options,
  className = "",
  placeholder = "Select…",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          className ||
          "w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-left text-white focus:border-red-500/50 focus:outline-none"
        }
      >
        <span className={current ? "" : "text-gray-500"}>
          {current?.label ?? placeholder}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className={`pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full max-h-64 overflow-auto rounded-xl border border-white/10 bg-[#161616] shadow-2xl shadow-black/50 py-1.5">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-2 transition-colors ${
                o.value === value ? "bg-red-600/15 text-red-400" : "text-gray-200 hover:bg-white/5"
              }`}
            >
              <span>{o.label}</span>
              {o.hint && <span className="text-xs text-gray-500">{o.hint}</span>}
              {o.value === value && (
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
                  <path d="M4 10.5L8 14.5L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
