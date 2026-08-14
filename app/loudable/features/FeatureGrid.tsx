'use client';

import { FEATURE_ICONS } from '../shared';
import { FEATURE_GROUPS } from '../data';

export default function FeatureGrid() {
  return (
    <div className="space-y-14">
      {FEATURE_GROUPS.map((g) => (
        <div key={g.label}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-5" style={{ color: 'var(--text-faint)' }}>
            {g.label}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.features.map((f) => {
              const Icon = FEATURE_ICONS[f.icon];
              return (
                <div key={f.id} className="rounded-2xl p-6" style={{ background: 'var(--surface)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: 'var(--accent)' }} />
                    </span>
                    {f.tier === 'pro' && (
                      <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>Pro</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
