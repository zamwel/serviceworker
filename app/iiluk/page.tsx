'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles, faWandSparkles, faPalette, faExpand, faEraser, faScissors,
  faUserGroup, faImage,
  faCheck, faChevronDown, faShieldHalved, faWifi, faLock, faLayerGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { NavBar, Footer, Glow, PlayBadge } from './shared';
import { APP, TOOLS, STEPS, PRIVACY_POINTS, PLANS, FAQS, HERO_SLIDES } from './data';

const ICONS: Record<string, IconDefinition> = {
  wandMagicSparkles: faWandMagicSparkles,
  wandSparkles: faWandSparkles,
  palette: faPalette,
  expand: faExpand,
  eraser: faEraser,
  scissors: faScissors,
  userGroup: faUserGroup,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-bold tracking-[0.16em] uppercase mb-4"
      style={{ color: 'var(--gold-deep)' }}
    >
      {children}
    </p>
  );
}

/** Auto-advancing crossfade of the same tool artwork the app itself uses —
 *  badge + dots placement mirrors the mobile app's own hero carousel. */
function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full aspect-[1024/475] rounded-[32px] overflow-hidden"
      style={{ boxShadow: 'var(--shadow)' }}
    >
      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          fill
          priority={i === 0}
          quality={95}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-opacity duration-700 ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div
        className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide"
        style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--ink)' }}
      >
        <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3 h-3" style={{ color: 'var(--gold-deep)' }} />
        AI Powered
      </div>
      <div className="absolute bottom-4 left-4 flex gap-1.5">
        {HERO_SLIDES.map((s, i) => (
          <span
            key={s.image}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === index ? 18 : 6, background: i === index ? '#fff' : 'rgba(255,255,255,0.55)' }}
          />
        ))}
      </div>
    </div>
  );
}

/** Continuous strip — the source image is drawn twice back to back and the
 *  whole track animated exactly one copy-width (see .iiluk-marquee-track in
 *  theme.css), so the loop has no visible start or end. */
function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-[28px]" style={{ boxShadow: 'var(--shadow)' }}>
      <div className="flex w-max iiluk-marquee-track">
        {/* Plain <img>, not next/image: intrinsic aspect-preserving width at
            a fixed height — next/image needs a fixed width, which would
            break the tiling math below. */}
        {[0, 1].map((copy) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={copy}
            src="/iiluk/marquee-banner.png"
            alt=""
            aria-hidden={copy === 1}
            className="h-24 md:h-32 w-auto shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

function ImgPlaceholder({ label, aspect = 'aspect-[9/19]' }: { label: string; aspect?: string }) {
  return (
    <div
      className={`w-full ${aspect} rounded-[28px] flex flex-col items-center justify-center gap-2 border border-dashed`}
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
    >
      <FontAwesomeIcon icon={faImage} className="w-5 h-5" style={{ color: 'var(--text-faint)' }} />
      <span className="text-xs text-center px-6 leading-relaxed" style={{ color: 'var(--text-faint)' }}>
        {label}
      </span>
    </div>
  );
}

export default function IILukLanding() {
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      <Glow />
      <NavBar />

      <main className="relative">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div>
              <Eyebrow>On-device photo AI</Eyebrow>
              <h1 className="iiluk-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] mb-6" style={{ textWrap: 'balance' }}>
                Every photo has been waiting for <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>a second look.</em>
              </h1>
              <p className="text-lg leading-relaxed mb-9 max-w-xl" style={{ color: 'var(--text-soft)' }}>
                {APP.oneLiner}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <PlayBadge />
                <a
                  href="#tools"
                  className="px-6 py-3.5 rounded-2xl font-semibold transition-colors"
                  style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
                >
                  See what it can do
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: 'var(--text-faint)' }}>
                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" style={{ color: 'var(--gold-deep)' }} /> Nothing uploaded</span>
                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faWifi} className="w-3.5 h-3.5" style={{ color: 'var(--gold-deep)' }} /> Works offline</span>
                <span className="flex items-center gap-2"><FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5" style={{ color: 'var(--gold-deep)' }} /> Layer effects in one editor</span>
              </div>
            </div>
            <HeroCarousel />
          </div>
        </section>

        {/* MARQUEE */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <Marquee />
        </section>

        {/* TOOLS */}
        <section id="tools" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="mb-12 max-w-xl">
            <Eyebrow>What IILuk can do</Eyebrow>
            <h2 className="iiluk-serif text-3xl lg:text-4xl mb-4" style={{ textWrap: 'balance' }}>
              Seven tools, one editor, no round trips to the cloud.
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>
              Every tool below runs as a local model on your phone — pick one, apply it, and layer another
              without leaving the photo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((t) => (
              <div
                key={t.title}
                className="rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
              >
                <div className="relative aspect-[371/343]">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    quality={95}
                    sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute right-3 bottom-3 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow)' }}
                  >
                    <FontAwesomeIcon
                      icon={ICONS[t.icon]}
                      className="w-3.5 h-3.5"
                      style={{ color: t.tag === 'gold' ? 'var(--gold-deep)' : 'var(--teal)' }}
                    />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <div className="mb-12 max-w-xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="iiluk-serif text-3xl lg:text-4xl" style={{ textWrap: 'balance' }}>
              From faded to fixed in four steps.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num}>
                <span className="iiluk-serif text-2xl" style={{ color: 'var(--gold)' }}>{s.num}</span>
                <h3 className="text-base font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SCREENSHOTS — swap each ImgPlaceholder below for a real
            <Image src="/iiluk/screenshots/...png" .../> once screenshots are
            provided; drop the files into public/iiluk/screenshots/ first. */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12 max-w-xl">
            <Eyebrow>See it in the app</Eyebrow>
            <h2 className="iiluk-serif text-3xl lg:text-4xl mb-4" style={{ textWrap: 'balance' }}>
              A closer look at the editor.
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>
              Real screenshots go here — home, editor, and export, straight from the app.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ImgPlaceholder label="[ Home — tool carousel + grid ]" />
            <ImgPlaceholder label="[ Editor — before/after restore result ]" />
            <ImgPlaceholder label="[ Editor — face swap in progress ]" />
            <ImgPlaceholder label="[ Export — save & share sheet ]" />
          </div>
        </section>

        {/* PRIVACY */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div
            className="rounded-[40px] p-10 lg:p-14"
            style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faShieldHalved} className="w-6 h-6" style={{ color: 'var(--teal)' }} />
              <h2 className="iiluk-serif text-2xl lg:text-3xl">Private by design</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {PRIVACY_POINTS.map((t) => (
                <div key={t} className="flex items-start gap-3" style={{ color: 'var(--text-soft)' }}>
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4 mt-1 shrink-0" style={{ color: 'var(--teal)' }} /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="iiluk-serif text-3xl lg:text-4xl mb-4" style={{ textWrap: 'balance' }}>
              Start free. Go Pro when you&rsquo;re ready.
            </h2>
            <p style={{ color: 'var(--text-soft)' }}>
              Pro is monthly, annual, or a one-time lifetime purchase. The exact price is shown in your local
              currency at checkout.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="rounded-3xl p-8"
                style={{
                  background: p.highlight ? 'var(--ink)' : 'var(--surface)',
                  color: p.highlight ? 'var(--gold-pale)' : 'var(--text)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                {p.badge && (
                  <span
                    className="inline-block mb-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
                    style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                  >
                    {p.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-sm opacity-70"> · {p.cadence}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{ color: p.highlight ? 'var(--gold)' : 'var(--teal)' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 rounded-xl font-bold transition-transform hover:scale-[1.02]"
                  style={p.highlight
                    ? { background: 'var(--gold)', color: 'var(--ink)' }
                    : { background: 'var(--bg)', boxShadow: 'var(--shadow)' }}
                >
                  {p.highlight ? 'Get Pro' : 'Download free'}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center mb-14">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="iiluk-serif text-3xl lg:text-4xl" style={{ textWrap: 'balance' }}>Questions, answered.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
              >
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-4 h-4 shrink-0 transition-transform ${faq === i ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--gold-deep)' }}
                  />
                </button>
                {faq === i && (
                  <p className="px-6 pb-5 -mt-1 leading-relaxed" style={{ color: 'var(--text-soft)' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DOWNLOAD CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div
            className="relative overflow-hidden rounded-[40px] p-12 lg:p-16 text-center"
            style={{ background: 'var(--ink)', color: 'var(--gold-pale)' }}
          >
            <h2 className="iiluk-serif text-3xl lg:text-4xl mb-5" style={{ textWrap: 'balance' }}>
              Give your first photo its second look.
            </h2>
            <p className="max-w-xl mx-auto mb-8 opacity-80">
              Free to start. No account required. Your photos stay on your device.
            </p>
            <div className="flex justify-center"><PlayBadge /></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
