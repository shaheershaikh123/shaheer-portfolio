import { testimonials } from "../lib/data";
import SectionHeading from "./SectionHeading";

function Card({ t }) {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 md:w-[400px]">
      <div className="flex gap-1 text-sm text-white">{"★★★★★"}</div>
      <p className="mt-4 text-sm leading-relaxed text-white/65">"{t.text}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-[family-name:var(--font-display)] font-bold text-black">
          {t.name[0]}
        </span>
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold">
            {t.name}
          </p>
          <p className="text-xs text-white/40">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = [...testimonials.slice(0, half), ...testimonials.slice(0, half)];
  const row2 = [...testimonials.slice(half), ...testimonials.slice(half)];

  return (
    <section className="overflow-hidden border-t border-white/10 bg-white/[0.02] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Testimonials"
          title="What clients say about working with me"
          description="Real feedback from business owners I've built websites, funnels and automation systems for."
        />
      </div>

      <div className="group/rows mt-14 space-y-5">
        <div className="flex w-max animate-marquee-slow gap-5 pr-5 [animation-play-state:running] group-hover/rows:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <Card key={`r1-${i}`} t={t} />
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse gap-5 pr-5 [animation-play-state:running] group-hover/rows:[animation-play-state:paused]">
          {row2.map((t, i) => (
            <Card key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
