'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SUPPORT_FAQS } from '../data';

export default function SupportFaqs() {
  const [open, setOpen] = useState<string | null>(SUPPORT_FAQS[0]?.items[0]?.q ?? null);

  return (
    <div className="space-y-12">
      {SUPPORT_FAQS.map((cat) => (
        <section key={cat.label}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-faint)' }}>
            {cat.label}
          </h2>
          <div className="space-y-3">
            {cat.items.map((f) => (
              <div key={f.q} className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)' }}>
                <button
                  onClick={() => setOpen(open === f.q ? null : f.q)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold" style={{ color: 'var(--text)' }}>{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${open === f.q ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--accent)' }}
                  />
                </button>
                {open === f.q && (
                  <p className="px-6 pb-5 -mt-1 leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
