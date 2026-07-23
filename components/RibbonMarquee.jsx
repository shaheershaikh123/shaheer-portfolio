const WORDS = ["PASSIONATE", "INNOVATIVE", "CREATIVE", "DEDICATED", "RELIABLE"];

function Band({ reverse = false, inverted = false }) {
  const row = WORDS.concat(WORDS, WORDS, WORDS);
  return (
    <div
      className={`flex w-max items-center gap-8 whitespace-nowrap py-3.5 ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      }`}
    >
      {row.map((w, i) => (
        <span
          key={i}
          className={`flex items-center gap-8 font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-[0.25em] md:text-2xl ${
            inverted ? "text-black" : "text-white"
          }`}
        >
          {w}
          <svg viewBox="0 0 24 24" className={`h-4 w-4 ${inverted ? "fill-black" : "fill-white"}`}>
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/* Two crossing diagonal ribbons — ashardevx-style, in monochrome */
export default function RibbonMarquee() {
  return (
    <div className="pointer-events-none relative -my-6 overflow-hidden py-16 md:py-24">
      <div className="absolute left-1/2 top-1/2 w-[130vw] -translate-x-1/2 -translate-y-1/2 -rotate-3 overflow-hidden bg-white shadow-[0_0_60px_-10px_rgba(255,255,255,0.25)]">
        <Band inverted />
      </div>
      <div className="absolute left-1/2 top-1/2 w-[130vw] -translate-x-1/2 -translate-y-1/2 rotate-2 overflow-hidden border-y border-white/25 bg-black/90 backdrop-blur-sm">
        <Band reverse />
      </div>
    </div>
  );
}
