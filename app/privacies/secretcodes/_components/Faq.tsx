"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "bg-white/[0.08] border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
                : "bg-white/5 border-white/10 hover:border-white/20"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white text-base md:text-lg">
                {item.q}
              </span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-cyan-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-gray-300 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
