import Link from "next/link";
import Reveal from "./Reveal";

/* Stroke icons per service slug — monochrome, consistent weight */
const ICONS = {
  "wordpress-development": (
    <>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 22h8" />
      <path d="M12 18v4" />
      <path d="M6 9h6" />
      <path d="M6 13h9" />
    </>
  ),
  "ghl-crm-automation": (
    <>
      <rect x="2" y="3" width="7" height="6" rx="1.5" />
      <rect x="15" y="3" width="7" height="6" rx="1.5" />
      <rect x="8.5" y="15" width="7" height="6" rx="1.5" />
      <path d="M5.5 9v3.5h13V9" />
      <path d="M12 12.5V15" />
    </>
  ),
  "funnel-building": (
    <>
      <path d="M3 3h18l-7 8.5V19l-4 2v-9.5z" />
    </>
  ),
  "ai-agents-workflows": (
    <>
      <rect x="5" y="7" width="14" height="12" rx="3" />
      <circle cx="10" cy="12.5" r="0.8" fill="currentColor" />
      <circle cx="14" cy="12.5" r="0.8" fill="currentColor" />
      <path d="M9.5 16.2q2.5 1.6 5 0" />
      <path d="M12 7V4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
      <path d="M5 11H2.5" />
      <path d="M19 11h2.5" />
    </>
  ),
  shopify: (
    <>
      <path d="M6 7 7.5 21h9L18 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
      <path d="M9.8 13l1.8 1.8 3-3.3" />
    </>
  ),
  "lead-generation": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="M12 3V1" />
      <path d="M21 12h2" />
    </>
  ),
};

export default function ServicesGrid({ services = [] }) {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.06} className="h-full">
          <Link
            href={`/services#${s.slug}`}
            className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-white/35"
          >
            {/* ghost number */}
            <span className="pointer-events-none absolute -right-2 -top-5 font-[family-name:var(--font-display)] text-[6.5rem] font-bold leading-none text-white/[0.05] transition-colors duration-300 group-hover:text-white/[0.1]">
              0{i + 1}
            </span>
            {/* corner glow on hover */}
            <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            {/* icon tile */}
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                {ICONS[s.slug]}
              </svg>
            </span>

            <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-xl font-semibold">
              {s.title}
            </h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/50">
              {s.short}
            </p>

            {/* animated underline arrow */}
            <span className="relative mt-7 flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 transition-colors group-hover:text-white">
              Learn more
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                ↗
              </span>
              <span className="ml-auto h-px w-0 bg-white/40 transition-all duration-500 group-hover:w-16" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
