export default function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white py-4 text-black">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-widest"
          >
            {item} <span className="text-black/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
