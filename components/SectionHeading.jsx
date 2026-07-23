import Reveal from "./Reveal";

export default function SectionHeading({ kicker, title, description }) {
  return (
    <Reveal>
      <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
        <span className="shimmer-line inline-block h-px w-10 rounded-full" />
        {kicker}
      </p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-white/55">{description}</p>
      )}
    </Reveal>
  );
}
