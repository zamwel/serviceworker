import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faWandMagicSparkles, faLock, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { NavBar, Footer, Glow, PlayBadge } from '../shared';
import { APP } from '../data';

export const metadata = {
  title: 'About',
  description: APP.oneLiner,
};

const VALUES = [
  { icon: faMicrochip, title: 'Runs on your phone', desc: 'Every model — restoration, colorization, upscaling, erasing — executes on-device. No server round trip.' },
  { icon: faWandMagicSparkles, title: 'One editor, not six apps', desc: 'Pick a photo once and layer restore, colorize and enhance in the same session, with full undo and redo.' },
  { icon: faLock, title: 'Private by default', desc: 'Your photos are never uploaded. No account, no cloud processing, nothing to opt out of.' },
  { icon: faDroplet, title: 'Built for old photos', desc: 'Scratches, creases, fading and faded color are the actual problem IILuk was designed to solve.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Glow />
      <NavBar />

      <main className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36 pb-10">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--gold-deep)' }}>About</p>
          <h1 className="iiluk-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] mb-6" style={{ textWrap: 'balance' }}>
            We built {APP.name} to give old photos a second look.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-soft)' }}>
            {APP.oneLiner}
          </p>
        </div>

        <section
          className="rounded-3xl p-8 lg:p-10 mb-12 leading-relaxed"
          style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)', color: 'var(--text-soft)' }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Why we made it</h2>
          <p className="mb-4">
            Most photo apps ask you to trust a server with the picture you care about most — a grandparent, a
            wedding scan, the only copy of a childhood photo. {APP.name} takes the opposite approach: the AI
            models that restore, colorize, upscale, and erase all run directly on your phone. The photo never
            has to leave.
          </p>
          <p>
            {APP.company} builds small, focused on-device tools rather than one app that tries to do everything.
            {' '}{APP.name} is our answer to a very specific problem: photos that deserve better than they got.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl p-7"
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}
            >
              <FontAwesomeIcon icon={v.icon} className="w-6 h-6 mb-5" style={{ color: 'var(--gold-deep)' }} />
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <section
          className="text-center rounded-[40px] p-12"
          style={{ background: 'var(--ink)', color: 'var(--gold-pale)' }}
        >
          <h2 className="iiluk-serif text-2xl lg:text-3xl mb-4" style={{ textWrap: 'balance' }}>Try it for yourself</h2>
          <p className="mb-8 opacity-80">Free to start, and your first restoration takes seconds.</p>
          <div className="flex justify-center"><PlayBadge /></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
