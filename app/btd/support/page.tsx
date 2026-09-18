'use client';

import { useState } from 'react';
import { Mail, MessageSquare, ChevronDown, HelpCircle, Send } from 'lucide-react';
import { Header, Footer, Eyebrow } from '../shared';
import { BRAND, SUPPORT_FAQS } from '../data';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>('Predictions & Analytics-0');

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="mb-14">
          <Eyebrow>Help & Support</Eyebrow>
          <h1
            className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] font-black mb-6 tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            How can we help you today?
          </h1>
          <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--text-soft)' }}>
            Find answers to common questions regarding our AI models, VIP access, and subscription management.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <a
            href={`mailto:${BRAND.supportEmail}`}
            className="rounded-3xl p-7 border btd-card-hover block"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
            >
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
              Email Support
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-soft)' }}>
              Direct inquiry to our engineering and data support team.
            </p>
            <span className="text-xs font-black" style={{ color: 'var(--accent)' }}>
              {BRAND.supportEmail} →
            </span>
          </a>

          <div
            className="rounded-3xl p-7 border"
            style={{ background: 'var(--surface-elevated)', borderColor: 'var(--hairline)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-500 bg-emerald-500/10"
            >
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
              In-App Ticket Support
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--text-soft)' }}>
              Open Settings &gt; About &gt; Contact Us directly from your mobile app.
            </p>
            <span className="text-xs font-black text-emerald-500">
              Avg. response: &lt; 24h
            </span>
          </div>
        </div>

        {/* Categorized FAQs */}
        <div className="space-y-12">
          {SUPPORT_FAQS.map((cat) => (
            <div key={cat.label}>
              <h2 className="text-lg font-black mb-4 tracking-tight" style={{ color: 'var(--text)' }}>
                {cat.label}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, idx) => {
                  const key = `${cat.label}-${idx}`;
                  const isOpen = openFaq === key;
                  return (
                    <div
                      key={item.q}
                      className="rounded-2xl border overflow-hidden transition-colors"
                      style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : key)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-bold text-sm"
                        style={{ color: 'var(--text)' }}
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: 'var(--accent)' }}
                        />
                      </button>
                      {isOpen && (
                        <div
                          className="px-6 pb-5 pt-1 text-xs leading-relaxed border-t"
                          style={{ borderColor: 'var(--hairline)', color: 'var(--text-soft)' }}
                        >
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
