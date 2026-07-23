import Link from "next/link";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { services } from "../../lib/data";

export const metadata = {
  title: "Services",
  description:
    "WordPress development, GHL CRM automation, funnel building, AI agents, Shopify and lead generation systems by Shaheer Shaikh.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36">
      <SectionHeading
        kicker="Services"
        title="Everything your business needs to convert online"
        description="Each service can stand alone — but they're built to work together as one lead-generating machine: website, funnel, CRM, and AI automation."
      />

      <div className="mt-16 space-y-6">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={0.05}>
            <div
              id={s.slug}
              className="group grid scroll-mt-28 gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/25 md:grid-cols-[auto_1fr_1fr] md:p-12"
            >
              <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white/15 transition-colors group-hover:text-white/40 md:text-6xl">
                0{i + 1}
              </span>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-4 leading-relaxed text-white/55">
                  {s.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-block rounded-full border border-white/30 px-6 py-2.5 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black"
                  >
                    Get a quote ↗
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-block rounded-full px-6 py-2.5 text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                  >
                    See pricing →
                  </Link>
                </div>
              </div>
              <ul className="space-y-3 self-center">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-sm text-white/65"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* process */}
      <section className="mt-28">
        <SectionHeading
          kicker="How I work"
          title="A simple, transparent process"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            ["Discover", "We talk about your business, goals and what success looks like."],
            ["Design & Build", "I design and develop your site, funnel or CRM system — fast and clean."],
            ["Automate", "Follow-ups, booking, AI agents — everything wired to work while you sleep."],
            ["Launch & Grow", "We launch, measure and keep optimizing for more conversions."],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <span className="font-[family-name:var(--font-display)] text-sm text-white/30">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
