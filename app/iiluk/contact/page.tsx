import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLifeRing, faBug, faCreditCard, faClock } from '@fortawesome/free-solid-svg-icons';
import { NavBar, Footer, Glow } from '../shared';
import { APP } from '../data';

export const metadata = {
  title: 'Contact',
  description: `Get in touch with the ${APP.name} team.`,
};

const TOPICS = [
  { icon: faLifeRing, title: 'Support & help', desc: 'Questions about restoring, colorizing, or exporting a photo.' },
  { icon: faBug, title: 'Report a bug', desc: 'Tell us what happened and which tool, and we’ll look into it.' },
  { icon: faCreditCard, title: 'Billing & Pro', desc: 'Subscriptions, restores, refunds and promo codes.' },
];

export default function ContactPage() {
  const subject = encodeURIComponent(`${APP.name} support`);

  return (
    <div className="min-h-screen">
      <Glow />
      <NavBar />

      <main className="relative max-w-4xl mx-auto px-6 pt-28 lg:pt-36 pb-10">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--gold-deep)' }}>Contact</p>
          <h1 className="iiluk-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] mb-6" style={{ textWrap: 'balance' }}>
            We&rsquo;d love to hear from you.
          </h1>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'var(--text-soft)' }}>
            Reach the {APP.name} team directly by email — a real person reads every message.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {TOPICS.map((t) => (
            <div key={t.title} className="rounded-3xl p-7" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
              <FontAwesomeIcon icon={t.icon} className="w-6 h-6 mb-5" style={{ color: 'var(--teal)' }} />
              <h3 className="font-bold mb-1.5">{t.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-soft)' }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <section
          className="rounded-[40px] p-10 lg:p-14 text-center mb-10"
          style={{ background: 'var(--ink)', color: 'var(--gold-pale)' }}
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8 mb-5" style={{ color: 'var(--gold)' }} />
          <h2 className="iiluk-serif text-2xl mb-2">Email us</h2>
          <a href={`mailto:${APP.email}?subject=${subject}`} className="text-lg font-semibold" style={{ color: 'var(--gold)' }}>
            {APP.email}
          </a>
          <div className="flex items-center justify-center gap-2 text-sm mt-5 opacity-70">
            <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" /> We typically reply within 1&ndash;2 business days.
          </div>
          <div className="mt-8">
            <a
              href={`mailto:${APP.email}?subject=${subject}`}
              className="inline-flex items-center gap-2 px-9 py-4 font-bold rounded-2xl transition-transform hover:scale-[1.02]"
              style={{ background: 'var(--gold)', color: 'var(--ink)' }}
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" /> Compose email
            </a>
          </div>
        </section>

        <p className="text-center" style={{ color: 'var(--text-soft)' }}>
          Looking for policies? Read our{' '}
          <Link href="/iiluk/legal?tab=privacy" style={{ color: 'var(--gold-deep)' }}>Privacy Policy</Link>{' '}
          and{' '}
          <Link href="/iiluk/legal?tab=tos" style={{ color: 'var(--gold-deep)' }}>Terms of Service</Link>.
        </p>
      </main>

      <Footer />
    </div>
  );
}
