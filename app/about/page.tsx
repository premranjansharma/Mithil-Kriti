'use client';

import Link from 'next/link';

// ─── Data ──────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    number: '01',
    title: 'Rooted in Tradition',
    body:
      'Every piece we carry traces its lineage to the villages of Mithila — a living art tradition passed down through generations of women, painted on mud walls, cloth, and now canvas.',
  },
  {
    number: '02',
    title: 'Artisan First',
    body:
      'We work directly with the hands that create. No middlemen, no mass production. Each artisan is credited, fairly compensated, and celebrated as the author of their work.',
  },
  {
    number: '03',
    title: 'Uncompromising Quality',
    body:
      'Natural pigments, hand-spun fabrics, and traditional tools. We refuse shortcuts — because shortcuts erase the very thing that makes Mithila art irreplaceable.',
  },
];

const STATS = [
  { value: '200+', label: 'Artisans partnered' },
  { value: '12', label: 'Villages represented' },
  { value: '5000+', label: 'Pieces delivered' },
  { value: '2019', label: 'Founded' },
];

// ─── Decorative Yantra ────────────────────────────────────────────────────────
function YantraAccent({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="76" height="76" stroke="#B8922A" strokeWidth="0.6" opacity={0.3} />
      <rect x="12" y="12" width="56" height="56" stroke="#B8922A" strokeWidth="0.4" opacity={0.2} />
      <circle cx="40" cy="40" r="20" stroke="#B8922A" strokeWidth="0.5" opacity={0.25} />
      <circle cx="40" cy="40" r="5" fill="#B8922A" opacity={0.5} />
      <line x1="40" y1="2" x2="40" y2="78" stroke="#B8922A" strokeWidth="0.4" opacity={0.15} />
      <line x1="2" y1="40" x2="78" y2="40" stroke="#B8922A" strokeWidth="0.4" opacity={0.15} />
      <circle cx="40" cy="12" r="2.5" fill="#B8922A" opacity={0.35} />
      <circle cx="40" cy="68" r="2.5" fill="#B8922A" opacity={0.35} />
      <circle cx="12" cy="40" r="2.5" fill="#B8922A" opacity={0.35} />
      <circle cx="68" cy="40" r="2.5" fill="#B8922A" opacity={0.35} />
    </svg>
  );
}

// ─── Thin gold divider ────────────────────────────────────────────────────────
function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#B8922A] opacity-30" />
      <div className="w-1 h-1 rounded-full bg-[#B8922A] opacity-60" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#B8922A] opacity-30" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="bg-[#0C0C0C] text-[#c8bfa8] min-h-screen"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center
                          px-6 pt-28 pb-24 overflow-hidden">
        {/* Background yantra */}
        <div className="absolute opacity-[0.06] pointer-events-none select-none">
          <YantraAccent size={480} />
        </div>

        <p className="text-[#B8922A] text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
          Our Story
        </p>

        <h1
          className="text-[#E8D5A0] text-4xl md:text-6xl lg:text-7xl leading-[1.08] tracking-[-0.01em] mb-8 max-w-3xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
        >
          Art that has always<br />
          <em className="not-italic text-[#B8922A]">belonged to the wall.</em>
        </h1>

        <p className="text-[#6a6050] text-[13px] leading-[1.9] tracking-[0.02em] max-w-lg">
          Mithila Kriti was born from a simple belief: that art made by hand,
          for the wall of a home, carries a weight that no print can replicate.
          We exist to make sure that weight reaches you — and that the hands
          behind it are honoured.
        </p>

        <GoldRule className="w-full max-w-sm mt-12" />
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y border-[#1a1a1a] px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p
                className="text-[#E8D5A0] text-4xl md:text-5xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
              >
                {s.value}
              </p>
              <p className="text-[#4a4438] text-[10px] tracking-[0.2em] uppercase font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="flex items-start gap-6 mb-10">
          <YantraAccent size={44} />
          <p className="text-[#B8922A] text-[10px] tracking-[0.28em] uppercase font-semibold mt-3">
            Where it began
          </p>
        </div>

        <div className="space-y-6 text-[14px] leading-[2] text-[#7a7060]">
          <p>
            The story begins in the Mithila region of Bihar — a stretch of land
            where painting is not a hobby but a language. For centuries, women
            painted the walls of their homes with the stories of gods, seasons,
            and rites of passage. The art was never meant for a gallery. It was
            meant for the place where life happens.
          </p>
          <p>
            In 2019, we started visiting these villages — not as buyers, but as
            listeners. We sat with artisans, learned the names of pigments, and
            understood why certain motifs appear at weddings and others at
            harvests. What we brought back was not just inventory. It was context.
          </p>
          <p className="text-[#c8bfa8]">
            Mithila Kriti is our attempt to carry that context forward — into
            homes across India and beyond — without flattening it into décor.
          </p>
        </div>
      </section>

      <GoldRule className="max-w-3xl mx-auto px-6" />

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-[#B8922A] text-[10px] tracking-[0.28em] uppercase font-semibold mb-14 text-center">
          What we stand for
        </p>

        <div className="space-y-14">
          {VALUES.map((v) => (
            <div key={v.number} className="flex gap-8 md:gap-12 items-start group">
              <span
                className="text-[#252018] text-[42px] leading-none flex-shrink-0 group-hover:text-[#B8922A]
                           transition-colors duration-500 select-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {v.number}
              </span>
              <div>
                <h3
                  className="text-[#E8D5A0] text-[18px] mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
                >
                  {v.title}
                </h3>
                <p className="text-[#5a5040] text-[13px] leading-[1.9]">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldRule className="max-w-3xl mx-auto px-6" />

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="text-center px-6 py-28">
        <p className="text-[#3a3428] text-[11px] tracking-[0.25em] uppercase font-medium mb-6">
          Ready to bring it home?
        </p>
        <h2
          className="text-[#E8D5A0] text-3xl md:text-4xl mb-10 max-w-lg mx-auto leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
        >
          Every piece tells a story.<br />Find yours.
        </h2>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#B8922A]
                     text-[#B8922A] text-[10.5px] tracking-[0.2em] uppercase font-semibold
                     hover:bg-[#B8922A] hover:text-[#0C0C0C] transition-colors duration-200"
        >
          Shop the Collection
          <span className="text-base leading-none">→</span>
        </Link>
      </section>
    </main>
  );
}